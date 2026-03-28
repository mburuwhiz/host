
import { CheckCircle2, Cpu, Globe, Rocket, Shield, Zap, Database, GitBranch, Terminal } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function FeaturesPage() {
  const features = [
    {
      title: "Atomic Deploys",
      description: "Our blue-green deployment strategy ensures your application is swapped only after health checks pass. Zero downtime, zero stress.",
      icon: Zap,
      color: "text-primary"
    },
    {
      title: "2.5TB NVMe Infrastructure",
      description: "Massive storage partition dedicated to persistent volumes. High-speed I/O for database heavy applications.",
      icon: Database,
      color: "text-secondary"
    },
    {
      title: "Intelligent Edge Routing",
      description: "Dynamic SSL termination and traffic management via Traefik. Your custom domains are ready in seconds.",
      icon: Globe,
      color: "text-emerald-500"
    },
    {
      title: "Isolated Resource Pools",
      description: "Every container runs in a strictly limited cgroup. CPU and RAM guarantees ensure your app always has what it needs.",
      icon: Cpu,
      color: "text-orange-500"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mb-16 space-y-4">
          <h1 className="text-5xl font-headline font-bold">Platform Capabilities</h1>
          <p className="text-xl text-muted-foreground">Deep dive into the architecture that powers TWOEM ONLINE PRODUCTIONS.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-24">
          {features.map((f, i) => (
            <Card key={i} className="border-2 hover:border-primary/50 transition-all group">
              <CardHeader>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-muted group-hover:bg-primary/10 transition-colors`}>
                  <f.icon className={`h-6 w-6 ${f.color}`} />
                </div>
                <CardTitle className="text-2xl font-headline">{f.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{f.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <section className="bg-primary/5 rounded-[2rem] p-12 border border-primary/10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-headline font-bold">The TWOEM Engine</h2>
              <div className="space-y-4">
                {[
                  "Dynamic Traefik Configuration",
                  "Docker SDK Orchestration",
                  "Let's Encrypt Auto-SSL",
                  "Persistent Block Storage",
                  "RBAC Team Management",
                  "Real-time Build Streaming"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-black rounded-xl p-6 font-mono text-sm text-emerald-400 shadow-2xl overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />
                <div className="flex gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <p>$ twoem deploy storefront-api</p>
                <p className="text-white opacity-50 mt-2">🚀 Starting deployment process...</p>
                <p className="mt-2">✔ Cloned repository (main)</p>
                <p>✔ AI detected: Next.js Framework</p>
                <p>✔ Building Docker image...</p>
                <p className="text-white">... [Layer 4/9] npm run build</p>
                <p className="text-emerald-300">✔ Build Successful!</p>
                <p className="mt-2 text-primary font-bold">✔ App live at storefront.twoem.app</p>
                <div className="animate-pulse inline-block w-2 h-4 bg-primary ml-1 align-middle" />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
