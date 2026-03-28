"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MailCheck, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

import { ShieldCheck, ArrowRight } from "lucide-react"

export default function VerifyRequestPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 animate-in fade-in zoom-in-95 duration-500">
      <div className="w-full max-w-md bg-white border-2 border-emerald-100 p-8 rounded-[2rem] shadow-2xl shadow-emerald-500/10 text-center space-y-6">
        <div className="mx-auto w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center border-4 border-emerald-100 shadow-inner">
          <MailCheck className="h-10 w-10 text-emerald-500" />
        </div>

        <div>
          <h1 className="text-3xl font-headline font-bold text-gray-900 mb-2">Check Your Inbox</h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            We've sent a secure verification link to your email address.
            Please click the link to activate your TWOEM cluster account.
          </p>
        </div>

        <div className="bg-emerald-50/50 rounded-2xl p-4 border border-emerald-100 flex items-center gap-3 text-left">
          <ShieldCheck className="h-5 w-5 text-emerald-500 shrink-0" />
          <p className="text-xs text-emerald-700 font-medium">
            Your workspace and initial 10GB volume will be provisioned immediately upon verification.
          </p>
        </div>

        <div className="pt-4 border-t border-gray-100 space-y-4">
          <Button asChild className="w-full h-12 rounded-full font-bold text-sm bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-500/20">
            <Link href="/login">
              Continue to Login <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <p className="text-xs text-muted-foreground">
            Didn't receive the email? Check your spam folder or try registering again.
          </p>
        </div>
      </div>
    </div>
  )
}
