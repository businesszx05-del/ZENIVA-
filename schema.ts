import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";

export const mediaItems = pgTable("media_items", {
  id: serial("id").primaryKey(),
  mainCategory: text("main_category").notNull(), // wallpapers | wishes | dps | stickers
  subCategory: text("sub_category").notNull(),
  title: text("title").notNull(),
  imageUrl: text("image_url").notNull(),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type MediaItem = typeof mediaItems.$inferSelect;
export type NewMediaItem = typeof mediaItems.$inferInsert;
