
"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Github, ShieldAlert, Loader2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PeekABooCharacter } from "@/components/auth/peek-a-boo-character"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate authentication logic
    setTimeout(() => {
      const isSuperAdmin = email.toLowerCase() === "admin@twoem.com"
      const isUser = email.toLowerCase() === "test@twoem.com"
      
      if (password === "Pass123" && (isSuperAdmin || isUser)) {
        toast({
          title: "Access Granted",
          description: isSuperAdmin ? "Operator terminal engaged." : "Welcome back to the cluster.",
        })

        if (isSuperAdmin) {
          router.push("/admin/dashboard")
        } else {
          router.push("/dashboard")
        }
      } else {
        toast({
          variant: "destructive",
          title: "Authentication Failed",
          description: "Invalid credentials. Please check your signal and try again.",
        })
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-4">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Home</Link>
        </Button>
        <PeekABooCharacter />
        <Card className="shadow-xl border-t-4 border-t-primary">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-headline">Welcome Back</CardTitle>
            <CardDescription>
              Login to your TWOEM account to manage deployments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <Button type="button" variant="outline" className="h-11">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
                <Button type="button" variant="outline" className="h-11">
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335" />
                  </svg>
                  Google
                </Button>
              </div>
              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="test@twoem.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>

              <Alert className="mt-2 bg-primary/5 border-primary/20">
                <ShieldAlert className="h-4 w-4 text-primary" />
                <AlertTitle className="text-xs font-bold text-primary">Test Mode</AlertTitle>
                <AlertDescription className="text-[10px] text-muted-foreground">
                  Admin: <strong>admin@twoem.com</strong> | User: <strong>test@twoem.com</strong><br/>
                  Password: <strong>Pass123</strong>
                </AlertDescription>
              </Alert>

              <Button type="submit" className="w-full h-12 text-lg font-headline mt-2" disabled={loading}>
                {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : "Login to TWOEM"}
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <p className="text-center w-full text-sm text-muted-foreground">
              New to TWOEM? <Link href="/signup" className="text-primary font-bold hover:underline">Sign up</Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
