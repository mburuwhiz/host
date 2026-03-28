"use client"

import { useState } from "react"
import { AlertTriangle, Trash2, ArrowRightLeft, ArchiveX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function TeamDangerSettings() {
  const { toast } = useToast()
  const [deleteConfirm, setDeleteConfirm] = useState("")
  const teamSlug = "twoem-engineering"

  const handleTransfer = () => toast({ title: "Transfer Initiated", description: "Waiting for verification." })
  const handleArchive = () => toast({ title: "Team Archived", description: "Containers stopped. Data retained." })

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault()
    if (deleteConfirm !== teamSlug) {
      toast({ variant: "destructive", title: "Error", description: "Slug does not match." })
      return
    }
    toast({ title: "Team Deleted", description: "Background worker started to wipe 10GB volumes." })
  }

  return (
    <div className="space-y-12 animate-in fade-in zoom-in-95 duration-300 max-w-2xl">
      <div className="border-b border-red-100 pb-6">
        <h1 className="text-3xl font-headline font-bold text-red-500 flex items-center gap-3">
          <AlertTriangle className="h-8 w-8" /> Danger Zone
        </h1>
        <p className="text-red-400 mt-2 text-sm font-medium">Irreversible actions that affect your team and its deployed applications.</p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between p-6 border border-gray-200 rounded-2xl bg-white hover:border-red-200 transition-colors">
          <div>
            <h3 className="font-bold text-gray-900">Transfer Ownership</h3>
            <p className="text-sm text-gray-500 mt-1 max-w-sm">Move the "Owner" status to another verified member of this team.</p>
          </div>
          <Button variant="outline" onClick={handleTransfer} className="font-bold border-gray-200 hover:text-red-600 hover:bg-red-50">
            <ArrowRightLeft className="mr-2 h-4 w-4" /> Transfer
          </Button>
        </div>

        <div className="flex items-center justify-between p-6 border border-gray-200 rounded-2xl bg-white hover:border-red-200 transition-colors">
          <div>
            <h3 className="font-bold text-gray-900">Archive Team</h3>
            <p className="text-sm text-gray-500 mt-1 max-w-sm">Stops all containers and reclaims CPU/RAM. Keeps the 10GB data volumes.</p>
          </div>
          <Button variant="outline" onClick={handleArchive} className="font-bold border-gray-200 hover:text-red-600 hover:bg-red-50">
            <ArchiveX className="mr-2 h-4 w-4" /> Archive
          </Button>
        </div>

        <div className="p-6 border-2 border-red-100 rounded-2xl bg-red-50/30">
          <div className="mb-4">
            <h3 className="font-bold text-red-600">Delete Team</h3>
            <p className="text-sm text-red-500/80 mt-1">
              Red-button action. Wipes all 10GB volumes, deletes SQLite entries, and completely removes the team.
            </p>
          </div>
          <form onSubmit={handleDelete} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-red-600 font-bold">Type "{teamSlug}" to confirm</Label>
              <Input
                value={deleteConfirm}
                onChange={(e) => setDeleteConfirm(e.target.value)}
                className="bg-white border-red-200 focus-visible:ring-red-500 h-11"
                required
              />
            </div>
            <Button type="submit" variant="destructive" className="w-full h-11 font-bold bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/20">
              <Trash2 className="mr-2 h-4 w-4" /> Permanently Delete Team
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
