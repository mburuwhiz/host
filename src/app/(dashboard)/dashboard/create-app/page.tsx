"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, Check, Code, GitBranch, Github, Loader2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { detectCodebaseConfiguration, type AiSmartCodeDetectionOutput } from "@/ai/flows/ai-smart-code-detection"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export default function CreateAppPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [repoUrl, setRepoUrl] = useState("")
  const [detecting, setDetecting] = useState(false)
  const [detected, setDetected] = useState<AiSmartCodeDetectionOutput | null>(null)

  const handleDetect = async () => {
    setDetecting(true)
    try {
      // Simulate detection call with the AI flow
      const result = await detectCodebaseConfiguration({
        repoSummary: `A Next.js project found in ${repoUrl}. contains package.json with scripts.`,
        packageJsonContent: JSON.stringify({
            name: "twoem-sample",
            scripts: { build: "next build", start: "next start" },
            dependencies: { "next": "latest", "react": "latest" }
        }),
        indexHtmlDetected: false
      })
      setDetected(result)
      setStep(2)
    } catch (error) {
      console.error(error)
    } finally {
      setDetecting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-headline font-bold">Deploy New App</h1>
      </div>

      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
                <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all",
                    step === s ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-110" : 
                    step > s ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                )}>
                    {step > s ? <Check className="h-5 w-5" /> : s}
                </div>
                {s < 3 && <div className={cn("w-12 h-1 bg-muted rounded-full", step > s && "bg-primary/20")} />}
            </div>
        ))}
      </div>

      {step === 1 && (
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="font-headline text-2xl flex items-center gap-2">
                <Github className="h-6 w-6" /> Connect Repository
            </CardTitle>
            <CardDescription>Enter the URL of your Git repository to begin the deployment process.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
                <Label htmlFor="repo">Git Repository URL</Label>
                <div className="flex gap-2">
                    <Input 
                        id="repo" 
                        placeholder="https://github.com/username/project" 
                        value={repoUrl}
                        onChange={(e) => setRepoUrl(e.target.value)}
                        className="h-12" 
                    />
                    <Button 
                        size="lg" 
                        onClick={handleDetect} 
                        disabled={!repoUrl || detecting}
                        className="rounded-lg h-12"
                    >
                        {detecting ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Sparkles className="h-5 w-5 mr-2" />}
                        {detecting ? "Analyzing..." : "Analyze Repo"}
                    </Button>
                </div>
            </div>
            <div className="bg-secondary/5 rounded-xl p-4 border border-secondary/20">
                <p className="text-sm font-medium flex items-center gap-2 text-secondary mb-2">
                    <Code className="h-4 w-4" /> Smart Detection Active
                </p>
                <p className="text-xs text-muted-foreground">Our AI will intelligently analyze your codebase to suggest the optimal build and start commands for zero-config deployment.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 2 && detected && (
        <Card className="border-2 animate-in fade-in slide-in-from-right duration-500">
            <CardHeader>
                <CardTitle className="font-headline text-2xl flex items-center gap-2">
                    <Sparkles className="h-6 w-6 text-primary" /> AI Smart-Detection Results
                </CardTitle>
                <CardDescription>We analyzed your repository and suggested the following configuration.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label>Detected Language</Label>
                        <div className="p-3 bg-muted rounded-lg font-semibold">{detected.detectedLanguage}</div>
                    </div>
                    <div className="space-y-2">
                        <Label>Framework</Label>
                        <div className="p-3 bg-muted rounded-lg font-semibold">{detected.detectedFramework || "Generic"}</div>
                    </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                    <div className="grid gap-2">
                        <Label htmlFor="build-cmd">Build Command</Label>
                        <Input id="build-cmd" defaultValue={detected.buildCommand} className="font-mono h-11" />
                        <p className="text-[10px] text-muted-foreground">Command to install dependencies and compile assets.</p>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="start-cmd">Start Command</Label>
                        <Input id="start-cmd" defaultValue={detected.startCommand} className="font-mono h-11" />
                        <p className="text-[10px] text-muted-foreground">Command to start your production server.</p>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="root-dir">Root Directory</Label>
                        <Input id="root-dir" defaultValue={detected.rootDirectory} className="font-mono h-11" />
                    </div>
                </div>

                <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
                    <div className="flex justify-between items-center mb-1">
                        <p className="text-sm font-bold text-primary">Detection Confidence</p>
                        <Badge variant="outline" className="bg-white">{detected.confidenceScore}%</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground italic">&quot;{detected.explanation}&quot;</p>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
                <Button className="rounded-lg h-12 px-8" onClick={() => setStep(3)}>
                    Continue to Resources
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </CardFooter>
        </Card>
      )}

      {step === 3 && (
        <Card className="border-2 animate-in fade-in slide-in-from-right duration-500">
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Finalize & Deploy</CardTitle>
                <CardDescription>Review your application name and resource allocation.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid gap-2">
                    <Label htmlFor="app-name">Application Name</Label>
                    <Input id="app-name" defaultValue="my-cool-project" className="h-11" />
                </div>
                <div className="grid gap-6 md:grid-cols-2 pt-4">
                    <div className="space-y-4">
                        <Label>Memory (RAM)</Label>
                        <div className="p-4 border rounded-xl bg-muted/20">
                            <div className="flex justify-between font-bold mb-2">
                                <span>512 MB</span>
                                <span className="text-primary">$5/mo</span>
                            </div>
                            <p className="text-xs text-muted-foreground">Standard tier suitable for static sites and small workers.</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <Label>CPU</Label>
                        <div className="p-4 border rounded-xl bg-muted/20">
                            <div className="flex justify-between font-bold mb-2">
                                <span>0.5 vCPU</span>
                                <span className="text-primary">Included</span>
                            </div>
                            <p className="text-xs text-muted-foreground">Hard-limited isolated core execution.</p>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="ghost" onClick={() => setStep(2)}>Back</Button>
                <Button className="rounded-lg h-12 px-12 text-lg shadow-xl shadow-primary/20" asChild>
                    <Link href="/dashboard">Launch Application</Link>
                </Button>
            </CardFooter>
        </Card>
      )}
    </div>
  )
}
