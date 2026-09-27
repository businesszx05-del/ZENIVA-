"use client";

import { CATEGORIES, MainCategoryKey } from "@/lib/categories";

interface CategoryScreenProps {
  mainCategory: MainCategoryKey;
  onSelectSubCategory: (subKey: string) => void;
  onBack: () => void;
}

export default function CategoryScreen({
  mainCategory,
  onSelectSubCategory,
  onBack,
}: CategoryScreenProps) {
  const cat = CATEGORIES[mainCategory];

  const subIcons: Record<string, string> = {
    // wallpapers
    couple: "💑",
    "dark-amoled": "🐼",
    "cute-animals": "🐾",
    nature: "🌿",
    islamic: "☪️",
    quotes: "💬",
    // wishes
    birthday: "🎂",
    eid: "🌙",
    anniversary: "💍",
    // dps
    "boys-stylish": "🧔",
    "girls-stylish": "💁‍♀️",
    // stickers
    "dudu-bubu": "🐻",
    "funny-memes": "😂",
    "islamic-text": "📿",
  };

  return (
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
            <h1 className="text-xl font-bold text-white">{cat.label}</h1>
          </div>
          <p className="text-purple-400 text-xs mt-0.5">
            {cat.subCategories.length} sub-categories
          </p>
        </div>
      </header>

      {/* Divider */}
      <div className="mx-4 mb-6 h-px bg-gradient-to-r from-transparent via-purple-700 to-transparent" />

      {/* Sub-categories */}
      <main className="flex-1 px-4 pb-8">
        <div className="flex flex-col gap-3">
          {cat.subCategories.map((sub, idx) => (
            <button
              key={sub.key}
              onClick={() => onSelectSubCategory(sub.key)}
              className="flex items-center gap-4 p-4 rounded-2xl text-left active:scale-98 transition-all duration-150 group"
              style={{
                background: "rgba(109,40,217,0.15)",
                border: "1px solid rgba(139,92,246,0.25)",
              }}
            >
              {/* Number badge */}
              <div
                className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center bg-gradient-to-br ${cat.color} shadow-lg text-lg`}
              >
                {subIcons[sub.key] ?? "📂"}
              </div>

              <div className="flex-1">
                <h3 className="text-white font-semibold text-sm">{sub.label}</h3>
                <p className="text-purple-400 text-xs mt-0.5">Tap to browse</p>
              </div>

              {/* Arrow */}
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-purple-300 group-hover:text-white transition-colors"
                style={{ background: "rgba(139,92,246,0.2)" }}
              >
                <span className="text-sm font-bold">›</span>
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
