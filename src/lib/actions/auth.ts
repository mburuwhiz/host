"use server"

import { prisma } from "@/lib/db/prisma"
import * as argon2 from "argon2"
import { sendVerificationEmail, sendSignupSuccessEmail } from "@/lib/email"
import { randomBytes } from "crypto"

export async function registerUser(formData: FormData) {
  try {
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const name = formData.get("fullname") as string
    const language = formData.get("language") as string
    const company = formData.get("company") as string
    const position = formData.get("position") as string
    const phone = formData.get("phone") as string

    if (!email || !password) return { error: "Email and password are required" }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) return { error: "User already exists" }

    const passwordHash = await argon2.hash(password)

    await prisma.user.create({
      data: {
        email,
        passwordHash,
        name,
        primaryLanguage: language,
        phone,
        // Mock team assignment
        memberships: {
            create: {
                team: {
                    create: {
                        name: `${company || name}'s Team`,
                        org: company
                    }
                },
                role: 'Owner'
            }
        }
      }
    })

    const token = randomBytes(32).toString('hex')
    const expires = new Date(new Date().getTime() + 1 * 60 * 60 * 1000) // 1 hour

    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires
      }
    })

    await sendVerificationEmail(email, token)
    await sendSignupSuccessEmail(email)

    return { success: true }
  } catch (error) {
    console.error(error)
    return { error: "Failed to register" }
  }
}
