/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRecipeBySlug, getRecipes } from "@/lib/site-content";

interface RecipePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const recipes = await getRecipes();
  return recipes.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: RecipePageProps): Promise<Metadata> {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);
  if (!recipe) return { title: "Recipe Not Found" };
  return { title: recipe.title, description: recipe.description };
}

export default async function RecipeDetailPage({ params }: RecipePageProps) {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);
  if (!recipe) notFound();

  const imageSlots = recipe.images.filter(
    (image): image is string => typeof image === "string" && image.length > 0,
  );
  const galleryGridClass =
    imageSlots.length === 1
      ? "grid grid-cols-1"
      : imageSlots.length === 2
        ? "grid grid-cols-2"
        : imageSlots.length === 3
          ? "grid grid-cols-2 md:grid-cols-3"
          : "grid grid-cols-2 md:grid-cols-4";
  const galleryWrapperClass =
    imageSlots.length === 1
      ? "mx-auto max-w-[320px]"
      : imageSlots.length === 2
        ? "mx-auto max-w-[720px]"
        : "mx-auto max-w-[980px]";
  const imageTileClass = imageSlots.length === 1 ? "aspect-[4/5]" : "aspect-square";

  return (
    <div className="mx-auto max-w-[1200px] px-6 pt-28 pb-10">
      {/* Title */}
      <h1 className="mb-8 text-center font-display text-4xl text-foreground md:text-5xl">
        {recipe.title}
      </h1>

      {imageSlots.length > 0 ? (
        <div className={`mb-12 gap-4 ${galleryGridClass} ${galleryWrapperClass}`}>
          {imageSlots.map((img, i) => (
            <div key={i} className={`${imageTileClass} overflow-hidden rounded-xl bg-border`}>
              {/^https?:\/\//.test(img) ? (
                <img src={img} alt={`${recipe.title} ${i + 1}`} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm text-muted">
                  {img}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : null}

      {/* Two columns: Ingredients | Instructions */}
      <div className="grid gap-12 md:grid-cols-[1fr_1.5fr]">
        {/* Ingredients */}
        <div>
          <h2 className="mb-6 font-display text-2xl text-foreground">Ingredients</h2>
          {recipe.ingredientGroups.map((group) => (
            <div key={group.name} className="mb-6">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-accent">
                {group.name}
              </h3>
              <ul className="space-y-2 border-l-2 border-border pl-4">
                {group.items.map((item) => (
                  <li key={item} className="text-sm leading-relaxed text-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div>
          <h2 className="mb-6 font-display text-2xl text-foreground">Instructions</h2>
          <ol className="space-y-4">
            {recipe.instructions.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed text-muted">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
