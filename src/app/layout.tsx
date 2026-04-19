import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { calluna, hoshikoSatsuki, playfairDisplay } from "@/app/fonts";

export const metadata: Metadata = {
  title: {
    default: "mengseats",
    template: "%s | mengseats",
  },
  description:
    "A polished skeleton site for mengseats featuring recipes, gallery moments, stories, and an about page ready for real media.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${calluna.variable} ${hoshikoSatsuki.variable} ${playfairDisplay.variable}`}>
      <body className="min-h-screen flex flex-col font-sans antialiased bg-background text-foreground">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
