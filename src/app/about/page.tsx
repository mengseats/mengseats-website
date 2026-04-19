import type { Metadata } from "next";
import Slideshow from "@/components/Slideshow";
import { getAboutSections } from "@/lib/site-content";

export const metadata: Metadata = { title: "About" };
export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const aboutSections = await getAboutSections();

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
              <h2 className="mb-5 max-w-[16ch] font-display text-[2.35rem] leading-[0.92] font-normal text-foreground sm:text-[2.8rem] md:text-[3.2rem]">
                {section.title}
              </h2>
              <p className="whitespace-pre-line text-sm leading-relaxed text-muted">
                {section.body}
              </p>
            </div>

            <Slideshow slides={section.slides} />
          </section>
        ))}
      </div>
    </div>
  );
}
