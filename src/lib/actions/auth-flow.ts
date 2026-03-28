"use server"

import { prisma } from "@/lib/db/prisma"
import { sendPasswordResetEmail } from "@/lib/email"
import { randomBytes } from "crypto"
import * as argon2 from "argon2"

export async function requestPasswordReset(email: string) {
    try {
        const user = await prisma.user.findUnique({ where: { email } })

        // Always return success to prevent email enumeration attacks
        if (!user) return { success: true }

        const token = randomBytes(32).toString('hex')
        const expires = new Date(new Date().getTime() + 1 * 60 * 60 * 1000) // 1 hour

        // Create token, if one exists, deleting it might fail or pass, it's safer to just let Prisma handle it
        // or just use Prisma upsert/create correctly if ID is an issue. Since email and token are unique:
        try {
            await prisma.passwordResetToken.deleteMany({ where: { email } })
        } catch (e) {
            console.log("Could not delete existing tokens, proceeding to create...")
        }

        await prisma.passwordResetToken.create({
            data: {
                email,
                token,
                expires
            }
        })

        await sendPasswordResetEmail(email, token)

        return { success: true }
    } catch (e) {
        console.error(e)
        return { success: false, error: "Failed to process request" }
    }
}

export async function resetPassword(token: string, password: string) {
    try {
        const resetToken = await prisma.passwordResetToken.findUnique({ where: { token } })

        if (!resetToken) return { success: false, error: "Invalid or missing token" }

        if (new Date() > resetToken.expires) {
            await prisma.passwordResetToken.delete({ where: { token } })
            return { success: false, error: "Token expired" }
        }

        const passwordHash = await argon2.hash(password)

        await prisma.user.update({
            where: { email: resetToken.email },
            data: { passwordHash }
        })

        await prisma.passwordResetToken.delete({ where: { token } })

        return { success: true }
    } catch (e) {
        console.error(e)
        return { success: false, error: "Failed to reset password" }
    }
}
