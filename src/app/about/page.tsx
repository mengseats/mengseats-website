import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import Slideshow from "@/components/Slideshow";
import { aboutSections } from "@/data/content";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
      <section className="rounded-[2.5rem] border border-border bg-card px-6 py-10 sm:px-10">
        <SectionHeading
          eyebrow="About"
          title="Three sections, each with room for a photo story."
          description="Your sketch called for an about page with three sections and a slideshow in each one. This page is built around that exact structure so you can drop in captions and images later."
        />
      </section>

      <div className="mt-12 space-y-10">
        {aboutSections.map((section) => (
          <section
            key={section.title}
            className="grid gap-6 rounded-[2.5rem] border border-border bg-card p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr]"
          >
            <div className="space-y-5">
              <p className="text-xs uppercase tracking-[0.28em] text-accent">
                {section.subtitle}
              </p>
              <h2 className="font-display text-5xl leading-none text-foreground">
                {section.title}
              </h2>
              <p className="max-w-xl text-base leading-8 text-muted">{section.body}</p>
            </div>
            <Slideshow slides={section.slides} />
          </section>
        ))}
      </div>
    </div>
  );
}
