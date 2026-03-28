
import { Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DocsPage() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold bg-primary/10 text-primary">
            Documentation Hub
        </div>
        <h1 className="text-5xl font-headline font-bold">Master the TWOEM Engine</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
            Welcome to the official documentation for the TWOEM ONLINE PRODUCTIONS orchestration platform. 
            From atomic deployments to persistent NVMe storage management, we've got you covered.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {[
            { title: "Quickstart", desc: "Deploy your first app in under 60 seconds using our smart-detection engine.", href: "/docs/getting-started" },
            { title: "Runtime Overrides", desc: "Learn how to customize build commands, root directories, and Dockerfile logic.", href: "/docs/configuration" },
            { title: "Team Collaboration", desc: "Manage members, roles, and resource quotas for enterprise teams.", href: "/docs/teams" },
            { title: "API Reference", desc: "Integrate TWOEM directly into your CI/CD pipeline via our REST API.", href: "/docs/api" }
        ].map((box, i) => (
            <Link key={i} href={box.href} className="group p-8 border-2 rounded-2xl hover:border-primary transition-all bg-card hover:shadow-xl">
                <h3 className="text-xl font-bold font-headline mb-2 group-hover:text-primary transition-colors">{box.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{box.desc}</p>
            </Link>
        ))}
      </div>

      <div className="bg-muted rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 border">
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shrink-0">
            <Rocket className="text-white h-8 w-8" />
        </div>
        <div className="flex-1 text-center md:text-left">
            <h4 className="font-bold text-lg">Ready to launch?</h4>
            <p className="text-muted-foreground text-sm">Jump straight into our getting started guide and see the power of TWOEM.</p>
        </div>
        <Button className="rounded-full px-8" asChild>
            <Link href="/docs/getting-started">Getting Started Guide</Link>
        </Button>
      </div>
    </div>
  )
}
