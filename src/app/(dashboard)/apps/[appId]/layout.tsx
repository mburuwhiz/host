
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Activity, 
  BarChart, 
  Code, 
  Database, 
  Globe, 
  History, 
  LayoutDashboard, 
  Logs, 
  Settings, 
  Terminal, 
  Webhook, 
  Zap 
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function AppDetailLayout({ 
  children, 
  params 
}: { 
  children: React.ReactNode, 
  params: { appId: string } 
}) {
  const pathname = usePathname()
  const { appId } = params

  const navItems = [
    { name: "Overview", href: `/apps/${appId}/overview`, icon: LayoutDashboard },
    { name: "Deployments", href: `/apps/${appId}/deployments`, icon: History },
    { name: "Runtime Logs", href: `/apps/${appId}/logs`, icon: Logs },
    { name: "Console", href: `/apps/${appId}/console`, icon: Terminal },
    { name: "Metrics", href: `/apps/${appId}/metrics`, icon: BarChart },
    { name: "Networking", href: `/apps/${appId}/networking`, icon: Globe },
    { name: "Environment", href: `/apps/${appId}/environment`, icon: Zap },
    { name: "Storage", href: `/apps/${appId}/storage`, icon: Database },
    { name: "Settings", href: `/apps/${appId}/settings`, icon: Settings },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide border-b -mx-2 px-2">
        {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href)
            return (
                <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                        "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-all",
                        isActive 
                            ? "bg-primary text-primary-foreground shadow-md" 
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                </Link>
            )
        })}
      </div>
      <div className="animate-in fade-in duration-500">
        {children}
      </div>
    </div>
  )
}
