
"use client"

import { useState } from "react"
import { CreditCard, Download, Plus, Zap, ShieldCheck, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function TeamBillingPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [showAddMethod, setShowAddMethod] = useState(false)

  const handleAddPaymentMethod = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
        setLoading(false)
        setShowAddMethod(false)
        toast({
            title: "Payment Method Added",
            description: "Your billing details have been securely stored.",
        })
    }, 1500)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div>
        <h1 className="text-3xl font-headline font-bold">Billing & Usage</h1>
        <p className="text-muted-foreground">Manage subscriptions and resource costs for your organization.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="border-2 border-primary shadow-xl scale-105">
          <CardHeader>
            <div className="flex justify-between items-center">
              <Badge className="bg-primary">Current Plan</Badge>
              <span className="font-bold text-2xl font-headline">$19<span className="text-sm font-normal text-muted-foreground">/mo</span></span>
            </div>
            <CardTitle className="text-2xl mt-4">Pro Engine</CardTitle>
            <CardDescription>Scaling your cluster with professional reliability.</CardDescription>
          </CardHeader>
          <CardFooter className="bg-primary/5 border-t p-4 flex justify-between">
            <span className="text-xs font-bold text-primary">Next bill: April 01, 2024</span>
            <Button size="sm">Upgrade</Button>
          </CardFooter>
        </Card>

        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2"><CreditCard className="h-5 w-5" /> Payment Method</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div className="flex items-center gap-4 p-4 border-2 rounded-xl border-dashed">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center font-bold">VISA</div>
              <div className="flex-1">
                <p className="font-bold text-sm">•••• •••• •••• 4242</p>
                <p className="text-xs text-muted-foreground">Expires 12/26</p>
              </div>
              <Button variant="ghost" size="sm">Edit</Button>
            </div>

            {showAddMethod && (
                <form onSubmit={handleAddPaymentMethod} className="space-y-4 p-4 bg-muted/20 border-2 rounded-xl mt-4">
                    <h4 className="font-bold text-sm">Add New Payment Method</h4>
                    <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="0000 0000 0000 0000" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input id="expiry" placeholder="MM/YY" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cvc">CVC</Label>
                            <Input id="cvc" placeholder="123" required />
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                        <Button type="button" variant="ghost" onClick={() => setShowAddMethod(false)}>Cancel</Button>
                        <Button type="submit" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save
                        </Button>
                    </div>
                </form>
            )}
          </CardContent>
          {!showAddMethod && (
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => setShowAddMethod(true)}><Plus className="mr-2 h-4 w-4" /> Add Method</Button>
            </CardFooter>
          )}
        </Card>
      </div>

      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-lg">Invoices</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {[
              { id: "INV-8821", date: "Mar 01, 2024", amount: "$19.00", status: "Paid" },
              { id: "INV-7122", date: "Feb 01, 2024", amount: "$19.00", status: "Paid" },
            ].map((inv, i) => (
              <div key={i} className="flex items-center justify-between p-6">
                <div>
                  <p className="font-bold">{inv.id}</p>
                  <p className="text-xs text-muted-foreground">{inv.date}</p>
                </div>
                <div className="flex items-center gap-8">
                  <span className="font-bold">{inv.amount}</span>
                  <Badge variant="outline" className="text-emerald-600 bg-emerald-50">{inv.status}</Badge>
                  <Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
