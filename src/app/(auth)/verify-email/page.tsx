import { redirect } from "next/navigation"
import { prisma } from "@/lib/db/prisma"

export default async function VerifyEmailPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await searchParams;
  const token = params.token as string | undefined;

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
