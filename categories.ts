export const CATEGORIES = {
  wallpapers: {
    label: "Wallpapers",
    emoji: "🖼️",
    color: "from-violet-600 to-purple-700",
    bgColor: "bg-violet-600",
    lightColor: "bg-violet-100",
    textColor: "text-violet-700",
    subCategories: [
      { key: "couple", label: "Couple" },
      { key: "dark-amoled", label: "Dark AMOLED" },
      { key: "cute-animals", label: "Cute Animals & Pets" },
      { key: "nature", label: "Nature & Landscapes" },
      { key: "islamic", label: "Islamic & Calligraphy" },
      { key: "quotes", label: "Quotes & Attitude" },
    ],
  },
  wishes: {
    label: "Wishes Cards",
    emoji: "🎴",
    color: "from-pink-500 to-rose-600",
    bgColor: "bg-pink-500",
    lightColor: "bg-pink-100",
    textColor: "text-pink-600",
    subCategories: [
      { key: "birthday", label: "Birthday Cards" },
      { key: "eid", label: "Eid Cards" },
      { key: "anniversary", label: "Anniversary Cards" },
    ],
  },
  dps: {
    label: "DPs",
    emoji: "👤",
    color: "from-sky-500 to-blue-600",
    bgColor: "bg-sky-500",
    lightColor: "bg-sky-100",
    textColor: "text-sky-600",
    subCategories: [
      { key: "boys-stylish", label: "Boys Stylish / Attitude" },
      { key: "girls-stylish", label: "Girls Stylish / Attitude" },
    ],
  },
  stickers: {
    label: "Stickers",
    emoji: "🩷",
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-500",
    lightColor: "bg-amber-100",
    textColor: "text-amber-600",
    subCategories: [
      { key: "dudu-bubu", label: "Dudu Bubu" },
      { key: "funny-memes", label: "Funny & Memes" },
      { key: "islamic-text", label: "Islamic Text" },
    ],
  },
} as const;

export type MainCategoryKey = keyof typeof CATEGORIES;

export function getCategoryInfo(key: string) {
  return CATEGORIES[key as MainCategoryKey] ?? null;
}

export function getSubCategoryLabel(mainKey: string, subKey: string): string {
  const cat = getCategoryInfo(mainKey);
  if (!cat) return subKey;
  const sub = cat.subCategories.find((s) => s.key === subKey);
  return sub?.label ?? subKey;
}
