import Link from "next/link";
import { getBlogPosts } from "@/lib/blog";
import { Shell } from "@/components/shell";
import { formatDate } from "@/lib/utils";
import Image from "next/image";

export const metadata = {
    title: "Journal | Aesthesionery",
    description: "Stories about sustainability, creativity, and the art of slow living.",
};

export default async function JournalPage() {
    const posts = await getBlogPosts();
    const [featuredPost, ...otherPosts] = posts;

    return (
        <Shell>
            <div className="space-y-10 pb-10">
                <div className="flex flex-col gap-4">
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">The Journal</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                        Stories about sustainability, creativity, and the art of slow living.
                        Explore our latest thoughts and inspirations.
                    </p>
                </div>

                {featuredPost && (
                    <Link href={`/journal/${featuredPost.slug}`} className="group relative block overflow-hidden rounded-lg border bg-background transition-colors hover:bg-muted/50">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="relative aspect-video md:aspect-auto h-full w-full overflow-hidden">
                                <Image
                                    src={featuredPost.coverImage}
                                    alt={featuredPost.title}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    priority
                                />
                            </div>
                            <div className="flex flex-col justify-center p-6 md:p-10 space-y-4">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <time dateTime={featuredPost.date}>{formatDate(featuredPost.date)}</time>
                                        <span>•</span>
                                        <span>{featuredPost.tags[0]}</span>
                                    </div>
                                    <h2 className="text-2xl font-bold tracking-tight sm:text-3xl group-hover:underline decoration-2 underline-offset-4">
                                        {featuredPost.title}
                                    </h2>
                                    <p className="text-muted-foreground line-clamp-3 md:line-clamp-4">
                                        {featuredPost.excerpt}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 text-sm font-medium">
                                    Read Article
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                                    >
                                        <path d="M5 12h14" />
                                        <path d="m12 5 7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </Link>
                )}

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {otherPosts.map((post) => (
                        <Link key={post.id} href={`/journal/${post.slug}`} className="group flex flex-col space-y-4">
                            <div className="relative aspect-video overflow-hidden rounded-lg border bg-muted">
                                <Image
                                    src={post.coverImage}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                                    <span>•</span>
                                    <span>{post.tags[0]}</span>
                                </div>
                                <h3 className="text-xl font-bold tracking-tight group-hover:underline decoration-2 underline-offset-4">
                                    {post.title}
                                </h3>
                                <p className="text-muted-foreground line-clamp-2">
                                    {post.excerpt}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </Shell>
    );
}
