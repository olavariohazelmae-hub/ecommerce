import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./src/lib/supabase/schema";
import { eq } from "drizzle-orm";

dotenv.config();

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is missing");
}

const queryClient = postgres(process.env.DATABASE_URL);
const db = drizzle(queryClient, { schema });

const checkProductBySlug = async () => {
    const slug = "premium-sketchbook";
    console.log(`Checking for product with slug: ${slug}`);

    const product = await db.query.products.findFirst({
        where: eq(schema.products.slug, slug),
    });

    if (product) {
        console.log("Product found:", JSON.stringify(product, null, 2));
    } else {
        console.log("Product NOT found in database.");
    }
    process.exit(0);
};

checkProductBySlug();
