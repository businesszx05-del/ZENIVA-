"use client";

import { CATEGORIES, MainCategoryKey } from "@/lib/categories";

interface HomeScreenProps {
  onSelectCategory: (key: MainCategoryKey) => void;
  onOpenAdmin: () => void;
}

const categoryCards = [
  {
    key: "wallpapers" as MainCategoryKey,
    gradient: "from-violet-600 via-purple-600 to-indigo-700",
    shadowColor: "shadow-purple-500/40",
    icon: "🖼️",
    desc: "6 Collections",
  },
  {
    key: "wishes" as MainCategoryKey,
    gradient: "from-pink-500 via-rose-500 to-red-600",
    shadowColor: "shadow-pink-500/40",
    icon: "🎴",
    desc: "3 Collections",
  },
  {
    key: "dps" as MainCategoryKey,
    gradient: "from-sky-500 via-blue-500 to-cyan-600",
    shadowColor: "shadow-blue-500/40",
    icon: "👤",
    desc: "2 Collections",
  },
  {
    key: "stickers" as MainCategoryKey,
    gradient: "from-amber-500 via-orange-500 to-yellow-600",
    shadowColor: "shadow-amber-500/40",
    icon: "🩷",
    desc: "3 Collections",
  },
];

export default function HomeScreen({ onSelectCategory, onOpenAdmin }: HomeScreenProps) {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background:
          "linear-gradient(180deg, #0f0520 0%, #1a0840 50%, #0f0520 100%)",
      }}
    >
      {/* Header */}
      <header className="relative flex items-center justify-between px-5 pt-12 pb-4">
        <div>
          <h1
            className="text-3xl font-black tracking-[0.18em]"
            style={{
              background: "linear-gradient(135deg, #f5c842 0%, #fff 50%, #d4a0ff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ZENIVA
          </h1>
          <p className="text-xs text-purple-300 tracking-widest uppercase mt-0.5">
            All-in-One Gallery
          </p>
        </div>

        {/* Admin button */}
        <button
          onClick={onOpenAdmin}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-purple-200 border border-purple-600/50 hover:border-purple-400 hover:text-white transition-all duration-200 active:scale-95"
          style={{ background: "rgba(109,40,217,0.2)" }}
        >
          <span>⚙️</span>
          <span>Admin</span>
        </button>
      </header>

      {/* Welcome banner */}
      <div className="mx-5 mb-6 mt-2 rounded-2xl p-4 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(109,40,217,0.4) 0%, rgba(79,70,229,0.4) 100%)",
          border: "1px solid rgba(167,139,250,0.3)",
        }}
      >
        <div className="absolute top-0 right-0 text-6xl opacity-10 pointer-events-none select-none mt-1 mr-2">✨</div>
        <h2 className="text-white font-bold text-lg">Welcome to ZENIVA</h2>
        <p className="text-purple-300 text-xs mt-1 leading-relaxed">
          Explore stunning wallpapers, wish cards, DPs &amp; stickers curated just for you.
        </p>
      </div>

      {/* Category grid */}
      <main className="flex-1 px-4 pb-8">
        <p className="text-purple-400 text-xs font-semibold tracking-widest uppercase mb-4 px-1">
          Browse Categories
        </p>
        <div className="grid grid-cols-2 gap-4">
          {categoryCards.map((cat) => {
            const info = CATEGORIES[cat.key];
            return (
              <button
                key={cat.key}
                onClick={() => onSelectCategory(cat.key)}
                className={`relative flex flex-col items-start justify-end p-4 rounded-2xl bg-gradient-to-br ${cat.gradient} shadow-xl ${cat.shadowColor} active:scale-95 transition-transform duration-150 overflow-hidden min-h-[150px]`}
              >
                {/* Decorative circle */}
                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10 pointer-events-none" />
                <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-black/10 pointer-events-none" />

                {/* Icon */}
                <div className="text-4xl mb-2 relative z-10">{cat.icon}</div>

                {/* Label */}
                <h3 className="text-white font-bold text-base leading-tight relative z-10">
                  {info.label}
                </h3>
                <p className="text-white/70 text-xs mt-0.5 relative z-10">{cat.desc}</p>

                {/* Arrow */}
                <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-white text-xs">›</span>
                </div>
              </button>
            );
          })}
        </div>
      </main>

      {/* Bottom tagline */}
      <div className="text-center pb-8 px-4">
        <p className="text-purple-600 text-xs">✨ Crafted with love by ZENIVA Team ✨</p>
      </div>
    </div>
  );
}
