
"use client"

import { Key, Plus, Copy, Trash2, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { getUserTokens, createApiToken, revokeApiToken } from "@/lib/actions/tokens"

export default function ApiTokensPage() {
  const { toast } = useToast()
  const { data: session } = useSession()
  const [tokens, setTokens] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
      if (session?.user?.id) {
          fetchTokens()
      } else {
          setLoading(false)
      }
  }, [session])

  const fetchTokens = async () => {
      if (!session?.user?.id) return
      setLoading(true)
      const data = await getUserTokens(session.user.id)
      setTokens(data)
      setLoading(false)
  }

  const handleGenerate = async () => {
      if (!session?.user?.id) return
      const name = prompt("Enter a name for the new API Token (e.g. CI/CD Pipeline):")
      if (!name) return

      const res = await createApiToken(session.user.id, name)
      if (res.success) {
          toast({
              title: "Token Generated",
              description: `Save this token now, it will not be shown again: ${res.token}`,
              duration: 10000,
          })
          fetchTokens()
      } else {
          toast({ variant: "destructive", title: "Error", description: res.error })
      }
  }

  const handleRevoke = async (id: string) => {
      if (!confirm("Are you sure you want to revoke this token?")) return
      const res = await revokeApiToken(id)
      if (res.success) {
          toast({ title: "Token Revoked" })
          fetchTokens()
      }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-headline font-bold">Personal Access Tokens</h1>
          <p className="text-muted-foreground">Authenticate with the TWOEM CLI or REST API.</p>
        </div>
        <Button className="rounded-full" onClick={handleGenerate}>
          <Plus className="mr-2 h-4 w-4" /> Generate New Token
        </Button>
      </div>

      <div className="grid gap-4">
        {loading ? (
            <div className="p-8 text-center text-muted-foreground border-2 border-dashed rounded-2xl">
                Loading...
            </div>
        ) : tokens.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground border-2 border-dashed rounded-2xl">
                No active tokens
            </div>
        ) : (
            tokens.map((token, i) => (
                <Card key={token.id} className="border-2">
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
                                 <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleRevoke(token.id)}><Trash2 className="h-4 w-4" /></Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))
        )}
      </div>
    </div>
  )
}
