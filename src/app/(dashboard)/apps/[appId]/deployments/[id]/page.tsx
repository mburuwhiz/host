
"use client"

import { ArrowLeft, Clock, GitCommit, ShieldCheck, Terminal, Download, Rocket } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DeploymentDetailPage({ params }: { params: { appId: string, id: string } }) {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild className="rounded-full">
            <Link href={`/apps/${params.appId}/deployments`}><ArrowLeft className="h-5 w-5" /></Link>
        </Button>
        <div>
            <div className="flex items-center gap-2">
                <h1 className="text-3xl font-headline font-bold">Deployment Summary</h1>
                <Badge className="bg-primary">{params.id}</Badge>
            </div>
            <p className="text-muted-foreground">Successful atomic swap executed at 14:22 PM</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-2 border-primary/20 bg-primary/5">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold uppercase text-primary tracking-widest">Status</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-3">
                    <ShieldCheck className="h-8 w-8 text-primary" />
                    <span className="text-2xl font-bold">Active</span>
                </div>
            </CardContent>
        </Card>
        <Card className="border-2">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold uppercase text-muted-foreground tracking-widest">Build Duration</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-3">
                    <Clock className="h-8 w-8 text-secondary" />
                    <span className="text-2xl font-bold">1m 45s</span>
                </div>
            </CardContent>
        </Card>
        <Card className="border-2">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold uppercase text-muted-foreground tracking-widest">Commit</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-3">
                    <GitCommit className="h-8 w-8 text-indigo-500" />
                    <span className="text-2xl font-bold font-mono">4f2a1b3</span>
                </div>
            </CardContent>
        </Card>
      </div>

      <Card className="border-2">
        <CardHeader className="bg-muted/30 border-b flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
                <Terminal className="h-5 w-5" /> Build Pipeline Logic
            </CardTitle>
            <div className="flex gap-2">
                <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" /> Download Logs</Button>
                <Button variant="outline" size="sm" asChild>
                    <Link href={`/apps/${params.appId}/deployments/${params.id}/logs`}>View Real-time Stream</Link>
                </Button>
            </div>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
            <div className="space-y-4">
                {[
                    { step: "Initializing ephemeral node", status: "DONE", time: "0.4s" },
                    { step: "Cloning repository: github.com/twoem/storefront", status: "DONE", time: "1.2s" },
                    { step: "Running build command: npm install && npm run build", status: "DONE", time: "42s" },
                    { step: "Generating atomic Blue-Green image", status: "DONE", time: "8s" },
                    { step: "Propagating traffic to Traefik router", status: "DONE", time: "0.2s" },
                ].map((s, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary" />
                            <span className="font-medium">{s.step}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <Badge variant="secondary" className="text-[10px]">{s.status}</Badge>
                            <span className="text-muted-foreground font-mono text-xs">{s.time}</span>
                        </div>
                    </div>
                ))}
            </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button size="lg" className="rounded-full px-12 h-14 text-lg">
            <Rocket className="mr-2 h-5 w-5" /> Revert to this Version
        </Button>
      </div>
    </div>
  )
}
