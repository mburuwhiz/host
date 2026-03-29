"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  GitBranch,
  Github,
  Loader2,
  Globe,
  Database,
  Trash2,
  Plus,
  Terminal,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

export default function CreateAppPage() {
  const router = useRouter()
  const { toast } = useToast()

  // Steps: 1 = Enter Repo, 2 = Configure & Deploy
  const [step, setStep] = useState(1)

  // Repository state
  const [repoUrl, setRepoUrl] = useState("")
  const [verifyingRepo, setVerifyingRepo] = useState(false)
  const [branches, setBranches] = useState<string[]>([])
  const [repoDetails, setRepoDetails] = useState<{owner: string, name: string} | null>(null)

  // App Config state
  const [appName, setAppName] = useState("")
  const [branch, setBranch] = useState("")
  const [language, setLanguage] = useState("node")
  const [rootDir, setRootDir] = useState("./")
  const [deploying, setDeploying] = useState(false)
  const [envVars, setEnvVars] = useState([{ key: "", value: "" }])

  const handleVerifyRepo = async (e: React.FormEvent) => {
    e.preventDefault()
    setVerifyingRepo(true)

    try {
        // Simple regex to extract owner/repo from GitHub URL
        const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/.]+)/)
        if (!match) throw new Error("Invalid GitHub URL. Must be formatted like https://github.com/owner/repo")

        const owner = match[1]
        const name = match[2]

        // Fetch public branches directly from GitHub API
        const res = await fetch(`https://api.github.com/repos/${owner}/${name}/branches`)
        if (!res.ok) throw new Error("Repository not found or is private. Please connect your GitHub account for private repos.")

        const data = await res.json()
        const branchNames = data.map((b: any) => b.name)

        setRepoDetails({ owner, name })
        setBranches(branchNames)
        setBranch(branchNames.includes("main") ? "main" : (branchNames.includes("master") ? "master" : branchNames[0]))
        setAppName(name.toLowerCase().replace(/[^a-z0-9-]/g, '-')) // Auto-generate app name from repo

        toast({ title: "Repository Verified", description: `Found ${branchNames.length} branches.` })
        setStep(2)
    } catch (e: any) {
        toast({ variant: "destructive", title: "Verification Failed", description: e.message })
    } finally {
        setVerifyingRepo(false)
    }
  }

  const handleDeploy = async (e: React.FormEvent) => {
    e.preventDefault()
    setDeploying(true)

    // Here we would call our backend orchestration API: `/api/orchestration/deploy`
    toast({
        title: "Deployment Initialized",
        description: `Starting build for ${appName} on branch ${branch}...`
    })

    setTimeout(() => {
        setDeploying(false)
        router.push(`/apps/new-app-id/deployments`) // Redirect to the actual deployment logs view
    }, 2000)
  }

  const addEnvVar = () => setEnvVars([...envVars, { key: "", value: "" }])
  const removeEnvVar = (index: number) => setEnvVars(envVars.filter((_, i) => i !== index))

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => step === 2 ? setStep(1) : router.back()}
          className="rounded-full"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-headline font-bold">Deploy New App</h1>
      </div>

      {step === 1 && (
          <Card className="border-2 shadow-xl rounded-[2rem] overflow-hidden">
            <CardHeader className="bg-muted/30 border-b p-8">
              <CardTitle className="text-2xl flex items-center gap-3">
                  <Github className="h-8 w-8 text-primary" /> Import Git Repository
              </CardTitle>
              <CardDescription className="text-base mt-2">
                Enter a public GitHub repository URL, or connect your account to import private repositories.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
                <form onSubmit={handleVerifyRepo} className="space-y-6">
                    <div className="space-y-3">
                        <Label className="font-bold text-lg">Repository URL</Label>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Input
                                placeholder="https://github.com/username/repository"
                                value={repoUrl}
                                onChange={(e) => setRepoUrl(e.target.value)}
                                className="h-14 text-lg bg-gray-50 flex-1"
                                required
                            />
                            <Button type="submit" disabled={verifyingRepo} className="h-14 px-8 font-bold text-lg rounded-xl shadow-lg shadow-primary/20">
                                {verifyingRepo ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : "Continue"}
                                {!verifyingRepo && <ArrowRight className="h-5 w-5 ml-2" />}
                            </Button>
                        </div>
                    </div>
                </form>

                <div className="mt-12 relative">
                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-dashed" /></div>
                    <div className="relative flex justify-center text-xs uppercase font-bold text-muted-foreground"><span className="bg-white px-4">OR</span></div>
                </div>

                <div className="mt-8 flex justify-center">
                    <Button variant="outline" size="lg" className="h-14 px-8 rounded-xl font-bold border-2 hover:bg-gray-50">
                        <Lock className="mr-2 h-5 w-5 text-gray-500" /> Connect GitHub Account
                    </Button>
                </div>
            </CardContent>
          </Card>
      )}

      {step === 2 && (
        <form onSubmit={handleDeploy} className="space-y-8">
            <Card className="border-2 shadow-sm rounded-3xl overflow-hidden">
            <CardHeader className="bg-muted/10 border-b p-6">
                <CardTitle className="text-xl flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" /> Web Service Details
                </CardTitle>
                <CardDescription>
                Configure your service deployment options for <span className="font-bold text-primary">{repoDetails?.owner}/{repoDetails?.name}</span>.
                </CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="grid gap-2">
                <Label htmlFor="name" className="font-bold">
                    App Name
                </Label>
                <Input
                    id="name"
                    value={appName}
                    onChange={(e) => setAppName(e.target.value)}
                    required
                    className="h-12 bg-white"
                />
                <p className="text-xs text-muted-foreground mt-1">
                    This will be used as your subdomain: <span className="font-bold">{appName || 'app'}.whizpoint.app</span>
                </p>
                </div>

                <Separator />

                <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                    <Label className="font-bold flex items-center gap-2"><Terminal className="h-4 w-4" /> Framework Preset</Label>
                    <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="h-12 bg-white">
                        <SelectValue placeholder="Select language..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="html">Static HTML</SelectItem>
                        <SelectItem value="node">Node.js</SelectItem>
                        <SelectItem value="docker">Docker (Custom Dockerfile)</SelectItem>
                    </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                    We will automatically compile and route this application.
                    </p>
                </div>

                <div className="space-y-3">
                    <Label className="font-bold flex items-center gap-2"><GitBranch className="h-4 w-4" /> Branch</Label>
                    <Select value={branch} onValueChange={setBranch} required>
                        <SelectTrigger className="h-12 bg-white">
                            <SelectValue placeholder="Select branch..." />
                        </SelectTrigger>
                        <SelectContent>
                            {branches.map(b => (
                                <SelectItem key={b} value={b}>{b}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                    The Git branch to continuously deploy.
                    </p>
                </div>
                </div>

                <div className="space-y-3">
                <Label className="font-bold">
                    Root Directory{" "}
                    <span className="font-normal text-muted-foreground">
                    (Optional)
                    </span>
                </Label>
                <Input id="root-dir" value={rootDir} onChange={e => setRootDir(e.target.value)} placeholder="./" className="h-12 bg-white" />
                <p className="text-xs text-muted-foreground">
                    If set, TWOEM Engine runs build commands from this directory instead of the repository root.
                </p>
                </div>
            </CardContent>
            </Card>

            <Card className="border-2 shadow-sm rounded-3xl overflow-hidden">
            <CardHeader className="bg-muted/10 border-b p-6">
                <CardTitle className="text-xl flex items-center gap-2">
                <Database className="h-5 w-5 text-secondary" /> Environment
                Variables
                </CardTitle>
                <CardDescription>
                Set environment-specific config and secrets (such as API keys),
                then read those values from your code.
                </CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
                <div className="space-y-4">
                {envVars.map((env, i) => (
                    <div key={i} className="flex items-center gap-3">
                    <Input
                        placeholder="NAME_OF_VARIABLE"
                        value={env.key}
                        onChange={(e) => {
                        const newVars = [...envVars];
                        newVars[i].key = e.target.value.toUpperCase();
                        setEnvVars(newVars);
                        }}
                        className="font-mono bg-white"
                    />
                    <Input
                        placeholder="value"
                        value={env.value}
                        onChange={(e) => {
                        const newVars = [...envVars];
                        newVars[i].value = e.target.value;
                        setEnvVars(newVars);
                        }}
                        className="font-mono bg-white"
                    />
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeEnvVar(i)}
                        className="text-destructive hover:bg-destructive/10 shrink-0"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                    </div>
                ))}
                </div>
                <Button
                type="button"
                variant="outline"
                onClick={addEnvVar}
                className="border-dashed h-12 w-full text-muted-foreground hover:text-foreground"
                >
                <Plus className="mr-2 h-4 w-4" /> Add Environment Variable
                </Button>
            </CardContent>
            </Card>

            <div className="flex justify-between items-center pb-12">
            <Button variant="ghost" onClick={() => setStep(1)} type="button" className="font-bold">
                Back to Repository
            </Button>
            <Button
                type="submit"
                size="lg"
                className="rounded-full px-12 h-14 font-bold shadow-lg shadow-primary/20 text-lg"
                disabled={deploying}
            >
                {deploying ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                <Terminal className="mr-2 h-5 w-5" />
                )}
                {deploying ? "Provisioning Container..." : "Deploy App"}
            </Button>
            </div>
        </form>
      )}
    </div>
  );
}
