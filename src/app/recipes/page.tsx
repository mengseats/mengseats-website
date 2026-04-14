import type { Metadata } from "next";
import RecipeCard from "@/components/RecipeCard";
import { getRecipes } from "@/lib/site-content";

export const metadata: Metadata = { title: "Recipes" };
export const revalidate = 300;

export default async function RecipesPage() {
  const recipes = await getRecipes();

  return (
    <div className="mx-auto max-w-[1200px] px-6 pt-28 pb-10">
      <div className="mb-8 text-center">
        <h1 className="font-display text-3xl font-normal lowercase text-foreground">recipes</h1>
        <div className="mt-2 flex justify-center">
          <svg className="h-5 w-5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" strokeWidth="2" />
            <path d="m21 21-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.slug} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
