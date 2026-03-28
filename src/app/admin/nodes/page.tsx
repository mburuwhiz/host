
"use client"

import { Cpu, Server, Activity, Database, Globe, HardDrive } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function NodeClusterAdmin() {
  const nodes = [
    { id: "node-01", cpu: 45, ram: 62, storage: 1.2, status: "Healthy", type: "Master" },
    { id: "node-02", cpu: 82, ram: 91, storage: 0.8, status: "High Load", type: "Worker" },
    { id: "node-04", cpu: 12, ram: 31, storage: 1.8, status: "Healthy", type: "Worker" },
    { id: "node-07", cpu: 32, ram: 45, storage: 0.5, status: "Healthy", type: "Worker" }
  ]

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-headline font-bold text-zinc-900">Physical Node Cluster</h1>
          <p className="text-muted-foreground mt-2">Global infrastructure health and bare-metal utilization.</p>
        </div>
        <div className="bg-emerald-50 text-emerald-600 px-6 py-2 rounded-full border border-emerald-100 font-bold flex items-center gap-2">
            <Activity className="h-4 w-4 animate-pulse" /> CLUSTER NOMINAL
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {nodes.map((node) => (
            <Card key={node.id} className="border-2 shadow-lg hover:shadow-2xl transition-all overflow-hidden group">
                <CardHeader className="bg-muted/30 border-b flex flex-row items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border-2 group-hover:border-primary transition-colors">
                            <Server className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                        </div>
                        <div>
                            <CardTitle className="text-lg font-headline">{node.id}</CardTitle>
                            <CardDescription className="text-[10px] uppercase font-bold tracking-widest">{node.type} Node</CardDescription>
                        </div>
                    </div>
                    <Badge className={node.status === 'Healthy' ? 'bg-primary' : 'bg-orange-500'}>{node.status}</Badge>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                    <div className="space-y-4">
                        <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                            <span className="flex items-center gap-2"><Cpu className="h-3 w-3" /> CPU Load</span>
                            <span>{node.cpu}%</span>
                        </div>
                        <Progress value={node.cpu} className="h-2" />
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                            <span className="flex items-center gap-2"><Activity className="h-3 w-3" /> RAM Utilization</span>
                            <span>{node.ram}%</span>
                        </div>
                        <Progress value={node.ram} className="h-2" />
                    </div>
                    <div className="pt-4 border-t flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <HardDrive className="h-4 w-4" />
                            <span>Storage Partition</span>
                        </div>
                        <span className="font-mono font-bold">{node.storage}TB / 2.5TB</span>
                    </div>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  )
}
