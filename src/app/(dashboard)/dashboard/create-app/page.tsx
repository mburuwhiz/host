"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Code,
  GitBranch,
  Github,
  Loader2,
  Sparkles,
  Globe,
  Database,
  Trash2,
  Plus,
  Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function CreateAppPage() {
  const router = useRouter()
  const [deploying, setDeploying] = useState(false)
  const [envVars, setEnvVars] = useState([{ key: "", value: "" }])

  const handleDeploy = async (e: React.FormEvent) => {
    e.preventDefault()
    setDeploying(true)
    setTimeout(() => {
        setDeploying(false)
        router.push("/dashboard")
    }, 1500)
  }

  const addEnvVar = () => setEnvVars([...envVars, { key: "", value: "" }])
  const removeEnvVar = (index: number) => setEnvVars(envVars.filter((_, i) => i !== index))

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="rounded-full"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-headline font-bold">Deploy New App</h1>
      </div>

      <form onSubmit={handleDeploy} className="space-y-8">
        <Card className="border-2 shadow-sm">
          <CardHeader className="bg-muted/10 border-b">
            <CardTitle className="text-xl flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" /> Web Service Details
            </CardTitle>
            <CardDescription>
              Configure your service deployment options.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            <div className="grid gap-2">
              <Label htmlFor="name" className="font-bold">
                Name
              </Label>
              <Input
                id="name"
                placeholder="my-awesome-service"
                required
                className="h-12 bg-white"
              />
              <p className="text-xs text-muted-foreground mt-1">
                A unique name for your web service.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label className="font-bold">
                  Project{" "}
                  <span className="font-normal text-muted-foreground">
                    (Optional)
                  </span>
                </Label>
                <Select>
                  <SelectTrigger className="h-12 bg-white">
                    <SelectValue placeholder="Select a project..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default Project</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Add this web service to a project once it's created.
                </p>
              </div>

              <div className="space-y-3">
                <Label className="font-bold">Environment</Label>
                <Select required>
                  <SelectTrigger className="h-12 bg-white">
                    <SelectValue placeholder="Select an environment..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prod">Production</SelectItem>
                    <SelectItem value="stage">Staging</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator />

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label className="font-bold">Language</Label>
                <Select defaultValue="docker">
                  <SelectTrigger className="h-12 bg-white">
                    <SelectValue placeholder="Select language..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="docker">Docker</SelectItem>
                    <SelectItem value="node">Node.js</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Choose the runtime environment for this service.
                </p>
              </div>

              <div className="space-y-3">
                <Label className="font-bold">Branch</Label>
                <Input
                  id="branch"
                  defaultValue="main"
                  className="h-12 bg-white"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  The Git branch to build and deploy.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="font-bold">Region</Label>
              <Select defaultValue="us-west">
                <SelectTrigger className="h-12 bg-white w-full md:w-1/2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us-west">Oregon (US West)</SelectItem>
                  <SelectItem value="us-east">Ohio (US East)</SelectItem>
                  <SelectItem value="eu-central">
                    Frankfurt (EU Central)
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Your services in the same region can communicate over a private
                network.
              </p>
            </div>

            <div className="space-y-3">
              <Label className="font-bold">
                Root Directory{" "}
                <span className="font-normal text-muted-foreground">
                  (Optional)
                </span>
              </Label>
              <Input id="root-dir" placeholder="./" className="h-12 bg-white" />
              <p className="text-xs text-muted-foreground">
                If set, TWOEM runs commands from this directory instead of the
                repository root.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-sm">
          <CardHeader className="bg-muted/10 border-b">
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
              className="border-dashed"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Environment Variable
            </Button>
          </CardContent>
        </Card>

        <div className="flex justify-between items-center pb-12">
          <Button variant="ghost" onClick={() => router.back()} type="button">
            Cancel
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
            {deploying ? "Deploying..." : "Deploy Web Service"}
          </Button>
        </div>
      </form>
    </div>
  );
}
