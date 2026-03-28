
"use client"

import { MessageSquare, Clock, ShieldCheck, User, Reply, ArrowRight, Filter, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

import { useEffect, useState } from "react"
import { getAllTickets } from "@/lib/actions/support"

export default function AdminSupportManagement() {
  const [tickets, setTickets] = useState<any[]>([])

  useEffect(() => {
    getAllTickets().then(setTickets)
  }, [])

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-headline font-bold text-zinc-900">Inquiry Management</h1>
          <p className="text-muted-foreground mt-2">Active operator support queue for global tenants.</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 px-4 py-2 font-bold">Queue Healthy</Badge>
          <Button variant="outline" className="rounded-full">
            <Filter className="mr-2 h-4 w-4" /> Filter Stream
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {tickets.map((t) => (
            <Card key={t.id} className="border-2 hover:border-primary/50 transition-all group overflow-hidden shadow-sm">
              <CardContent className="p-0">
                <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center border-2 border-primary/20">
                            <MessageSquare className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="text-[10px] font-mono border-2">{t.id}</Badge>
                                    <h3 className="font-bold text-lg text-zinc-900">{t.subject}</h3>
                                </div>
                                <p className="text-sm text-muted-foreground mt-0.5">Reported by {t.user} • {t.org}</p>
                            </div>
                        </div>
                        <Badge className={t.priority === 'High' ? 'bg-destructive' : 'bg-secondary'}>{t.priority}</Badge>
                    </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-muted/30 border-t">
                  <div className="flex items-center gap-6 text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                    <span className="flex items-center gap-2"><Clock className="h-3 w-3" /> Received {t.time}</span>
                    <span className="flex items-center gap-2"><User className="h-3 w-3" /> Unassigned</span>
                  </div>
                  <Button size="sm" className="rounded-full px-6">
                    <Reply className="mr-2 h-3 w-3" /> Take Inquiry
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-6 sticky top-12 h-fit">
            <Card className="border-2 shadow-xl p-8 bg-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16" />
                <h3 className="text-xl font-headline font-bold mb-6 flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-primary" /> Queue Analytics
                </h3>
                <div className="space-y-8">
                    <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-primary/5 rounded-2xl border-2 border-primary/10">
                        <p className="text-[10px] text-primary font-bold mb-1 uppercase tracking-widest">New Today</p>
                        <p className="text-3xl font-headline font-bold text-primary">14</p>
                    </div>
                    <div className="p-4 bg-secondary/5 rounded-2xl border-2 border-secondary/10">
                        <p className="text-[10px] text-secondary font-bold mb-1 uppercase tracking-widest">Resolved</p>
                        <p className="text-3xl font-headline font-bold text-secondary">122</p>
                    </div>
                    </div>

                    <div className="space-y-4 pt-6 border-t">
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Issue Distribution</p>
                    <div className="space-y-3">
                        {[
                        { label: "Build Failures", value: "42%", color: "bg-primary" },
                        { label: "DNS/SSL Config", value: "28%", color: "bg-secondary" },
                        { label: "Storage Quotas", value: "15%", color: "bg-indigo-500" },
                        { label: "Account Access", value: "15%", color: "bg-orange-500" }
                        ].map((s, i) => (
                        <div key={i} className="space-y-1.5">
                            <div className="flex justify-between text-xs font-bold">
                                <span className="text-muted-foreground">{s.label}</span>
                                <span>{s.value}</span>
                            </div>
                            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                                <div className={cn("h-full rounded-full", s.color)} style={{ width: s.value }} />
                            </div>
                        </div>
                        ))}
                    </div>
                    </div>
                </div>
            </Card>
            
            <Button variant="outline" className="w-full h-12 rounded-xl" asChild>
                <Link href="/docs/api">
                    <ExternalLink className="mr-2 h-4 w-4" /> View Support API Reference
                </Link>
            </Button>
        </div>
      </div>
    </div>
  )
}

import Link from "next/link"
