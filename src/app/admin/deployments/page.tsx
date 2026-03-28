
"use client"

import { Zap, Clock, Server, CheckCircle2, XCircle, MoreVertical } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function GlobalDeploymentsAdmin() {
  const deployments = [
    { id: "dep_882x", app: "storefront-api", org: "TWOEM Eng", status: "Success", node: "node-04", time: "2m ago" },
    { id: "dep_991f", app: "auth-worker", org: "Identity.io", status: "Building", node: "node-02", time: "Just now" },
    { id: "dep_11c0", app: "legacy-dashboard", org: "Legacy Corp", status: "Failed", node: "node-07", time: "1h ago" },
    { id: "dep_cc01", app: "payment-gateway", org: "FinTech Pro", status: "Success", node: "node-04", time: "5h ago" }
  ]

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-headline font-bold text-zinc-900">Global Build Queue</h1>
          <p className="text-muted-foreground mt-2">Real-time oversight of all cluster deployment operations.</p>
        </div>
        <div className="flex gap-4">
            <div className="text-right">
                <p className="text-[10px] font-bold text-muted-foreground uppercase">Active Builds</p>
                <p className="text-2xl font-bold font-headline text-primary">14</p>
            </div>
            <div className="text-right">
                <p className="text-[10px] font-bold text-muted-foreground uppercase">Queue Load</p>
                <p className="text-2xl font-bold font-headline text-secondary">42%</p>
            </div>
        </div>
      </div>

      <Card className="border-2 shadow-xl overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead className="font-bold">Build ID</TableHead>
              <TableHead className="font-bold">Application / Organization</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead className="font-bold">Execution Node</TableHead>
              <TableHead className="font-bold">Triggered</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deployments.map((d) => (
              <TableRow key={d.id}>
                <TableCell className="font-mono text-xs">{d.id}</TableCell>
                <TableCell>
                  <div className="font-bold">{d.app}</div>
                  <div className="text-xs text-muted-foreground">{d.org}</div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${d.status === 'Success' ? 'bg-primary' : d.status === 'Building' ? 'bg-secondary animate-pulse' : 'bg-destructive'}`} />
                    <span className="font-medium text-sm">{d.status}</span>
                  </div>
                </TableCell>
                <TableCell>
                   <div className="flex items-center gap-2">
                        <Server className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{d.node}</span>
                   </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{d.time}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
