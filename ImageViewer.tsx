"use client";

import { useEffect, useState } from "react";
import { MediaItem } from "@/db/schema";

interface ImageViewerProps {
  item: MediaItem;
  onClose: () => void;
}

export default function ImageViewer({ item, onClose }: ImageViewerProps) {
  const [downloading, setDownloading] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const response = await fetch(item.imageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const ext = item.imageUrl.split(".").pop()?.split("?")[0] ?? "jpg";
      a.download = `${item.title.replace(/\s+/g, "_")}.${ext}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      // Fallback: open in new tab
      window.open(item.imageUrl, "_blank");
    } finally {
      setDownloading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: `Check out this from ZENIVA: ${item.title}`,
          url: item.imageUrl,
        });
      } catch {
        // User cancelled
      }
    } else {
      // Fallback: open WhatsApp share
      const text = encodeURIComponent(`${item.title} - ${item.imageUrl}`);
      window.open(`https://wa.me/?text=${text}`, "_blank");
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col transition-all duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{ background: "rgba(5,0,15,0.97)" }}
    >
      {/* Top bar */}
      <div
        className={`flex items-center justify-between px-4 pt-12 pb-4 transition-transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-8"
        }`}
      >
        <button
          onClick={handleClose}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-purple-300 border border-purple-700/50 active:scale-90 transition-all"
          style={{ background: "rgba(109,40,217,0.3)" }}
        >
          ✕
        </button>
        <h2 className="text-white font-semibold text-sm max-w-[200px] truncate text-center flex-1 mx-3">
          {item.title}
        </h2>
        <div className="w-10" />
      </div>

      {/* Image */}
      <div className="flex-1 flex items-center justify-center px-4 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.imageUrl}
          alt={item.title}
          className={`max-w-full max-h-full object-contain rounded-2xl shadow-2xl transition-all duration-500 ${
            visible ? "scale-100 opacity-100" : "scale-90 opacity-0"
          }`}
          style={{ maxHeight: "calc(100vh - 200px)" }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </div>

      {/* Action buttons */}
      <div
        className={`px-6 pb-10 pt-5 flex gap-4 transition-transform duration-300 ${
          visible ? "translate-y-0" : "translate-y-8"
        }`}
      >
        {/* Download */}
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm text-white active:scale-95 transition-all duration-150 shadow-lg disabled:opacity-60"
          style={{
            background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
            boxShadow: "0 4px 20px rgba(124,58,237,0.5)",
          }}
        >
          {downloading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <span className="text-lg">⬇️</span>
              <span>Download</span>
            </>
          )}
        </button>

        {/* Share */}
        <button
          onClick={handleShare}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm text-white active:scale-95 transition-all duration-150 shadow-lg"
          style={{
            background: "linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)",
            boxShadow: "0 4px 20px rgba(236,72,153,0.5)",
          }}
        >
          <span className="text-lg">🔗</span>
          <span>Share</span>
        </button>
      </div>
    </div>
  );
}
