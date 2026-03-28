
"use client"

import { Activity, ArrowUpRight, Cpu, Database, Server, Users, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AdminDashboardPage() {
  const stats = [
    { label: "Active Apps", value: "1,284", change: "+12%", icon: Zap, color: "text-primary" },
    { label: "Total Nodes", value: "32", change: "Stable", icon: Server, color: "text-secondary" },
    { label: "Active Users", value: "8,492", change: "+5.2%", icon: Users, color: "text-emerald-600" },
    { label: "Cluster Load", value: "68.4%", change: "-2%", icon: Cpu, color: "text-sky-600" },
  ]

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-end">
        <div>
            <h1 className="text-4xl font-headline font-bold text-zinc-900">Infrastructure Overview</h1>
            <p className="text-muted-foreground mt-2">Global platform health and traffic orchestration.</p>
        </div>
        <div className="flex items-center gap-2 text-primary text-sm font-bold bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
            <Activity className="h-4 w-4 animate-pulse" /> SYSTEM STABLE
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
            <div key={i} className="bg-white border-2 rounded-3xl p-6 shadow-xl hover:border-primary/30 transition-all group">
                <div className="flex justify-between items-start mb-4">
                    <div className={`p-4 rounded-2xl bg-muted/30 group-hover:bg-primary/5 transition-colors`}>
                        <s.icon className={`h-6 w-6 ${s.color}`} />
                    </div>
                    {s.change !== 'Stable' && (
                        <span className="flex items-center text-[10px] font-bold text-primary">
                            {s.change} <ArrowUpRight className="h-3 w-3 ml-1" />
                        </span>
                    )}
                </div>
                <p className="text-muted-foreground text-sm font-medium">{s.label}</p>
                <p className="text-3xl font-headline font-bold mt-1">{s.value}</p>
            </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white border-2 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden">
            <h3 className="text-xl font-bold font-headline mb-6 flex items-center gap-2 text-zinc-900">
                <Server className="h-5 w-5 text-primary" /> Active Build Queue
            </h3>
            <div className="space-y-4">
                {[
                    { id: "build_88a2", app: "storefront-api", status: "Compiling", node: "node-04", time: "2m 12s" },
                    { id: "build_11f9", app: "auth-service", status: "Cloning", node: "node-02", time: "0m 45s" },
                    { id: "build_c2d4", app: "legacy-app", status: "Pushing", node: "node-07", time: "5m 30s" }
                ].map((b, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-muted/10 rounded-2xl border-2 border-transparent hover:border-primary/10 hover:bg-white transition-all">
                        <div className="flex items-center gap-4">
                            <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                            <div>
                                <p className="font-bold text-sm text-zinc-900">{b.app}</p>
                                <p className="text-[10px] text-muted-foreground font-mono font-bold">{b.id} • {b.node}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <Badge variant="outline" className="text-[10px] bg-white">{b.status}</Badge>
                            <p className="text-[10px] text-muted-foreground font-mono mt-1 font-bold">{b.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div className="bg-white border-2 rounded-[2rem] p-8 shadow-2xl">
            <h3 className="text-xl font-bold font-headline mb-6 flex items-center gap-2 text-zinc-900">
                <Database className="h-5 w-5 text-secondary" /> Global Storage Partition
            </h3>
            <div className="space-y-8">
                <div>
                    <div className="flex justify-between text-xs mb-3 font-bold">
                        <span className="text-muted-foreground">Reserved (NVMe Pool)</span>
                        <span className="text-zinc-900">1.8TB / 2.5TB</span>
                    </div>
                    <div className="h-4 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[72%] rounded-full shadow-lg shadow-primary/20" />
                    </div>
                </div>
                <div className="pt-6 border-t space-y-4">
                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Node Health</p>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground font-medium">Disk Latency</span>
                        <span className="text-primary font-mono font-bold">0.12ms</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground font-medium">Replica Sync</span>
                        <span className="text-secondary font-mono font-bold">Nominal</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
