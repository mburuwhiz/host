
"use client"

import Link from "next/link"
import { useState } from "react"
import { Github, Mail, User, Building2, Phone, Briefcase, ArrowLeft, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PeekABooCharacter } from "@/components/auth/peek-a-boo-character"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { registerUser } from "@/lib/actions/auth"
import { signIn } from "next-auth/react"

export default function SignupPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formDataState, setFormDataState] = useState({
    fullname: "",
    email: "",
    password: "",
    company: "",
    role: "",
    phone: "",
    dobDay: "",
    dobMonth: "",
    dobYear: "",
    compliance: false,
  })
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormDataState(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormDataState(prev => ({ ...prev, [name]: value }))
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.target as HTMLFormElement)

    try {
      const res = await registerUser(formData)
      if (res.error) {
        toast({ variant: "destructive", title: "Error", description: res.error })
        setLoading(false)
        return
      }

      toast({
          title: "Account Provisioned",
          description: "Please check your email to verify your account.",
      })
      router.push("/verify-request")
    } catch(err) {
      toast({ variant: "destructive", title: "Error", description: "An error occurred." })
    } finally {
      setLoading(false)
    }
  }

  const [step, setStep] = useState(1)

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault()
    setStep(step + 1)
  }

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault()
    setStep(step - 1)
  }

  return (
    <div className="min-h-screen py-16 flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-2xl space-y-4">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Home</Link>
        </Button>
        <PeekABooCharacter />
        <Card className="shadow-2xl border-t-4 border-t-primary overflow-hidden">
          <CardHeader className="bg-card/50 border-b text-center p-10">
            <CardTitle className="text-4xl font-headline">Create Your Account</CardTitle>
            <CardDescription className="text-lg mt-2">
              Join TWOEM and orchestrate your first cluster today.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-10 space-y-8">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="h-12 border-2" onClick={() => signIn('github', { callbackUrl: '/dashboard' })} type="button">
                <Github className="mr-2 h-5 w-5" />
                GitHub
              </Button>
              <Button variant="outline" className="h-12 border-2" onClick={() => signIn('google', { callbackUrl: '/dashboard' })} type="button">
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335" />
                </svg>
                Google
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-4 text-muted-foreground font-bold tracking-widest">Or Register Manually</span>
              </div>
            </div>

            <form onSubmit={handleSignup} className="space-y-8 relative">
              {step === 1 && (
                <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                    <h3 className="text-xl font-bold mb-6 font-headline text-primary">Step 1: Personal Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                        <Label htmlFor="fullname">Full Name</Label>
                        <div className="relative group">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input id="fullname" name="fullname" value={formDataState.fullname} onChange={handleInputChange} placeholder="Johnathan Doe" className="pl-10" required />
                        </div>
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="email">Work Email</Label>
                        <div className="relative group">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input id="email" name="email" type="email" value={formDataState.email} onChange={handleInputChange} placeholder="john@company.com" className="pl-10" required />
                        </div>
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="birthyear">Birth Year</Label>
                        <Select name="birthyear" value={formDataState.dobYear} onValueChange={(val) => handleSelectChange('dobYear', val)} required>
                            <SelectTrigger id="birthyear" className="h-10">
                            <SelectValue placeholder="Select Year" />
                            </SelectTrigger>
                            <SelectContent>
                            {years.map((year) => (
                                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative group">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input id="phone" name="phone" type="tel" placeholder="+254 700 000 000" className="pl-10" />
                        </div>
                        </div>
                    </div>
                    <div className="flex justify-end mt-8">
                        <Button type="button" onClick={handleNext} className="w-full sm:w-auto h-12 px-8 rounded-full">Continue <ArrowRight className="ml-2 h-4 w-4" /></Button>
                    </div>
                </div>
              )}

              {step === 2 && (
                <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                    <h3 className="text-xl font-bold mb-6 font-headline text-primary">Step 2: Professional Profile</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <div className="relative group">
                            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input id="company" name="company" value={formDataState.company} onChange={handleInputChange} placeholder="Organization name" className="pl-10" />
                        </div>
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="position">Position</Label>
                        <div className="relative group">
                            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input id="position" name="position" defaultValue="" placeholder="Job title" className="pl-10" />
                        </div>
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="role">Primary Role</Label>
                        <Select name="role" value={formDataState.role} onValueChange={(val) => handleSelectChange('role', val)} required>
                            <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value="eng">Engineer</SelectItem>
                            <SelectItem value="ops">DevOps/SRE</SelectItem>
                            <SelectItem value="founder">Founder</SelectItem>
                            </SelectContent>
                        </Select>
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="language">Programming Language</Label>
                        <Select name="language" required>
                            <SelectTrigger>
                            <SelectValue placeholder="Main language" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value="js">Node.js</SelectItem>
                            <SelectItem value="py">Python</SelectItem>
                            <SelectItem value="go">Go</SelectItem>
                            <SelectItem value="rs">Rust</SelectItem>
                            <SelectItem value="others">Others</SelectItem>
                            </SelectContent>
                        </Select>
                        </div>
                    </div>
                    <div className="flex justify-between mt-8">
                        <Button type="button" variant="outline" onClick={handleBack} className="h-12 px-8 rounded-full"><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
                        <Button type="button" onClick={handleNext} className="w-full sm:w-auto h-12 px-8 rounded-full">Continue <ArrowRight className="ml-2 h-4 w-4" /></Button>
                    </div>
                </div>
              )}

              {step === 3 && (
                <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                    <h3 className="text-xl font-bold mb-6 font-headline text-primary">Step 3: Secure Account</h3>
                    <div className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" value={formDataState.password} onChange={handleInputChange} required className="h-12" />
                            <p className="text-[10px] text-muted-foreground">Encryption level: Argon2id (Master Cluster standard).</p>
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-xl border border-primary/20">
                            <Checkbox id="terms" className="mt-1" required checked={formDataState.compliance} onCheckedChange={(checked) => setFormDataState(prev => ({...prev, compliance: checked as boolean}))} />
                            <div className="grid gap-1 leading-none">
                            <Label htmlFor="terms" className="text-sm font-medium cursor-pointer">
                                I agree to the <Link href="/legal" className="text-primary hover:underline">Terms of Service</Link> and <Link href="/legal" className="text-primary hover:underline">Privacy Policy</Link>
                            </Label>
                            <p className="text-xs text-muted-foreground">Required for cluster resource provisioning.</p>
                            </div>
                        </div>

                        <div className="flex justify-between pt-4">
                            <Button type="button" variant="outline" onClick={handleBack} className="h-12 px-8 rounded-full"><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
                            <Button type="submit" size="lg" className="w-full sm:w-auto h-12 px-12 text-lg font-headline shadow-xl shadow-primary/20 rounded-full" disabled={loading}>
                                {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : "Initialize Account"}
                            </Button>
                        </div>
                    </div>
                </div>
              )}
            </form>
          </CardContent>
          <CardFooter className="bg-muted/30 p-8">
            <p className="text-center w-full text-sm text-muted-foreground">
              Connected? <Link href="/login" className="text-primary font-bold hover:underline">Login to Cluster</Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
