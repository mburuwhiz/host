
"use client"

import Link from "next/link"
import { Mail, ArrowLeft, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-t-4 border-t-primary">
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
                <Input id="email" type="email" placeholder="john.doe@company.com" className="h-11" />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full h-11 text-lg font-headline">
                <Send className="mr-2 h-4 w-4" /> Send Recovery Link
            </Button>
            <Button variant="ghost" className="w-full" asChild>
                <Link href="/login"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Login</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
