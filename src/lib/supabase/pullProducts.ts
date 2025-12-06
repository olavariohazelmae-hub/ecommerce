import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { writeFileSync } from "fs";
import { join } from "path";

dotenv.config();

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is missing");
}

const queryClient = postgres(process.env.DATABASE_URL);
const db = drizzle(queryClient, { schema });

const pullProducts = async () => {
    try {
        console.log("🔄 Fetching products from Supabase...");

        // Fetch all products from the database
        const products = await db.select().from(schema.products);

        console.log(`✅ Found ${products.length} products`);

        // Format the products data for the seed file
        const formattedProducts = products.map((product) => ({
            id: product.id,
            name: product.name,
            slug: product.slug,
            description: product.description,
            featured: product.featured,
            badge: product.badge,
            rating: product.rating,
            tags: product.tags,
            featuredImageId: product.featuredImageId,
            collectionId: product.collectionId,
            stock: product.stock,
            price: product.price,
            sustainability: product.sustainability,
        }));

        // Generate the TypeScript file content
        const fileContent = `import db from "../db";
import * as schema from "../schema";
import { InsertProducts } from "../schema";
import { sql } from "drizzle-orm";

const products: InsertProducts[] = ${JSON.stringify(formattedProducts, null, 2)};

const seedProducts = async () => {
  try {
    // await db.delete(schema.products);
    await db
      .insert(schema.products)
      .values(products)
      .onConflictDoUpdate({
        target: schema.products.id,
        set: {
          name: sql\`excluded.name\`,
          description: sql\`excluded.description\`,
          featured: sql\`excluded.featured\`,
          badge: sql\`excluded.badge\`,
          rating: sql\`excluded.rating\`,
          tags: sql\`excluded.tags\`,
          price: sql\`excluded.price\`,
          stock: sql\`excluded.stock\`,
          collectionId: sql\`excluded.collection_id\`,
          featuredImageId: sql\`excluded.featured_image_id\`,
          sustainability: sql\`excluded.sustainability\`,
        },
      })
      .returning();
  } catch (err) {
    console.log("Error happen while inserting products", err);
  }
};

export default seedProducts;
`;

        // Write to the seed file
        const seedFilePath = join(__dirname, "seedData", "products.ts");
        writeFileSync(seedFilePath, fileContent, "utf-8");

        console.log(`✅ Successfully updated ${seedFilePath}`);
        console.log(`📦 Total products: ${products.length}`);

        // Display summary
        console.log("\n📊 Products Summary:");
        products.forEach((p, index) => {
            console.log(`  ${index + 1}. ${p.name} (${p.slug}) - Stock: ${p.stock || 0}, Price: $${p.price || 0}`);
        });

        await queryClient.end();
        process.exit(0);
    } catch (error) {
        console.error("❌ Error pulling products:", error);
        await queryClient.end();
        process.exit(1);
    }
};

pullProducts();
