import { getCurrentUser } from "@/features/users/actions";
import { Shell } from "@/components/layouts/Shell";
import { buttonVariants } from "@/components/ui/button";
import {
  CollectionCardFragment,
} from "@/features/collections";
import {
  ProductCard,
  ProductCardFragment,
  ProductCardSkeleton,
} from "@/features/products";
import { DocumentType, gql } from "@/gql";
import { getClient } from "@/lib/urql";
import { cn, keytoUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { SustainabilityIcons } from "@/components/SustainabilityIcons";

const LandingRouteQuery = gql(/* GraphQL */ `
  query LandingRouteQuery($user_id: UUID) {
    products: productsCollection(
      first: 20
      orderBy: [{ created_at: DescNullsLast }]
    ) {
      edges {
        node {
          id
          ...ProductCardFragment
        }
      }
    }

    collectionScrollCards: collectionsCollection(
      first: 6
      orderBy: [{ order: DescNullsLast }]
    ) {
      edges {
        node {
          id
          ...CollectionCardFragment
        }
      }
    }
  }
`);

export default async function Home() {
  const currentUser = await getCurrentUser();

  const { data } = await getClient().query(LandingRouteQuery, {
    user_id: currentUser?.id,
  } as any);

  if (!data) return notFound();

  const collections = data.collectionScrollCards?.edges ?? [];
  const allProducts = data.products?.edges ?? [];

  // Filter products with 'latest' tag AND featured for Latest Arrivals
  const latestArrivals = allProducts.filter(({ node }) =>
    node.tags?.includes('latest')
  ).slice(0, 5);

  // Filter featured products for Our Products section
  const products = allProducts.filter(({ node }) =>
    node.featured === true
  ).slice(0, 10);

  return (
    <main>
      <HeroSection />

      <Shell className="gap-12 md:gap-20">
        {collections.length > 0 ? (
          <CategoryGrid collections={collections} />
        ) : null}
      </Shell>

      {latestArrivals.length > 0 ? (
        <div className="w-full px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-screen-xl mx-auto">
          <FeaturedProductsCards products={latestArrivals} />
        </div>
      ) : null}

      {products.length > 0 ? (
        <div className="w-full px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-screen-xl mx-auto">
          <OurProductsSection products={products} />
        </div>
      ) : null}

      <Shell className="gap-12 md:gap-20">
        <SustainabilityIcons />

        <JoinCreativesBanner />
      </Shell>
    </main>
  );
}

function HeroSection() {
  return (
    <section className="w-full bg-[#FAFAF9] py-12 md:py-20 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Content */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-8 z-10">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium text-[#2C2C2C] leading-[1.05] tracking-tight">
              Sustainable stationery for <br />
              <span className="text-[#8B7355] italic">modern creatives</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto md:mx-0 leading-relaxed">
              Designed with recycled materials. Made for great ideas. Join the movement of conscious creators.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 w-full md:w-auto items-center">
            <Link
              href="/shop"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "rounded-full px-10 py-6 text-lg bg-[#2C2C2C] text-white hover:bg-[#404040] shadow-lg hover:shadow-xl transition-all"
              )}
            >
              Shop Now
            </Link>

            <div className="flex items-center justify-center gap-4 px-6">
              <div className="flex -space-x-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-gray-200 border-[3px] border-[#FAFAF9]" />
                ))}
              </div>
              <div className="text-sm text-left">
                <p className="font-bold text-[#2C2C2C] text-base">100k+</p>
                <p className="text-muted-foreground text-xs uppercase tracking-wider">Happy Customers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Composition */}
        <div className="relative h-[400px] md:h-[550px] w-full flex items-center justify-center md:justify-end">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 md:-right-6 text-[#E5E5E5]">
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="49" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>

          {/* Back Image (Person) - Pill Shape */}
          <div className="absolute right-0 md:right-10 top-6 bottom-6 w-[220px] md:w-[280px] rounded-[140px] overflow-hidden shadow-2xl z-0 transform rotate-[-3deg]">
            <Image
              src="/assets/hero-person-vertical.png"
              alt="Creative person writing"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Front Image (Product) - Arch Shape */}
          <div className="absolute left-4 md:left-12 bottom-0 h-[280px] md:h-[350px] w-[200px] md:w-[250px] rounded-t-full overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-[6px] border-[#FAFAF9] z-10">
            <Image
              src="/assets/hero-product-vertical.png"
              alt="Stationery product detail"
              fill
              className="object-cover"
            />
          </div>

          {/* Floating Star */}
          <div className="absolute bottom-16 -left-4 text-[#D4A373] animate-pulse">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

