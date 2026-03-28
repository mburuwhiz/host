
"use client"

import { Users, Plus, Shield, UserMinus, Mail, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function TeamMembersPage() {
  const members: any[] = [] // TODO: Fetch from database

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-headline font-bold">Team Governance</h1>
          <p className="text-muted-foreground">Manage roles, permissions, and member access for this organization.</p>
        </div>
        <Button className="rounded-full shadow-lg"><Plus className="mr-2 h-4 w-4" /> Invite Member</Button>
      </div>

      <div className="grid gap-8">
        <Card className="border-2">
          <CardHeader className="bg-muted/30 border-b flex flex-row items-center justify-between">
            <div>
                <CardTitle className="text-lg">Active Personnel</CardTitle>
                <CardDescription>Currently authorized cluster operators.</CardDescription>
            </div>
            <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Filter members..." className="pl-9 h-9" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
                {members.map((m, i) => (
                    <div key={i} className="flex items-center justify-between p-6 hover:bg-muted/10 transition-colors">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-10 w-10 border-2">
                                <AvatarImage src={`https://picsum.photos/seed/${m.name}/100/100`} />
                                <AvatarFallback>{m.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-bold">{m.name}</p>
                                <p className="text-xs text-muted-foreground flex items-center gap-1"><Mail className="h-3 w-3" /> {m.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-8">
                            <div className="text-right">
                                <p className="text-[10px] text-muted-foreground font-bold uppercase">Role</p>
                                <Select defaultValue={m.role.toLowerCase()}>
                                    <SelectTrigger className="h-8 border-dashed bg-transparent w-32">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="owner">Owner</SelectItem>
                                        <SelectItem value="developer">Developer</SelectItem>
                                        <SelectItem value="viewer">Viewer</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] text-muted-foreground font-bold uppercase">Status</p>
                                <Badge variant={m.status === 'Active' ? 'default' : 'outline'}>{m.status}</Badge>
                            </div>
                            <Button variant="ghost" size="icon" className="text-destructive"><UserMinus className="h-4 w-4" /></Button>
                        </div>
                    </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
