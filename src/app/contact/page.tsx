
import { Mail, MessageSquare, Phone, Building2, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-12">
            <div className="space-y-4">
              <h1 className="text-5xl font-headline font-bold">Connect with Our Architects</h1>
              <p className="text-xl text-muted-foreground">Need help scaling your infrastructure or have questions about our Ubuntu orchestration engine?</p>
            </div>

            <div className="grid gap-8">
              {[
                { icon: Mail, label: "Sales & Partnerships", value: "sales@twoem.app" },
                { icon: MessageSquare, label: "Technical Support", value: "support@twoem.app" },
                { icon: Building2, label: "HQ Address", value: "101 Ubuntu Lane, Silicon District" },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 border border-primary/20">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">{item.label}</p>
                    <p className="text-muted-foreground">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Card className="border-2 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl font-headline">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="John Doe" className="h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Work Email</Label>
                    <Input id="email" type="email" placeholder="john@company.com" className="h-11" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Infrastructure Scaling" className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">How can we help?</Label>
                  <Textarea id="message" placeholder="Describe your deployment needs..." className="min-h-[150px]" />
                </div>
                <Button size="lg" className="w-full h-12 text-lg font-headline">Dispatch Message</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
