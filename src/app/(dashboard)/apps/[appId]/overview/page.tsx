
"use client"

import Link from "next/link"
import { 
  Activity, 
  Clock, 
  Cpu, 
  ExternalLink, 
  GitCommit, 
  HardDrive, 
  RefreshCw, 
  Rocket, 
  ShieldCheck, 
  Terminal,
  ChevronRight,
  ChevronDown
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

export default function AppOverviewPage({ params }: { params: { appId: string } }) {
  const { toast } = useToast()

  const handleRedeploy = () => {
    toast({
      title: "Pipeline Initiated",
      description: "Triggering a fresh atomic build for storefront-api.",
    })
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center border-4 border-white shadow-xl">
                <Rocket className="h-10 w-10 text-primary" />
            </div>
            <div>
                <div className="flex items-center gap-3">
                    <h1 className="text-4xl font-headline font-bold text-zinc-900">storefront-api</h1>
                    <Badge className="bg-emerald-500 hover:bg-emerald-600 px-4 py-1 text-xs font-bold shadow-lg shadow-emerald-500/20">Operational</Badge>
                </div>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground font-medium">
                    <span className="flex items-center gap-1.5"><Terminal className="h-4 w-4" /> ID: {params.appId}</span>
                    <span className="flex items-center gap-1.5"><Globe className="h-4 w-4" /> edge: node-04</span>
                </div>
            </div>
        </div>
        <div className="flex gap-4 w-full lg:w-auto">
            <Button variant="outline" className="flex-1 lg:flex-none h-14 px-8 rounded-2xl border-2 font-bold group">
                <RefreshCw className="mr-2 h-4 w-4 group-hover:rotate-180 transition-transform duration-500" /> Restart Pod
            </Button>
            <Button className="flex-1 lg:flex-none h-14 px-10 rounded-2xl shadow-2xl shadow-primary/30 font-bold text-lg" onClick={handleRedeploy}>
                <Rocket className="mr-2 h-5 w-5" /> Redeploy
            </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
            { label: "Public Endpoint", value: "storefront.twoem.app", icon: ExternalLink, color: "text-primary", bg: "bg-primary/5" },
            { label: "Internal Host", value: "node-04:3021", icon: ShieldCheck, color: "text-secondary", bg: "bg-secondary/5" },
            { label: "Active Commit", value: "4f2a1b3", icon: GitCommit, color: "text-indigo-500", bg: "bg-indigo-50" },
            { label: "Current Uptime", value: "14d 2h 45m", icon: Clock, color: "text-emerald-500", bg: "bg-emerald-50" }
        ].map((item, i) => (
            <Card key={i} className="border-2 shadow-sm hover:shadow-xl transition-all hover:border-primary/20 rounded-[1.5rem] overflow-hidden group">
                <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-6">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{item.label}</p>
                        <div className={cn("p-2 rounded-xl transition-colors", item.bg)}>
                            <item.icon className={cn("h-4 w-4", item.color)} />
                        </div>
                    </div>
                    <p className="text-lg font-headline font-bold text-zinc-900 group-hover:text-primary transition-colors truncate">{item.value}</p>
                </CardContent>
            </Card>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-2 rounded-[2.5rem] shadow-2xl overflow-hidden group">
            <CardHeader className="flex flex-row items-center justify-between border-b p-8 bg-muted/20">
                <div className="space-y-1">
                    <CardTitle className="text-2xl font-headline">Live Resource Monitor</CardTitle>
                    <p className="text-sm text-muted-foreground">Real-time isolation metrics from cgroups.</p>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-primary bg-white px-4 py-2 rounded-full border-2 border-primary/10 shadow-sm animate-pulse">
                    <Activity className="h-3 w-3" /> STREAMING LIVE
                </div>
            </CardHeader>
            <CardContent className="p-10">
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <div className="flex justify-between items-end">
                            <div className="space-y-1">
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Processor Load</p>
                                <div className="flex items-center gap-2">
                                    <Cpu className="h-5 w-5 text-primary" />
                                    <span className="text-3xl font-headline font-bold">12<span className="text-sm font-normal text-muted-foreground">%</span></span>
                                </div>
                            </div>
                            <span className="text-xs font-bold text-emerald-500">Nominal</span>
                        </div>
                        <div className="h-4 bg-muted/50 rounded-full overflow-hidden p-1">
                            <div className="h-full bg-primary w-[12%] rounded-full shadow-[0_0_15px_rgba(20,184,166,0.5)]" />
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="flex justify-between items-end">
                            <div className="space-y-1">
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Memory Footprint</p>
                                <div className="flex items-center gap-2">
                                    <Activity className="h-5 w-5 text-secondary" />
                                    <span className="text-3xl font-headline font-bold">312<span className="text-sm font-normal text-muted-foreground">MB</span></span>
                                </div>
                            </div>
                            <span className="text-xs font-bold text-emerald-500">62% Allocated</span>
                        </div>
                        <div className="h-4 bg-muted/50 rounded-full overflow-hidden p-1">
                            <div className="h-full bg-secondary w-[62%] rounded-full shadow-[0_0_15px_rgba(14,165,233,0.5)]" />
                        </div>
                    </div>
                </div>
                
                {/* Visual Graph Mockup */}
                <div className="mt-16 h-48 bg-muted/20 rounded-[2rem] border-2 border-dashed border-primary/20 flex items-center justify-center overflow-hidden relative group-hover:bg-muted/30 transition-all">
                    <div className="absolute inset-0 opacity-10">
                        <svg className="w-full h-full" preserveAspectRatio="none">
                            <path d="M0 80 Q 150 20, 300 80 T 600 80" stroke="hsl(var(--primary))" fill="transparent" strokeWidth="4" />
                            <path d="M0 100 Q 200 40, 400 100 T 800 100" stroke="hsl(var(--secondary))" fill="transparent" strokeWidth="2" strokeDasharray="10 10" />
                        </svg>
                    </div>
                    <div className="text-center space-y-3 z-10">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-xl">
                            <Activity className="h-8 w-8 text-primary opacity-40 animate-pulse" />
                        </div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Telemetry Pipeline Connected</p>
                    </div>
                </div>
            </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card className="border-2 rounded-[2.5rem] shadow-xl overflow-hidden">
            <CardHeader className="border-b p-8 bg-muted/20">
                <CardTitle className="text-2xl font-headline">Recent Events</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="divide-y-2">
                    {[
                        { event: "Deployment Successful", time: "2h ago", status: "success", icon: Rocket },
                        { event: "Config Updated", time: "5h ago", status: "info", icon: Settings },
                        { event: "Restart Initiated", time: "1d ago", status: "warning", icon: RefreshCw },
                        { event: "Triple-Save Triggered", time: "2d ago", status: "info", icon: ShieldCheck }
                    ].map((log, i) => (
                        <div key={i} className="flex gap-6 items-center p-6 hover:bg-muted/10 transition-colors">
                            <div className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center border-2",
                                log.status === 'success' ? "bg-emerald-50 text-emerald-500 border-emerald-100" : 
                                log.status === 'warning' ? "bg-orange-50 text-orange-500 border-orange-100" : 
                                "bg-blue-50 text-blue-500 border-blue-100"
                            )}>
                                <log.icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1 space-y-0.5">
                                <p className="text-sm font-bold text-zinc-900">{log.event}</p>
                                <p className="text-xs text-muted-foreground font-medium">{log.time}</p>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground/30" />
                        </div>
                    ))}
                </div>
                <div className="p-6 bg-muted/10">
                    <Button variant="ghost" className="w-full h-12 rounded-xl text-primary font-bold hover:bg-primary/5 hover:text-primary transition-all group" asChild>
                        <Link href={`/apps/${params.appId}/activity`}>
                            View Audit History <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  )
}
