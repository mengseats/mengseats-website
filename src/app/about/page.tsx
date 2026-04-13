import type { Metadata } from "next";
import Slideshow from "@/components/Slideshow";
import { aboutSections } from "@/data/content";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-6 pt-28 pb-10">
      <h1 className="mb-10 text-center font-display text-3xl font-normal lowercase text-foreground">
        about
      </h1>

      <div className="space-y-20">
        {aboutSections.map((section) => (
          <section
            key={section.title}
            className="grid items-center gap-10 md:grid-cols-2"
          >
            <div>
              <h2 className="mb-4 font-display text-2xl font-normal text-foreground">
                {section.title}
              </h2>
              <p className="text-sm leading-relaxed text-muted">{section.body}</p>
            </div>

            <Slideshow slides={section.slides} />
          </section>
        ))}
      </div>
    </div>
  );
}
