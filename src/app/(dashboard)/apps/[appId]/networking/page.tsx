
"use client"

import { Globe, ShieldCheck, Plus, ExternalLink, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AppNetworkingPage() {
  const domains = [
    { host: "storefront.twoem.app", type: "System", ssl: "Active", status: "Healthy" },
    { host: "shop.my-brand.com", type: "Custom", ssl: "Active", status: "Healthy" },
  ]

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
            <h2 className="text-2xl font-headline font-bold">Network & Domains</h2>
            <p className="text-muted-foreground">Manage your custom domains and dynamic SSL termination.</p>
        </div>
        <Button className="rounded-full">
            <Plus className="mr-2 h-4 w-4" /> Add Custom Domain
        </Button>
      </div>

      <div className="grid gap-6">
        {domains.map((domain, i) => (
            <Card key={i} className="border-2">
                <CardContent className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                            <Globe className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="font-bold text-lg">{domain.host}</h3>
                                <Badge variant="outline" className="text-[10px]">{domain.type}</Badge>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                                <span className="flex items-center gap-1"><ShieldCheck className="h-3 w-3 text-emerald-500" /> SSL {domain.ssl}</span>
                                <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> {domain.status}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <Button variant="outline" size="sm" className="flex-1 md:flex-none">
                            <RefreshCw className="mr-2 h-3 w-3" /> Reverify
                        </Button>
                        <Button size="sm" className="flex-1 md:flex-none" variant="ghost">
                            <ExternalLink className="mr-2 h-3 w-3" /> Visit
                        </Button>
                    </div>
                </CardContent>
            </Card>
        ))}
      </div>

      <Card className="bg-muted/30 border-dashed border-2">
        <CardHeader>
            <CardTitle className="text-lg">DNS Instructions</CardTitle>
            <CardDescription>Point your custom domain to our global edge router using the following records.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4 font-mono text-sm">
                <div className="p-4 bg-background rounded-lg border">
                    <p className="text-[10px] text-muted-foreground mb-1 uppercase">Record Type</p>
                    <p className="font-bold">CNAME</p>
                </div>
                <div className="p-4 bg-background rounded-lg border">
                    <p className="text-[10px] text-muted-foreground mb-1 uppercase">Host</p>
                    <p className="font-bold">@</p>
                </div>
                <div className="p-4 bg-background rounded-lg border">
                    <p className="text-[10px] text-muted-foreground mb-1 uppercase">Value</p>
                    <p className="font-bold">ingress.twoem.app</p>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  )
}
