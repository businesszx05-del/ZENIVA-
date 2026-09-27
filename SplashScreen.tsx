"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setAnimating(true), 200);
    const t2 = setTimeout(() => onComplete(), 2600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-700 ${
        animating ? "opacity-100" : "opacity-0"
      }`}
      style={{
        background:
          "linear-gradient(135deg, #1a0533 0%, #2d1057 40%, #4a1a8c 70%, #6b2fa0 100%)",
      }}
    >
      {/* Decorative rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-72 h-72 rounded-full border border-purple-400 opacity-20 animate-ping"
          style={{ animationDuration: "3s" }}
        />
        <div
          className="absolute w-56 h-56 rounded-full border border-purple-300 opacity-20 animate-ping"
          style={{ animationDuration: "2.5s", animationDelay: "0.3s" }}
        />
        <div
          className="absolute w-40 h-40 rounded-full border border-purple-200 opacity-20 animate-ping"
          style={{ animationDuration: "2s", animationDelay: "0.6s" }}
        />
      </div>

      {/* Gold shimmer orb behind logo */}
      <div
        className="absolute rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{
          width: 240,
          height: 240,
          background: "radial-gradient(circle, #f5c842 0%, transparent 70%)",
        }}
      />

      {/* Logo */}
      <div
        className={`relative transition-all duration-1000 ${
          animating ? "scale-100 opacity-100" : "scale-75 opacity-0"
        }`}
      >
        <div className="relative w-32 h-32 rounded-3xl overflow-hidden shadow-2xl shadow-purple-900 mb-6 mx-auto border-2 border-purple-400/40">
          <Image
            src="/zeniva-logo.png"
            alt="ZENIVA Logo"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Brand name */}
      <div
        className={`transition-all duration-1000 delay-300 ${
          animating ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <h1
          className="text-5xl font-black tracking-[0.3em] mb-1"
          style={{
            background: "linear-gradient(135deg, #f5c842 0%, #fff 50%, #e8a0ff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          ZENIVA
        </h1>
        <p
          className="text-center text-xs tracking-[0.25em] uppercase"
          style={{ color: "#c4a0e8" }}
        >
          All-in-One Gallery
        </p>
      </div>

      {/* Loading dots */}
      <div
        className={`flex gap-2 mt-12 transition-all duration-700 delay-700 ${
          animating ? "opacity-100" : "opacity-0"
        }`}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-purple-300 animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
}
