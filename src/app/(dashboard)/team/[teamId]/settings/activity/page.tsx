"use client"

import { Activity, Clock } from "lucide-react"

export default function TeamActivitySettings() {
  const logs = [
    { action: "Developer [dev@twoem.com] triggered a manual rebuild for App [storefront-api].", time: "2 minutes ago", type: "build" },
    { action: "Admin [admin@twoem.com] changed Env Vars for App [auth-worker].", time: "1 hour ago", type: "config" },
    { action: "Owner [john@twoem.com] invited new member [dev@twoem.com].", time: "2 days ago", type: "team" },
    { action: "Owner [john@twoem.com] created team TWOEM Engineering.", time: "2 days ago", type: "team" }
  ]

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
      <div className="border-b border-gray-100 pb-6">
        <h1 className="text-3xl font-headline font-bold text-sky-500 flex items-center gap-3">
          <Activity className="h-8 w-8 text-sky-500" /> Audit & Activity Logs
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">Chronological event feed for professional PAAS accountability.</p>
      </div>

      <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
        {logs.map((log, i) => (
          <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-sky-50 text-sky-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
              <Clock className="h-4 w-4" />
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between space-x-2 mb-1">
                <div className="font-bold text-xs text-sky-500 uppercase tracking-widest">{log.type} event</div>
                <time className="font-mono text-[10px] text-gray-400 font-bold">{log.time}</time>
              </div>
              <div className="text-sm text-gray-700 font-medium">{log.action}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center pt-8">
        <button className="text-xs font-bold text-emerald-500 hover:text-emerald-600 uppercase tracking-widest border-b border-dashed border-emerald-500/50 pb-1">
          Load More History
        </button>
      </div>
    </div>
  )
}
