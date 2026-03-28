
"use client"

import { User, Mail, Shield, ShieldCheck, MoreHorizontal, Search, Filter, ShieldAlert } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

import { useEffect, useState } from "react"
import { getAllUsers } from "@/lib/actions/user"

export default function AdminUserManagement() {
  const [users, setUsers] = useState<any[]>([])

  useEffect(() => {
    getAllUsers().then(setUsers)
  }, [])

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div>
          <h1 className="text-4xl font-headline font-bold text-zinc-900">Personnel Directory</h1>
          <p className="text-muted-foreground mt-2">Manage platform operators, tenant access levels, and security posture.</p>
        </div>
        <div className="flex gap-3">
            <Button variant="outline" className="rounded-full px-6 h-12 border-2 font-bold text-zinc-600">
                <Filter className="mr-2 h-4 w-4" /> Filter Operators
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12 shadow-xl shadow-primary/20 font-bold">
                <ShieldAlert className="mr-2 h-4 w-4" /> Add Security Operator
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-2 shadow-sm border-primary/10">
            <CardHeader className="pb-2">
                <CardDescription className="text-[10px] uppercase font-bold tracking-widest text-primary">Active Sessions</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-headline font-bold text-zinc-900">{users.filter(u => u.status === 'Active').length}</p>
            </CardContent>
        </Card>
        <Card className="border-2 shadow-sm border-secondary/10">
            <CardHeader className="pb-2">
                <CardDescription className="text-[10px] uppercase font-bold tracking-widest text-secondary">Verified MFA</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-headline font-bold text-zinc-900">0%</p>
            </CardContent>
        </Card>
        <Card className="border-2 shadow-sm border-emerald-100">
            <CardHeader className="pb-2">
                <CardDescription className="text-[10px] uppercase font-bold tracking-widest text-emerald-600">Pending Reviews</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-headline font-bold text-zinc-900">0</p>
            </CardContent>
        </Card>
      </div>

      <Card className="border-2 shadow-2xl overflow-hidden rounded-[2rem] border-zinc-100">
        <div className="p-6 bg-muted/30 border-b flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search users by name, email, or Org..." className="pl-10 h-11 rounded-xl bg-white border-2" />
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest bg-white px-4 py-2 rounded-full border shadow-sm">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Global Real-time Sync
            </div>
        </div>
        <CardContent className="p-0">
          <div className="divide-y-2">
            {users.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">No users found</div>
            ) : (
                users.map((u, i) => (
                  <div key={i} className="flex flex-col lg:flex-row items-center justify-between p-8 hover:bg-muted/10 transition-colors gap-8">
                    <div className="flex items-center gap-6 w-full lg:w-1/3">
                      <Avatar className="h-14 w-14 border-4 border-white shadow-lg">
                        <AvatarImage src={`https://picsum.photos/seed/${u.name}/100/100`} />
                        <AvatarFallback className="bg-primary/10 text-primary font-bold">{u.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-bold text-xl text-zinc-900">{u.name}</p>
                          {u.role === 'SuperAdmin' && <ShieldCheck className="h-4 w-4 text-primary" />}
                        </div>
                        <div className="flex flex-col text-sm text-muted-foreground font-medium">
                            <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> {u.email}</span>
                            <span className="mt-1 font-mono text-[10px] uppercase bg-muted px-2 py-0.5 rounded w-fit">{u.org}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-1 items-center justify-between w-full">
                        <div className="text-center lg:text-left">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Access Level</p>
                            <Badge variant="outline" className={cn(
                                "px-3 py-1 font-bold",
                                u.role === 'SuperAdmin' ? "bg-primary/5 text-primary border-primary/20" : "bg-muted text-zinc-600"
                            )}>{u.role}</Badge>
                        </div>
                        <div className="text-center lg:text-left hidden sm:block">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Status</p>
                            <div className="flex items-center gap-2">
                                <div className={`w-2.5 h-2.5 rounded-full ${u.status === 'Active' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-destructive'}`} />
                                <span className="font-bold text-sm text-zinc-900">{u.status}</span>
                            </div>
                        </div>
                        <div className="text-center lg:text-left hidden md:block">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Last Activity</p>
                            <p className="font-bold text-sm text-zinc-900">{u.lastActive}</p>
                        </div>
                        <div className="text-center lg:text-left">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Apps</p>
                            <p className="font-bold text-lg text-primary">{u.apps}</p>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-xl h-10 w-10 border-2 border-transparent hover:border-muted hover:bg-white transition-all"><MoreHorizontal className="h-5 w-5 text-zinc-400" /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl border-2 shadow-2xl">
                            <DropdownMenuItem className="rounded-xl font-bold p-3">View Full Audit Log</DropdownMenuItem>
                            <DropdownMenuItem className="rounded-xl font-bold p-3">Impersonate Session</DropdownMenuItem>
                            <DropdownMenuItem className="rounded-xl font-bold p-3">Adjust Resource Quotas</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive font-bold rounded-xl p-3 focus:bg-destructive/5 focus:text-destructive">Suspend Operator Access</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                  </div>
                ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
