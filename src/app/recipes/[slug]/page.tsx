import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MediaPlaceholder from "@/components/MediaPlaceholder";
import SectionHeading from "@/components/SectionHeading";
import Tag from "@/components/Tag";
import { getRecipeBySlug, recipes } from "@/data/recipes";

interface RecipePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return recipes.map((recipe) => ({
    slug: recipe.slug,
  }));
}

export async function generateMetadata({
  params,
}: RecipePageProps): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);

  if (!recipe) {
    return {
      title: "Recipe Not Found",
    };
  }

  return {
    title: recipe.title,
    description: recipe.description,
  };
}

export default async function RecipeDetailPage({ params }: RecipePageProps) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);

  if (!recipe) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
      <Link
        href="/recipes"
        className="mb-8 inline-flex text-sm uppercase tracking-[0.22em] text-muted hover:text-foreground"
      >
        Back to recipes
      </Link>

      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="flex flex-wrap gap-3">
            <Tag>{recipe.category}</Tag>
            <Tag>{recipe.cookTime}</Tag>
            <Tag>{recipe.difficulty}</Tag>
          </div>

          <div className="space-y-5">
            <h1 className="font-display text-5xl leading-none text-foreground sm:text-7xl">
              {recipe.title}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted">
              {recipe.description}
            </p>
            <p className="max-w-2xl text-base leading-8 text-ink-soft">
              {recipe.intro}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.75rem] border border-border bg-card p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-muted">Time</p>
              <p className="mt-3 font-display text-3xl">{recipe.cookTime}</p>
            </div>
            <div className="rounded-[1.75rem] border border-border bg-card p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-muted">Servings</p>
              <p className="mt-3 font-display text-3xl">{recipe.servings}</p>
            </div>
            <div className="rounded-[1.75rem] border border-border bg-card p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-muted">Level</p>
              <p className="mt-3 font-display text-3xl">{recipe.difficulty}</p>
            </div>
          </div>
        </div>

        <MediaPlaceholder
          label={recipe.images[0] ?? recipe.title}
          caption="Primary recipe image placeholder. Replace with your hero shot when you're ready."
          className={`bg-gradient-to-br ${recipe.accent}`}
        />
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6 rounded-[2rem] border border-border bg-card p-6 sm:p-8">
          <SectionHeading
            eyebrow="Ingredients"
            title="Everything you need"
            description="This section mirrors your sketch: grouped ingredients on the left with enough room for short notes and swaps."
          />

          <div className="space-y-6">
            {recipe.ingredientGroups.map((group) => (
              <div key={group.name} className="rounded-[1.5rem] bg-background p-5">
                <h2 className="font-display text-3xl text-foreground">{group.name}</h2>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-muted">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[2rem] border border-border bg-card p-6 sm:p-8">
            <SectionHeading
              eyebrow="Directions"
              title="Cook step by step"
              description="Longer method text can live here, with room for extra process shots or a reel embed."
            />

            <ol className="mt-8 space-y-4">
              {recipe.instructions.map((step, index) => (
                <li
                  key={step}
                  className="grid gap-4 rounded-[1.5rem] bg-background p-5 sm:grid-cols-[auto_1fr]"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-foreground text-sm text-background">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-7 text-muted">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <MediaPlaceholder
              label={recipe.videoLabel ?? "Video placeholder"}
              caption="Optional embedded video area."
            />
            <div className="rounded-[2rem] border border-border bg-card p-6">
              <p className="text-xs uppercase tracking-[0.28em] text-accent">Extra Notes</p>
              <ul className="mt-5 space-y-4 text-sm leading-7 text-muted">
                {recipe.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
