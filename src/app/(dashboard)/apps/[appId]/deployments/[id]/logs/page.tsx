
"use client"

import { Terminal, ArrowLeft, ShieldAlert } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function BuildLogsPage({ params }: { params: { appId: string, id: string } }) {
  const logs = [
    "14:20:01 [SYSTEM] Provisioning build node node-04-builder...",
    "14:20:02 [DOCKER] Pulling base image: ubuntu:22.04",
    "14:20:05 [GIT] Fetching head from origin/main...",
    "14:20:06 [NPM] Found package.json. Installing dependencies...",
    "14:20:30 [NPM] added 1245 packages in 24s",
    "14:20:31 [BUILD] Starting Next.js production build...",
    "14:21:12 [BUILD] Creating optimized production build...",
    "14:21:15 [BUILD] ✓ Compiled successfully",
    "14:21:16 [IMAGE] Tagging image as storefront:4f2a1b3",
    "14:21:20 [HEALTH] Container started. Checking localhost:3000...",
    "14:21:22 [HEALTH] 200 OK. Health check PASSED.",
    "14:21:23 [ROUTER] Updating Traefik backend configuration...",
    "14:21:24 [SYSTEM] Deployment successful. Atomic swap complete."
  ]

  return (
    <div className="min-h-screen bg-zinc-950 p-8 font-mono text-sm text-zinc-300">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild className="rounded-full text-zinc-400 hover:text-white">
                    <Link href={`/apps/${params.appId}/deployments/${params.id}`}><ArrowLeft className="h-5 w-5" /></Link>
                </Button>
                <div>
                    <h1 className="text-xl font-bold text-white flex items-center gap-2">
                        <Terminal className="h-5 w-5 text-emerald-500" /> Build Stream: {params.id}
                    </h1>
                    <p className="text-xs text-zinc-500">github.com/twoem/storefront • main</p>
                </div>
            </div>
            <Badge className="bg-emerald-500/20 text-emerald-500 border-emerald-500/30">COMPLETED</Badge>
        </div>

        <div className="space-y-1 py-4">
            {logs.map((log, i) => (
                <div key={i} className="flex gap-6 hover:bg-zinc-900 transition-colors p-1 rounded">
                    <span className="text-zinc-600 shrink-0 select-none">{i + 1}</span>
                    <span className="leading-relaxed">{log}</span>
                </div>
            ))}
            <div className="flex gap-6 p-1 text-emerald-500 font-bold">
                <span className="text-zinc-600 shrink-0 select-none">{logs.length + 1}</span>
                <span>--- [PIPE TERMINATED] ---</span>
            </div>
        </div>

        <div className="fixed bottom-8 right-8">
            <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 rounded-xl flex items-center gap-3 text-emerald-500 animate-in fade-in slide-in-from-bottom-4">
                <ShieldAlert className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-widest">Master Node: node-04</span>
            </div>
        </div>
      </div>
    </div>
  )
}
