import db from "../db";
import * as schema from "../schema";
import { InsertProducts } from "../schema";

const products: InsertProducts[] = [
  {
    id: "1",
    name: "Classic Kraft Notebook",
    slug: "classic-kraft-notebook",
    description: `A timeless classic. This notebook features a durable kraft cover and 100% recycled paper pages. Perfect for journaling, sketching, or taking notes on the go. Lay-flat binding ensures a comfortable writing experience.`,
    featured: true,
    badge: "best_sale",
    rating: "4.8",
    tags: ["notebook", "recycled", "kraft"],
    featuredImageId: "5",
    collectionId: "1",
    stock: 50,
  },
  {
    id: "2",
    name: "Bamboo Fountain Pen",
    slug: "bamboo-fountain-pen",
    description: `Experience the joy of writing with our Bamboo Fountain Pen. Handcrafted from sustainable bamboo, this pen offers a smooth ink flow and a comfortable grip. Includes a refillable converter for bottled ink.`,
    rating: "4.5",
    featured: true,
    featuredImageId: "6",
    collectionId: "2",
    badge: "latest",
    stock: 32,
    tags: ["pen", "bamboo", "sustainable"],
  },
  {
    id: "3",
    name: "Recycled Envelopes (Set of 10)",
    slug: "recycled-envelopes",
    featured: true,
    description: `Send your letters in style with our Recycled Envelopes. Made from post-consumer waste, these envelopes have a unique texture and a natural look. Perfect for invitations, greeting cards, or personal correspondence.`,
    rating: "5",
    featuredImageId: "7",
    collectionId: "3",
    stock: 100,
    tags: ["envelopes", "paper", "stationery"],
  },
  {
    id: "4",
    name: "Washi Tape Set - Earth Tones",
    slug: "washi-tape-earth-tones",
    featured: true,
    description: `Add a touch of creativity to your journals and planners with our Washi Tape Set. Featuring a palette of earth tones, these tapes are made from natural fibers and are fully biodegradable.`,
    rating: "4.2",
    featuredImageId: "8",
    collectionId: "4",
    badge: "featured",
    stock: 25,
    tags: ["washi", "tape", "decoration"],
  },
  {
    id: "5",
    name: "Premium Sketchbook",
    slug: "premium-sketchbook",
    featured: true,
    description: `For the serious artist. Our Premium Sketchbook features heavyweight, acid-free paper that can handle a variety of media. The hardcover binding protects your work, while the elastic closure keeps everything secure.`,
    rating: "4.9",
    featuredImageId: "1",
    collectionId: "1",
    badge: "best_sale",
    stock: 15,
    tags: ["sketchbook", "art", "drawing"],
  },
  {
    id: "6",
    name: "Minimalist Desk Organizer",
    slug: "minimalist-desk-organizer",
    featured: true,
    description: `Keep your workspace tidy with our Minimalist Desk Organizer. Made from sustainable cork, it features compartments for pens, clips, and notes. A stylish and eco-friendly addition to any desk.`,
    rating: "4.7",
    featuredImageId: "2",
    collectionId: "4",
    stock: 40,
    tags: ["organizer", "desk", "cork"],
  },
  {
    id: "7",
    name: "Recycled Paper Pencils (12 Pack)",
    slug: "recycled-paper-pencils",
    featured: true,
    description: `Write with a clear conscience. These pencils are made from rolled recycled newspapers, saving trees and reducing waste. They sharpen easily and write smoothly.`,
    rating: "4.6",
    featuredImageId: "3",
    collectionId: "2",
    badge: "latest",
    stock: 120,
    tags: ["pencils", "recycled", "writing"],
  },
  {
    id: "8",
    name: "Botanical Art Prints (Set of 3)",
    slug: "botanical-art-prints",
    featured: true,
    description: `Bring nature indoors with our Botanical Art Prints. Printed on 100% recycled cardstock with soy-based inks. These beautiful illustrations add a touch of serenity to any room.`,
    rating: "5.0",
    featuredImageId: "4",
    collectionId: "3",
    stock: 20,
    tags: ["art", "prints", "botanical"],
  },
  {
    id: "9",
    name: "Hardcover Journal - Midnight Blue",
    slug: "hardcover-journal-midnight",
    featured: true,
    description: `Capture your thoughts in our elegant Hardcover Journal. The linen cover feels luxurious, and the acid-free pages preserve your writing for years to come. Includes a ribbon bookmark.`,
    rating: "4.8",
    featuredImageId: "5",
    collectionId: "1",
    stock: 60,
    tags: ["journal", "notebook", "writing"],
  },
  {
    id: "10",
    name: "Ceramic Pen Holder",
    slug: "ceramic-pen-holder",
    featured: true,
    description: `A piece of art for your desk. This hand-thrown ceramic pen holder is glazed in a soothing sage green. It's heavy enough to stay put and wide enough to hold all your favorite writing tools.`,
    rating: "4.9",
    featuredImageId: "6",
    collectionId: "4",
    badge: "featured",
    stock: 10,
    tags: ["pen holder", "ceramic", "desk"],
  },
];

const seedProducts = async () => {
  try {
    await db.delete(schema.products);
    await db
      .insert(schema.products)
      .values(products)
      .onConflictDoNothing()
      .returning();
  } catch (err) {
    console.log("Error happen while inserting collections", err);
  }
};

export default seedProducts;
