import { Shell } from "@/components/layouts/Shell";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SustainabilityComparison } from "@/components/SustainabilityComparison";

export default function OurStoryPage() {
    return (
        <Shell className="py-12 md:py-20">
            <div className="max-w-4xl mx-auto space-y-12">
                {/* Hero Section */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-serif font-medium">
                        Our Story
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Crafting sustainable stationery for creative minds since 2024
                    </p>
                </div>

                {/* Main Content */}
                <div className="prose prose-lg max-w-none space-y-8">
                    <section className="space-y-4">
                        <h2 className="text-3xl font-serif font-medium">
                            Where It All Began
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Aesthesionery was born from a simple belief: that the tools we use to create should be as beautiful and sustainable as the ideas they help bring to life. In a world increasingly dominated by digital screens, we recognized a growing desire for tactile, meaningful experiences—the feel of quality paper, the flow of a well-crafted pen, the satisfaction of handwritten notes.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            But we also saw a problem. Traditional stationery often came at a cost to our planet. We knew there had to be a better way—one that didn&apos;t compromise on quality, aesthetics, or environmental responsibility.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-3xl font-serif font-medium">
                            Our Commitment to Sustainability
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Every product in our collection is thoughtfully designed with the environment in mind. We source materials from sustainable forests, use recycled and recyclable materials wherever possible, and partner with manufacturers who share our commitment to ethical production practices.
                        </p>

                        <div className="my-12">
                            <h3 className="text-xl font-medium mb-6 text-center">The Aesthesionery Difference</h3>
                            <SustainabilityComparison />
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 my-8">
                            <div className="bg-secondary/30 p-6 rounded-xl space-y-2">
                                <h3 className="font-semibold text-lg">100% Recyclable</h3>
                                <p className="text-sm text-muted-foreground">
                                    All our products are designed to be fully recyclable at the end of their life.
                                </p>
                            </div>
                            <div className="bg-secondary/30 p-6 rounded-xl space-y-2">
                                <h3 className="font-semibold text-lg">Chemical-Free</h3>
                                <p className="text-sm text-muted-foreground">
                                    We use natural, non-toxic materials and processes in all our products.
                                </p>
                            </div>
                            <div className="bg-secondary/30 p-6 rounded-xl space-y-2">
                                <h3 className="font-semibold text-lg">Carbon Neutral</h3>
                                <p className="text-sm text-muted-foreground">
                                    We offset our carbon footprint through verified environmental programs.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-3xl font-serif font-medium">
                            Designed for Creatives
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We believe that great tools inspire great work. That&apos;s why every item in our collection is carefully curated to meet the needs of artists, writers, designers, and thinkers. From the weight of our paper to the balance of our pens, every detail is considered to enhance your creative process.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            Whether you&apos;re sketching your next masterpiece, journaling your thoughts, or planning your next project, Aesthesionery provides the premium, eco-conscious tools you need to bring your ideas to life.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-3xl font-serif font-medium">
                            Join Our Community
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We&apos;re more than just a stationery brand—we&apos;re a community of creators who believe in the power of sustainable choices. When you choose Aesthesionery, you&apos;re not just buying products; you&apos;re joining a movement toward a more beautiful, sustainable future.
                        </p>
                    </section>
                </div>

                {/* CTA Section */}
                <div className="text-center pt-8 space-y-6">
                    <h3 className="text-2xl font-serif font-medium">
                        Ready to create sustainably?
                    </h3>
                    <Link
                        href="/shop"
                        className={cn(
                            buttonVariants({ variant: "default", size: "lg" }),
                            "rounded-full px-8 py-6 text-lg bg-black text-white hover:bg-black/80"
                        )}
                    >
                        Explore Our Collection
                    </Link>
                </div>
            </div>
        </Shell>
    );
}
