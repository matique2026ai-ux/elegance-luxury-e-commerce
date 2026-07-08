import React from "react"
import type { Metadata, Viewport } from "next";
import { DM_Sans, Playfair_Display, Noto_Kufi_Arabic } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { I18nProvider } from "@/lib/i18n-context";
import { CartProvider } from "@/context/cart-context";
import { FavoritesProvider } from "@/context/favorites-context";
import { SiteShell } from "@/components/site-shell";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const notoKufi = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "MAISON HERAHIMA | Luxury Fashion & Lifestyle",
  description:
    "Discover timeless elegance and refined luxury. Curated collections of exceptional quality for the discerning connoisseur.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${playfair.variable} ${notoKufi.variable} font-sans antialiased`}
      >
        <I18nProvider>
          <CartProvider>
            <FavoritesProvider>
              <SiteShell>
                {children}
              </SiteShell>
            </FavoritesProvider>
          </CartProvider>
        </I18nProvider>
        <Analytics />
      </body>
    </html>
  );
}
