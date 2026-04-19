"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/recipes", label: "recipes" },
  { href: "/gallery", label: "gallery" },
  { href: "/blog", label: "blog" },
  { href: "/about", label: "about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-wordmark text-[2.8rem] leading-[0.9] lowercase text-accent"
        >
          mengseats
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-display rounded-[0.18rem] border px-4 py-1.5 text-base lowercase transition-all ${
                  active
                    ? "border-accent bg-accent text-background"
                    : "border-transparent bg-transparent text-accent hover:border-accent hover:bg-accent hover:text-background"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <button
        className="absolute right-6 top-5 flex flex-col gap-[5px] p-2 md:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        <span className={`block h-[2px] w-6 bg-accent transition-transform ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`} />
        <span className={`block h-[2px] w-6 bg-accent transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
        <span className={`block h-[2px] w-6 bg-accent transition-transform ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
      </button>

      {mobileOpen && (
        <div className="border-b border-border bg-background px-6 py-4 shadow-md md:hidden">
          <nav className="flex flex-col items-center gap-3 lowercase">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
