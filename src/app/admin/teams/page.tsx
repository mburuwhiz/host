
"use client"

import { Users, Shield, Plus, MoreHorizontal, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function AdminTeamsManagement() {
  const teams = [
    { name: "TWOEM Engineering", org: "TWOEM", apps: 12, storage: "1.1TB", status: "Active" },
    { name: "Acme Cloud", org: "Acme Corp", apps: 4, storage: "45GB", status: "Active" },
    { name: "Identity Devs", org: "Identity.io", apps: 2, storage: "2GB", status: "Review" },
  ]

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-headline font-bold">Organization & Team Control</h1>
          <p className="text-muted-foreground mt-2">Manage resource quotas and tenant access levels.</p>
        </div>
        <Button className="rounded-full shadow-lg"><Plus className="mr-2 h-4 w-4" /> Create Managed Org</Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input placeholder="Search teams, organizations, or tenant IDs..." className="pl-10 h-12 rounded-xl" />
      </div>

      <Card className="border-2">
        <CardContent className="p-0">
          <div className="divide-y">
            {teams.map((t, i) => (
              <div key={i} className="flex items-center justify-between p-6 hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center border">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{t.name}</h3>
                    <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest">{t.org}</p>
                  </div>
                </div>
                <div className="flex items-center gap-12">
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">Storage Usage</p>
                    <p className="font-bold">{t.storage}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">Apps</p>
                    <p className="font-bold">{t.apps}</p>
                  </div>
                  <Badge className={t.status === 'Active' ? 'bg-primary' : 'bg-orange-500'}>{t.status}</Badge>
                  <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
