/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { Recipe } from "@/data/recipes";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const primaryImage = recipe.images[0];
  const hasImage = typeof primaryImage === "string" && /^https?:\/\//.test(primaryImage);

  return (
    <Link href={`/recipes/${recipe.slug}`} className="group block">
      <div className="aspect-[4/5] overflow-hidden rounded-xl bg-border">
        {hasImage ? (
          <img
            src={primaryImage}
            alt={recipe.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-sand/60 to-border text-sm text-muted">
            {primaryImage ?? "Photo"}
          </div>
        )}
      </div>
      <h3 className="mt-3 font-display text-lg leading-tight text-foreground group-hover:text-accent">
        {recipe.title}
      </h3>
      {recipe.description ? <p className="mt-1 text-sm text-muted">{recipe.description}</p> : null}
    </Link>
  );
}
