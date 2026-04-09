import Link from "next/link";
import MediaPlaceholder from "@/components/MediaPlaceholder";
import RecipeCard from "@/components/RecipeCard";
import SectionHeading from "@/components/SectionHeading";
import Tag from "@/components/Tag";
import { recentRecipes } from "@/data/recipes";

export default function HomePage() {
  return (
    <div className="pb-20">
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-16">
        <div className="space-y-8">
          <div className="flex flex-wrap gap-3">
            <Tag>Recipes</Tag>
            <Tag>Gallery</Tag>
            <Tag>Blog</Tag>
            <Tag>About</Tag>
          </div>

          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.34em] text-accent">
              A home for food, photos, and stories
            </p>
            <h1 className="max-w-4xl font-display text-6xl leading-[0.9] text-foreground sm:text-7xl lg:text-8xl">
              Mengseats, built to grow with every recipe and every post.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">
              This is a polished working skeleton for your site, shaped around the
              sketch you shared: a bold home page, featured recipes, recipe
              details, gallery sections, blog cards, and a three-part about page
              with slideshows.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/recipes"
              className="rounded-full border border-foreground bg-foreground px-6 py-3 text-sm uppercase tracking-[0.2em] text-background"
            >
              Explore recipes
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-border bg-card px-6 py-3 text-sm uppercase tracking-[0.2em] text-foreground hover:-translate-y-0.5 hover:border-foreground/50"
            >
              Read the story
            </Link>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
          <MediaPlaceholder
            label="Homepage hero image"
            caption="Swap this with your main portrait, signature dish, or strongest brand image."
            className="bg-gradient-to-br from-[#f2d8c4] via-[#f8efe5] to-[#6b4e3d]"
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <MediaPlaceholder label="Short reel slot" className="min-h-[180px]" />
            <MediaPlaceholder label="Favorite dish" className="min-h-[180px]" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="mb-10 flex items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Most Recent Recipes"
            title="The latest four recipe cards, ready for real content."
            description="Your sketch showed four cards on the home page, so this section mirrors that exactly and links into the full recipe library."
          />
          <Link
            href="/recipes"
            className="hidden rounded-full border border-border px-5 py-3 text-sm uppercase tracking-[0.2em] text-foreground hover:border-foreground/50 lg:inline-flex"
          >
            All recipes
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {recentRecipes.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 lg:grid-cols-3">
        <div className="rounded-[2rem] border border-border bg-card p-7">
          <p className="text-xs uppercase tracking-[0.28em] text-accent">Gallery</p>
          <h2 className="mt-4 font-display text-4xl text-foreground">
            Multiple sections, one visual archive.
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted">
            The gallery page is organized into separate sections so you can sort
            recipe shoots, behind-the-scenes content, and food finds.
          </p>
        </div>
        <div className="rounded-[2rem] border border-border bg-card p-7">
          <p className="text-xs uppercase tracking-[0.28em] text-accent">Blog</p>
          <h2 className="mt-4 font-display text-4xl text-foreground">
            A clean grid for updates and stories.
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted">
            The blog page follows your sketch with a featured intro block and a
            card layout below it.
          </p>
        </div>
        <div className="rounded-[2rem] border border-border bg-card p-7">
          <p className="text-xs uppercase tracking-[0.28em] text-accent">About</p>
          <h2 className="mt-4 font-display text-4xl text-foreground">
            Three story sections with slideshows.
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted">
            Each about section includes a slideshow placeholder so you can later
            add captioned photos without changing the layout.
          </p>
        </div>
      </section>
    </div>
  );
}
