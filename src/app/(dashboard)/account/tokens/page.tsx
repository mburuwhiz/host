
"use client"

import { Key, Plus, Copy, Trash2, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

export default function ApiTokensPage() {
  const { toast } = useToast()
  
  const tokens = [
    { name: "CI/CD Pipeline", prefix: "twoem_...", lastUsed: "2h ago", created: "Jan 12, 2024" },
    { name: "Local CLI", prefix: "twoem_...", lastUsed: "Just now", created: "Feb 01, 2024" }
  ]

  const handleCopy = () => {
    toast({
      title: "Token Copied",
      description: "Keep this secret! It grants full access to your account via CLI.",
    })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-headline font-bold">Personal Access Tokens</h1>
          <p className="text-muted-foreground">Authenticate with the TWOEM CLI or REST API.</p>
        </div>
        <Button className="rounded-full">
          <Plus className="mr-2 h-4 w-4" /> Generate New Token
        </Button>
      </div>

      <div className="grid gap-4">
        {tokens.map((token, i) => (
            <Card key={i} className="border-2">
                <CardContent className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                            <Key className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">{token.name}</h3>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                                <span className="font-mono bg-muted px-2 py-0.5 rounded">{token.prefix}</span>
                                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Created {token.created}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-[10px] text-muted-foreground font-bold uppercase">Last Active</p>
                            <Badge variant="outline" className="mt-1">{token.lastUsed}</Badge>
                        </div>
                        <div className="flex gap-1">
                             <Button variant="ghost" size="icon" onClick={handleCopy}><Copy className="h-4 w-4" /></Button>
                             <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  )
}
