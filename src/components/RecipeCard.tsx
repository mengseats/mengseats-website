import Link from "next/link";
import type { Recipe } from "@/data/recipes";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link href={`/recipes/${recipe.slug}`} className="group block">
      <div className="aspect-[4/5] overflow-hidden rounded-xl bg-border">
        {/* Placeholder — replace with <Image> when real photos are added */}
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-sand/60 to-border text-sm text-muted">
          {recipe.images[0] ?? "Photo"}
        </div>
      </div>
      <h3 className="mt-3 font-display text-lg leading-tight text-foreground group-hover:text-accent">
        {recipe.title}
      </h3>
      <p className="mt-1 text-sm text-muted">{recipe.description}</p>
    </Link>
  );
}
