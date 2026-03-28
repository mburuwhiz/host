import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/db/prisma"
import * as argon2 from "argon2"
import { sendLoginNotificationEmail } from "@/lib/email"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  trustHost: true,
  logger: {
    error(code, metadata) {
      if (code.name === "CredentialsSignin") {
        console.log("Login - Pass - Failed")
        return
      }
    },
    warn(code) {},
    debug(code, metadata) {}
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
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@twoem.com" },
        password: { label: "Password", type: "password" },
        verifyToken: { label: "Verification Token", type: "text" }
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

        // Test User Bootstrap
        if (!user && credentials.email === "test@twoem.com" && credentials.password === "Pass123") {
            const passwordHash = await argon2.hash("Pass123")
            user = await prisma.user.create({
                data: {
                    email: "test@twoem.com",
                    passwordHash,
                    name: "Test User",
                    role: "StandardUser",
                    emailVerified: new Date(), // Skip verification for test user
                    memberships: {
                        create: {
                            team: {
                                create: {
                                    name: "Test Organization",
                                    org: "Testing"
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

        // Handle verification token inline during login
        if (credentials.verifyToken && !user.emailVerified) {
            const tokenRecord = await prisma.verificationToken.findFirst({
                where: { identifier: user.email!, token: credentials.verifyToken as string }
            })
            if (tokenRecord && new Date() <= tokenRecord.expires) {
                user = await prisma.user.update({
                    where: { id: user.id },
                    data: { emailVerified: new Date() }
                })
                await prisma.verificationToken.delete({ where: { identifier_token: { identifier: user.email!, token: credentials.verifyToken as string } } })
            }
        }

        // Trigger login notification for credentials login
        if (user.email) {
            sendLoginNotificationEmail(user.email).catch(console.error)
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          emailVerified: user.emailVerified
        }
      }
    })
  ],
  events: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        console.log("Login - Google Success")
      }

      // Auto-verify email on first OAuth login, since providers like Google/Github already verify
      if (account && account.provider !== "credentials" && user?.email && !user.emailVerified) {
          await prisma.user.update({
              where: { email: user.email },
              data: { emailVerified: new Date() }
          })
      }
    },
    async createUser({ user }) {
      if (user.id) {
        // Automatically provision an empty dashboard/organization for new OAuth users
        await prisma.team.create({
          data: {
            name: `${user.name || "My"}'s Workspace`,
            org: "Personal",
            members: {
              create: {
                user: { connect: { id: user.id } },
                role: "Owner",
              }
            }
          }
        })
      }
    }
  },
  callbacks: {
    async signIn({ user, account }) {
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
        token.emailVerified = (user as any).emailVerified
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role
        ;(session.user as any).emailVerified = token.emailVerified
      }
      return session
    }
  }
})
