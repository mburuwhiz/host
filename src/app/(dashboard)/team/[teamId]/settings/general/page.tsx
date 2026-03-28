"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function TeamGeneralSettings() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast({ title: "Profile Updated", description: "Team identity has been saved." })
    }, 1000)
  }

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
      <div className="border-b border-gray-100 pb-6">
        <h1 className="text-3xl font-headline font-bold text-sky-500">General Profile</h1>
        <p className="text-muted-foreground mt-2 text-sm">Update your team's identity and metadata.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8 max-w-2xl">
        <div className="flex items-center gap-8">
          <div className="h-24 w-24 rounded-2xl bg-sky-50 border-2 border-sky-100 flex flex-col items-center justify-center text-sky-500 cursor-pointer hover:bg-sky-100 transition-colors">
            <Upload className="h-6 w-6 mb-2" />
            <span className="text-[10px] font-bold uppercase">Upload</span>
          </div>
          <div className="space-y-1">
            <p className="font-bold text-sm">Team Avatar</p>
            <p className="text-xs text-muted-foreground">Max file size 2MB. Recommended 256x256.</p>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="space-y-2">
            <Label className="font-bold">Team Name</Label>
            <Input defaultValue="TWOEM Engineering" className="h-11 bg-gray-50/50" />
          </div>

          <div className="space-y-2">
            <Label className="font-bold">Unique Slug</Label>
            <div className="flex">
              <span className="inline-flex items-center px-4 rounded-l-md border border-r-0 border-gray-200 bg-gray-50 text-gray-500 sm:text-sm">
                twoem.app/team/
              </span>
              <Input defaultValue="twoem-engineering" className="rounded-l-none h-11 bg-gray-50/50" />
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-xs text-muted-foreground font-bold uppercase mb-1">Team ID</p>
            <p className="font-mono">team_8f92a1b</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-bold uppercase mb-1">Created At</p>
            <p className="font-mono">March 15, 2024</p>
          </div>
        </div>

        <Button type="submit" disabled={loading} className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold h-11 px-8 rounded-full shadow-lg shadow-emerald-500/20">
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  )
}
