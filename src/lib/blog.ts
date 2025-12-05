export type BlogPost = {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage: string;
    date: string;
    author: {
        name: string;
        avatar: string;
    };
    tags: string[];
};

export const blogPosts: BlogPost[] = [
    {
        id: "1",
        title: "The Art of Slow Living: Why Handwriting Matters",
        slug: "art-of-slow-living-handwriting",
        excerpt: "In a digital age, taking the time to write by hand is a radical act of mindfulness. Discover how journaling can transform your daily routine.",
        content: `
      <p>In a world dominated by rapid-fire texts and fleeting emails, the act of putting pen to paper feels almost revolutionary. It's a deliberate pause, a moment to slow down and connect with your thoughts in a tangible way.</p>
      
      <h2>The Cognitive Benefits of Handwriting</h2>
      <p>Studies have shown that writing by hand engages the brain differently than typing. It improves memory retention, sparks creativity, and allows for a deeper processing of information. When you write in a journal, you're not just recording events; you're processing emotions and clarifying your inner world.</p>

      <h2>Creating a Ritual</h2>
      <p>Make your writing practice a ritual. Choose a quiet corner, light a candle, and open your favorite notebook. The tactile experience of the paper and the smooth flow of ink can be incredibly soothing. It's a small act of self-care that pays dividends in mental clarity and peace.</p>

      <p>At Aesthesionery, we believe that the tools you use matter. Our sustainable notebooks are designed to be worthy vessels for your most important thoughts.</p>
    `,
        coverImage: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=2070&auto=format&fit=crop",
        date: "October 15, 2023",
        author: {
            name: "Hazel Mae",
            avatar: "https://github.com/shadcn.png",
        },
        tags: ["Mindfulness", "Journaling", "Slow Living"],
    },
    {
        id: "2",
        title: "Sustainable Stationery: A Guide to Eco-Friendly Materials",
        slug: "sustainable-stationery-guide",
        excerpt: "From recycled paper to soy-based inks, learn about the materials that make our stationery kind to the planet.",
        content: `
      <p>Sustainability is at the heart of everything we do. But what does it actually mean to be "eco-friendly" in the world of stationery? It comes down to the materials we choose and the lifecycle of our products.</p>

      <h2>Recycled Paper</h2>
      <p>Using recycled paper saves trees, water, and energy. Our notebooks are made from 100% post-consumer waste, giving a second life to paper that would otherwise end up in landfills. The result is a beautiful, textured surface that's perfect for writing and sketching.</p>

      <h2>Soy-Based Inks</h2>
      <p>Traditional petroleum-based inks can release harmful VOCs into the atmosphere. We use soy-based inks, which are renewable, biodegradable, and produce vibrant colors without the environmental cost.</p>

      <h2>Plastic-Free Packaging</h2>
      <p>We believe that packaging should protect the product, not the planet. That's why we use minimal, plastic-free packaging that is fully recyclable or compostable.</p>
    `,
        coverImage: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=2070&auto=format&fit=crop",
        date: "November 2, 2023",
        author: {
            name: "Hazel Mae",
            avatar: "https://github.com/shadcn.png",
        },
        tags: ["Sustainability", "Eco-Friendly", "Materials"],
    },
    {
        id: "3",
        title: "5 Creative Ways to Use Washi Tape",
        slug: "creative-ways-washi-tape",
        excerpt: "Unleash your creativity with our biodegradable washi tapes. Here are five fun ideas to get you started.",
        content: `
      <p>Washi tape is the duct tape of the crafting world—versatile, colorful, and incredibly useful. But unlike traditional tapes, our washi tape is made from natural fibers and is fully biodegradable.</p>

      <h2>1. Bullet Journal Layouts</h2>
      <p>Use washi tape to create borders, dividers, and headers in your bullet journal. It's a quick way to add color and structure to your pages.</p>

      <h2>2. Gift Wrapping</h2>
      <p>Skip the plastic ribbon and use washi tape to secure your gift wrap. You can create patterns, bows, or simple accents that look chic and unique.</p>

      <h2>3. Cable Organization</h2>
      <p>Label your charging cables with different patterns of washi tape. It's a practical solution that also looks great.</p>

      <h2>4. Wall Art</h2>
      <p>Create temporary wall art or frames for your photos. Washi tape is gentle on surfaces and can be easily removed without leaving residue.</p>

      <h2>5. Personalize Your Tech</h2>
      <p>Add a strip of washi tape to your laptop, phone case, or charger to give it a personal touch.</p>
    `,
        coverImage: "https://images.unsplash.com/photo-1605218427368-35b85079bbc9?q=80&w=2070&auto=format&fit=crop",
        date: "November 20, 2023",
        author: {
            name: "Hazel Mae",
            avatar: "https://github.com/shadcn.png",
        },
        tags: ["Creativity", "DIY", "Washi Tape"],
    },
];

export const getBlogPosts = async (): Promise<BlogPost[]> => {
    return blogPosts;
};

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | undefined> => {
    return blogPosts.find((post) => post.slug === slug);
};
