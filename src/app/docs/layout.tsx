
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Book, ChevronRight, Code, FileText, Globe, Layers, Rocket, Shield, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

const docsNav = [
  {
    title: "Introduction",
    items: [
      { name: "Getting Started", href: "/docs/getting-started", icon: Rocket },
      { name: "Platform Updates", href: "/docs/changelog", icon: Zap },
    ]
  },
  {
    title: "The Engine",
    items: [
      { name: "Deployment Guides", href: "/docs/deployment", icon: Code },
      { name: "Configuration Reference", href: "/docs/configuration", icon: Layers },
      { name: "Storage & Quotas", href: "/docs/storage", icon: FileText },
    ]
  },
  {
    title: "Infrastructure",
    items: [
      { name: "Networking & SSL", href: "/docs/networking", icon: Globe },
      { name: "Teams & RBAC", href: "/docs/teams", icon: Shield },
      { name: "API Reference", href: "/docs/api", icon: Book },
    ]
  }
]

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-background">
      <header className="h-16 border-b flex items-center px-6 sticky top-0 bg-background/80 backdrop-blur-md z-50">
        <Link href="/" className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary fill-primary" />
            <span className="font-headline font-bold text-lg">TWOEM Docs</span>
        </Link>
        <div className="mx-6 h-4 w-px bg-border" />
        <div className="text-sm font-medium text-muted-foreground hidden md:block">
            v2.10.0-stable
        </div>
      </header>

      <div className="container mx-auto flex">
        <aside className="w-64 shrink-0 hidden lg:block py-12 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
          <nav className="space-y-8">
            {docsNav.map((section, i) => (
                <div key={i} className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground px-4">{section.title}</h4>
                    <div className="space-y-1">
                        {section.items.map((item) => (
                            <Link 
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-all",
                                    pathname === item.href 
                                        ? "bg-primary/10 text-primary border-l-4 border-primary rounded-l-none" 
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
          </nav>
        </aside>

        <main className="flex-1 py-12 px-4 md:px-12 max-w-4xl border-l min-h-screen">
          {children}
        </main>
      </div>
    </div>
  )
}
