import Link from "next/link";
import RecipeCard from "@/components/RecipeCard";
import { recentRecipes, recipes } from "@/data/recipes";

export default function HomePage() {
  const featured = recipes[0]; // Crispy Pork Belly

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

      <section className="mt-16">
        <h2 className="mb-6 font-display text-2xl font-normal lowercase text-foreground">
          {featured.title}
        </h2>

        <div className="grid grid-cols-3 gap-4">
          <div className="aspect-square overflow-hidden rounded-[0.35rem] bg-border">
            <div className="flex h-full w-full items-center justify-center text-sm text-muted">
              {featured.images[0] ?? "Photo 1"}
            </div>
          </div>
          <div className="aspect-square overflow-hidden rounded-[0.35rem] bg-border">
            <div className="flex h-full w-full items-center justify-center text-sm text-muted">
              {featured.images[1] ?? "Photo 2"}
            </div>
          </div>
          <div className="relative aspect-square overflow-hidden rounded-[0.35rem] bg-foreground/80">
            <div className="flex h-full w-full items-center justify-center text-4xl text-white">
              ▶
            </div>
            <span className="absolute bottom-3 left-3 text-xs text-white/80">
              {featured.videoLabel ?? "Video"}
            </span>
          </div>
        </div>

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
    </div>
  );
}
