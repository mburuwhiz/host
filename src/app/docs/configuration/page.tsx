
"use client"

import { Settings, FileCode, Layers, Zap } from "lucide-react"

export default function DocsConfiguration() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        <h1 className="text-4xl font-headline font-bold">Build & Runtime Config</h1>
        <p className="text-lg text-muted-foreground">Fine-tuning how your cluster nodes execute your code.</p>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-headline font-bold">Triple-Save Logic</h2>
        <p className="text-muted-foreground leading-relaxed">
          TWOEM environment variables follow a strict triple-redundancy protocol to ensure no downtime during config shifts.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Vault", desc: "Encrypted at rest on the master-node using Argon2 salts." },
            { title: "Graceful", desc: "Applied via container restarts for non-build variables." },
            { title: "Atomic", desc: "Integrated into a full rebuild for system-level dependencies." },
          ].map((item, i) => (
            <div key={i} className="p-6 bg-muted/30 rounded-2xl border border-dashed">
              <h4 className="font-bold mb-1">{item.title}</h4>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-headline font-bold">Root Directories</h2>
        <p className="text-muted-foreground">For monorepos, specify the path to your package from the repository root.</p>
        <div className="p-6 bg-zinc-950 rounded-xl text-emerald-400 font-mono text-sm shadow-2xl">
          # Example for frontend/ directory<br/>
          ROOT_DIR: ./apps/storefront
        </div>
      </section>
    </div>
  )
}
