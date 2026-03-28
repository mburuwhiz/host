
"use client"

import { Cpu, Zap, Activity, Info, Save, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function AppResourcesPage() {
  const { toast } = useToast()
  const [ram, setRam] = useState([1024])
  const [cpu, setCpu] = useState([0.5])
  const [replicas, setReplicas] = useState([1])

  const handleUpdate = () => {
    toast({
      title: "Resources Allocated",
      description: "Propagating container configuration to the master node.",
    })
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex justify-between items-end">
        <div>
            <h2 className="text-2xl font-headline font-bold">Vertical & Horizontal Scaling</h2>
            <p className="text-muted-foreground">Adjust isolation limits and replica counts for your application.</p>
        </div>
        <Button size="lg" className="rounded-full shadow-lg" onClick={handleUpdate}>
            <Save className="mr-2 h-4 w-4" /> Propagate Scaling
        </Button>
      </div>

      <Alert className="bg-secondary/10 border-secondary/20">
        <Info className="h-4 w-4 text-secondary" />
        <AlertTitle>Resource Guarantee</AlertTitle>
        <AlertDescription>
          These limits are enforced via cgroups. Your application is guaranteed these resources even during peak cluster load.
        </AlertDescription>
      </Alert>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="border-2">
            <CardHeader className="bg-muted/30 border-b">
                <CardTitle className="text-lg flex items-center gap-2"><Activity className="h-5 w-5" /> Vertical Scaling (RAM)</CardTitle>
                <CardDescription>Dedicated memory partition for this instance.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-10">
                <div className="flex justify-between items-center">
                    <span className="text-3xl font-headline font-bold text-primary">{ram[0]} MB</span>
                    <Badge variant="outline">Tier: Standard</Badge>
                </div>
                <Slider 
                    value={ram} 
                    onValueChange={setRam} 
                    max={8192} 
                    min={256} 
                    step={256} 
                />
                <div className="flex justify-between text-xs font-bold text-muted-foreground">
                    <span>256MB</span>
                    <span>8192MB (8GB)</span>
                </div>
            </CardContent>
        </Card>

        <Card className="border-2">
            <CardHeader className="bg-muted/30 border-b">
                <CardTitle className="text-lg flex items-center gap-2"><Cpu className="h-5 w-5" /> Execution Priority (vCPU)</CardTitle>
                <CardDescription>Logical core allocation for compute tasks.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-10">
                <div className="flex justify-between items-center">
                    <span className="text-3xl font-headline font-bold text-secondary">{cpu[0]} vCPU</span>
                    <Badge variant="outline">Isolated Core</Badge>
                </div>
                <Slider 
                    value={cpu} 
                    onValueChange={setCpu} 
                    max={4} 
                    min={0.1} 
                    step={0.1} 
                />
                <div className="flex justify-between text-xs font-bold text-muted-foreground">
                    <span>0.1 vCPU</span>
                    <span>4.0 vCPU</span>
                </div>
            </CardContent>
        </Card>

        <Card className="lg:col-span-2 border-2 border-emerald-500/20 bg-emerald-50/10">
            <CardHeader className="bg-emerald-500/5 border-b border-emerald-500/10">
                <CardTitle className="text-lg flex items-center gap-2"><Layers className="h-5 w-5 text-emerald-600" /> Horizontal Scaling (Replicas)</CardTitle>
                <CardDescription>Number of identical container instances behind the Traefik router.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-10">
                <div className="flex justify-between items-center">
                    <span className="text-3xl font-headline font-bold text-emerald-600">{replicas[0]} Instances</span>
                    <div className="text-right">
                        <p className="text-xs font-bold uppercase text-muted-foreground">Availability</p>
                        <p className="text-sm font-bold text-emerald-600">High Availability (Multi-Node)</p>
                    </div>
                </div>
                <Slider 
                    value={replicas} 
                    onValueChange={setReplicas} 
                    max={10} 
                    min={1} 
                    step={1} 
                />
                <div className="flex justify-between text-xs font-bold text-muted-foreground">
                    <span>1 (Solo)</span>
                    <span>10 (Enterprise Cluster)</span>
                </div>
            </CardContent>
            <CardFooter className="bg-emerald-500/5 border-t border-emerald-500/10 p-4">
                <p className="text-xs italic text-muted-foreground">Scaling to multiple replicas will automatically distribute traffic via Traefik round-robin.</p>
            </CardFooter>
        </Card>
      </div>
    </div>
  )
}

import { Badge } from "@/components/ui/badge"
