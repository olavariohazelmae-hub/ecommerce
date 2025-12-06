import db from "../db";
import * as schema from "../schema";
import { InsertProducts } from "../schema";
import { sql } from "drizzle-orm";

const products: InsertProducts[] = [
  {
    "id": "6",
    "name": "Minimalist Desk Organizer",
    "slug": "minimalist-desk-organizer",
    "description": "Keep your workspace tidy with our Minimalist Desk Organizer. Made from sustainable cork, it features compartments for pens, clips, and notes. A stylish and eco-friendly addition to any desk.",
    "featured": true,
    "badge": null,
    "rating": "4.7",
    "tags": [
      "organizer",
      "desk",
      "cork"
    ],
    "featuredImageId": "dwwu43l8b3v9v2l34ow6d519",
    "collectionId": "4",
    "stock": 40,
    "price": "10.00",
    "sustainability": {
      "materials": "100% Natural Cork",
      "carbonFootprint": "0.9kg CO2e",
      "recyclingInstructions": "Cork is biodegradable and compostable.",
      "certifications": [
        "Rainforest Alliance Certified"
      ]
    }
  },
  {
    "id": "9",
    "name": "Hardcover Journal - Midnight Blue",
    "slug": "hardcover-journal-midnight",
    "description": "Capture your thoughts in our elegant Hardcover Journal. The linen cover feels luxurious, and the acid-free pages preserve your writing for years to come. Includes a ribbon bookmark.",
    "featured": true,
    "badge": null,
    "rating": "4.8",
    "tags": [
      "journal",
      "notebook",
      "writing"
    ],
    "featuredImageId": "rqu1coexa52k80apf44emn6n",
    "collectionId": "1",
    "stock": 60,
    "price": "20.00",
    "sustainability": {
      "materials": "Linen fabric, Acid-free paper, Recycled board",
      "carbonFootprint": "1.4kg CO2e",
      "recyclingInstructions": "Paper pages are recyclable. Cover is biodegradable.",
      "certifications": [
        "FSC Mixed"
      ]
    }
  },
  {
    "id": "3",
    "name": "Recycled Envelopes (Set of 10)",
    "slug": "recycled-envelopes",
    "description": "Send your letters in style with our Recycled Envelopes. Made from post-consumer waste, these envelopes have a unique texture and a natural look. Perfect for invitations, greeting cards, or personal correspondence.",
    "featured": true,
    "badge": null,
    "rating": "5.0",
    "tags": [
      "envelopes",
      "paper",
      "stationery",
      "latest"
    ],
    "featuredImageId": "sgb7z006z6j7sypngz8dqss2",
    "collectionId": "3",
    "stock": 100,
    "price": "10.00",
    "sustainability": {
      "materials": "100% Post-consumer waste paper",
      "carbonFootprint": "0.5kg CO2e per pack",
      "recyclingInstructions": "Fully recyclable with paper waste.",
      "certifications": [
        "FSC Recycled"
      ]
    }
  },
  {
    "id": "5",
    "name": "Premium Sketchbook",
    "slug": "premium-sketchbook",
    "description": "For the serious artist. Our Premium Sketchbook features heavyweight, acid-free paper that can handle a variety of media. The hardcover binding protects your work, while the elastic closure keeps everything secure.",
    "featured": true,
    "badge": "best_sale",
    "rating": "4.9",
    "tags": [
      "sketchbook",
      "art",
      "drawing"
    ],
    "featuredImageId": "q2joqoqn08x44e8km5maher6",
    "collectionId": "1",
    "stock": 15,
    "price": "20.00",
    "sustainability": {
      "materials": "Acid-free paper, Recycled cardboard cover",
      "carbonFootprint": "1.5kg CO2e",
      "recyclingInstructions": "Paper pages are recyclable. Cover can be recycled if binding is removed.",
      "certifications": [
        "FSC Mixed"
      ]
    }
  },
  {
    "id": "7",
    "name": "Recycled Paper Pencils (12 Pack)",
    "slug": "recycled-paper-pencils",
    "description": "Write with a clear conscience. These pencils are made from rolled recycled newspapers, saving trees and reducing waste. They sharpen easily and write smoothly.",
    "featured": true,
    "badge": "latest",
    "rating": "4.6",
    "tags": [
      "pencils",
      "recycled",
      "writing"
    ],
    "featuredImageId": "sytgqr6c91qbwx14v5x2qtk0",
    "collectionId": "2",
    "stock": 120,
    "price": "10.00",
    "sustainability": {
      "materials": "Recycled Newspaper, Graphite, Non-toxic glue",
      "carbonFootprint": "0.4kg CO2e per pack",
      "recyclingInstructions": "Shavings are compostable. Stub can be recycled.",
      "certifications": [
        "Recycled Content Certification"
      ]
    }
  },
  {
    "id": "8",
    "name": "Botanical Art Prints (Set of 3)",
    "slug": "botanical-art-prints",
    "description": "Bring nature indoors with our Botanical Art Prints. Printed on 100% recycled cardstock with soy-based inks. These beautiful illustrations add a touch of serenity to any room.",
    "featured": true,
    "badge": null,
    "rating": "5.0",
    "tags": [
      "art",
      "prints",
      "botanical"
    ],
    "featuredImageId": "n8tatlklsligylmsdril56it",
    "collectionId": "3",
    "stock": 20,
    "price": "10.00",
    "sustainability": {
      "materials": "100% Recycled Cardstock, Soy-based Inks",
      "carbonFootprint": "0.6kg CO2e",
      "recyclingInstructions": "Fully recyclable as paper.",
      "certifications": [
        "FSC Recycled"
      ]
    }
  },
  {
    "id": "2",
    "name": "Bamboo Fountain Pen",
    "slug": "bamboo-fountain-pen",
    "description": "Experience the joy of writing with our Bamboo Fountain Pen. Handcrafted from sustainable bamboo, this pen offers a smooth ink flow and a comfortable grip. Includes a refillable converter for bottled ink.",
    "featured": true,
    "badge": "latest",
    "rating": "4.5",
    "tags": [
      "pen",
      "bamboo",
      "sustainable",
      "latest"
    ],
    "featuredImageId": "b4nw9l1hdjchen2aqgxm6xeh",
    "collectionId": "2",
    "stock": 32,
    "price": "20.00",
    "sustainability": {
      "materials": "Sustainably harvested bamboo, Stainless steel nib",
      "carbonFootprint": "0.8kg CO2e",
      "recyclingInstructions": "Bamboo body is biodegradable. Metal parts can be recycled.",
      "certifications": [
        "FSC Certified Bamboo"
      ]
    }
  },
  {
    "id": "1",
    "name": "Classic Kraft Notebook",
    "slug": "classic-kraft-notebook",
    "description": "A timeless classic. This notebook features a durable kraft cover and 100% recycled paper pages. Perfect for journaling, sketching, or taking notes on the go. Lay-flat binding ensures a comfortable writing experience.",
    "featured": false,
    "badge": "best_sale",
    "rating": "4.8",
    "tags": [
      "notebook",
      "recycled",
      "kraft",
      "latest"
    ],
    "featuredImageId": "5",
    "collectionId": "1",
    "stock": 50,
    "price": "15.00",
    "sustainability": {
      "materials": "100% Recycled Kraft Paper, Soy-based Ink",
      "carbonFootprint": "1.2kg CO2e",
      "recyclingInstructions": "Fully recyclable. Remove metal spiral binding before recycling paper.",
      "certifications": [
        "FSC Recycled",
        "Green Seal"
      ]
    }
  },
  {
    "id": "4",
    "name": "Washi Tape Set - Earth Tones",
    "slug": "washi-tape-earth-tones",
    "description": "Add a touch of creativity to your journals and planners with our Washi Tape Set. Featuring a palette of earth tones, these tapes are made from natural fibers and are fully biodegradable.",
    "featured": true,
    "badge": "featured",
    "rating": "4.2",
    "tags": [
      "washi",
      "tape",
      "decoration"
    ],
    "featuredImageId": "ntx5bibi29vm86brya8i7mc7",
    "collectionId": "4",
    "stock": 25,
    "price": "5.00",
    "sustainability": {
      "materials": "Natural fibers, Non-toxic adhesive",
      "carbonFootprint": "0.3kg CO2e",
      "recyclingInstructions": "Biodegradable. Can be composted.",
      "certifications": [
        "Biodegradable Products Institute (BPI)"
      ]
    }
  },
  {
    "id": "10",
    "name": "Ceramic Pen Holder",
    "slug": "ceramic-pen-holder",
    "description": "A piece of art for your desk. This hand-thrown ceramic pen holder is glazed in a soothing sage green. It's heavy enough to stay put and wide enough to hold all your favorite writing tools.",
    "featured": false,
    "badge": "featured",
    "rating": "4.9",
    "tags": [
      "pen holder",
      "ceramic",
      "desk",
      "latest"
    ],
    "featuredImageId": "of40y6hefuq5ptvp675418ds",
    "collectionId": "4",
    "stock": 10,
    "price": "15.00",
    "sustainability": {
      "materials": "Stoneware clay, Lead-free glaze",
      "carbonFootprint": "1.1kg CO2e",
      "recyclingInstructions": "Ceramic is inert and can be used as fill. Not recyclable in standard bins.",
      "certifications": []
    }
  }
];

const seedProducts = async () => {
  try {
    // await db.delete(schema.products);
    await db
      .insert(schema.products)
      .values(products)
      .onConflictDoUpdate({
        target: schema.products.id,
        set: {
          name: sql`excluded.name`,
          description: sql`excluded.description`,
          featured: sql`excluded.featured`,
          badge: sql`excluded.badge`,
          rating: sql`excluded.rating`,
          tags: sql`excluded.tags`,
          price: sql`excluded.price`,
          stock: sql`excluded.stock`,
          collectionId: sql`excluded.collection_id`,
          featuredImageId: sql`excluded.featured_image_id`,
          sustainability: sql`excluded.sustainability`,
        },
      })
      .returning();
  } catch (err) {
    console.log("Error happen while inserting products", err);
  }
};

export default seedProducts;