interface CollectionsCardsProps {
  collections: { node: DocumentType<typeof CollectionCardFragment> }[];
}

function CategoryGrid({ collections }: CollectionsCardsProps) {
  return (
    <section className="space-y-6">
      <div className="flex justify-between items-end">
        <h2 className="text-2xl md:text-3xl font-serif font-medium">Categories</h2>
        <Link href="/shop" className="text-sm font-medium hover:underline">See all</Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {collections.slice(0, 4).map(({ node }) => (
          <Link
            href={`/collections/${node.slug}`}
            key={`category_${node.id}`}
            className="group flex flex-col space-y-3"
          >
            <div className="relative aspect-square bg-secondary rounded-2xl overflow-hidden">
              <Image
                src={keytoUrl(node.featuredImage.key)}
                alt={node.featuredImage.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <p className="font-medium text-lg">{node.label}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

interface FeaturedProductsCardsProps {
  products: { node: DocumentType<typeof ProductCardFragment> }[];
}

function FeaturedProductsCards({ products }: FeaturedProductsCardsProps) {
  return (
    <section className="space-y-6 max-w-none">
      <div className="flex justify-between items-end">
        <h2 className="text-2xl md:text-3xl font-serif font-medium">Our latest arrivals</h2>
        <Link href="/shop" className="text-sm font-medium hover:underline">See all</Link>
      </div>
      <p className="text-muted-foreground max-w-2xl">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <Suspense
          fallback={[...Array(5)].map((_, index) => (
            <div key={index} className="aspect-[4/5] bg-secondary animate-pulse rounded-xl" />
          ))}
        >
          {products.slice(0, 5).map(({ node }) => (
            <div key={node.id} className="group relative aspect-[4/5] bg-secondary rounded-xl overflow-hidden">
              <Image
                src={keytoUrl(node.featuredImage.key)}
                alt={node.featuredImage.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </Suspense>
      </div>
    </section>
  );
}

function OurProductsSection({ products }: FeaturedProductsCardsProps) {
  return (
    <section className="space-y-6 max-w-none">
      <div className="flex justify-between items-end">
        <h2 className="text-2xl md:text-3xl font-serif font-medium">Our Products</h2>
        <Link href="/shop" className="text-sm font-medium hover:underline">See all</Link>
      </div>
      <p className="text-muted-foreground max-w-2xl">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <Suspense
          fallback={[...Array(5)].map((_, index) => (
            <ProductCardSkeleton key={`Product-Skeleton-${index}`} />
          ))}
        >
          {products.map(({ node }) => (
            <ProductCard key={`product-card-${node.id}`} product={node} className="bg-transparent shadow-none border-none" />
          ))}
        </Suspense>
      </div>
    </section>
  );
}

function JoinCreativesBanner() {
  return (
    <section className="w-full bg-secondary/50 rounded-3xl p-8 md:p-16 text-center space-y-6 my-8">
      <h2 className="text-2xl md:text-3xl font-serif font-medium max-w-lg mx-auto">
        Join other creatives choosing sustainable stationery.
      </h2>
      <Link
        href="/shop"
        className={cn(
          buttonVariants({ variant: "default", size: "lg" }),
          "rounded-full px-8 py-6 text-lg bg-black text-white hover:bg-black/80"
        )}
      >
        Shop Best Sellers
      </Link>
    </section>
  );
}

