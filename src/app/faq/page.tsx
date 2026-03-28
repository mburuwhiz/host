
"use client"

import { useState } from "react"
import { HelpCircle, MessageSquare, Search, Send, CheckCircle2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function FAQPage() {
  const { toast } = useToast()
  const [query, setQuery] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const faqs = [
    { q: "How do I connect my custom domain?", a: "Navigate to your App Dashboard > Networking, add your domain, and update your DNS CNAME records to point to ingress.twoem.app." },
    { q: "What is the 2.5TB storage partition?", a: "It's our high-speed NVMe block storage pool used for persistent volumes. Each app can request dedicated mount points." },
    { q: "Does TWOEM support Python or Go?", a: "Yes, our smart-detection engine automatically identifies Next.js, Python, Go, and Rust repositories." },
    { q: "How do atomic deployments work?", a: "We use a blue-green strategy. Your new version is built and health-checked before Traefik swaps the traffic." }
  ]

  const handleSubmitIssue = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    toast({
      title: "Issue Dispatched",
      description: "Our architects will review and reply via your registered email.",
    })
  }

  return (
    <div className="min-h-screen bg-background py-24 px-4">
      <div className="container mx-auto max-w-4xl space-y-16">
        <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild className="rounded-full">
                <Link href="/"><ArrowLeft className="h-5 w-5" /></Link>
            </Button>
            <h1 className="text-4xl md:text-6xl font-headline font-bold">Knowledge Hub</h1>
        </div>

        <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-primary" />
            <Input 
                placeholder="Search the TWOEM engine documentation..." 
                className="h-16 pl-14 text-lg rounded-2xl shadow-xl border-2"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
        </div>

        <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-8">
                <h2 className="text-2xl font-headline font-bold flex items-center gap-2">
                    <HelpCircle className="text-primary" /> Most Asked Questions
                </h2>
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, i) => (
                        <AccordionItem key={i} value={`item-${i}`} className="border-b-2 py-2">
                            <AccordionTrigger className="text-left font-bold text-lg hover:text-primary transition-colors">
                                {faq.q}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground text-base leading-relaxed pt-4">
                                {faq.a}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>

            <Card className="border-2 shadow-2xl h-fit">
                <CardHeader>
                    <CardTitle className="text-xl font-headline">Ask an Architect</CardTitle>
                    <CardDescription>Can't find what you need? Post your issue here.</CardDescription>
                </CardHeader>
                <CardContent>
                    {!submitted ? (
                        <form onSubmit={handleSubmitIssue} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider">Subject</label>
                                <Input placeholder="e.g. Scaling issue" required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider">Describe your issue</label>
                                <Textarea placeholder="What's happening in your cluster?" className="min-h-[120px]" required />
                            </div>
                            <Button className="w-full h-12 rounded-xl">
                                <Send className="mr-2 h-4 w-4" /> Dispatch Issue
                            </Button>
                        </form>
                    ) : (
                        <div className="text-center py-8 space-y-4 animate-in fade-in zoom-in">
                            <CheckCircle2 className="h-12 w-12 text-primary mx-auto" />
                            <p className="font-bold">Issue logged successfully!</p>
                            <p className="text-sm text-muted-foreground">Check your inbox for a tracking ID and architect response.</p>
                            <Button variant="outline" onClick={() => setSubmitted(false)}>Send another</Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}
