
"use client"

import { Book, Code, Globe, Terminal } from "lucide-react"

export default function DocsApi() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        <h1 className="text-4xl font-headline font-bold">API Reference</h1>
        <p className="text-lg text-muted-foreground">Programmatic orchestration for advanced workflows.</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-headline font-bold">Authentication</h2>
        <p className="text-muted-foreground">Include your Personal Access Token in the Authorization header.</p>
        <div className="bg-muted p-4 rounded-lg font-mono text-sm border">
          Authorization: Bearer twoem_live_xxxxxxxx
        </div>
      </section>

      <div className="space-y-8">
        {[
          { method: "GET", path: "/v1/apps", desc: "List all applications in your team workspace." },
          { method: "POST", path: "/v1/apps/:id/deploy", desc: "Trigger an atomic deployment for a specific app." },
          { method: "GET", path: "/v1/apps/:id/metrics", desc: "Fetch real-time CPU and RAM utilization." },
        ].map((endpoint, i) => (
          <div key={i} className="p-6 border-2 rounded-2xl space-y-3">
            <div className="flex items-center gap-3">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${endpoint.method === 'GET' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-blue-50 text-blue-600 border-blue-200'}`}>
                {endpoint.method}
              </span>
              <span className="font-mono text-sm font-bold">{endpoint.path}</span>
            </div>
            <p className="text-sm text-muted-foreground">{endpoint.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
