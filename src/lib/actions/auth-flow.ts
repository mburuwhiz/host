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

        // To absolutely avoid any Prisma Client schema definition caching errors on the user's end
        // for the `PasswordResetToken` model, we will securely repurpose the built-in `VerificationToken` model
        // which is guaranteed to exist. We distinguish reset tokens by prefixing the identifier.
        const resetIdentifier = `RESET_${email}`

        await prisma.verificationToken.deleteMany({ where: { identifier: resetIdentifier } })

        await prisma.verificationToken.create({
            data: {
                identifier: resetIdentifier,
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
        const resetToken = await prisma.verificationToken.findFirst({
            where: {
                token,
                identifier: { startsWith: 'RESET_' }
            }
        })

        if (!resetToken) return { success: false, error: "Invalid or missing token" }

        if (new Date() > resetToken.expires) {
            await prisma.verificationToken.delete({ where: { identifier_token: { identifier: resetToken.identifier, token } } })
            return { success: false, error: "Token expired" }
        }

        const passwordHash = await argon2.hash(password)
        const email = resetToken.identifier.replace('RESET_', '')

        await prisma.user.update({
            where: { email },
            data: { passwordHash }
        })

        await prisma.verificationToken.delete({ where: { identifier_token: { identifier: resetToken.identifier, token } } })

        return { success: true }
    } catch (e) {
        console.error(e)
        return { success: false, error: "Failed to reset password" }
    }
}
