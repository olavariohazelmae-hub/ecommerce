import db from "../db";
import * as schema from "../schema";

const collections = [
  {
    id: "1",
    label: "Notebooks",
    slug: "notebooks",
    title: "Capture Your Thoughts",
    description:
      "Premium recycled paper notebooks for your daily musings, sketches, and big ideas. Sustainable and stylish.",
    featuredImageId: "1",
  },
  {
    id: "2",
    label: "Pens & Pencils",
    title: "Write with Purpose",
    slug: "pens-pencils",
    description: "Eco-friendly writing instruments crafted from bamboo and recycled materials. Smooth writing, zero waste.",
    featuredImageId: "2",
  },
  {
    id: "3",
    label: "Paper Goods",
    title: "The Art of Paper",
    slug: "paper-goods",
    description: "Beautifully textured papers, envelopes, and cards for every occasion. Made from post-consumer waste.",
    featuredImageId: "3",
    order: 9,
  },
  {
    id: "4",
    label: "Accessories",
    title: "Desk Essentials",
    slug: "accessories",
    description: "Curated accessories to organize and beautify your workspace. Functional, minimal, and green.",
    featuredImageId: "4",
  },
];

export const seedCollections = async () => {
  try {
    await db.delete(schema.collections);

    const insertedCollections = await db
      .insert(schema.collections)
      .values(collections)
      .onConflictDoNothing()
      .returning();
    if (insertedCollections != null)
      console.log(`collections are added to the DB.`);
  } catch (err) {
    console.log("Error happen while inserting collections", err);
  }
};
