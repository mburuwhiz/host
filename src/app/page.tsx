import Link from "next/link"
import { ArrowRight, Code, Cpu, Database, Globe, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export default function Home() {
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-bg')
  const dashboardImg = PlaceHolderImages.find(img => img.id === 'dashboard-preview')

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Zap className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-headline font-bold">TWOEM</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/features" className="hover:text-primary transition-colors">Features</Link>
            <Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link>
            <Link href="/docs" className="hover:text-primary transition-colors">Docs</Link>
            <Link href="/status" className="hover:text-primary transition-colors">Status</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">Login</Link>
            <Button asChild className="rounded-full px-6">
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden py-24 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
                <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold bg-secondary/10 text-secondary border-secondary/20">
                  <span className="mr-1">🚀</span> Introducing v2.0 Platform
                </div>
                <h1 className="text-5xl lg:text-7xl font-headline font-bold leading-tight">
                  Deploy Your <span className="text-primary italic">Ambition</span> with TWOEM
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                  The robust orchestration engine for Docker containers. Automated builds, 
                  intelligent code detection, and zero-downtime atomic deployments.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="rounded-full h-14 px-8 text-lg font-headline group" asChild>
                    <Link href="/signup">
                      Deploy Now 
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-lg font-headline" asChild>
                    <Link href="/features">Explore Infrastructure</Link>
                  </Button>
                </div>
                <div className="flex items-center gap-6 pt-4 grayscale opacity-60">
                    <span className="font-bold">Next.js</span>
                    <span className="font-bold">Python</span>
                    <span className="font-bold">Go</span>
                    <span className="font-bold">Rust</span>
                </div>
              </div>
              <div className="relative animate-in fade-in zoom-in duration-1000 delay-200">
                <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-secondary/20 blur-3xl rounded-full" />
                <div className="relative border rounded-2xl overflow-hidden shadow-2xl bg-card">
                  <Image 
                    src={dashboardImg?.imageUrl || ""} 
                    alt="Dashboard Preview" 
                    width={1000} 
                    height={600}
                    className="w-full h-auto"
                    data-ai-hint="dashboard tech"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-card border-y">
            <div className="container mx-auto px-4">
                <div className="text-center space-y-4 mb-16">
                    <h2 className="text-4xl font-headline font-bold">Engineered for Scale</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">Our 2.5TB Ubuntu-backed infrastructure handles your traffic spikes without sweating.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { icon: Zap, title: "Atomic Deploys", desc: "Blue-green deployment strategy ensures zero downtime and instant rollbacks.", color: "text-primary bg-primary/10" },
                        { icon: Shield, title: "SSL by Default", desc: "Automatic Let's Encrypt certificates for every custom domain you connect.", color: "text-secondary bg-secondary/10" },
                        { icon: Database, title: "Persistent Volumes", desc: "Your data survives redeploys with dedicated mounts on our high-speed partition.", color: "text-emerald-600 bg-emerald-50" },
                        { icon: Code, title: "Smart Detection", desc: "AI scans your repo and suggests build/start commands automatically.", color: "text-sky-600 bg-sky-50" },
                        { icon: Globe, title: "Edge Routing", desc: "Global traffic managed via dynamic Traefik configuration.", color: "text-indigo-600 bg-indigo-50" },
                        { icon: Cpu, title: "Isolated Resources", desc: "Hard resource limits via Docker SDK ensures no noisy neighbors.", color: "text-orange-600 bg-orange-50" }
                    ].map((feature, i) => (
                        <div key={i} className="p-8 rounded-2xl border bg-background hover:shadow-lg transition-all group">
                            <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <feature.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-headline font-bold mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
      </main>

      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between gap-8 mb-12">
            <div className="space-y-4 max-w-sm">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <Zap className="text-white w-5 h-5" />
                    </div>
                    <span className="text-lg font-headline font-bold">TWOEM</span>
                </div>
                <p className="text-sm text-muted-foreground">The ultimate self-hosted PaaS solution for modern software teams.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                <div className="space-y-4">
                    <h4 className="font-headline font-bold">Product</h4>
                    <ul className="text-sm space-y-2 text-muted-foreground">
                        <li><Link href="/features" className="hover:text-primary transition-colors">Features</Link></li>
                        <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
                        <li><Link href="/status" className="hover:text-primary transition-colors">System Status</Link></li>
                    </ul>
                </div>
                <div className="space-y-4">
                    <h4 className="font-headline font-bold">Support</h4>
                    <ul className="text-sm space-y-2 text-muted-foreground">
                        <li><Link href="/docs" className="hover:text-primary transition-colors">Documentation</Link></li>
                        <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Sales</Link></li>
                        <li><Link href="/legal" className="hover:text-primary transition-colors">Privacy & Terms</Link></li>
                    </ul>
                </div>
                <div className="space-y-4">
                    <h4 className="font-headline font-bold">Social</h4>
                    <ul className="text-sm space-y-2 text-muted-foreground">
                        <li><Link href="#" className="hover:text-primary transition-colors">Twitter</Link></li>
                        <li><Link href="#" className="hover:text-primary transition-colors">GitHub</Link></li>
                        <li><Link href="#" className="hover:text-primary transition-colors">Discord</Link></li>
                    </ul>
                </div>
            </div>
          </div>
          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
            <p>© 2024 TWOEM ONLINE PRODUCTIONS. All rights reserved.</p>
            <p>Built with ❤️ on Ubuntu x86_64</p>
          </div>
        </div>
      </footer>
    </div>
  )
}