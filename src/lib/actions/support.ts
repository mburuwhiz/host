"use server"

import { prisma } from "@/lib/db/prisma"

export async function getAllTickets() {
    try {
        const tickets = await prisma.ticket.findMany({
            orderBy: { createdAt: 'desc' },
            take: 50,
            include: { user: true }
        })
        return tickets.map(t => ({
            id: t.id,
            user: t.user?.name || 'Unknown',
            org: 'Unknown',
            subject: t.subject,
            status: t.status,
            time: t.createdAt.toISOString(),
            priority: t.priority
        }))
    } catch (e) {
        console.error(e)
        return []
    }
}

export async function getUserTickets(userId: string) {
    try {
        const tickets = await prisma.ticket.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' }
        })
        return tickets.map(t => ({
            ...t,
            time: t.createdAt.toISOString()
        }))
    } catch (e) {
        console.error(e)
        return []
    }
}
