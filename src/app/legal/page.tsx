
"use client"

import { Shield, Lock, Scale, FileCheck, Gavel, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-background py-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <Button variant="ghost" asChild className="mb-8">
            <Link href="/"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Home</Link>
        </Button>
        <div className="text-center space-y-6 mb-16">
            <div className="inline-flex items-center rounded-full border px-4 py-1 text-xs font-bold bg-primary/10 text-primary uppercase tracking-widest mb-2">
                Governance & Compliance
            </div>
            <h1 className="text-5xl font-headline font-bold">Privacy & Legal Framework</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Standard protocols for TWOEM ONLINE PRODUCTIONS ensuring data sovereignty.
            </p>
        </div>

        <div className="grid gap-12">
            <section className="space-y-6">
                <div className="flex items-center gap-4 text-primary">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center border">
                      <Scale className="h-6 w-6" />
                    </div>
                    <h2 className="text-3xl font-headline font-bold">Terms of Service</h2>
                </div>
                <div className="bg-white p-8 rounded-3xl border shadow-sm space-y-6 text-muted-foreground leading-relaxed">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">1. Resource Usage</h3>
                      <p>Access to the TWOEM cluster is provided on a subscription basis. Misuse of the 2.5TB NVMe partition for illegal activities (e.g. mining, DDoS) will result in immediate termination.</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">2. Deployment Liability</h3>
                      <p>While we provide atomic deployment features, users are responsible for their application's code and persistent data integrity. Always use the Triple-Save environment system.</p>
                    </div>
                </div>
            </section>

            <section className="space-y-6">
                <div className="flex items-center gap-4 text-secondary">
                    <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center border">
                      <Lock className="h-6 w-6" />
                    </div>
                    <h2 className="text-3xl font-headline font-bold">Privacy Policy</h2>
                </div>
                <div className="bg-white p-8 rounded-3xl border shadow-sm space-y-6 text-muted-foreground leading-relaxed">
                    <p>We strictly adhere to GDPR principles. Your repository source code is only processed within isolated ephemeral containers during the build process.</p>
                    <div className="flex items-center gap-2 pt-4 border-t">
                      <FileCheck className="h-4 w-4 text-emerald-500" />
                      <span className="text-sm font-bold">Compliant with L5 Security Standards</span>
                    </div>
                </div>
            </section>
        </div>

        <div className="mt-16 p-12 bg-primary/5 rounded-[2.5rem] border text-center space-y-4">
            <Gavel className="h-8 w-8 text-primary mx-auto" />
            <h3 className="text-xl font-bold font-headline">Need Legal Assistance?</h3>
            <p className="text-muted-foreground">For enterprise SLA inquiries, contact our legal team directly.</p>
            <Button className="rounded-full px-8">Contact Legal Desk</Button>
        </div>
      </div>
    </div>
  )
}
