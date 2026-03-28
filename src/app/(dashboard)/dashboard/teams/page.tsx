
"use client"

import { Users, Plus, Shield, ArrowRight, Settings } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function UserTeamsPage() {
  const teams = [
    { id: "team-1", name: "TWOEM Engineering", role: "Owner", members: 12, apps: 12 },
    { id: "team-2", name: "Personal Workspace", role: "Solo", members: 1, apps: 2 },
  ]

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-headline font-bold">My Organizations</h1>
          <p className="text-muted-foreground">Manage your workspace clusters and team members.</p>
        </div>
        <Button className="rounded-full shadow-lg"><Plus className="mr-2 h-4 w-4" /> New Team</Button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {teams.map((team) => (
          <Card key={team.id} className="border-2 hover:border-primary transition-all group overflow-hidden">
            <CardHeader className="bg-muted/30 border-b">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border group-hover:border-primary transition-colors">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded-full border border-primary/20">{team.role}</span>
              </div>
              <CardTitle className="text-2xl mt-4 font-headline">{team.name}</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted/20 rounded-xl border border-dashed">
                  <p className="text-xs text-muted-foreground font-bold uppercase">Members</p>
                  <p className="text-2xl font-bold">{team.members}</p>
                </div>
                <div className="p-4 bg-muted/20 rounded-xl border border-dashed">
                  <p className="text-xs text-muted-foreground font-bold uppercase">Active Apps</p>
                  <p className="text-2xl font-bold">{team.apps}</p>
                </div>
              </div>
            </CardContent>
            <div className="flex border-t divide-x">
              <Button variant="ghost" className="flex-1 rounded-none h-12 gap-2" asChild>
                <Link href="/dashboard"><ArrowRight className="h-4 w-4" /> Switch to Team</Link>
              </Button>
              <Button variant="ghost" className="flex-1 rounded-none h-12 gap-2" asChild>
                <Link href={`/dashboard/team/${team.id}/settings`}><Settings className="h-4 w-4" /> Settings</Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
