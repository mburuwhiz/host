
"use client"

import { Search, Rocket, Users, Book, ArrowRight } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function GlobalSearchPage() {
  const [query, setQuery] = useState("")

  const results: any[] = [] // TODO: Fetch from database

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-headline font-bold">Global Platform Search</h1>
        <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-primary" />
            <Input 
                placeholder="Find apps, team members, deployments, or technical guides..." 
                className="h-16 pl-14 text-lg rounded-2xl shadow-xl border-2 focus-visible:ring-primary"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Recent & Suggested Results</h3>
        <div className="grid gap-4">
            {results.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground border-2 border-dashed rounded-2xl">
                    No results found
                </div>
            ) : (
                results.map((res, i) => (
                    <Link key={i} href={res.href}>
                        <Card className="border-2 hover:border-primary transition-all group overflow-hidden">
                            <CardContent className="p-4 flex items-center gap-6">
                                <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                    <res.icon className="h-6 w-6 text-muted-foreground group-hover:text-primary" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Badge variant="outline" className="text-[10px]">{res.type}</Badge>
                                        <h4 className="font-bold text-lg">{res.name}</h4>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{res.desc}</p>
                                </div>
                                <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                            </CardContent>
                        </Card>
                    </Link>
                ))
            )}
        </div>
      </div>

      <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10 text-center">
        <p className="text-sm text-primary font-medium">Pro Tip: Use <kbd className="px-2 py-1 bg-white border rounded mx-1">⌘ + K</kbd> to open search anywhere in the dashboard.</p>
      </div>
    </div>
  )
}
