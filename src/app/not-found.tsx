
"use client"

import Link from "next/link"
import { ArrowLeft, Home, Search, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-2xl w-full text-center space-y-12 animate-in fade-in zoom-in duration-700">
        <div className="relative inline-block">
            <h1 className="text-[180px] font-headline font-bold leading-none tracking-tighter text-primary/10 select-none">
                404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-primary rounded-3xl rotate-12 flex items-center justify-center shadow-2xl shadow-primary/40 animate-bounce">
                    <Zap className="text-white w-12 h-12" />
                </div>
            </div>
        </div>

        <div className="space-y-4">
            <h2 className="text-4xl font-headline font-bold">Oops! Lost in Orbit?</h2>
            <p className="text-xl text-muted-foreground max-w-md mx-auto">
                The page you're looking for has either been redeployed to a different node or never existed in this cluster.
            </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="rounded-full px-8 h-14 text-lg font-headline group" asChild>
                <Link href="/">
                    <Home className="mr-2 h-5 w-5" />
                    Back to Launchpad
                </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg font-headline" onClick={() => window.history.back()}>
                <ArrowLeft className="mr-2 h-5 w-5" />
                Return to Safety
            </Button>
        </div>

        <div className="pt-8 border-t max-w-xs mx-auto">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input 
                    type="text" 
                    placeholder="Search documentation..." 
                    className="w-full bg-muted/50 border rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
            </div>
        </div>
      </div>
    </div>
  )
}
