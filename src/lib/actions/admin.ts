"use server"

import { prisma } from "@/lib/db/prisma"
import { auth } from "@/auth"
import { sendAccountDeletedEmail } from "@/lib/email"
import { destroyAppResources } from "@/lib/orchestration/engine"

async function verifySuperAdmin() {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== 'SuperAdmin') {
        throw new Error("Unauthorized: SuperAdmin access required.");
    }
}

export async function updateUserRole(userId: string, newRole: string) {
    try {
        await verifySuperAdmin();
        await prisma.user.update({
            where: { id: userId },
            data: { role: newRole }
        });
        return { success: true };
    } catch (e: any) {
        console.error(e);
        return { success: false, error: e.message || "Failed to update user role." };
    }
}

export async function deleteUser(userId: string) {
    try {
        await verifySuperAdmin();
        // Get user and their associated apps (via memberships) before deletion for cascade teardown
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                memberships: {
                    include: {
                        team: {
                            include: { apps: true }
                        }
                    }
                }
            }
        });

        if (user) {
            // Initiate container/cloud proxy cleanup for all apps owned by the user's teams
            for (const membership of user.memberships) {
                if (membership.role === 'Owner') {
                    for (const app of membership.team.apps) {
                        // This removes Docker containers, volumes, and Nginx/Cloudflare reverse proxy configs natively.
                        destroyAppResources(app.name).catch(console.error);
                    }
                }
            }

            // Delete database row (Cascade deletion will wipe apps, env vars, deployments, tokens, etc)
            await prisma.user.delete({
                where: { id: userId }
            });

            if (user.email) {
                sendAccountDeletedEmail(user.email).catch(console.error);
            }
            return { success: true };
        }
        return { success: false, error: "User not found" };
    } catch (e: any) {
        console.error(e);
        return { success: false, error: e.message || "Failed to delete user." };
    }
}
