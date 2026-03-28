"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MailCheck, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function VerifyRequestPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-4 text-center">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/login"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Login</Link>
        </Button>
        <Card className="shadow-xl border-t-4 border-t-primary">
          <CardHeader className="space-y-1">
            <MailCheck className="h-16 w-16 text-primary mx-auto mb-4" />
            <CardTitle className="text-3xl font-headline">Check your email</CardTitle>
            <CardDescription className="text-base mt-2">
              A verification link has been sent to your email address.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Please click the link in that email to verify your account and activate provisioning access. If you don't see it, check your spam folder.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
