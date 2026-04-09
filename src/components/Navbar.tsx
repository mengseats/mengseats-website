"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/recipes", label: "Recipes" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="group flex items-end gap-3">
          <span className="font-display text-3xl leading-none tracking-[0.08em] text-foreground">
            mengseats
          </span>
          <span className="mb-1 hidden text-xs uppercase tracking-[0.28em] text-muted sm:block">
            recipes and stories
          </span>
        </Link>

        <nav className="flex items-center gap-2 overflow-x-auto">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full border px-4 py-2 text-sm ${
                  active
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-card/70 text-foreground hover:-translate-y-0.5 hover:border-foreground/50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
