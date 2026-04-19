"use client";

import { useRef } from "react";
import RecipeCard from "@/components/RecipeCard";
import type { Recipe } from "@/data/recipes";

export default function RecipeCarousel({ recipes }: { recipes: Recipe[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollByAmount(direction: "left" | "right") {
    const track = trackRef.current;
    if (!track) return;

    const firstCard = track.querySelector<HTMLElement>("[data-recipe-card]");
    const gap = 20;
    const amount = firstCard ? firstCard.offsetWidth + gap : 290;
    track.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  }

  return (
    <div className="relative">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="font-display text-2xl font-normal lowercase text-foreground">recipes</h2>
      </div>

      <div className="relative">
        <button
          type="button"
          aria-label="Scroll recipes left"
          onClick={() => scrollByAmount("left")}
          className="absolute left-0 top-[38%] z-10 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/92 text-lg text-accent shadow-sm transition hover:border-accent hover:bg-accent hover:text-white"
        >
          &lsaquo;
        </button>

        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {recipes.map((recipe) => (
            <div
              key={recipe.slug}
              data-recipe-card
              className="w-[min(34vw,280px)] min-w-[250px] flex-none snap-start md:min-w-[270px]"
            >
              <RecipeCard recipe={recipe} />
            </div>
          ))}
        </div>

        <button
          type="button"
          aria-label="Scroll recipes right"
          onClick={() => scrollByAmount("right")}
          className="absolute right-0 top-[38%] z-10 flex h-11 w-11 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/92 text-lg text-accent shadow-sm transition hover:border-accent hover:bg-accent hover:text-white"
        >
          &rsaquo;
        </button>
      </div>
    </div>
  );
}
