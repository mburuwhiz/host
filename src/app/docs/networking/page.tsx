
import { Globe, ShieldCheck, Zap } from "lucide-react"

export default function NetworkingDocs() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        <h1 className="text-4xl font-headline font-bold">Networking & SSL</h1>
        <p className="text-lg text-muted-foreground">Global routing via Traefik and Auto-SSL.</p>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-headline font-bold">Custom Domain DNS</h2>
        <p className="text-muted-foreground leading-relaxed">
          To connect your domain, update your DNS provider with the following CNAME record.
        </p>
        <div className="grid md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-muted rounded-xl border">TYPE: CNAME</div>
            <div className="p-4 bg-muted rounded-xl border">HOST: @ or www</div>
            <div className="p-4 bg-muted rounded-xl border">VALUE: ingress.twoem.app</div>
        </div>
      </section>

      <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100 flex gap-6 items-start">
        <ShieldCheck className="h-12 w-12 text-emerald-600 shrink-0" />
        <div className="space-y-2">
            <h4 className="font-bold text-lg text-emerald-900">Automatic Let's Encrypt</h4>
            <p className="text-sm text-emerald-700">Once your DNS is propagated, TWOEM will automatically provision and renew your SSL certificates every 90 days.</p>
        </div>
      </div>
    </div>
  )
}
