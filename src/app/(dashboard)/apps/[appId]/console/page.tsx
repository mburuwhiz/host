
"use client"

import { useState, useRef, useEffect } from "react"
import { Terminal as TerminalIcon, Shield, RefreshCw, LogOut, Command, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

import { useSession } from "next-auth/react"

export default function WebConsolePage({ params }: { params: { appId: string } }) {
  const { toast } = useToast()
  const [input, setInput] = useState("")
  const { data: session } = useSession()
  const [history, setHistory] = useState<string[]>([
    "TWOEM ONLINE PRODUCTIONS (v2.10.0-stable)",
    `Connected to container: ${params.appId}-prod-v1`,
    "Warning: Any non-persistent changes will be lost on redeploy.",
    "Type 'help' to see available commands."
  ])
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [history])

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const newHistory = [...history, `twoem@${params.appId}:~$ ${input}`]
    
    const cmd = input.toLowerCase().trim()
    if (cmd === 'help') {
        newHistory.push("Available commands:", " - help: Show this message", " - ls: List directory contents", " - version: Show engine version", " - status: Check container health", " - clear: Clear the terminal screen")
    } else if (cmd === 'ls') {
        newHistory.push(".env  node_modules  package.json  src  public  tsconfig.json")
    } else if (cmd === 'version') {
        newHistory.push("TWOEM PaaS Engine v2.10.0-stable (Ubuntu x86_64)")
    } else if (cmd === 'status') {
        newHistory.push("Container Health: [PASS]", "CPU Usage: 12%", "RAM Usage: 312MB / 1024MB", "Uptime: 14d 2h 45m")
    } else if (cmd === 'clear') {
        setHistory(["Screen cleared."])
        setInput("")
        return
    } else {
        newHistory.push(`Command not found: ${input}`)
    }

    setHistory(newHistory)
    setInput("")
  }

  const handleReset = () => {
    setHistory(["Session reset.", `Connected to ${params.appId}-prod-v1`])
    toast({ title: "TTY Reset", description: "Virtual TTY has been re-initialized." })
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
            <h2 className="text-3xl font-headline font-bold">Web Terminal</h2>
            <p className="text-muted-foreground">Interactive secure SSH session into your isolated application container.</p>
        </div>
        <div className="flex gap-3">
            <Button variant="outline" className="rounded-full px-6 h-11 border-2 font-bold" onClick={handleReset}>
                <RefreshCw className="mr-2 h-4 w-4" /> Reset Shell
            </Button>
            <Button variant="destructive" className="rounded-full px-6 h-11 shadow-lg shadow-destructive/20 font-bold">
                <LogOut className="mr-2 h-4 w-4" /> Terminate Session
            </Button>
        </div>
      </div>

      <div 
        className="bg-[#0c0c0d] rounded-[2rem] p-8 font-mono text-sm border-2 border-zinc-800 shadow-2xl min-h-[600px] flex flex-col relative overflow-hidden group"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="absolute top-6 right-8 flex items-center gap-3 opacity-30 group-hover:opacity-100 transition-opacity">
            <Shield className="h-4 w-4 text-emerald-500" />
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Secure TLS-Gateway</span>
        </div>
        
        <div className="flex-1 overflow-y-auto space-y-2 mb-4 scrollbar-hide" ref={scrollRef}>
            {history.map((line, i) => (
                <div key={i} className={cn(
                    "leading-relaxed",
                    line.startsWith('twoem@') ? "text-emerald-500" : "text-zinc-300"
                )}>
                    {line}
                </div>
            ))}
        </div>

        <form onSubmit={handleCommand} className="flex items-center gap-2 pt-4 border-t border-zinc-800">
            <span className="text-emerald-500 font-bold shrink-0">twoem@{params.appId}:~$</span>
            <input 
                ref={inputRef}
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                autoFocus
                className="flex-1 bg-transparent border-none outline-none text-white font-mono placeholder:opacity-20"
                placeholder="Type a command..."
            />
            <Command className="h-4 w-4 text-zinc-600 shrink-0" />
        </form>
      </div>

      <div className="p-6 bg-primary/5 rounded-3xl border-2 border-primary/10 flex items-start gap-5">
        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
            <Shield className="h-6 w-6 text-primary" />
        </div>
        <div className="space-y-2">
            <p className="font-bold text-primary uppercase tracking-widest text-xs">Security Audit Notice</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
                All terminal keystrokes and session activities are recorded in real-time as part of TWOEM&apos;s <strong>Level 5 Security Compliance</strong>.
                Encrypted logs are sent to the Master Node for audit trails.
            </p>
        </div>
      </div>
    </div>
  )
}
