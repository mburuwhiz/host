
import { Badge } from "@/components/ui/badge"
import { Zap, GitCommit, Rocket } from "lucide-react"

export default function ChangelogDocs() {
  const updates = [
    { date: "March 20, 2024", version: "v2.10.0", title: "Edge Router Upgrade", desc: "Traefik engine upgraded to v3.0 for better SSL termination speed." },
    { date: "March 15, 2024", version: "v2.9.4", title: "Smart-Detection V2", desc: "Improved detection for Monorepo structures and Go modules." },
    { date: "March 01, 2024", version: "v2.9.0", title: "NVMe Partition Expansion", desc: "Global cluster storage expanded by 2.5TB with dedicated I/O lanes." }
  ]

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        <h1 className="text-4xl font-headline font-bold">Platform Changelog</h1>
        <p className="text-lg text-muted-foreground">The latest updates, fixes, and engine improvements.</p>
      </div>

      <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-muted">
        {updates.map((upd, i) => (
            <div key={i} className="relative pl-12">
                <div className="absolute left-0 top-1 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center border-2 border-primary z-10 bg-background">
                    <GitCommit className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-2">
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-bold text-muted-foreground">{upd.date}</span>
                        <Badge variant="outline">{upd.version}</Badge>
                    </div>
                    <h3 className="text-xl font-bold font-headline">{upd.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{upd.desc}</p>
                </div>
            </div>
        ))}
      </div>
    </div>
  )
}
