
"use client"

import { Lock, Plus, Save, Trash2, Shield, Eye, EyeOff, Key } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"

export default function AppEnvironmentPage() {
  const { toast } = useToast()
  const [vars, setVars] = useState([
    { key: "DATABASE_URL", value: "postgres://u:p@node-04:5432/db", secret: true },
    { key: "API_KEY", value: "sk_test_51MzA99LzX12456", secret: true },
    { key: "NODE_ENV", value: "production", secret: false },
    { key: "STRIPE_SECRET", value: "whsec_991f2c3b4d5e", secret: true },
  ])
  const [revealedIndex, setRevealedIndex] = useState<number | null>(null)

  const handleSave = () => {
    toast({
      title: "Cluster Synced",
      description: "Environment propagated to all active pods. Services restarting gracefully.",
    })
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="space-y-1">
            <h2 className="text-3xl font-headline font-bold">Configuration Secrets</h2>
            <p className="text-muted-foreground">Manage environment variables and runtime secrets with Triple-Save encryption.</p>
        </div>
        <Button className="rounded-full px-8 h-12 shadow-lg font-bold">
            <Plus className="mr-2 h-4 w-4" /> Add Variable
        </Button>
      </div>

      <Card className="border-2 overflow-hidden shadow-2xl rounded-[2rem]">
        <CardHeader className="bg-muted/30 border-b p-8">
            <div className="flex justify-between items-center">
                <div>
                    <CardTitle className="text-xl font-headline">Configured Key-Value Pairs</CardTitle>
                    <CardDescription className="mt-1">Sensitive data is masked. Hover or focus to reveal content.</CardDescription>
                </div>
                <Badge variant="outline" className="bg-white px-4 py-1 font-bold text-[10px] uppercase tracking-widest border-2">
                    {vars.length} Variables Active
                </Badge>
            </div>
        </CardHeader>
        <CardContent className="p-0">
            <div className="divide-y-2 border-b-2">
                {vars.map((v, i) => (
                    <div key={i} className="flex flex-col md:flex-row items-center gap-6 p-6 hover:bg-muted/10 transition-colors">
                        <div className="w-full md:w-1/3 flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <Key className="h-4 w-4 text-primary" />
                            </div>
                            <span className="font-mono text-sm font-bold tracking-tight">{v.key}</span>
                        </div>
                        <div className="w-full md:flex-1 relative group">
                            <Input 
                                type={revealedIndex === i ? "text" : "password"}
                                value={v.value} 
                                onFocus={() => setRevealedIndex(i)}
                                onBlur={() => setRevealedIndex(null)}
                                readOnly 
                                className="font-mono text-xs bg-white border-2 border-transparent group-hover:border-primary/20 transition-all rounded-xl h-11 pr-10" 
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground opacity-30">
                                {revealedIndex === i ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            {v.secret && (
                                <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-bold uppercase tracking-widest">
                                    <Lock className="h-3 w-3" /> Secure
                                </div>
                            )}
                            <Button variant="ghost" size="icon" className="h-10 w-10 text-destructive hover:bg-destructive/10 rounded-xl">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </CardContent>
        <CardFooter className="bg-muted/30 p-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border-2 border-primary/10">
                <Shield className="h-8 w-8 text-primary opacity-30" />
                <div>
                    <p className="text-xs font-bold text-primary uppercase tracking-widest">Encryption Level 5</p>
                    <p className="text-[10px] text-muted-foreground">Argon2id salted with cluster master-key. Encrypted at rest & in transit.</p>
                </div>
            </div>
            <Button size="lg" onClick={handleSave} className="rounded-full px-10 h-14 text-lg font-headline shadow-xl shadow-primary/20 group">
                <Save className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" /> Triple-Save Changes
            </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
