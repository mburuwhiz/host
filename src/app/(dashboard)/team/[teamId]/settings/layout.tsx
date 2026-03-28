"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const settingsNav = [
  { name: "General Profile", href: "general" },
  { name: "Member Management", href: "members" },
  { name: "Resource Quotas", href: "resources" },
  { name: "Audit Logs", href: "activity" },
  { name: "Danger Zone", href: "danger" },
]

export default function TeamSettingsLayout({ children, params }: { children: React.ReactNode, params: { teamId: string } }) {
  const pathname = usePathname()

  return (
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <aside className="w-full md:w-64 shrink-0 space-y-1">
        <div className="mb-6">
            <h2 className="text-xl font-headline font-bold text-sky-600">Team Settings</h2>
            <p className="text-xs text-muted-foreground mt-1">Manage team preferences and limits</p>
        </div>
        <nav className="flex flex-col gap-1">
            {settingsNav.map((item) => {
                const href = `/team/${params.teamId}/settings/${item.href}`
                const isActive = pathname.includes(item.href)

                return (
                    <Link
                        key={item.href}
                        href={href}
                        className={cn(
                            "px-4 py-2.5 rounded-lg text-sm font-bold transition-all border",
                            isActive
                                ? "bg-white text-emerald-600 border-emerald-100 shadow-sm"
                                : "text-zinc-500 border-transparent hover:text-emerald-600 hover:bg-white/50"
                        )}
                    >
                        {item.name}
                    </Link>
                )
            })}
        </nav>
      </aside>

      <main className="flex-1 min-w-0 bg-white p-8 rounded-2xl border shadow-sm">
        {children}
      </main>
    </div>
  )
}
