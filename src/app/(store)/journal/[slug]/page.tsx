import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/blog";
import { Shell } from "@/components/shell";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface BlogPostPageProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: BlogPostPageProps) {
    const post = await getBlogPostBySlug(params.slug);
    if (!post) {
        return {};
    }

    return {
        title: `${post.title} | Aesthesionery Journal`,
        description: post.excerpt,
    };
}

export async function generateStaticParams() {
    const posts = await getBlogPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const post = await getBlogPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <Shell>
            <div className="max-w-3xl mx-auto space-y-8 pb-10">
                <Button variant="ghost" size="sm" asChild className="-ml-4 mb-4">
                    <Link href="/journal">
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back to Journal
                    </Link>
                </Button>

                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                        <span>•</span>
                        <span>{post.tags.join(", ")}</span>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                        {post.title}
                    </h1>
                    <div className="flex items-center gap-3 pt-2">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full bg-muted">
                            <Image
                                src={post.author.avatar}
                                alt={post.author.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="text-sm">
                            <p className="font-medium">{post.author.name}</p>
                            <p className="text-muted-foreground">Author</p>
                        </div>
                    </div>
                </div>

                <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
                    <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                <article className="prose prose-stone dark:prose-invert max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </article>

                <hr className="my-8" />

                <div className="flex justify-center">
                    <Button asChild variant="outline">
                        <Link href="/journal">Read More Stories</Link>
                    </Button>
                </div>
            </div>
        </Shell>
    );
}
