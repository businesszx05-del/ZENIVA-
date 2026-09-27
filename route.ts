import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { mediaItems, NewMediaItem } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";

// GET /api/items?mainCategory=wallpapers&subCategory=couple
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mainCategory = searchParams.get("mainCategory");
  const subCategory = searchParams.get("subCategory");

  try {
    let results;
    if (mainCategory && subCategory) {
      results = await db
        .select()
        .from(mediaItems)
        .where(
          and(
            eq(mediaItems.mainCategory, mainCategory),
            eq(mediaItems.subCategory, subCategory)
          )
        )
        .orderBy(desc(mediaItems.createdAt));
    } else if (mainCategory) {
      results = await db
        .select()
        .from(mediaItems)
        .where(eq(mediaItems.mainCategory, mainCategory))
        .orderBy(desc(mediaItems.createdAt));
    } else {
      results = await db
        .select()
        .from(mediaItems)
        .orderBy(desc(mediaItems.createdAt));
    }
    return NextResponse.json({ items: results });
  } catch (error) {
    console.error("GET /api/items error:", error);
    return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 });
  }
}

// POST /api/items
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { mainCategory, subCategory, title, imageUrl, password } = body;

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!mainCategory || !subCategory || !title || !imageUrl) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newItem: NewMediaItem = { mainCategory, subCategory, title, imageUrl };
    const [created] = await db.insert(mediaItems).values(newItem).returning();

    return NextResponse.json({ item: created }, { status: 201 });
  } catch (error) {
    console.error("POST /api/items error:", error);
    return NextResponse.json({ error: "Failed to create item" }, { status: 500 });
  }
}
