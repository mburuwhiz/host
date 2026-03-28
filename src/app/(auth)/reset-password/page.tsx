"use client"

import Link from "next/link"
import { ShieldCheck, ArrowLeft, Key, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { resetPassword } from "@/lib/actions/auth-flow"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"

import { Suspense } from "react"

function ResetPasswordForm() {
  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!token) {
        toast({ variant: "destructive", title: "Missing Token", description: "The password reset link is invalid." })
        return
    }

    setLoading(true)

    const formData = new FormData(e.target as HTMLFormElement)
    const password = formData.get("password") as string
    const confirm = formData.get("confirmPassword") as string

    if (password !== confirm) {
        toast({ variant: "destructive", title: "Error", description: "Passwords do not match." })
        setLoading(false)
        return
    }

    try {
        const result = await resetPassword(token, password)
        if (result.success) {
            toast({
                title: "Password Reset Complete",
                description: "Your credential has been updated. You can now login.",
            })
            router.push('/login')
        } else {
            toast({ variant: "destructive", title: "Error", description: result.error })
        }
    } catch (e) {
        toast({ variant: "destructive", title: "Error", description: "Failed to reset password." })
    } finally {
        setLoading(false)
    }
  }

  return (
    <form onSubmit={handleReset}>
        <CardHeader className="space-y-1">
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
            <ShieldCheck className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-3xl font-headline">New Password</CardTitle>
        <CardDescription>
            Establish a new secure credential for your TWOEM account.
        </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
        <div className="grid gap-2">
            <Label htmlFor="password">New Password</Label>
            <Input id="password" name="password" type="password" className="h-11" required />
        </div>
        <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input id="confirmPassword" name="confirmPassword" type="password" className="h-11" required />
        </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
        <Button className="w-full h-11 text-lg font-headline" disabled={loading} type="submit">
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Key className="mr-2 h-4 w-4" />}
            {loading ? "Updating..." : "Update Password"}
        </Button>
        </CardFooter>
    </form>
  )
}

export default function ResetPasswordPage() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-t-4 border-t-primary">
            <Suspense fallback={<div>Loading...</div>}>
                <ResetPasswordForm />
            </Suspense>
        </Card>
      </div>
    </div>
  )
}
