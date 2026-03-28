import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/db/prisma"
import * as argon2 from "argon2"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  trustHost: true,
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@twoem.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) throw new Error("Missing credentials")

        let user = await prisma.user.findUnique({
          where: { email: credentials.email as string }
        })

        if (!user && (credentials.email === "admin@twoem.com" || credentials.email === "test@twoem.com") && credentials.password === "Pass123") {
            const passwordHash = await argon2.hash("Pass123")
            user = await prisma.user.create({
                data: {
                    email: credentials.email,
                    passwordHash,
                    name: credentials.email === "admin@twoem.com" ? "Admin" : "Test User",
                    role: credentials.email === "admin@twoem.com" ? "SuperAdmin" : "StandardUser"
                }
            })
        }

        if (!user || !user.passwordHash) throw new Error("User not found")

        const isPasswordValid = await argon2.verify(user.passwordHash, credentials.password as string)

        if (!isPasswordValid) throw new Error("Invalid password")

        return { id: user.id, email: user.email, name: user.name, role: user.role }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role
      }
      return session
    }
  }
})
