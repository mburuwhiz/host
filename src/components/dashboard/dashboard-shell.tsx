
"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { 
  LayoutDashboard, 
  PlusCircle, 
  Settings, 
  Users, 
  CreditCard, 
  LifeBuoy, 
  Search, 
  Zap, 
  LogOut,
  Bell,
  ChevronDown,
  Globe,
  Database,
  Shield,
  Command as CommandIcon,
  Terminal,
  Activity
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const navItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Deploy App", href: "/dashboard/create-app", icon: PlusCircle },
  { name: "My Teams", href: "/dashboard/teams", icon: Users },
  { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
  { name: "Support Hub", href: "/dashboard/support", icon: LifeBuoy },
]

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  const [isCommandOpen, setIsCommandOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsCommandOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleLogout = () => {
    toast({
      title: "Session Terminated",
      description: "Cluster session closed successfully.",
    })
    router.push("/login")
  }

  const quickActions = [
    { name: "Go to Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Create New App", href: "/dashboard/create-app", icon: PlusCircle },
    { name: "View Docs", href: "/docs", icon: Terminal },
    { name: "Open Support Hub", href: "/dashboard/support", icon: LifeBuoy },
  ]

  return (
    <div className="flex h-screen bg-background font-body">
      {/* Sidebar */}
      <aside className="hidden md:flex w-72 flex-col border-r bg-white shadow-sm z-50">
        <div className="flex h-20 items-center px-8 border-b">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                <Zap className="h-6 w-6 text-white fill-white" />
            </div>
            <span className="font-headline font-bold text-xl tracking-tight">TWOEM <span className="text-primary">PaaS</span></span>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto py-8 px-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-all border-2",
                pathname === item.href 
                  ? "bg-primary/5 text-primary border-primary/10 shadow-sm" 
                  : "text-zinc-500 border-transparent hover:text-primary hover:bg-primary/5 hover:border-primary/5"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </div>
        <div className="p-6 border-t space-y-6">
            <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100">
                <div className="flex justify-between items-center mb-3">
                    <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">NVMe Partition</p>
                    <span className="text-[10px] text-emerald-700 font-bold bg-white px-2 py-0.5 rounded-full border border-emerald-100">45%</span>
                </div>
                <div className="h-2 bg-emerald-200/30 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[45%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.3)]" />
                </div>
                <div className="flex justify-between mt-3">
                    <p className="text-[10px] text-emerald-600/70 font-bold">1.1TB USED</p>
                    <p className="text-[10px] text-emerald-600/70 font-bold">2.5TB LIMIT</p>
                </div>
            </div>
            <Button 
                variant="ghost" 
                onClick={handleLogout}
                className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/5 rounded-xl font-bold h-12"
            >
                <LogOut className="mr-3 h-4 w-4" /> Sign out
            </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 border-b flex items-center justify-between px-8 bg-white/80 backdrop-blur sticky top-0 z-40">
          <div className="flex items-center flex-1 gap-4">
            <div 
              onClick={() => setIsCommandOpen(true)}
              className="w-full max-w-md group cursor-pointer"
            >
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    <div className="w-full h-11 bg-muted/30 border-2 border-transparent rounded-2xl flex items-center pl-11 pr-4 text-sm text-muted-foreground group-hover:bg-white group-hover:border-primary/10 transition-all">
                        Search or type a command...
                        <div className="ml-auto flex items-center gap-1 opacity-50 group-hover:opacity-100">
                            <kbd className="px-1.5 py-0.5 bg-background border rounded text-[10px] font-bold">⌘</kbd>
                            <kbd className="px-1.5 py-0.5 bg-background border rounded text-[10px] font-bold">K</kbd>
                        </div>
                    </div>
                </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-primary/5 hover:text-primary transition-colors h-11 w-11">
                <Bell className="h-5 w-5" />
                <span className="absolute top-3 right-3 w-2 h-2 bg-primary rounded-full ring-2 ring-white" />
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="gap-3 px-3 py-2 hover:bg-muted/50 rounded-full transition-all border-2 border-transparent hover:border-muted h-12">
                        <Avatar className="h-8 w-8 border-2 border-primary/20">
                            <AvatarImage src="https://picsum.photos/seed/user-john/100/100" />
                            <AvatarFallback className="bg-primary/10 text-primary font-bold">JD</AvatarFallback>
                        </Avatar>
                        <div className="hidden lg:flex flex-col items-start text-left">
                            <span className="font-bold text-sm leading-none">John Doe</span>
                            <span className="text-[10px] text-muted-foreground font-bold uppercase mt-1">Operator L5</span>
                        </div>
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 p-3 rounded-2xl shadow-2xl border-2">
                    <DropdownMenuLabel className="px-3 pb-3 border-b mb-2">
                        <div className="flex flex-col">
                            <span className="font-headline font-bold">My Account</span>
                            <span className="text-xs text-muted-foreground font-normal">john.doe@twoem.app</span>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuItem asChild className="rounded-xl px-3 py-2.5 cursor-pointer font-medium"><Link href="/account/profile">Profile Settings</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild className="rounded-xl px-3 py-2.5 cursor-pointer font-medium"><Link href="/account/security">Security & 2FA</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild className="rounded-xl px-3 py-2.5 cursor-pointer font-medium"><Link href="/account/tokens">API Access Tokens</Link></DropdownMenuItem>
                    <DropdownMenuSeparator className="my-2" />
                    <DropdownMenuItem onClick={handleLogout} className="text-destructive rounded-xl px-3 py-2.5 cursor-pointer font-bold focus:bg-destructive/5 focus:text-destructive">
                        Terminate Session
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-8 md:p-12 scroll-smooth">
          {children}
        </main>
      </div>

      {/* Command Palette Modal */}
      <Dialog open={isCommandOpen} onOpenChange={setIsCommandOpen}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden border-2 rounded-3xl gap-0">
          <div className="p-6 border-b bg-muted/20">
            <div className="relative">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
                <Input 
                    placeholder="Search apps, teams, documentation..." 
                    className="border-none bg-transparent focus-visible:ring-0 text-lg h-8 pl-8 placeholder:text-muted-foreground"
                    autoFocus
                />
            </div>
          </div>
          <div className="p-4 max-h-[400px] overflow-y-auto scrollbar-hide">
            <div className="space-y-6">
                <div>
                    <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-4 mb-3">Quick Navigation</h4>
                    <div className="space-y-1">
                        {quickActions.map((action) => (
                            <Link 
                                key={action.href}
                                href={action.href}
                                onClick={() => setIsCommandOpen(false)}
                                className="flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-primary/5 hover:text-primary transition-all group font-bold text-sm"
                            >
                                <action.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                {action.name}
                            </Link>
                        ))}
                    </div>
                </div>
                <div>
                    <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-4 mb-3">Recent Apps</h4>
                    <div className="space-y-1">
                        {['storefront-api', 'auth-worker', 'payment-gateway'].map((app) => (
                            <Link 
                                key={app}
                                href={`/apps/${app}/overview`}
                                onClick={() => setIsCommandOpen(false)}
                                className="flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-secondary/5 hover:text-secondary transition-all group font-bold text-sm"
                            >
                                <Terminal className="h-5 w-5 text-muted-foreground group-hover:text-secondary transition-colors" />
                                {app}
                                <span className="ml-auto text-[10px] bg-muted px-2 py-0.5 rounded-full font-bold">production</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
          </div>
          <div className="p-4 bg-muted/30 border-t flex justify-between items-center text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
            <span>Use arrows to navigate, enter to select</span>
            <div className="flex gap-2">
                <span className="bg-background border rounded px-1.5 py-0.5">ESC</span>
                <span>to close</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
