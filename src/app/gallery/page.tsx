import Image from "next/image";
import Link from "next/link";
import { galleryCategories, galleryItems } from "@/data/content";

const rowSpanPattern = [36, 22, 28, 33, 20, 30, 24, 38];

const rowSpanOverrides: Record<string, number> = {
  "eats-beef noodle soup": 30,
  "eats-marrow": 27,
  "eats-brains": 20,
  "eats-dim sum": 30,
  "travels-taj mahal": 31,
  "travels-casablanca": 36,
  "travels-chongqing": 35,
  "travels-osaka": 34,
  "travels-shibuya": 34,
  "tunes-magdalena bay 8.24.24": 36,
  "tunes-slowdive 5.17.24": 20,
  "tunes-anderson .paak 8.13.24": 20,
  "tunes-icytwat 4.10.24": 28,
  "other-spiraling": 30,
  "other-gtc": 34,
  "other-backrooms": 30,
  "other-construction": 31,
  "other-pisces": 36,
  "other-stranger things": 30,
};

const objectPositionOverrides: Record<string, string> = {
  "travels-taj mahal": "center 42%",
  "travels-chongqing": "center 44%",
  "travels-jaipur": "center 42%",
  "tunes-fka twigs 3.16.26": "center 42%",
  "tunes-kaytranada 11.12.25": "center 43%",
  "tunes-yuree 8.12.25": "center 78%",
  "other-spiraling": "center 55%",
  "other-gtc": "center 48%",
  "other-backrooms": "center 50%",
  "other-construction": "center 50%",
  "other-pisces": "center 50%",
  "other-stranger things": "center 50%",
};

const imageScaleOverrides: Record<string, number> = {
  "tunes-quannnic 9.7.25": 1.08,
  "other-spiraling": 1.03,
  "other-gtc": 1.03,
  "other-backrooms": 1.02,
  "other-stranger things": 1.02,
};

function getRowSpan(
  item: {
    category: string;
    label: string;
  },
  index: number,
) {
  const overrideKey = `${item.category}-${item.label}`;
  return rowSpanOverrides[overrideKey] ?? rowSpanPattern[index % rowSpanPattern.length];
}

function getObjectPosition(item: { category: string; label: string }) {
  const overrideKey = `${item.category}-${item.label}`;
  return objectPositionOverrides[overrideKey] ?? "center";
}

function getImageScale(item: { category: string; label: string }) {
  const overrideKey = `${item.category}-${item.label}`;
  return imageScaleOverrides[overrideKey] ?? 1;
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
              gridRow: `span ${getRowSpan(item, index)}`,
            }}
          >
            <Image
              src={item.src}
              alt={item.label}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              style={{
                objectPosition: getObjectPosition(item),
                transform: getImageScale(item) === 1 ? undefined : `scale(${getImageScale(item)})`,
              }}
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
