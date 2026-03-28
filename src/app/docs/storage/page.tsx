
import { Database, HardDrive, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function StorageDocs() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        <h1 className="text-4xl font-headline font-bold">Storage & Persistent Volumes</h1>
        <p className="text-lg text-muted-foreground">Mastering the 2.5TB NVMe partition.</p>
      </div>

      <Alert className="bg-primary/5 border-primary/20">
        <Info className="h-4 w-4" />
        <AlertTitle>Persistent Mounts</AlertTitle>
        <AlertDescription>
          Data stored outside of defined persistent volumes will be lost during redeployment. Always use /data or custom mount points.
        </AlertDescription>
      </Alert>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="p-8 border-2 rounded-2xl space-y-4">
            <HardDrive className="h-10 w-10 text-primary" />
            <h3 className="text-xl font-bold font-headline">NVMe Performance</h3>
            <p className="text-sm text-muted-foreground">Our block storage provides sub-millisecond I/O latency, perfect for high-traffic databases.</p>
        </div>
        <div className="p-8 border-2 rounded-2xl space-y-4">
            <Database className="h-10 w-10 text-secondary" />
            <h3 className="text-xl font-bold font-headline">Shared Partitions</h3>
            <p className="text-sm text-muted-foreground">Shared storage allows multiple instances to access the same volume for assets or shared caches.</p>
        </div>
      </div>
    </div>
  )
}
