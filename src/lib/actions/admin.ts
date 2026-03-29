"use server"

import { prisma } from "@/lib/db/prisma"
import { auth } from "@/auth"
import { sendAccountDeletedEmail } from "@/lib/email"

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
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (user) {
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
