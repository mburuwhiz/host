import { auth } from "@/auth"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"
import { sendVerificationEmail } from "@/lib/email"
import { randomBytes } from "crypto"

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const token = randomBytes(32).toString('hex')
    const expires = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)

    // Delete existing tokens for this email
    await prisma.verificationToken.deleteMany({
      where: { identifier: session.user.email }
    })

    // Create a new verification token
    await prisma.verificationToken.create({
      data: {
        identifier: session.user.email,
        token,
        expires
      }
    })

    await sendVerificationEmail(session.user.email, token)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to resend" }, { status: 500 })
  }
}
