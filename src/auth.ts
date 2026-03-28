import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/db/prisma"
import * as argon2 from "argon2"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  trustHost: true,
  logger: {
    error(code, metadata) {
      if (code.name === "CredentialsSignin") return
      console.error(code, metadata)
    },
    warn(code) {
      console.warn(code)
    },
    debug(code, metadata) {
      console.debug(code, metadata)
    }
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
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

        const adminEmail = process.env.ADMIN_EMAIL || "admin@twoem.com"
        const adminPass = process.env.ADMIN_PASSWORD || "Pass123"
        const adminName = process.env.ADMIN_NAME || "Super Admin"

        // Dynamic Admin Bootstrap
        if (!user && credentials.email === adminEmail && credentials.password === adminPass) {
            const passwordHash = await argon2.hash(adminPass)
            user = await prisma.user.create({
                data: {
                    email: adminEmail,
                    passwordHash,
                    name: adminName,
                    role: "SuperAdmin",
                    emailVerified: new Date(), // Skip verification for bootstrap admin
                    memberships: {
                        create: {
                            team: {
                                create: {
                                    name: "TWOEM Master Org",
                                    org: "TWOEM"
                                }
                            },
                            role: "Owner"
                        }
                    }
                }
            })
        }

        if (!user || !user.passwordHash) throw new Error("User not found")

        const isPasswordValid = await argon2.verify(user.passwordHash, credentials.password as string)

        if (!isPasswordValid) throw new Error("Invalid password")

        if (!user.emailVerified) {
            throw new Error("Email not verified")
        }

        return { id: user.id, email: user.email, name: user.name, role: user.role }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification strictly checking if credentials
      if (account?.provider !== "credentials") return true
      if (user?.email) {
          const dbUser = await prisma.user.findUnique({ where: { email: user.email }})
          if (dbUser && !dbUser.emailVerified) {
              return false // Prevent sign in
          }
      }
      return true
    },
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
