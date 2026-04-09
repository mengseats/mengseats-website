import Link from "next/link";
import type { Recipe } from "@/data/recipes";
import MediaPlaceholder from "@/components/MediaPlaceholder";
import Tag from "@/components/Tag";

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-border bg-card">
      <MediaPlaceholder
        label={recipe.images[0] ?? recipe.title}
        className={`rounded-b-none border-x-0 border-t-0 bg-gradient-to-br ${recipe.accent}`}
      />
      <div className="flex flex-1 flex-col gap-5 p-6">
        <div className="flex flex-wrap gap-2">
          <Tag>{recipe.category}</Tag>
          <Tag>{recipe.cookTime}</Tag>
        </div>
        <div className="space-y-3">
          <h3 className="font-display text-3xl text-foreground">{recipe.title}</h3>
          <p className="text-sm leading-7 text-muted">{recipe.description}</p>
        </div>
        <Link
          href={`/recipes/${recipe.slug}`}
          className="mt-auto inline-flex w-fit items-center gap-2 text-sm uppercase tracking-[0.22em] text-accent hover:gap-3"
        >
          View recipe
          <span aria-hidden="true">+</span>
        </Link>
      </div>
    </article>
  );
}
