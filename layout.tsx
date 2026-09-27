import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZENIVA – All-in-One Gallery",
  description:
    "ZENIVA is your all-in-one gallery app for stunning wallpapers, wish cards, DPs, and stickers.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ZENIVA",
  },
  openGraph: {
    title: "ZENIVA – All-in-One Gallery",
    description: "Stunning wallpapers, wish cards, DPs & stickers curated just for you.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#1a0840",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/zeniva-logo.png" />
      </head>
      <body
        className="antialiased overflow-x-hidden"
        style={{
          background: "#0f0520",
          minHeight: "100vh",
        }}
      >
        {children}
      </body>
    </html>
  );
}
