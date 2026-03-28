
"use client"

import { Settings, GitBranch, Terminal, Shield, Save, Rocket, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export default function AppSettingsPage() {
  const { toast } = useToast()

  const handleSave = () => {
    toast({
      title: "Settings Updated",
      description: "Changes will be reflected in the next build cycle.",
    })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-500 pb-24">
      <div className="space-y-1">
        <h2 className="text-3xl font-headline font-bold">Configuration</h2>
        <p className="text-muted-foreground">Adjust runtime parameters, build commands, and service limits.</p>
      </div>

      <div className="grid gap-8">
        <Card className="border-2">
          <CardHeader className="bg-muted/30 border-b">
            <CardTitle className="text-lg flex items-center gap-2"><Settings className="h-5 w-5" /> General Settings</CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="appName">Application Name</Label>
                <Input id="appName" defaultValue="storefront-api" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="root">Root Directory</Label>
                <Input id="root" defaultValue="./" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader className="bg-muted/30 border-b">
            <CardTitle className="text-lg flex items-center gap-2"><Terminal className="h-5 w-5" /> Build & Start Commands</CardTitle>
            <CardDescription>Overrides detected by AI engine.</CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="build">Build Command</Label>
              <Input id="build" defaultValue="npm install && npm run build" className="font-mono text-sm" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="start">Start Command</Label>
              <Input id="start" defaultValue="npm start" className="font-mono text-sm" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader className="bg-muted/30 border-b">
            <CardTitle className="text-lg flex items-center gap-2"><GitBranch className="h-5 w-5" /> Source Control</CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
               <div className="space-y-2">
                <Label>Repository</Label>
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg font-mono text-xs">
                  github.com/twoem/storefront
                </div>
              </div>
              <div className="space-y-2">
                <Label>Branch</Label>
                <Select defaultValue="main">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main">main (Production)</SelectItem>
                    <SelectItem value="dev">dev (Staging)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between items-center pt-8 border-t">
          <Button variant="destructive" className="rounded-full">
            <Trash2 className="mr-2 h-4 w-4" /> Delete Application
          </Button>
          <Button onClick={handleSave} className="rounded-full px-8 h-12 shadow-xl shadow-primary/20">
            <Save className="mr-2 h-4 w-4" /> Propagate Changes
          </Button>
        </div>
      </div>
    </div>
  )
}
