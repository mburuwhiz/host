
"use client"

import { User, Mail, Camera, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function UserProfilePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-headline font-bold">Account Profile</h1>
        <p className="text-muted-foreground">Manage your personal information and how others see you on TWOEM.</p>
      </div>

      <div className="grid gap-8">
        <Card className="border-2 overflow-hidden">
          <CardHeader className="bg-muted/30 border-b">
            <CardTitle className="text-lg">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="relative group">
                    <Avatar className="h-24 w-24 border-4 border-background shadow-xl">
                        <AvatarImage src="https://picsum.photos/seed/user/200/200" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <button className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="text-white h-8 w-8" />
                    </button>
                </div>
                <div className="flex-1 space-y-1 text-center md:text-left">
                    <h3 className="text-xl font-bold">John Doe</h3>
                    <p className="text-muted-foreground text-sm">Lead Orchestration @ Twoem Online Prod.</p>
                    <p className="text-xs text-primary font-mono bg-primary/10 inline-block px-2 py-0.5 rounded-full mt-2">Member since Jan 2024</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" className="h-11" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" className="h-11" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Work Email</Label>
                    <Input id="email" type="email" defaultValue="john.doe@twoem.app" className="h-11" />
                    <p className="text-[10px] text-emerald-600">Email verified</p>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+254 700 000 000" defaultValue="+254 711 222 333" className="h-11" />
                </div>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/30 border-t p-4 flex justify-end">
            <Button className="rounded-full shadow-lg">
                <Save className="mr-2 h-4 w-4" /> Save Changes
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-2 border-destructive/20 bg-destructive/5">
            <CardHeader>
                <CardTitle className="text-destructive font-headline">Danger Zone</CardTitle>
                <CardDescription>Once you delete your account, there is no going back. Please be certain.</CardDescription>
            </CardHeader>
            <CardContent>
                <Button variant="destructive" className="rounded-full">Delete My TWOEM Account</Button>
            </CardContent>
        </Card>
      </div>
    </div>
  )
}
