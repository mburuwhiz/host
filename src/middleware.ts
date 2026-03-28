// We must not import from '@/auth' directly in edge runtime if it uses argon2 or Prisma client.
// Instead, NextAuth beta requires defining auth config separately, or we can just fetch the session differently,
// OR we can use the NextAuth middleware wrapper.
import NextAuth from "next-auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Edge compatible config
const { auth } = NextAuth({
  providers: [],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
        token.emailVerified = (user as any).emailVerified
      }
      return token
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role
        ;(session.user as any).emailVerified = token.emailVerified
      }
      return session
    }
  }
})

export default auth((request) => {
  const session = request.auth
  const { pathname } = request.nextUrl

  // Protected routes
  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/apps") ||
    pathname.startsWith("/team") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/account")
  ) {
    if (!session) {
      const url = new URL("/login", request.url)
      url.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(url)
    }

    if (pathname.startsWith("/admin") && session.user?.role !== "SuperAdmin") {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

  // Prevent authenticated users from visiting auth pages
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup")
  ) {
    if (session) {
      if (session.user?.role === "SuperAdmin") {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url))
      }
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
