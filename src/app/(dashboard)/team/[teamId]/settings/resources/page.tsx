"use client"

import { Database, Zap, AlertTriangle, ShieldCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

export default function TeamResourceSettings() {
  const apps = [
    { name: "storefront-api", status: "Running", storage: 8.5, max: 10 },
    { name: "auth-worker", status: "Stopped", storage: 1.2, max: 10 },
    { name: "legacy-dashboard", status: "Running", storage: 9.2, max: 10 }
  ]

  const totalUsed = apps.reduce((acc, curr) => acc + curr.storage, 0)
  const totalLimit = 30 // Example multi-app limit, or per-app limit logic. Spec says 10GB per app free tier.

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
      <div className="border-b border-gray-100 pb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-headline font-bold text-sky-500">Resource Quotas & Usage</h1>
          <p className="text-muted-foreground mt-2 text-sm">Monitor storage and compute consumption across the cluster.</p>
        </div>
        <Button className="bg-emerald-500 hover:bg-emerald-600 rounded-full font-bold shadow-lg shadow-emerald-500/20">
          <Zap className="mr-2 h-4 w-4" /> Upgrade to Pro
        </Button>
      </div>

      <div className="bg-white border-2 border-emerald-100 rounded-2xl p-6 shadow-sm shadow-emerald-50">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-emerald-500" />
            <span className="font-bold text-lg text-gray-800">Total Team Storage Consumption</span>
          </div>
          <span className="text-sm font-bold bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full border border-emerald-200">
            {totalUsed.toFixed(1)} GB / {totalLimit} GB
          </span>
        </div>
        <div className="h-4 bg-gray-100 rounded-full overflow-hidden mt-4">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-1000"
            style={{ width: `${(totalUsed / totalLimit) * 100}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-3 font-medium flex items-center gap-1">
          <ShieldCheck className="h-3 w-3 text-sky-500" /> Compliant with Free Tier Fair Use Policy.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2">Per-App Breakdown</h3>
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200 font-bold">
              <tr>
                <th className="px-6 py-4">App Name</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Storage Used</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {apps.map((app, i) => {
                const percent = (app.storage / app.max) * 100
                const isWarning = percent >= 90
                const isDanger = percent >= 100
                return (
                  <tr key={i} className="bg-white hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-900">{app.name}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${app.status === 'Running' ? 'bg-emerald-500 animate-pulse' : 'bg-gray-300'}`} />
                        {app.status}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-gray-600">{app.storage.toFixed(1)} GB / {app.max} GB</span>
                        {isWarning && !isDanger && <Badge variant="secondary" className="bg-sky-50 text-sky-600 border-sky-200 text-[10px] uppercase">Warning</Badge>}
                        {isDanger && <Badge variant="destructive" className="text-[10px] uppercase">Limit Reached</Badge>}
                      </div>
                      <Progress value={percent} className={`h-1.5 mt-2 ${isDanger ? '[&>div]:bg-red-500' : isWarning ? '[&>div]:bg-sky-500' : '[&>div]:bg-emerald-500'}`} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="outline" size="sm" disabled={isDanger} className="border-gray-200">
                        Redeploy
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
