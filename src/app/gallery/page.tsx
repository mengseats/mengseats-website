import type { Metadata } from "next";
import MediaPlaceholder from "@/components/MediaPlaceholder";
import SectionHeading from "@/components/SectionHeading";
import { gallerySections } from "@/data/content";

export const metadata: Metadata = {
  title: "Gallery",
};

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
      <section className="rounded-[2.5rem] border border-border bg-card px-6 py-10 sm:px-10">
        <SectionHeading
          eyebrow="Gallery"
          title="A visual archive with multiple sections."
          description="Your sketch showed a gallery with several buckets of content. This page is set up so you can keep categories separate while still feeling cohesive."
        />
      </section>

      <div className="mt-12 space-y-12">
        {gallerySections.map((section) => (
          <section key={section.slug} className="space-y-6">
            <div className="max-w-2xl space-y-3">
              <p className="text-xs uppercase tracking-[0.28em] text-accent">
                {section.title}
              </p>
              <p className="text-base leading-8 text-muted">{section.description}</p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {section.items.map((item) => (
                <MediaPlaceholder key={item} label={item} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
