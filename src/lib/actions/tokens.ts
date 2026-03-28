"use server"

import { prisma } from "@/lib/db/prisma"
import { randomBytes, createHash } from "crypto"
import { auth } from "@/auth"

export async function getUserTokens(userId: string) {
    try {
        const session = await auth();
        if (!session?.user || session.user.id !== userId) return [];

        const tokens = await prisma.apiToken.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' }
        })
        return tokens.map(t => ({
            id: t.id,
            name: t.name,
            prefix: t.prefix,
            created: t.createdAt.toLocaleDateString(),
            lastUsed: t.lastUsed ? t.lastUsed.toLocaleDateString() : 'Never'
        }))
    } catch (e) {
        console.error(e)
        return []
    }
}

export async function createApiToken(userId: string, name: string) {
    try {
        const session = await auth();
        if (!session?.user || session.user.id !== userId) {
            return { success: false, error: "Unauthorized" };
        }

        const rawToken = `twoem_${randomBytes(24).toString('hex')}`
        const tokenHash = createHash('sha256').update(rawToken).digest('hex')
        const prefix = rawToken.substring(0, 10) + "..."

        const token = await prisma.apiToken.create({
            data: {
                userId,
                name,
                tokenHash,
                prefix
            }
        })

        return { success: true, token: rawToken } // raw token only returned once
    } catch (e) {
        console.error(e)
        return { success: false, error: "Failed to generate token" }
    }
}

export async function revokeApiToken(tokenId: string) {
    try {
        const session = await auth();
        if (!session?.user) return { success: false, error: "Unauthorized" };

        const token = await prisma.apiToken.findUnique({ where: { id: tokenId } });
        if (!token) return { success: false, error: "Token not found" };
        if (token.userId !== session.user.id) return { success: false, error: "Unauthorized" };

        await prisma.apiToken.delete({ where: { id: tokenId } })
        return { success: true }
    } catch (e) {
        console.error(e)
        return { success: false, error: "Failed to revoke token" }
    }
}
