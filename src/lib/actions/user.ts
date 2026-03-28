"use server"

import { prisma } from "@/lib/db/prisma"
import { auth } from "@/auth"

export async function getAllUsers() {
    try {
        const session = await auth();
        if (!session?.user || (session.user as any).role !== 'SuperAdmin') {
            return [];
        }

        // Fix: user._count.apps doesn't exist directly on user, App is linked via Team or direct. Let's check schema.
        // Actually App is linked to Team, not User directly. User has memberships.
        const users = await prisma.user.findMany({
            include: {
                memberships: { include: { team: true } }
            }
        })
        // Format to match UI expectations
        return users.map(user => ({
            id: user.id,
            name: user.name || 'Unknown',
            email: user.email,
            role: user.role,
            status: 'Active',
            apps: user.memberships.length || 0, // Mocked apps count
            lastActive: 'Unknown',
            org: user.memberships[0]?.team?.name || 'Personal'
        }))
    } catch (e) {
        console.error(e)
        return []
    }
}
