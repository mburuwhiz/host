
"use client"

import { Shield, Key, Smartphone, History, Lock, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function SecuritySettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-headline font-bold">Security & Privacy</h1>
        <p className="text-muted-foreground">Manage your credentials, 2FA, and active deployment sessions.</p>
      </div>

      <div className="grid gap-8">
        <Card className="border-2">
            <CardHeader className="bg-muted/30 border-b">
                <CardTitle className="text-lg flex items-center gap-2"><Key className="h-5 w-5" /> Change Password</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="curr">Current Password</Label>
                        <Input id="curr" type="password" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="new">New Password</Label>
                        <Input id="new" type="password" />
                    </div>
                </div>
            </CardContent>
            <CardFooter className="bg-muted/30 border-t p-4 flex justify-end">
                <Button>Update Password</Button>
            </CardFooter>
        </Card>

        <Card className="border-2 border-primary/20 bg-primary/5">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Smartphone className="h-5 w-5 text-primary" /> Two-Factor Authentication
                        </CardTitle>
                        <CardDescription>Add an extra layer of security to your account.</CardDescription>
                    </div>
                    <Badge className="bg-primary">Recommended</Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-6 p-4 bg-background rounded-xl border border-primary/20">
                    <ShieldCheck className="h-10 w-10 text-primary opacity-20" />
                    <div className="flex-1">
                        <p className="font-bold">TOTP Authenticator</p>
                        <p className="text-sm text-muted-foreground">Use Google Authenticator or Authy to generate secure codes.</p>
                    </div>
                    <Button variant="outline" className="rounded-full">Enable 2FA</Button>
                </div>
            </CardContent>
        </Card>

        <Card className="border-2">
            <CardHeader className="bg-muted/30 border-b">
                <CardTitle className="text-lg flex items-center gap-2"><History className="h-5 w-5" /> Active Sessions</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="divide-y">
                    {[] /* TODO: Fetch active sessions from database if implementing multi-session tracking */.map((session: any, i) => (
                        <div key={i} className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-4">
                                <Lock className="h-4 w-4 text-muted-foreground" />
                                <div>
                                    <p className="font-bold text-sm">{session.device} {session.status === 'Current' && <Badge variant="secondary" className="ml-2">Current</Badge>}</p>
                                    <p className="text-xs text-muted-foreground">{session.location} • {session.time}</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10">Revoke</Button>
                        </div>
                    ))}
                    <div className="p-8 text-center text-sm text-muted-foreground">
                        Session tracking currently limited to current device.
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  )
}
