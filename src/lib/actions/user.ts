"use server"

import { prisma } from "@/lib/db/prisma"
import { auth } from "@/auth"

export async function getAllUsers() {
    try {
        const session = await auth();
        if (!session?.user || (session.user as any).role !== 'SuperAdmin') {
            return [];
        }

        const users = await prisma.user.findMany({
            include: {
                _count: { select: { apps: true, memberships: true, tickets: true } },
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
            apps: user._count.apps || 0,
            lastActive: 'Unknown',
            org: user.memberships[0]?.team?.name || 'Personal'
        }))
    } catch (e) {
        console.error(e)
        return []
    }
}
