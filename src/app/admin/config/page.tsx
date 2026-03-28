
"use client"

import { Settings, Shield, Zap, Globe, Cpu, Database, Save, RefreshCw, Key, Lock, AlertTriangle, CloudRain } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function AdminPlatformConfig() {
  const { toast } = useToast()

  const saveConfig = () => {
    toast({
      title: "Global Config Propagated",
      description: "Platform parameters updated across all physical nodes via Master Signal.",
    })
  }

  return (
    <div className="space-y-10 max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-headline font-bold text-zinc-900">Platform Governance</h1>
          <p className="text-muted-foreground mt-2">Fine-tune the TWOEM engine orchestration parameters and global rate limits.</p>
        </div>
        <div className="flex gap-3">
            <Button variant="outline" className="rounded-full px-6 h-12 border-2 font-bold text-zinc-600">
                <RefreshCw className="mr-2 h-4 w-4" /> Hard Restart Orchestrator
            </Button>
            <Button onClick={saveConfig} className="bg-primary hover:bg-primary/90 h-12 px-10 rounded-full shadow-2xl shadow-primary/30 font-bold text-lg">
                <Save className="mr-2 h-5 w-5" /> Commit Platform Changes
            </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="border-2 shadow-xl overflow-hidden rounded-[2.5rem]">
          <CardHeader className="bg-muted/20 border-b p-8">
            <CardTitle className="text-xl flex items-center gap-3 font-headline">
                <div className="p-2 bg-red-100 rounded-xl"><Zap className="h-5 w-5 text-red-600" /></div>
                Build Orchestration
            </CardTitle>
            <CardDescription className="mt-1">Control global build behavior and dynamic queue logic.</CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            <div className="flex items-center justify-between p-4 bg-red-50/50 rounded-2xl border border-red-100">
              <div className="space-y-0.5">
                <Label className="text-sm font-bold text-red-900 uppercase tracking-widest text-[10px]">Auto-Scaling Builder Pool</Label>
                <p className="text-xs text-red-700/70">Spin up new ephemeral build nodes during peak traffic.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="space-y-2">
              <Label className="font-bold text-xs uppercase text-muted-foreground">Max Concurrent Builds / Node</Label>
              <Input type="number" defaultValue={8} className="h-12 rounded-xl border-2 font-mono" />
            </div>
            <div className="space-y-2">
              <Label className="font-bold text-xs uppercase text-muted-foreground">Global Build Timeout (Minutes)</Label>
              <div className="flex gap-3">
                <Input type="number" defaultValue={15} className="h-12 rounded-xl border-2 font-mono" />
                <Badge variant="outline" className="flex-shrink-0 bg-white">STRICT</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-xl overflow-hidden rounded-[2.5rem]">
          <CardHeader className="bg-muted/20 border-b p-8">
            <CardTitle className="text-xl flex items-center gap-3 font-headline">
                <div className="p-2 bg-blue-100 rounded-xl"><Globe className="h-5 w-5 text-blue-600" /></div>
                Edge Networking
            </CardTitle>
            <CardDescription className="mt-1">Manage global Traefik, HSTS, and SSL parameters.</CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            <div className="flex items-center justify-between p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
              <div className="space-y-0.5">
                <Label className="text-sm font-bold text-blue-900 uppercase tracking-widest text-[10px]">HSTS Header Enforcement</Label>
                <p className="text-xs text-blue-700/70">Force high-security HTTPS for all platform routes.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="space-y-4">
              <Label className="font-bold text-xs uppercase text-muted-foreground">Dynamic SSL Renewal Interval</Label>
              <div className="p-4 bg-muted/30 rounded-xl border-2 border-dashed flex justify-between items-center">
                <span className="font-bold text-lg">90 Days</span>
                <Badge className="bg-emerald-500">OPTIMAL</Badge>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4">
                <div className="space-y-0.5">
                    <Label className="font-bold text-xs uppercase text-muted-foreground">Let&apos;s Encrypt Staging</Label>
                    <p className="text-[10px] text-muted-foreground">Use development staging for cert generation.</p>
                </div>
                <Switch />
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 border-2 shadow-2xl overflow-hidden rounded-[2.5rem] border-primary/20">
          <CardHeader className="bg-primary/5 border-b p-10 flex flex-row items-center justify-between">
            <div>
                <CardTitle className="text-2xl flex items-center gap-3 font-headline text-primary">
                    <Shield className="h-6 w-6" /> Security L5 Toggles
                </CardTitle>
                <CardDescription>Mission-critical platform protection settings.</CardDescription>
            </div>
            <Badge className="bg-primary px-6 py-1.5 font-bold tracking-[0.2em] shadow-lg shadow-primary/20">OPERATOR LVL 10</Badge>
          </CardHeader>
          <CardContent className="p-10">
            <div className="grid md:grid-cols-3 gap-12">
               <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <Label className="font-bold text-sm text-zinc-900">Forced MFA</Label>
                    <Switch defaultChecked />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">Require Multi-Factor Authentication for all account operators and developers.</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <Label className="font-bold text-sm text-zinc-900">Impersonation Mode</Label>
                    <Switch />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">Allows SuperAdmins to view tenant dashboards for debugging purposes.</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <Label className="font-bold text-sm text-zinc-900">Console Proxy Audit</Label>
                    <Switch defaultChecked />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">Record all SSH/Web-Terminal activity to the global audit stream.</p>
              </div>
            </div>

            <div className="mt-12 p-6 bg-orange-50 border-2 border-orange-100 rounded-3xl flex items-start gap-6">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg shrink-0">
                    <AlertTriangle className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                    <p className="font-bold text-orange-900">Hazardous Configuration Warning</p>
                    <p className="text-sm text-orange-800/70 leading-relaxed mt-1">
                        Any changes committed to this section will trigger a global state propagation. 
                        Active builds may be paused and Traefik dynamic routes will be re-initialized. 
                        <strong>Proceed with extreme caution.</strong>
                    </p>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
