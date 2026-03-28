
"use client"

import { Terminal, Copy, Download, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

export default function AppLogsPage() {
  const { toast } = useToast()
  const logs = [
    { time: "2024-03-20 14:30:21", type: "INFO", msg: "Application starting..." },
    { time: "2024-03-20 14:30:22", type: "INFO", msg: "Database connection established via node-04-shared" },
    { time: "2024-03-20 14:30:23", type: "INFO", msg: "Traefik routing identified: storefront.twoem.app" },
    { time: "2024-03-20 14:30:24", type: "INFO", msg: "Server listening on port 3000" },
    { time: "2024-03-20 14:35:10", type: "WARN", msg: "Memory utilization reaching 80% threshold" },
    { time: "2024-03-20 14:40:05", type: "INFO", msg: "GET /api/v1/products - 200 OK (45ms)" },
    { time: "2024-03-20 14:42:12", type: "ERROR", msg: "Failed to load static asset: /images/missing.png" },
    { time: "2024-03-20 14:45:00", type: "INFO", msg: "Periodic health check: PASSED" },
  ]

  const copyLogs = () => {
    const logText = logs.map(l => `${l.time} [${l.type}] ${l.msg}`).join('\n')
    navigator.clipboard.writeText(logText)
    toast({
        title: "Logs Copied",
        description: "Standard output captured to clipboard.",
    })
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
            <h2 className="text-2xl font-headline font-bold">Runtime Logs</h2>
            <p className="text-sm text-muted-foreground">Live stdout/stderr stream from your isolated container.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" className="flex-1 sm:flex-none" onClick={copyLogs}>
                <Copy className="mr-2 h-4 w-4" /> Copy
            </Button>
            <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                <Download className="mr-2 h-4 w-4" /> Export
            </Button>
            <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10">
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
      </div>

      <div className="bg-zinc-950 rounded-2xl p-6 font-mono text-[11px] md:text-xs overflow-hidden border-2 border-zinc-800 shadow-2xl min-h-[550px] flex flex-col">
        <div className="flex items-center justify-between mb-6 border-b border-zinc-800 pb-4">
            <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-zinc-500" />
                <span className="text-zinc-500 font-bold">twoem-storefront-prod:v2.1</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-emerald-500 uppercase tracking-widest font-bold text-[10px]">Live Stream</span>
            </div>
        </div>
        <div className="space-y-2.5 overflow-y-auto flex-1 custom-scrollbar">
            {logs.map((log, i) => (
                <div key={i} className="flex gap-4 group hover:bg-zinc-900/50 transition-colors py-0.5">
                    <span className="text-zinc-600 shrink-0 select-none">{log.time.split(' ')[1]}</span>
                    <span className={cn(
                        "font-bold shrink-0 min-w-[50px]",
                        log.type === 'ERROR' ? "text-red-500" : log.type === 'WARN' ? "text-orange-500" : "text-emerald-500"
                    )}>[{log.type}]</span>
                    <span className="text-zinc-300 break-all leading-relaxed">{log.msg}</span>
                </div>
            ))}
            <div className="flex gap-4 animate-pulse pt-4 border-t border-zinc-800/50">
                <span className="text-zinc-600 select-none">--:--:--</span>
                <span className="text-zinc-500 italic">Listening for system events...</span>
            </div>
        </div>
      </div>
    </div>
  )
}
