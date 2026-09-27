"use client";

import { useState, useEffect, useCallback } from "react";
import { MediaItem } from "@/db/schema";
import { CATEGORIES, MainCategoryKey } from "@/lib/categories";

interface AdminPanelProps {
  onClose: () => void;
}

type Screen = "login" | "dashboard";

export default function AdminPanel({ onClose }: AdminPanelProps) {
  const [screen, setScreen] = useState<Screen>("login");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [sessionPassword, setSessionPassword] = useState("");

  // Form state
  const [mainCat, setMainCat] = useState<MainCategoryKey>("wallpapers");
  const [subCat, setSubCat] = useState("");
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState("");
  const [addSuccess, setAddSuccess] = useState("");

  // Items list
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loadingItems, setLoadingItems] = useState(false);
  const [filterCat, setFilterCat] = useState<string>("all");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  // Reset sub-category when main changes
  useEffect(() => {
    const firstSub = CATEGORIES[mainCat].subCategories[0]?.key ?? "";
    setSubCat(firstSub);
  }, [mainCat]);

  const fetchItems = useCallback(async () => {
    setLoadingItems(true);
    try {
      const url =
        filterCat === "all"
          ? "/api/items"
          : `/api/items?mainCategory=${filterCat}`;
      const res = await fetch(url);
      const data = await res.json();
      setItems(data.items ?? []);
    } catch {
      setItems([]);
    } finally {
      setLoadingItems(false);
    }
  }, [filterCat]);

  useEffect(() => {
    if (screen === "dashboard") {
      fetchItems();
    }
  }, [screen, fetchItems]);

  const handleLogin = async () => {
    setLoginLoading(true);
    setLoginError("");
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        setSessionPassword(password);
        setScreen("dashboard");
      } else {
        setLoginError("❌ Incorrect password. Please try again.");
      }
    } catch {
      setLoginError("❌ Connection error. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!title.trim() || !imageUrl.trim()) {
      setAddError("Please fill in all fields.");
      return;
    }
    setAdding(true);
    setAddError("");
    setAddSuccess("");
    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mainCategory: mainCat,
          subCategory: subCat,
          title: title.trim(),
          imageUrl: imageUrl.trim(),
          password: sessionPassword,
        }),
      });
      if (res.ok) {
        setAddSuccess("✅ Item added successfully!");
        setTitle("");
        setImageUrl("");
        fetchItems();
        setTimeout(() => setAddSuccess(""), 3000);
      } else {
        const data = await res.json();
        setAddError(data.error ?? "Failed to add item.");
      }
    } catch {
      setAddError("Connection error.");
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this item?")) return;
    try {
      const res = await fetch(`/api/items/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: sessionPassword }),
      });
      if (res.ok) {
        setItems((prev) => prev.filter((i) => i.id !== id));
      }
    } catch {
      // silent
    }
  };

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  const mainCatKeys = Object.keys(CATEGORIES) as MainCategoryKey[];

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col transition-all duration-300 overflow-y-auto ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{ background: "linear-gradient(180deg, #0a0118 0%, #120230 100%)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-12 pb-4 sticky top-0 z-10"
        style={{ background: "rgba(10,1,24,0.95)", backdropFilter: "blur(10px)" }}
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">⚙️</span>
          <div>
            <h1 className="text-white font-bold text-lg leading-tight">Admin Panel</h1>
            {screen === "dashboard" && (
              <p className="text-green-400 text-xs">● Authenticated</p>
            )}
          </div>
        </div>
        <button
          onClick={handleClose}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-purple-300 border border-purple-700/50 active:scale-90 transition-all"
          style={{ background: "rgba(109,40,217,0.2)" }}
        >
          ✕
        </button>
      </div>

      <div className="px-4 pb-10">
        {/* LOGIN SCREEN */}
        {screen === "login" && (
          <div
            className={`mt-10 transition-all duration-500 ${
              visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🔐</div>
              <h2 className="text-white font-bold text-xl">Admin Access</h2>
              <p className="text-purple-400 text-sm mt-1">
                Enter your admin password to continue
              </p>
            </div>

            <div
              className="rounded-2xl p-5"
              style={{
                background: "rgba(109,40,217,0.15)",
                border: "1px solid rgba(139,92,246,0.3)",
              }}
            >
              <label className="text-purple-300 text-xs font-semibold tracking-widest uppercase block mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="Enter admin password..."
                className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none placeholder-purple-600 mb-4"
                style={{
                  background: "rgba(0,0,0,0.4)",
                  border: "1px solid rgba(139,92,246,0.4)",
                }}
              />

              {loginError && (
                <p className="text-red-400 text-xs mb-4 text-center">{loginError}</p>
              )}

              <button
                onClick={handleLogin}
                disabled={loginLoading || !password}
                className="w-full py-3.5 rounded-xl font-bold text-white text-sm active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                style={{
                  background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
                  boxShadow: "0 4px 20px rgba(124,58,237,0.4)",
                }}
              >
                {loginLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  "🔓 Unlock Dashboard"
                )}
              </button>
            </div>
          </div>
        )}

        {/* DASHBOARD */}
        {screen === "dashboard" && (
          <div className="mt-4 space-y-6">
            {/* Add Item Form */}
            <div
              className="rounded-2xl p-5"
              style={{
                background: "rgba(109,40,217,0.12)",
                border: "1px solid rgba(139,92,246,0.3)",
              }}
            >
              <h2 className="text-white font-bold text-base mb-4 flex items-center gap-2">
                <span>➕</span> Add New Item
              </h2>

              {/* Main Category */}
              <label className="text-purple-300 text-xs font-semibold tracking-widest uppercase block mb-1.5">
                Main Category
              </label>
              <select
                value={mainCat}
                onChange={(e) => setMainCat(e.target.value as MainCategoryKey)}
                className="w-full px-3 py-2.5 rounded-xl text-white text-sm outline-none mb-4"
                style={{
                  background: "rgba(0,0,0,0.5)",
                  border: "1px solid rgba(139,92,246,0.4)",
                }}
              >
                {mainCatKeys.map((key) => (
                  <option key={key} value={key} style={{ background: "#1a0840" }}>
                    {CATEGORIES[key].emoji} {CATEGORIES[key].label}
                  </option>
                ))}
              </select>

              {/* Sub Category */}
              <label className="text-purple-300 text-xs font-semibold tracking-widest uppercase block mb-1.5">
                Sub Category
              </label>
              <select
                value={subCat}
                onChange={(e) => setSubCat(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl text-white text-sm outline-none mb-4"
                style={{
                  background: "rgba(0,0,0,0.5)",
                  border: "1px solid rgba(139,92,246,0.4)",
                }}
              >
                {CATEGORIES[mainCat].subCategories.map((sub) => (
                  <option key={sub.key} value={sub.key} style={{ background: "#1a0840" }}>
                    {sub.label}
                  </option>
                ))}
              </select>

              {/* Title */}
              <label className="text-purple-300 text-xs font-semibold tracking-widest uppercase block mb-1.5">
                Title / Name
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Cute Panda Wallpaper"
                className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none placeholder-purple-700 mb-4"
                style={{
                  background: "rgba(0,0,0,0.5)",
                  border: "1px solid rgba(139,92,246,0.4)",
                }}
              />

              {/* GitHub Raw Link */}
              <label className="text-purple-300 text-xs font-semibold tracking-widest uppercase block mb-1.5">
                GitHub Raw Link / Image URL
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://raw.githubusercontent.com/..."
                className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none placeholder-purple-700 mb-2"
                style={{
                  background: "rgba(0,0,0,0.5)",
                  border: "1px solid rgba(139,92,246,0.4)",
                }}
              />

              {/* URL Preview */}
              {imageUrl && (
                <div className="mb-4 rounded-xl overflow-hidden h-28 bg-black/30 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <p className="text-purple-500 text-xs absolute">Preview</p>
                </div>
              )}

              {addError && (
                <p className="text-red-400 text-xs mb-3 text-center">{addError}</p>
              )}
              {addSuccess && (
                <p className="text-green-400 text-xs mb-3 text-center">{addSuccess}</p>
              )}

              <button
                onClick={handleAdd}
                disabled={adding}
                className="w-full py-3.5 rounded-xl font-bold text-white text-sm active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                style={{
                  background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
                  boxShadow: "0 4px 20px rgba(124,58,237,0.4)",
                }}
              >
                {adding ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Adding...</span>
                  </>
                ) : (
                  "✅ Add Item"
                )}
              </button>
            </div>

            {/* Items List */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-white font-bold text-base flex items-center gap-2">
                  <span>📋</span> All Items
                </h2>
                <button
                  onClick={fetchItems}
                  className="text-purple-400 text-xs border border-purple-700/50 px-3 py-1 rounded-lg active:scale-90 transition-all"
                >
                  🔄 Refresh
                </button>
              </div>

              {/* Filter */}
              <select
                value={filterCat}
                onChange={(e) => setFilterCat(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl text-white text-sm outline-none mb-4"
                style={{
                  background: "rgba(0,0,0,0.5)",
                  border: "1px solid rgba(139,92,246,0.4)",
                }}
              >
                <option value="all" style={{ background: "#1a0840" }}>
                  All Categories
                </option>
                {mainCatKeys.map((key) => (
                  <option key={key} value={key} style={{ background: "#1a0840" }}>
                    {CATEGORIES[key].emoji} {CATEGORIES[key].label}
                  </option>
                ))}
              </select>

              {loadingItems ? (
                <div className="flex justify-center py-8">
                  <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : items.length === 0 ? (
                <div className="text-center py-10">
                  <div className="text-4xl mb-2">📭</div>
                  <p className="text-purple-400 text-sm">No items found</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => {
                    const cat = CATEGORIES[item.mainCategory as MainCategoryKey];
                    const subInfo = cat?.subCategories.find(
                      (s) => s.key === item.subCategory
                    );
                    return (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 p-3 rounded-xl"
                        style={{
                          background: "rgba(0,0,0,0.3)",
                          border: "1px solid rgba(139,92,246,0.2)",
                        }}
                      >
                        {/* Thumbnail */}
                        <div className="w-12 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-purple-900/30">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = "none";
                            }}
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-semibold text-sm truncate">
                            {item.title}
                          </p>
                          <p className="text-purple-400 text-xs mt-0.5">
                            {cat?.emoji} {cat?.label}
                          </p>
                          <p className="text-purple-500 text-xs">{subInfo?.label ?? item.subCategory}</p>
                        </div>

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-red-400 hover:text-red-300 active:scale-90 transition-all"
                          style={{ background: "rgba(239,68,68,0.1)" }}
                        >
                          🗑️
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
