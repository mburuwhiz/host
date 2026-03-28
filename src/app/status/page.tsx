
import { CheckCircle2, Clock, Globe, ShieldCheck, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function StatusPage() {
  const systems = [
    { name: "PaaS Engine (Orchestrator)", status: "Operational", uptime: "99.98%" },
    { name: "Global Edge Router (Traefik)", status: "Operational", uptime: "100%" },
    { name: "Build Infrastructure (Builder Node 01-04)", status: "Operational", uptime: "99.95%" },
    { name: "Persistent Storage API", status: "Operational", uptime: "100%" },
    { name: "Platform Dashboard & API", status: "Operational", uptime: "99.99%" },
  ]

  return (
    <div className="min-h-screen bg-background py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex justify-between items-end mb-12">
            <div>
                <h1 className="text-4xl font-headline font-bold mb-2">System Status</h1>
                <p className="text-muted-foreground">Real-time monitoring of our core infrastructure nodes.</p>
            </div>
            <div className="bg-primary/10 text-primary px-6 py-2 rounded-full flex items-center gap-2 border border-primary/20 font-bold">
                <CheckCircle2 className="h-5 w-5" /> All Systems Operational
            </div>
        </div>

        <div className="grid gap-4 mb-12">
            {systems.map((s, i) => (
                <div key={i} className="bg-card border rounded-2xl p-6 flex justify-between items-center shadow-sm">
                    <div className="space-y-1">
                        <p className="font-bold text-lg">{s.name}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1"><Globe className="h-3 w-3" /> Worldwide Access</span>
                            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {s.uptime} Uptime</span>
                        </div>
                    </div>
                    <Badge className="bg-emerald-500 hover:bg-emerald-600 px-4 py-1">{s.status}</Badge>
                </div>
            ))}
        </div>

        <div className="space-y-8">
            <h2 className="text-2xl font-headline font-bold">Node Load Metrics</h2>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div className="flex justify-between text-sm font-medium">
                        <span>Cluster CPU Load</span>
                        <span>42%</span>
                    </div>
                    <Progress value={42} className="h-2" />
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between text-sm font-medium">
                        <span>Memory Utilization (256GB/Node)</span>
                        <span>68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                </div>
            </div>
        </div>

        <div className="mt-24 pt-12 border-t text-center space-y-4">
            <p className="text-sm text-muted-foreground">Looking for historical incident reports?</p>
            <Button variant="outline" className="rounded-full px-8">Visit Incident Archive</Button>
        </div>
      </div>
    </div>
  )
}

import { Button } from "@/components/ui/button"
