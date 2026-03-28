import Link from "next/link"
import { ArrowRight, CheckCircle2, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function GettingStartedDocs() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        <h1 className="text-4xl font-headline font-bold">Getting Started</h1>
        <p className="text-lg text-muted-foreground">
          Deploy your first application on TWOEM in under 60 seconds.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-headline font-bold">1. Connect Your Repository</h2>
        <p className="text-muted-foreground leading-relaxed">
          Navigate to your dashboard and click "New Application". Enter your Git URL (GitHub, GitLab, or Bitbucket).
        </p>
        <div className="bg-muted p-6 rounded-xl border border-dashed text-sm font-mono text-primary">
          https://github.com/your-username/your-project.git
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-headline font-bold">2. AI Analysis</h2>
        <p className="text-muted-foreground leading-relaxed">
          Our smart-detection engine will analyze your manifest files (package.json, requirements.txt, etc.) and suggest the best configuration.
        </p>
        <div className="space-y-2">
          {[
            "Auto-detected Next.js Framework",
            "Build command: npm install && npm run build",
            "Start command: npm start"
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-sm">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-headline font-bold">3. Launch</h2>
        <p className="text-muted-foreground leading-relaxed">
          Review your resource allocation and click "Launch". Your application will be live with a system URL and SSL enabled instantly.
        </p>
      </section>

      <div className="pt-12 border-t flex justify-between items-center">
        <Button variant="ghost" disabled>Previous: Intro</Button>
        <Button asChild className="rounded-full px-6">
          <Link href="/docs/deployment">
            Next: Deployment Guides <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
