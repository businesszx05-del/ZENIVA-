"use client";

import { useEffect, useState, useCallback } from "react";
import { MediaItem } from "@/db/schema";
import { CATEGORIES, MainCategoryKey, getSubCategoryLabel } from "@/lib/categories";
import ImageViewer from "./ImageViewer";

interface GalleryScreenProps {
  mainCategory: MainCategoryKey;
  subCategory: string;
  onBack: () => void;
}

export default function GalleryScreen({
  mainCategory,
  subCategory,
  onBack,
}: GalleryScreenProps) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

  const cat = CATEGORIES[mainCategory];
  const subLabel = getSubCategoryLabel(mainCategory, subCategory);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/items?mainCategory=${mainCategory}&subCategory=${subCategory}`
      );
      const data = await res.json();
      setItems(data.items ?? []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [mainCategory, subCategory]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return (
    <>
      <div
        className="min-h-screen flex flex-col"
        style={{
          background:
            "linear-gradient(180deg, #0f0520 0%, #1a0840 60%, #0f0520 100%)",
        }}
      >
        {/* Header */}
        <header className="flex items-center gap-3 px-4 pt-12 pb-5">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-purple-300 border border-purple-700/50 hover:border-purple-400 active:scale-90 transition-all"
            style={{ background: "rgba(109,40,217,0.2)" }}
          >
            ‹
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{cat.emoji}</span>
              <h1 className="text-lg font-bold text-white">{subLabel}</h1>
            </div>
            <p className="text-purple-400 text-xs mt-0.5">
              {items.length} item{items.length !== 1 ? "s" : ""}
            </p>
          </div>
        </header>

        {/* Divider */}
        <div className="mx-4 mb-5 h-px bg-gradient-to-r from-transparent via-purple-700 to-transparent" />

        {/* Content */}
        <main className="flex-1 px-3 pb-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="w-10 h-10 border-3 border-purple-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-purple-400 text-sm">Loading...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="text-6xl opacity-50">📭</div>
              <p className="text-purple-300 font-semibold">No items yet</p>
              <p className="text-purple-500 text-xs text-center max-w-xs">
                The admin hasn't added any content here yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="relative rounded-2xl overflow-hidden aspect-[3/4] active:scale-95 transition-transform duration-150 group shadow-lg"
                  style={{ border: "1px solid rgba(139,92,246,0.3)" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='400' fill='%23231040'%3E%3Crect width='300' height='400' fill='%23231040'/%3E%3Ctext x='150' y='200' text-anchor='middle' fill='%23a78bfa' font-size='40'%3E🖼️%3C/text%3E%3Ctext x='150' y='240' text-anchor='middle' fill='%23a78bfa' font-size='12'%3EImage Error%3C/text%3E%3C/svg%3E";
                    }}
                  />
                  {/* Title overlay */}
                  <div className="absolute inset-x-0 bottom-0 px-2 py-2 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                    <p className="text-white text-xs font-semibold truncate">{item.title}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Full-screen image viewer */}
      {selectedItem && (
        <ImageViewer
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </>
  );
}
