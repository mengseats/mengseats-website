"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import RecipeCard from "@/components/RecipeCard";
import type { Recipe } from "@/data/recipes";

export default function RecipeCarousel({ recipes }: { recipes: Recipe[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function updateScrollState() {
      const currentTrack = trackRef.current;
      if (!currentTrack) return;

      const maxScrollLeft = currentTrack.scrollWidth - currentTrack.clientWidth;
      setCanScrollLeft(currentTrack.scrollLeft > 4);
      setCanScrollRight(currentTrack.scrollLeft < maxScrollLeft - 4);
    }

    updateScrollState();
    track.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      track.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [recipes.length]);

  function scrollByAmount(direction: "left" | "right") {
    const track = trackRef.current;
    if (!track) return;

    const firstCard = track.querySelector<HTMLElement>("[data-recipe-card]");
    const gap = 20;
    const singleCardAmount = firstCard ? firstCard.offsetWidth + gap : 290;
    const amount = singleCardAmount * 4;
    track.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  }

  return (
    <div className="relative">
      <div className="mb-6 flex items-center justify-between gap-4">
        <Link
          href="/recipes"
          className="font-display text-2xl font-normal lowercase text-foreground transition hover:text-accent"
        >
          recipes
        </Link>
      </div>

      <div className="group relative">
        {canScrollLeft ? (
          <button
            type="button"
            aria-label="Scroll recipes left"
            onClick={() => scrollByAmount("left")}
            className="absolute left-0 top-[9.75rem] z-10 flex h-11 w-11 -translate-x-[88%] -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/92 text-lg text-accent opacity-0 shadow-sm transition-all duration-200 group-hover:opacity-100 hover:border-accent hover:bg-accent hover:text-white md:top-[10.5rem]"
          >
            &lsaquo;
          </button>
        ) : null}

        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {recipes.map((recipe) => (
            <div
              key={recipe.slug}
              data-recipe-card
              className="w-[78vw] min-w-[250px] flex-none snap-start md:w-[calc((100%-3.75rem)/4)] md:min-w-0"
            >
              <RecipeCard recipe={recipe} />
            </div>
          ))}
        </div>

        {canScrollRight ? (
          <button
            type="button"
            aria-label="Scroll recipes right"
            onClick={() => scrollByAmount("right")}
            className="absolute right-0 top-[9.75rem] z-10 flex h-11 w-11 translate-x-[88%] -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/92 text-lg text-accent opacity-0 shadow-sm transition-all duration-200 group-hover:opacity-100 hover:border-accent hover:bg-accent hover:text-white md:top-[10.5rem]"
          >
            &rsaquo;
          </button>
        ) : null}
      </div>
    </div>
  );
}
