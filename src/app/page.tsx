/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import RecipeCard from "@/components/RecipeCard";
import { getRecentRecipes, getRecipes } from "@/lib/site-content";

export const revalidate = 300;

export default async function HomePage() {
  const [recentRecipes, recipes] = await Promise.all([getRecentRecipes(4), getRecipes()]);
  const featured = recipes[0];
  const featuredImages = featured
    ? featured.images.filter(
        (image): image is string => typeof image === "string" && /^https?:\/\//.test(image),
      )
    : [];
  const hasFeaturedVideo = Boolean(featured?.videoLabel);

  return (
    <div className="mx-auto max-w-[1200px] px-6 pt-28 pb-10">
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-2xl font-normal lowercase text-foreground">recipes</h2>
          <Link href="/recipes" className="text-sm lowercase text-accent hover:text-accent-hover">
            see all &rsaquo;
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {recentRecipes.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      </section>

      {featured ? (
        <section className="mt-16">
          <h2 className="mb-6 font-display text-2xl font-normal lowercase text-foreground">
            {featured.title}
          </h2>

          {featuredImages.length > 0 || hasFeaturedVideo ? (
            <div
              className={`grid gap-4 ${
                featuredImages.length >= 2 || hasFeaturedVideo
                  ? "grid-cols-2 md:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {featuredImages.slice(0, 2).map((image, index) => (
                <div key={image} className="aspect-square overflow-hidden rounded-[0.35rem] bg-border">
                  <img
                    src={image}
                    alt={index === 0 ? featured.title : `${featured.title} ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}

              {hasFeaturedVideo ? (
                <div className="relative aspect-square overflow-hidden rounded-[0.35rem] bg-foreground/80">
                  <div className="flex h-full w-full items-center justify-center text-4xl text-white">
                    ▶
                  </div>
                  <span className="absolute bottom-3 left-3 text-xs text-white/80">
                    {featured.videoLabel}
                  </span>
                </div>
              ) : null}
            </div>
          ) : null}

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
            {featured.description}
          </p>
          <Link
            href={`/recipes/${featured.slug}`}
            className="mt-4 inline-block rounded-[0.35rem] bg-accent px-6 py-2.5 text-sm lowercase text-white hover:bg-accent-hover"
          >
            view recipe
          </Link>
        </section>
      ) : null}
    </div>
  );
}
