"use server"

import { prisma } from "@/lib/db/prisma"
import { auth } from "@/auth"

export async function getAppsForTeam(teamId?: string) {
    try {
        const session = await auth();
        if (!session?.user) return [];

        // In a real app, verify user belongs to teamId
        // For now, if no teamId is provided, get apps for the user's teams
        const apps = await prisma.app.findMany({
            where: teamId ? { teamId } : {
                team: {
                    members: { some: { userId: session.user.id } }
                }
            },
            include: { team: true },
            orderBy: { updatedAt: 'desc' }
        })

        return apps.map(app => ({
            id: app.id,
            name: app.name,
            teamId: app.teamId,
            status: app.status,
            url: app.url,
            env: 'production',
            lastDeploy: app.lastDeployed ? 'Deployed recently' : 'No deployments'
        }));
    } catch (e) {
        console.error(e)
        return []
    }
}
