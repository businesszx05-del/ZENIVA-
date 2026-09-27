"use client";

import { useState, useCallback } from "react";
import SplashScreen from "@/components/SplashScreen";
import HomeScreen from "@/components/HomeScreen";
import CategoryScreen from "@/components/CategoryScreen";
import GalleryScreen from "@/components/GalleryScreen";
import AdminPanel from "@/components/AdminPanel";
import { MainCategoryKey } from "@/lib/categories";

type Screen =
  | { type: "splash" }
  | { type: "home" }
  | { type: "category"; mainCategory: MainCategoryKey }
  | { type: "gallery"; mainCategory: MainCategoryKey; subCategory: string };

export default function App() {
  const [screen, setScreen] = useState<Screen>({ type: "splash" });
  const [showAdmin, setShowAdmin] = useState(false);

  const handleSplashComplete = useCallback(() => {
    setScreen({ type: "home" });
  }, []);

  const handleSelectCategory = useCallback((key: MainCategoryKey) => {
    setScreen({ type: "category", mainCategory: key });
  }, []);

  const handleSelectSubCategory = useCallback(
    (subKey: string) => {
      if (screen.type === "category") {
        setScreen({
          type: "gallery",
          mainCategory: screen.mainCategory,
          subCategory: subKey,
        });
      }
    },
    [screen]
  );

  const handleBack = useCallback(() => {
    if (screen.type === "gallery") {
      setScreen({ type: "category", mainCategory: screen.mainCategory });
    } else if (screen.type === "category") {
      setScreen({ type: "home" });
    }
  }, [screen]);

  return (
    <div className="relative min-h-screen" style={{ maxWidth: 430, margin: "0 auto" }}>
      {/* Splash */}
      {screen.type === "splash" && (
        <SplashScreen onComplete={handleSplashComplete} />
      )}

      {/* Home */}
      {screen.type === "home" && (
        <HomeScreen
          onSelectCategory={handleSelectCategory}
          onOpenAdmin={() => setShowAdmin(true)}
        />
      )}

      {/* Category */}
      {screen.type === "category" && (
        <CategoryScreen
          mainCategory={screen.mainCategory}
          onSelectSubCategory={handleSelectSubCategory}
          onBack={handleBack}
        />
      )}

      {/* Gallery */}
      {screen.type === "gallery" && (
        <GalleryScreen
          mainCategory={screen.mainCategory}
          subCategory={screen.subCategory}
          onBack={handleBack}
        />
      )}

      {/* Admin Panel overlay */}
      {showAdmin && <AdminPanel onClose={() => setShowAdmin(false)} />}
    </div>
  );
}
