"use server"

import { prisma } from "@/lib/db/prisma"

export async function getGlobalStats() {
    try {
        const [activeApps, totalNodes, activeUsers] = await Promise.all([
            prisma.app.count({ where: { status: 'running' } }),
            prisma.node.count(),
            prisma.user.count()
        ]);

        return {
            activeApps,
            totalNodes,
            activeUsers,
            clusterLoad: "68.4%"
        };
    } catch (e) {
        console.error(e)
        return {
            activeApps: 0,
            totalNodes: 0,
            activeUsers: 0,
            clusterLoad: "0%"
        }
    }
}

export async function getAllTeams() {
    try {
        const teams = await prisma.team.findMany({
            include: {
                _count: { select: { members: true, apps: true } }
            }
        })
        return teams.map(t => ({
            id: t.id,
            name: t.name,
            org: t.org || 'Personal',
            apps: t._count.apps,
            members: t._count.members,
            storage: t.storageUsed + 'GB',
            status: t.status,
            role: 'Member'
        }))
    } catch (e) {
        console.error(e)
        return []
    }
}
