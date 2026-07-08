"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag, Search, User, Globe } from "lucide-react";
import { useI18n, type Lang } from "@/lib/i18n-context";
import { useCart } from "@/context/cart-context";
import { CartDrawer } from "./cart-drawer";

const languages: { label: string; code: Lang }[] = [
  { label: "EN", code: "en" },
  { label: "FR", code: "fr" },
  { label: "AR", code: "ar" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { t, lang, setLang } = useI18n();
  const { totalItems, toggleCart, openCart } = useCart();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <nav className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex-shrink-0">
            <h1 className="font-serif text-xl md:text-2xl tracking-[0.15em] text-foreground">
              {t.brand.name}
              <span className="block text-center text-[0.6em] tracking-[0.3em] text-muted-foreground">
                {t.brand.surname}
              </span>
            </h1>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/hommes" className="text-sm tracking-[0.2em] uppercase hover:text-accent transition-colors duration-300">{t.header.men}</Link>
            <Link href="/femmes" className="text-sm tracking-[0.2em] uppercase hover:text-accent transition-colors duration-300">{t.header.women}</Link>
            <Link href="/enfants" className="text-sm tracking-[0.2em] uppercase hover:text-accent transition-colors duration-300">{t.header.children}</Link>
            <Link href="/heritage" className="text-sm tracking-[0.2em] uppercase hover:text-accent transition-colors duration-300">{t.header.heritage}</Link>
            <Link href="/services" className="text-sm tracking-[0.2em] uppercase hover:text-accent transition-colors duration-300">{t.header.services}</Link>
            <Link href="/boutiques" className="text-sm tracking-[0.2em] uppercase hover:text-accent transition-colors duration-300">{t.header.boutiques}</Link>

            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-border/50">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setLangOpen(!langOpen)}
                  className="p-2 min-h-11 min-w-11 flex items-center justify-center gap-1 hover:text-accent transition-colors duration-300 text-xs tracking-widest uppercase"
                  aria-label={t.header.switchLang}
                >
                  <Globe className="w-4 h-4" />
                  <span>{lang.toUpperCase()}</span>
                </button>
                {langOpen && (
                  <div className="absolute top-full right-0 mt-1 bg-background border border-border shadow-xl min-w-[120px]">
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        type="button"
                        onClick={() => { setLang(l.code); setLangOpen(false); }}
                        className={`w-full text-left px-4 py-3 text-sm tracking-wider hover:bg-secondary transition-colors duration-200 ${
                          lang === l.code ? "bg-accent/10 text-accent" : ""
                        }`}
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => window.location.href = "/products"}
                className="p-2 min-h-11 min-w-11 flex items-center justify-center hover:text-accent transition-colors duration-300"
                aria-label={t.header.search}
              >
                <Search className="w-5 h-5" />
              </button>
              <Link
                href="/account"
                className="p-2 min-h-11 min-w-11 flex items-center justify-center hover:text-accent transition-colors duration-300"
                aria-label={t.header.account}
              >
                <User className="w-5 h-5" />
              </Link>
              <button
                type="button"
                onClick={toggleCart}
                className="p-2 min-h-11 min-w-11 flex items-center justify-center hover:text-accent transition-colors duration-300 relative"
                aria-label={t.header.cart}
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-[9px] w-4 h-4 flex items-center justify-center tracking-none">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangOpen(!langOpen)}
                className="p-2 min-h-11 min-w-11 flex items-center justify-center gap-1 hover:text-accent transition-colors duration-300 text-xs tracking-widest uppercase"
              >
                <Globe className="w-4 h-4" />
              </button>
              {langOpen && (
                <div className="absolute top-full right-0 mt-1 bg-background border border-border shadow-xl min-w-[120px]">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => { setLang(l.code); setLangOpen(false); }}
                      className={`w-full text-left px-4 py-3 text-sm tracking-wider hover:bg-secondary transition-colors duration-200 ${
                        lang === l.code ? "bg-accent/10 text-accent" : ""
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              type="button"
              className="p-2 min-h-11 min-w-11 flex items-center justify-center hover:text-accent transition-colors duration-300"
              aria-label={t.header.search}
            >
              <Search className="w-5 h-5" />
            </button>
            <Link
              href="/checkout"
              className="p-2 min-h-11 min-w-11 flex items-center justify-center hover:text-accent transition-colors duration-300 relative"
              aria-label={t.header.cart}
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-accent text-accent-foreground text-[10px] flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 min-h-11 min-w-11 flex items-center justify-center"
              aria-label={t.header.toggleMenu}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border py-8 px-6 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex flex-col gap-6">
              <Link href="/hommes" className="text-sm tracking-[0.2em] uppercase" onClick={() => setIsMenuOpen(false)}>{t.header.men}</Link>
              <Link href="/femmes" className="text-sm tracking-[0.2em] uppercase" onClick={() => setIsMenuOpen(false)}>{t.header.women}</Link>
              <Link href="/enfants" className="text-sm tracking-[0.2em] uppercase" onClick={() => setIsMenuOpen(false)}>{t.header.children}</Link>
              <Link href="/heritage" className="text-sm tracking-[0.2em] uppercase" onClick={() => setIsMenuOpen(false)}>{t.header.heritage}</Link>
              <Link href="/services" className="text-sm tracking-[0.2em] uppercase" onClick={() => setIsMenuOpen(false)}>{t.header.services}</Link>
              <Link href="/boutiques" className="text-sm tracking-[0.2em] uppercase" onClick={() => setIsMenuOpen(false)}>{t.header.boutiques}</Link>
            </div>
          </div>
        )}
      </nav>
      <CartDrawer />
    </header>
  );
}
