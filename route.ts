import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { mediaItems } from "@/db/schema";
import { eq } from "drizzle-orm";

// DELETE /api/items/:id
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { password } = body;

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const itemId = parseInt(id, 10);
    if (isNaN(itemId)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    await db.delete(mediaItems).where(eq(mediaItems.id, itemId));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/items/:id error:", error);
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
  }
}
