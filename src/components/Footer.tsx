import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-[#f2e6d8]">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 sm:px-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl space-y-3">
          <p className="font-display text-3xl text-foreground">mengseats</p>
          <p className="text-sm leading-7 text-muted">
            A recipe, gallery, and storytelling home built as a polished template
            so you can swap in your real photos, videos, and writing later.
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm text-muted sm:items-end">
          <div className="flex gap-4">
            <Link href="/recipes" className="hover:text-foreground">
              Recipes
            </Link>
            <Link href="/gallery" className="hover:text-foreground">
              Gallery
            </Link>
            <Link href="/blog" className="hover:text-foreground">
              Blog
            </Link>
            <Link href="/about" className="hover:text-foreground">
              About
            </Link>
          </div>
          <p>Instagram, TikTok, and YouTube placeholders ready to wire up.</p>
        </div>
      </div>
    </footer>
  );
}
