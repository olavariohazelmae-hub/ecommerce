import db from "../db";
import * as schema from "../schema";

const medias = [
  {
    id: "1",
    key: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop",
    alt: "notebooks-collection",
  },
  {
    id: "2",
    key: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?q=80&w=1000&auto=format&fit=crop",
    alt: "pens-collection",
  },
  {
    id: "3",
    key: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=1000&auto=format&fit=crop",
    alt: "paper-collection",
  },
  {
    id: "4",
    key: "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?q=80&w=1000&auto=format&fit=crop",
    alt: "accessories-collection",
  },
  {
    id: "5",
    key: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=1000&auto=format&fit=crop",
    alt: "classic-notebook",
  },
  {
    id: "6",
    key: "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?q=80&w=1000&auto=format&fit=crop",
    alt: "bamboo-pen",
  },
  {
    id: "7",
    key: "https://images.unsplash.com/photo-1606166325683-e6deb697d301?q=80&w=1000&auto=format&fit=crop",
    alt: "kraft-envelopes",
  },
  {
    id: "8",
    key: "https://images.unsplash.com/photo-1515688594390-b649af70d282?q=80&w=1000&auto=format&fit=crop",
    alt: "washi-tape",
  },
];

export const seedMedias = async () => {
  try {
    const insertedMedia = await db
      .insert(schema.medias)
      .values(medias)
      .onConflictDoNothing()
      .returning();
    console.log(`Medias are added to the DB.`, insertedMedia);
  } catch (err) {
    console.log("Error happen while inserting Media", err);
  }
};
