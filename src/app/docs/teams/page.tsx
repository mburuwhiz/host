
"use client"

import { Shield, Users, Lock, Key } from "lucide-react"

export default function DocsTeams() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        <h1 className="text-4xl font-headline font-bold">Teams & RBAC</h1>
        <p className="text-lg text-muted-foreground">Manage organization access with Role-Based Access Control.</p>
      </div>

      <div className="grid gap-6">
        {[
          { role: "Owner", desc: "Full administrative access. Can manage billing, team deletion, and all applications.", icon: Shield, color: "text-primary" },
          { role: "Developer", desc: "Can create, modify, and deploy applications. No access to billing or team settings.", icon: Users, color: "text-secondary" },
          { role: "Viewer", desc: "Read-only access to metrics, logs, and overview pages. Cannot trigger deployments.", icon: Lock, color: "text-muted-foreground" },
        ].map((item, i) => (
          <div key={i} className="p-8 border-2 rounded-3xl flex gap-6 items-start hover:border-primary transition-all">
            <div className={`w-12 h-12 bg-muted rounded-2xl flex items-center justify-center shrink-0`}>
              <item.icon className={`h-6 w-6 ${item.color}`} />
            </div>
            <div>
              <h3 className="text-xl font-bold font-headline mb-2">{item.role}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-primary/5 p-8 rounded-[2.5rem] border border-primary/20 space-y-4">
        <Key className="h-8 w-8 text-primary" />
        <h4 className="font-bold text-lg">Personal Access Tokens</h4>
        <p className="text-sm text-muted-foreground">Tokens inherit the role of the user who created them. Use them to authenticate with the TWOEM CLI in CI/CD pipelines.</p>
      </div>
    </div>
  )
}
