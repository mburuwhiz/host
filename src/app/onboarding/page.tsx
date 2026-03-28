"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check, Rocket, Settings, Users, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      setLoading(true)
      setTimeout(() => router.push("/dashboard"), 1500)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-xl w-full space-y-8 text-center">
        <div className="space-y-2">
          <h1 className="text-4xl font-headline font-bold">Welcome to TWOEM</h1>
          <p className="text-muted-foreground">Let's get your orchestration engine ready.</p>
        </div>

        <div className="flex justify-center gap-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              step === s ? "bg-primary w-8" : "bg-muted"
            )} />
          ))}
        </div>

        <Card className="border-2 shadow-2xl text-left overflow-hidden">
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-right duration-500">
              <CardHeader className="bg-primary/5 border-b">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4 text-white">
                  <Settings className="h-6 w-6" />
                </div>
                <CardTitle className="text-2xl font-headline">Organization Setup</CardTitle>
                <CardDescription>Give your team a professional workspace name.</CardDescription>
              </CardHeader>
              <CardContent className="pt-8 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="team">Team Name</Label>
                  <Input id="team" placeholder="e.g. Acme Engineering" className="h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Workspace URL</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground text-sm">twoem.app/team/</span>
                    <Input id="slug" placeholder="acme-eng" className="h-12" />
                  </div>
                </div>
              </CardContent>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right duration-500">
              <CardHeader className="bg-secondary/5 border-b">
                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center mb-4 text-white">
                  <Users className="h-6 w-6" />
                </div>
                <CardTitle className="text-2xl font-headline">Invite Your Crew</CardTitle>
                <CardDescription>Collaborate with your fellow developers instantly.</CardDescription>
              </CardHeader>
              <CardContent className="pt-8 space-y-4">
                <div className="space-y-2">
                  <Label>Email Addresses (comma separated)</Label>
                  <Input placeholder="dev@company.com, leads@company.com" className="h-12" />
                </div>
                <p className="text-xs text-muted-foreground italic">They'll receive an invite token to join your workspace.</p>
              </CardContent>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right duration-500">
              <CardHeader className="bg-emerald-50 border-b">
                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center mb-4 text-white">
                  <Rocket className="h-6 w-6" />
                </div>
                <CardTitle className="text-2xl font-headline">Ready for Launch</CardTitle>
                <CardDescription>Your infrastructure is provisioned on Node-04.</CardDescription>
              </CardHeader>
              <CardContent className="pt-8 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Check className="h-4 w-4 text-emerald-600" />
                    </div>
                    <span className="text-sm font-medium">Ubuntu Cluster Partition Created</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Check className="h-4 w-4 text-emerald-600" />
                    </div>
                    <span className="text-sm font-medium">2.5TB NVMe Storage Mount Verified</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Check className="h-4 w-4 text-emerald-600" />
                    </div>
                    <span className="text-sm font-medium">Dynamic SSL Router Online</span>
                  </div>
                </div>
              </CardContent>
            </div>
          )}

          <CardFooter className="bg-muted/10 p-6 flex justify-between">
            <Button variant="ghost" onClick={() => step > 1 && setStep(step - 1)} disabled={step === 1 || loading}>
              Previous
            </Button>
            <Button onClick={handleNext} className="rounded-full px-8 h-12" disabled={loading}>
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (step === 3 ? "Enter Launchpad" : "Continue")}
              {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
