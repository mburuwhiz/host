"use client"

import Link from "next/link"
import { ExternalLink, GitBranch, MoreVertical, Play, Plus, RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { getAppsForTeam } from "@/lib/actions/app"

export default function DashboardPage() {
  const [apps, setApps] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { data: session } = useSession()

  useEffect(() => {
    if (session?.user?.id) {
        setLoading(false) // Assuming no apps immediately for the new user. Fetch logic handles teams differently.
    }
  }, [session])

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
            <h1 className="text-3xl font-headline font-bold">My Applications</h1>
            <p className="text-muted-foreground">Managing your apps</p>
        </div>
        <Button size="lg" className="rounded-full shadow-lg shadow-primary/20" asChild>
            <Link href="/dashboard/create-app">
                <Plus className="mr-2 h-5 w-5" />
                New Application
            </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? (
            <div className="col-span-full p-8 text-center text-muted-foreground border-2 border-dashed rounded-2xl">
                Loading applications...
            </div>
        ) : apps.length === 0 ? (
            <div className="col-span-full p-8 text-center text-muted-foreground border-2 border-dashed rounded-2xl">
                No applications found. Click "New Application" to get started.
            </div>
        ) : apps.map((app) => (
          <Card key={app.id} className="group overflow-hidden border-2 transition-all hover:border-primary/50 hover:shadow-xl">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                    <CardTitle className="text-xl font-headline group-hover:text-primary transition-colors cursor-pointer">
                        <Link href={`/apps/${app.id}/overview`}>{app.name}</Link>
                    </CardTitle>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                        <GitBranch className="h-3 w-3" />
                        {app.branch} @ {app.commit}
                    </div>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild><Link href={`/apps/${app.id}/settings`}>Edit Config</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href={`/apps/${app.id}/deployments`}>View History</Link></DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete App</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className={cn(
                            "w-2.5 h-2.5 rounded-full animate-pulse",
                            app.status === 'running' ? "bg-primary" : app.status === 'building' ? "bg-secondary" : "bg-destructive"
                        )} />
                        <span className="text-sm font-medium capitalize">{app.status}</span>
                    </div>
                    <Badge variant="secondary" className="font-mono text-[10px]">{app.url}</Badge>
                </div>
                <div className="flex items-center gap-4 py-2 border-y border-muted text-xs">
                    <div className="flex-1">
                        <p className="text-muted-foreground">Last Deployed</p>
                        <p className="font-semibold">{app.lastDeployed}</p>
                    </div>
                    <div className="flex-1">
                        <p className="text-muted-foreground">Resources</p>
                        <p className="font-semibold">0.5 vCPU / 1GB</p>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="bg-muted/30 pt-4 flex gap-2">
                <Button size="sm" className="flex-1 gap-2 rounded-lg" asChild>
                    <Link href={`/apps/${app.id}/overview`}>
                        <Play className="h-3 w-3" /> Dashboard
                    </Link>
                </Button>
                <Button size="sm" variant="outline" className="flex-1 gap-2 rounded-lg" asChild>
                    <Link href={`https://${app.url}`} target="_blank">
                        <ExternalLink className="h-3 w-3" /> Open
                    </Link>
                </Button>
            </CardFooter>
          </Card>
        ))}
        <Link href="/dashboard/create-app" className="group border-2 border-dashed border-muted rounded-2xl flex flex-col items-center justify-center p-8 gap-4 hover:border-primary/50 hover:bg-primary/5 transition-all text-muted-foreground hover:text-primary min-h-[280px]">
            <div className="w-16 h-16 bg-muted group-hover:bg-primary/20 rounded-full flex items-center justify-center transition-colors">
                <Plus className="w-8 h-8" />
            </div>
            <div className="text-center">
                <p className="font-headline font-bold text-lg">Add New Project</p>
                <p className="text-sm">Connect a repository and deploy in seconds</p>
            </div>
        </Link>
      </div>
    </div>
  )
}
