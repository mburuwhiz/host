
"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, AreaChart, Area, CartesianGrid } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const data = [
  { time: "10:00", cpu: 12, ram: 312, net: 140 },
  { time: "10:05", cpu: 18, ram: 315, net: 210 },
  { time: "10:10", cpu: 25, ram: 340, net: 450 },
  { time: "10:15", cpu: 15, ram: 330, net: 320 },
  { time: "10:20", cpu: 45, ram: 420, net: 890 },
  { time: "10:25", cpu: 32, ram: 410, net: 650 },
  { time: "10:30", cpu: 22, ram: 390, net: 410 },
]

export default function AppMetricsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-2xl font-headline font-bold">Resource Analytics</h2>
            <p className="text-sm text-muted-foreground">Historical utilization data from your isolated node partition.</p>
        </div>
        <Select defaultValue="1h">
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="15m">Last 15 minutes</SelectItem>
                <SelectItem value="1h">Last 1 hour</SelectItem>
                <SelectItem value="6h">Last 6 hours</SelectItem>
                <SelectItem value="24h">Last 24 hours</SelectItem>
            </SelectContent>
        </Select>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="border-2 overflow-hidden">
            <CardHeader className="bg-muted/30 border-b">
                <CardTitle className="text-lg">CPU Utilization (%)</CardTitle>
            </CardHeader>
            <CardContent className="pt-8 h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                        <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip />
                        <Area type="monotone" dataKey="cpu" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorCpu)" strokeWidth={3} />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>

        <Card className="border-2 overflow-hidden">
            <CardHeader className="bg-muted/30 border-b">
                <CardTitle className="text-lg">Memory Usage (MB)</CardTitle>
            </CardHeader>
            <CardContent className="pt-8 h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorRam" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                        <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip />
                        <Area type="monotone" dataKey="ram" stroke="hsl(var(--secondary))" fillOpacity={1} fill="url(#colorRam)" strokeWidth={3} />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>

        <Card className="lg:col-span-2 border-2 overflow-hidden">
            <CardHeader className="bg-muted/30 border-b">
                <CardTitle className="text-lg">Network Traffic (KB/s)</CardTitle>
            </CardHeader>
            <CardContent className="pt-8 h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                        <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip />
                        <Bar dataKey="net" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
      </div>
    </div>
  )
}
