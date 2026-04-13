import Image from "next/image";
import Link from "next/link";
import { galleryCategories, galleryItems } from "@/data/content";

const rowSpanPattern = [36, 22, 28, 33, 20, 30, 24, 38];

function getRowSpan(index: number) {
  return rowSpanPattern[index % rowSpanPattern.length];
}

interface GalleryPageProps {
  searchParams: Promise<{
    tab?: string;
  }>;
}

export default async function GalleryPage({ searchParams }: GalleryPageProps) {
  const { tab } = await searchParams;
  const activeTab = galleryCategories.includes(tab as (typeof galleryCategories)[number])
    ? (tab as (typeof galleryCategories)[number])
    : "cooks";

  const filtered = galleryItems.filter((item) => item.category === activeTab);

  return (
    <div className="mx-auto max-w-[1240px] px-6 pt-28 pb-10">
      <div className="mb-8 text-center">
        <h1 className="font-display text-3xl font-normal lowercase text-foreground sm:text-4xl">
          gallery
        </h1>
      </div>

      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {galleryCategories.map((cat) => (
          <Link
            key={cat}
            href={cat === "cooks" ? "/gallery" : `/gallery?tab=${cat}`}
            className={`font-editorial rounded-[0.18rem] border px-4 py-1.5 text-base lowercase ${
              activeTab === cat
                ? "border-accent bg-accent text-background"
                : "border-border bg-card text-foreground hover:border-accent/35"
            }`}
          >
            {cat}
          </Link>
        ))}
      </div>

      <div className="grid auto-rows-[10px] grid-cols-1 gap-[5px] sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item, index) => (
          <div
            key={item.id}
            className="group relative overflow-hidden rounded-[0.22rem] bg-border"
            style={{
              gridRow: `span ${getRowSpan(index)}`,
            }}
          >
            <Image
              src={item.src}
              alt={item.label}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />

            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-200 group-hover:bg-black/18">
              <span className="rounded-sm bg-black/55 px-3 py-1 text-center text-sm font-medium tracking-[0.04em] text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
