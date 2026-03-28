
"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { 
  Cpu, 
  Database, 
  LayoutDashboard, 
  Settings, 
  ShieldAlert, 
  Users, 
  Zap,
  LogOut,
  LifeBuoy,
  Globe,
  ArrowLeft
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { signOut } from "next-auth/react"

const adminNav = [
  { name: "Infrastucture", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Node Cluster", href: "/admin/nodes", icon: Cpu },
  { name: "Teams & Quotas", href: "/admin/teams", icon: Users },
  { name: "User Directory", href: "/admin/users", icon: ShieldAlert },
  { name: "Build Queue", href: "/admin/deployments", icon: Zap },
  { name: "Support Queue", href: "/admin/support", icon: LifeBuoy },
  { name: "Storage Audit", href: "/admin/storage", icon: Database },
  { name: "Platform Config", href: "/admin/config", icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()

  const handleLogout = async () => {
    toast({
      title: "Session Terminated",
      description: "Operator terminal access revoked.",
    })
    await signOut({ callbackUrl: '/login', redirect: true })
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-body selection:bg-primary/20">
      {/* Admin Sidebar - Professional Green/Blue Theme */}
      <aside className="w-80 shrink-0 border-r bg-white flex flex-col p-8 sticky top-0 h-screen shadow-2xl z-50">
        <div className="mb-12 flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/30">
                <ShieldAlert className="text-white h-7 w-7" />
            </div>
            <div>
                <span className="font-headline font-bold text-xl block leading-none text-zinc-900">TWOEM OPS</span>
                <span className="text-[10px] text-primary font-bold tracking-[0.2em] uppercase mt-1 inline-block">Security L5</span>
            </div>
        </div>

        <nav className="flex-1 space-y-1.5 overflow-y-auto scrollbar-hide">
            {adminNav.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                        "flex items-center gap-4 px-5 py-3.5 rounded-2xl text-sm font-bold transition-all border-2",
                        pathname === item.href 
                            ? "bg-primary/5 text-primary border-primary/20 shadow-lg shadow-primary/5" 
                            : "text-zinc-500 border-transparent hover:text-primary hover:bg-primary/5 hover:border-primary/10"
                    )}
                >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                </Link>
            ))}
        </nav>

        <div className="mt-8 pt-8 border-t space-y-4">
            <div className="p-5 bg-secondary/5 rounded-2xl border-2 border-secondary/10">
                <p className="text-[10px] text-secondary font-bold mb-2 uppercase tracking-widest">Master Node Uptime</p>
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-headline font-bold text-secondary">214d 14h</p>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <Button 
                variant="ghost" 
                onClick={handleLogout}
                className="w-full justify-start text-zinc-500 hover:text-destructive hover:bg-destructive/5 rounded-xl font-bold"
              >
                  <LogOut className="mr-3 h-4 w-4" /> Terminal Logout
              </Button>
              <Link href="/dashboard" className="flex items-center gap-3 px-5 py-3 text-xs font-bold text-zinc-400 hover:text-primary transition-colors">
                  <ArrowLeft className="h-4 w-4" /> Return to Cluster View
              </Link>
            </div>
        </div>
      </aside>

      <main className="flex-1 p-12 overflow-y-auto">
        <div className="animate-in fade-in slide-in-from-right duration-700">
          {children}
        </div>
      </main>
    </div>
  )
}
