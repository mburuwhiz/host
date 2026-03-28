
"use client"

import Link from "next/link"
import { Mail, ArrowLeft, Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { requestPasswordReset } from "@/lib/actions/auth-flow"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

import { MailCheck } from "lucide-react"

export default function ForgotPasswordPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get("email") as string

    try {
        await requestPasswordReset(email)
        setIsSuccess(true)
    } catch (e) {
        toast({ variant: "destructive", title: "Error", description: "Failed to send reset link." })
    } finally {
        setLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4 animate-in fade-in zoom-in-95 duration-500">
        <Card className="w-full max-w-md shadow-xl border-t-4 border-t-primary text-center pt-8">
            <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <MailCheck className="h-10 w-10 text-primary" />
            </div>
            <CardHeader>
                <CardTitle className="text-3xl font-headline">Email Sent</CardTitle>
                <CardDescription className="text-base">
                  If an account exists for that email, we've sent instructions on how to reset your password.
                </CardDescription>
            </CardHeader>
            <CardFooter className="pt-4 pb-8 flex justify-center">
                <Button variant="ghost" asChild>
                    <Link href="/login"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Login</Link>
                </Button>
            </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-t-4 border-t-primary">
            <form onSubmit={handleReset}>
              <CardHeader className="space-y-1">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <Mail className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-3xl font-headline">Reset Password</CardTitle>
                <CardDescription>
                  Enter your email and we'll send you a recovery link.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                    <Label htmlFor="email">Work Email</Label>
                    <Input id="email" name="email" type="email" placeholder="john.doe@company.com" className="h-11" required />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button className="w-full h-11 text-lg font-headline" disabled={loading} type="submit">
                    {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Send className="mr-2 h-4 w-4" />}
                    {loading ? "Sending..." : "Send Recovery Link"}
                </Button>
                <Button variant="ghost" className="w-full" asChild type="button" disabled={loading}>
                    <Link href="/login"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Login</Link>
                </Button>
              </CardFooter>
            </form>
        </Card>
      </div>
    </div>
  )
}
