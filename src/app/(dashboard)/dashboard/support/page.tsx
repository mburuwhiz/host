
"use client"

import { useState } from "react"
import { LifeBuoy, MessageSquare, Clock, CheckCircle2, Send, ArrowRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

import { useEffect } from "react"
import { getUserTickets } from "@/lib/actions/support"
import { useSession } from "next-auth/react"

export default function SupportHubPage() {
  const [view, setView] = useState<'list' | 'detail'>('list')
  const [tickets, setTickets] = useState<any[]>([])
  const { data: session } = useSession()
  
  useEffect(() => {
    if (session?.user?.id) {
        getUserTickets(session.user.id).then(setTickets)
    }
  }, [session])

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-headline font-bold">Support & Help Center</h1>
          <p className="text-muted-foreground">Track your inquiries and consult our engineers.</p>
        </div>
        <Button className="rounded-full shadow-lg" asChild>
            <Link href="/contact">New Inquery</Link>
        </Button>
      </div>

      {view === 'list' ? (
        <div className="grid gap-6">
          <Card className="border-2 overflow-hidden">
            <CardHeader className="bg-muted/30 border-b">
              <CardTitle className="text-lg">Recent Tickets</CardTitle>
              <CardDescription>Track the status of your active and historical support cases.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {tickets.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground">No recent tickets</div>
                ) : (
                    tickets.map((t) => (
                      <div key={t.id} className="p-6 flex items-center justify-between hover:bg-muted/10 cursor-pointer transition-colors" onClick={() => setView('detail')}>
                        <div className="flex items-center gap-6">
                          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                            <MessageSquare className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-lg">{t.subject}</h4>
                              <Badge variant="outline" className="font-mono text-[10px]">{t.id}</Badge>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                              <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Updated {t.time}</span>
                              <span className="flex items-center gap-1"><Badge variant={t.priority === 'High' ? 'destructive' : 'secondary'} className="text-[10px]">{t.priority} Priority</Badge></span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge className={t.status === 'Open' ? 'bg-orange-500' : t.status === 'Resolved' ? 'bg-primary' : 'bg-muted text-muted-foreground'}>
                            {t.status}
                          </Badge>
                          <ArrowRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </div>
                    ))
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-dashed border-2">
            <CardContent className="p-12 text-center space-y-4">
              <LifeBuoy className="h-12 w-12 text-primary mx-auto opacity-40" />
              <h3 className="text-xl font-bold font-headline">Need Immediate Help?</h3>
              <p className="text-muted-foreground max-w-md mx-auto">Our average response time for high-priority tickets is currently <strong>12 minutes</strong>.</p>
              <Button variant="outline" className="rounded-full px-8">Browse Knowledge Base</Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="space-y-6 animate-in slide-in-from-right duration-500">
           <Button variant="ghost" onClick={() => setView('list')} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Tickets
          </Button>

          <Card className="border-2">
            <CardHeader className="border-b bg-muted/30">
              <div className="flex justify-between items-start">
                <div>
                  <Badge variant="outline" className="mb-2">T-XXXX</Badge>
                  <CardTitle className="text-2xl font-headline">Ticket Subject</CardTitle>
                </div>
                <Badge className="bg-orange-500">Open</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="space-y-4">
                <div className="text-center text-sm text-muted-foreground p-8">Loading ticket messages...</div>
              </div>

              <div className="pt-8 border-t">
                <div className="space-y-4">
                  <Label>Reply to Support</Label>
                  <Textarea placeholder="Type your response..." className="min-h-[120px] rounded-xl" />
                  <div className="flex justify-end">
                    <Button className="rounded-full px-8">
                      <Send className="mr-2 h-4 w-4" /> Dispatch Reply
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
