
import { Check, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function PricingPage() {
  const tiers = [
    {
      name: "Hobbyist",
      price: "$0",
      desc: "Perfect for experiments and side projects.",
      features: ["0.25 vCPU", "512MB RAM", "1GB Persistent Storage", "Shared Traefik Node", "Custom Domain (HTTP only)"],
      cta: "Start for Free",
      variant: "outline"
    },
    {
      name: "Pro Engine",
      price: "$19",
      desc: "For serious apps requiring reliability.",
      features: ["1 vCPU", "2GB RAM", "10GB Persistent Storage", "Priority Build Queue", "Auto-SSL via Let's Encrypt", "Team Support (3 members)"],
      cta: "Go Pro",
      variant: "default",
      highlight: true
    },
    {
      name: "Orchestrator",
      price: "$99",
      desc: "Enterprise grade scaling for high traffic.",
      features: ["4 vCPU", "8GB RAM", "100GB Persistent Storage", "Dedicated Builder Node", "Advanced RBAC", "99.9% Uptime SLA"],
      cta: "Contact Sales",
      variant: "outline"
    }
  ]

  return (
    <div className="min-h-screen bg-background py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <h1 className="text-5xl font-headline font-bold">Flexible Infrastructure</h1>
          <p className="text-xl text-muted-foreground">Scale your resources as your traffic grows. Pay only for what you reserve.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-24">
          {tiers.map((tier, i) => (
            <Card key={i} className={cn(
                "relative border-2 flex flex-col",
                tier.highlight ? "border-primary shadow-2xl scale-105 z-10" : "border-border"
            )}>
              {tier.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full">
                    MOST POPULAR
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl font-headline">{tier.name}</CardTitle>
                <CardDescription>{tier.desc}</CardDescription>
                <div className="pt-4">
                    <span className="text-4xl font-bold font-headline">{tier.price}</span>
                    <span className="text-muted-foreground ml-2">/ month</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                {tier.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm">{f}</span>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button className="w-full h-12 rounded-xl text-lg font-headline" variant={tier.variant as any} asChild>
                    <Link href="/signup">{tier.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="bg-muted rounded-3xl p-12 text-center">
            <Zap className="h-12 w-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-headline font-bold mb-4">Custom Cluster Deployment?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Need a dedicated Ubuntu x86_64 node or GPU support for AI workloads? 
                Our engineering team can provision custom hardware clusters.
            </p>
            <Button size="lg" className="rounded-full px-12" asChild>
                <Link href="/contact">Talk to an Architect</Link>
            </Button>
        </div>
      </div>
    </div>
  )
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(" ")
}
