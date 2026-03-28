
"use client"

import { HardDrive, Plus, Database, Info, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AppStoragePage({ params }: { params: { appId: string } }) {
  const volumes = [
    { name: "mysql-data", mount: "/var/lib/mysql", size: "10GB", type: "NVMe SSD" },
    { name: "upload-assets", mount: "/app/public/uploads", size: "250GB", type: "Shared Block" }
  ]

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
            <h2 className="text-2xl font-headline font-bold">Persistent Volumes</h2>
            <p className="text-muted-foreground">Manage dedicated storage mounts for your application.</p>
        </div>
        <Button className="rounded-full">
            <Plus className="mr-2 h-4 w-4" /> Create Volume
        </Button>
      </div>

      <Alert className="bg-secondary/10 border-secondary/20">
        <Info className="h-4 w-4 text-secondary" />
        <AlertTitle>Cluster Quota</AlertTitle>
        <AlertDescription>
          Your organization has <strong>1.1TB</strong> remaining of the <strong>2.5TB</strong> allocated partition.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6">
        {volumes.map((vol, i) => (
            <Card key={i} className="border-2 hover:border-primary/50 transition-all">
                <CardContent className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                            <Database className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="font-bold text-lg">{vol.name}</h3>
                                <Badge variant="secondary" className="text-[10px]">{vol.type}</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground font-mono mt-1">Mount: {vol.mount}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-8">
                        <div className="text-right">
                            <p className="text-[10px] text-muted-foreground font-bold uppercase">Reserved</p>
                            <p className="font-bold text-lg">{vol.size}</p>
                        </div>
                        <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  )
}
