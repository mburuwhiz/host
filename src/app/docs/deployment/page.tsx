
import { CheckCircle2, Code, Terminal } from "lucide-react"

export default function DeploymentDocs() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        <h1 className="text-4xl font-headline font-bold">Language-Specific Guides</h1>
        <p className="text-lg text-muted-foreground">Optimizing your builds for TWOEM's Ubuntu-backed nodes.</p>
      </div>

      <div className="grid gap-8">
        {[
            { lang: "Next.js", cmd: "npm run build", notes: "Ensure 'output: standalone' is set in next.config.js for optimal container size." },
            { lang: "Python", cmd: "pip install -r requirements.txt", notes: "TWOEM supports WSGI and ASGI entry points automatically." },
            { lang: "Go", cmd: "go build -o app", notes: "Multi-stage builds are recommended for Go binaries." }
        ].map((guide, i) => (
            <section key={i} className="p-8 border-2 rounded-2xl bg-card space-y-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Code className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-headline font-bold">{guide.lang} Deployment</h2>
                </div>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm border">
                    $ {guide.cmd}
                </div>
                <p className="text-sm text-muted-foreground italic">{guide.notes}</p>
            </section>
        ))}
      </div>
    </div>
  )
}
