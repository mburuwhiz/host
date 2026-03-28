
import Link from "next/link"
import { Calendar, User, ArrowRight } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const posts = [
  {
    slug: "scaling-ubuntu-clusters-with-traefik",
    title: "Scaling Ubuntu Clusters with Dynamic Traefik Orchestration",
    excerpt: "Learn how TWOEM manages high-traffic peaks using optimized Docker Swarm nodes and intelligent edge routing.",
    date: "March 15, 2024",
    author: "Jane Smith",
    category: "Infrastructure"
  },
  {
    slug: "zero-downtime-atomic-deployments",
    title: "The Architecture of Zero-Downtime Atomic Deployments",
    excerpt: "A deep dive into our blue-green deployment strategy and how it ensures your application never goes dark.",
    date: "March 10, 2024",
    author: "John Doe",
    category: "DevOps"
  },
  {
    slug: "nvme-storage-partitioning",
    title: "Optimizing 2.5TB NVMe Partitions for High-Speed I/O",
    excerpt: "How we configured our block storage to provide sub-millisecond latency for persistent volumes.",
    date: "March 5, 2024",
    author: "Alice Tech",
    category: "Storage"
  }
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="space-y-4 mb-16">
          <Badge className="rounded-full px-4 py-1">Engineering Blog</Badge>
          <h1 className="text-6xl font-headline font-bold">Insights from the TWOEM Cluster</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">Deep dives, platform updates, and infrastructure secrets from our orchestration team.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Card key={post.slug} className="group flex flex-col border-2 hover:border-primary/50 transition-all hover:shadow-2xl">
              <CardHeader className="space-y-4">
                <Badge variant="secondary" className="w-fit">{post.category}</Badge>
                <CardTitle className="text-2xl font-headline group-hover:text-primary transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>
              </CardContent>
              <CardFooter className="border-t pt-4 flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
                  <span className="flex items-center gap-1"><User className="h-3 w-3" /> {post.author}</span>
                </div>
                <Link href={`/blog/${post.slug}`} className="text-primary font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read <ArrowRight className="h-3 w-3" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
