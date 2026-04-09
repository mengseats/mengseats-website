import type { Metadata } from "next";
import RecipeCard from "@/components/RecipeCard";
import SectionHeading from "@/components/SectionHeading";
import { recipes } from "@/data/recipes";

export const metadata: Metadata = {
  title: "Recipes",
};

export default function RecipesPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
      <section className="mb-12 rounded-[2.5rem] border border-border bg-card px-6 py-10 sm:px-10">
        <SectionHeading
          eyebrow="Recipes"
          title="A recipe library with room to grow."
          description="This page follows your sketch with a simple grid of recipe cards. Each one links to a detail page with a hero, ingredient list, directions, and extra notes."
        />
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.slug} recipe={recipe} />
        ))}
      </section>
    </div>
  );
}
