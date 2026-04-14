import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-foreground py-10 text-center text-sm text-background/70">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-4 flex justify-center gap-6">
          <Link href="/recipes" className="hover:text-background">Recipes</Link>
          <Link href="/shortform" className="hover:text-background">Shortform</Link>
          <Link href="/gallery" className="hover:text-background">Gallery</Link>
          <Link href="/blog" className="hover:text-background">Blog</Link>
          <Link href="/about" className="hover:text-background">About</Link>
        </div>
        <p>&copy; {new Date().getFullYear()} mengseats</p>
      </div>
    </footer>
  );
}
