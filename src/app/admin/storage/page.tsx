
"use client"

import { HardDrive, Info, Trash2, Database, ShieldAlert } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

export default function AdminStorageAudit() {
  const partitions = [
    { name: "Global Build Cache", used: 850, total: 1024, health: "Nominal" },
    { name: "Tenant Persistence", used: 1200, total: 2560, health: "Optimal" },
    { name: "System Overlays", used: 45, total: 100, health: "Stable" },
  ]

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-headline font-bold">Storage Partition Audit</h1>
        <p className="text-muted-foreground mt-2">Monitoring the 2.5TB NVMe Global Cluster storage pool.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {partitions.map((p, i) => (
          <Card key={i} className="border-2">
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                {p.name}
                <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full border">{p.health}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-xs font-bold">
                <span>{p.used} GB USED</span>
                <span>{p.total} GB TOTAL</span>
              </div>
              <Progress value={(p.used / p.total) * 100} className="h-2" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-2 border-primary/20">
        <CardHeader className="bg-primary/5 border-b">
          <CardTitle className="flex items-center gap-2"><Database className="h-5 w-5 text-primary" /> Active Mount Points</CardTitle>
          <CardDescription>Tenant-specific persistent volume allocations.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {[
              { app: "storefront-api", mount: "/var/lib/mysql", size: "10GB", node: "node-04" },
              { app: "auth-worker", mount: "/app/data", size: "2GB", node: "node-02" },
              { app: "media-service", mount: "/uploads", size: "250GB", node: "node-07" },
            ].map((mount, i) => (
              <div key={i} className="flex items-center justify-between p-6">
                <div>
                  <p className="font-bold">{mount.app}</p>
                  <p className="text-xs text-muted-foreground font-mono">{mount.mount} • {mount.node}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold">{mount.size}</span>
                  <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
