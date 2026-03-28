import { redirect } from "next/navigation"
import { prisma } from "@/lib/db/prisma"

export default async function VerifyEmailPage({ searchParams }: { searchParams: { token: string } }) {
  const token = searchParams.token

  if (!token) {
    redirect("/login?error=MissingToken")
  }

  const verificationToken = await prisma.verificationToken.findUnique({
    where: { token }
  })

  if (!verificationToken) {
    redirect("/login?error=InvalidToken")
  }

  if (new Date() > verificationToken.expires) {
    await prisma.verificationToken.delete({ where: { token } })
    redirect("/login?error=TokenExpired")
  }

  await prisma.user.update({
    where: { email: verificationToken.identifier },
    data: { emailVerified: new Date() }
  })

  await prisma.verificationToken.delete({ where: { token } })

  redirect("/login?success=EmailVerified")
}
