import Link from "next/link";

const socialLinks = [
  {
    href: "https://www.instagram.com/mengseats/",
    label: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5Zm8.95 1.35a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3ZM12 6.5A5.5 5.5 0 1 1 6.5 12 5.5 5.5 0 0 1 12 6.5Zm0 1.8A3.7 3.7 0 1 0 15.7 12 3.7 3.7 0 0 0 12 8.3Z" />
      </svg>
    ),
  },
  {
    href: "https://www.tiktok.com/@mengseats",
    label: "TikTok",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
        <path d="M14.54 2c.17 1.4.94 2.7 2.13 3.55 1.07.77 2.39 1.13 3.7 1v3.08a8.5 8.5 0 0 1-3.97-1.03v6.02a6.62 6.62 0 1 1-5.7-6.56v3.18a3.45 3.45 0 1 0 2.54 3.33V2h3.3Z" />
      </svg>
    ),
  },
  {
    href: "https://www.youtube.com/@mengs_eats",
    label: "YouTube",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
        <path d="M21.58 7.2a2.94 2.94 0 0 0-2.07-2.08C17.71 4.6 12 4.6 12 4.6s-5.71 0-7.51.52A2.94 2.94 0 0 0 2.42 7.2 30.36 30.36 0 0 0 2 12a30.36 30.36 0 0 0 .42 4.8 2.94 2.94 0 0 0 2.07 2.08c1.8.52 7.51.52 7.51.52s5.71 0 7.51-.52a2.94 2.94 0 0 0 2.07-2.08A30.36 30.36 0 0 0 22 12a30.36 30.36 0 0 0-.42-4.8ZM9.7 15.08V8.92L15.18 12 9.7 15.08Z" />
      </svg>
    ),
  },
  {
    href: "https://discord.gg/6fBs56V4",
    label: "Discord",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
        <path d="M20.32 4.37A16.66 16.66 0 0 0 16.23 3a11.42 11.42 0 0 0-.52 1.08 15.37 15.37 0 0 0-4.63 0A11.42 11.42 0 0 0 10.56 3a16.52 16.52 0 0 0-4.1 1.38C3.87 8.17 3.18 11.87 3.52 15.52a16.9 16.9 0 0 0 5.03 2.55c.41-.56.77-1.15 1.08-1.77-.59-.22-1.15-.49-1.68-.8.14-.1.27-.2.4-.31a11.88 11.88 0 0 0 7.3 0c.13.11.26.21.4.31-.53.31-1.09.58-1.68.8.31.62.67 1.21 1.08 1.77a16.83 16.83 0 0 0 5.03-2.55c.4-4.23-.68-7.9-2.16-11.15ZM9.86 13.29c-.72 0-1.31-.67-1.31-1.49 0-.82.58-1.49 1.31-1.49.73 0 1.32.67 1.31 1.49 0 .82-.58 1.49-1.31 1.49Zm4.28 0c-.72 0-1.31-.67-1.31-1.49 0-.82.58-1.49 1.31-1.49.73 0 1.32.67 1.31 1.49 0 .82-.58 1.49-1.31 1.49Z" />
      </svg>
    ),
  },
] as const;

export default function Footer() {
  return (
    <footer className="bg-black py-10 text-center text-sm text-background/70">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-5 flex items-center justify-center gap-5 text-background/85">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={social.label}
              className="transition-colors hover:text-background"
            >
              {social.icon}
            </a>
          ))}
        </div>
        <p>&copy; {new Date().getFullYear()} mengseats</p>
      </div>
    </footer>
  );
}
