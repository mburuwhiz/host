import Link from "next/link"
import { ArrowLeft, Calendar, User, Clock, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // In a real app, you'd fetch post data based on params.slug
  const post = {
    title: params.slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    date: "March 15, 2024",
    author: "Jane Smith",
    readTime: "8 min read",
    category: "Infrastructure",
    content: "Deploying high-performance clusters requires more than just scaling nodes; it demands intelligent orchestration. At TWOEM, we leverage Traefik to dynamically route traffic across our 2.5TB NVMe-backed Ubuntu nodes..."
  }

  return (
    <div className="min-h-screen bg-background py-24">
      <article className="container mx-auto px-4 max-w-3xl space-y-12">
        <Link href="/blog" className="inline-flex items-center gap-2 text-primary hover:underline font-medium">
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>

        <div className="space-y-6">
          <Badge className="rounded-full px-4 py-1">{post.category}</Badge>
          <h1 className="text-4xl md:text-6xl font-headline font-bold leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-y py-4">
            <span className="flex items-center gap-2"><User className="h-4 w-4" /> {post.author}</span>
            <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {post.date}</span>
            <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> {post.readTime}</span>
          </div>
        </div>

        <div className="prose prose-lg prose-emerald max-w-none text-muted-foreground leading-relaxed space-y-6">
          <p>{post.content}</p>
          <p>Our architecture utilizes isolated cgroups to ensure that every tenant gets exactly the CPU and RAM they've been promised. No noisy neighbors, just pure performance.</p>
          <h2 className="text-2xl font-headline font-bold text-foreground mt-12">Scaling Beyond the Horizon</h2>
          <p>As traffic spikes, our edge routers automatically distribute load based on real-time metrics, ensuring sub-millisecond latency even during the most demanding peaks.</p>
        </div>

        <div className="pt-12 border-t flex justify-between items-center">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-full">
              <Share2 className="h-4 w-4 mr-2" /> Share
            </Button>
          </div>
          <p className="text-xs text-muted-foreground italic">Last updated: {post.date}</p>
        </div>
      </article>
    </div>
  )
}
