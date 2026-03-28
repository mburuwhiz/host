"use client"

import { useState } from "react"
import { Users, Plus, UserMinus, Search, Mail, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

export default function TeamMembersSettings() {
  const { toast } = useToast()
  const [inviteOpen, setInviteOpen] = useState(false)

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault()
    setInviteOpen(false)
    toast({ title: "Invitation Sent", description: "A verification token has been emailed." })
  }

  const members = [
    { name: "Josphat Mburu", email: "admin@twoem.com", role: "Owner", status: "Active" },
    { name: "Dev User", email: "dev@twoem.com", role: "Developer", status: "Active" }
  ]

  const pendingInvites = [
    { email: "newhire@twoem.com", role: "Developer", date: "2 mins ago" }
  ]

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
      <div className="flex justify-between items-end border-b border-gray-100 pb-6">
        <div>
          <h1 className="text-3xl font-headline font-bold text-sky-500">Member Management</h1>
          <p className="text-muted-foreground mt-2 text-sm">Manage roles, invites, and RBAC permissions.</p>
        </div>

        <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-500 hover:bg-emerald-600 rounded-full font-bold shadow-lg shadow-emerald-500/20">
              <Plus className="mr-2 h-4 w-4" /> Invite Member
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-sky-500 font-headline">Invite to Team</DialogTitle>
              <DialogDescription>
                System generates a token and sends a verification email. Invitee cannot join until verified.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleInvite} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Input placeholder="Email address" type="email" required />
              </div>
              <div className="space-y-2">
                <Select defaultValue="developer">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="owner">Owner</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="developer">Developer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600">Send Invitation</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Users className="h-5 w-5 text-emerald-500" /> Active Roster</h3>
          <div className="border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-100">
            {members.map((m, i) => (
              <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50/50 transition-colors bg-white">
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10 border-2">
                    <AvatarFallback className="bg-sky-50 text-sky-600 font-bold">{m.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-sm">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200">{m.role}</Badge>
                  <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50 hover:text-red-600"><UserMinus className="h-4 w-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {pendingInvites.length > 0 && (
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-500 flex items-center gap-2">Pending Invites</h3>
            <div className="border border-dashed border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-100">
              {pendingInvites.map((inv, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50/30">
                  <div>
                    <p className="font-bold text-sm">{inv.email}</p>
                    <p className="text-xs text-muted-foreground">Sent {inv.date}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-medium text-gray-500">{inv.role}</span>
                    <Button variant="outline" size="sm" className="text-xs text-red-500 hover:bg-red-50">Revoke</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
