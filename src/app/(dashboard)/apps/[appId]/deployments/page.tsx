"use client"

import { Clock, CheckCircle2, XCircle, GitCommit, ChevronRight, Play } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function AppDeploymentsPage({ params }: { params: { appId: string } }) {
  const deployments = [
    { id: "dep_88x2", commit: "4f2a1b3", msg: "feat: add analytics wrapper", status: "Success", time: "2 hours ago", duration: "1m 45s" },
    { id: "dep_11c9", commit: "99a2b11", msg: "fix: mobile responsiveness", status: "Success", time: "1 day ago", duration: "1m 12s" },
    { id: "dep_cc01", commit: "f2c1b33", msg: "build: optimize production assets", status: "Failed", time: "2 days ago", duration: "0m 45s" },
    { id: "dep_99f2", commit: "882bc12", msg: "initial: engine bootstrap", status: "Success", time: "1 week ago", duration: "2m 30s" },
  ]

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-headline font-bold">Deployment History</h2>
          <p className="text-muted-foreground">Audit trail of all build operations for this application.</p>
        </div>
        <Button className="rounded-full px-6">
          <Play className="mr-2 h-4 w-4" /> Trigger Manual Build
        </Button>
      </div>

      <div className="space-y-4">
        {deployments.map((dep) => (
          <Card key={dep.id} className="border-2 hover:border-primary/50 transition-all group overflow-hidden">
            <CardContent className="p-0">
              <Link href={`/apps/${params.appId}/deployments/${dep.id}`} className="flex items-center gap-6 p-6">
                <div className="flex flex-col items-center gap-1">
                  {dep.status === "Success" ? (
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  ) : (
                    <XCircle className="h-6 w-6 text-destructive" />
                  )}
                  <span className="text-[10px] font-bold uppercase tracking-widest">{dep.status}</span>
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-lg">{dep.msg}</h4>
                    <Badge variant="outline" className="font-mono text-[10px]">{dep.id}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1 font-mono"><GitCommit className="h-3 w-3" /> {dep.commit}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {dep.time}</span>
                    <span className="font-medium">Build time: {dep.duration}</span>
                  </div>
                </div>

                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
