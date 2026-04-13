"use client";

import { useState } from "react";

interface Slide {
  title: string;
  caption: string;
}

export default function Slideshow({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const current = slides[index];

  const prev = () => setIndex((index - 1 + slides.length) % slides.length);
  const next = () => setIndex((index + 1) % slides.length);

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      {/* Image area */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-sand/40 to-border">
        <div className="flex h-full w-full items-center justify-center text-sm text-muted">
          {current.title}
        </div>

        {/* Prev / Next arrows */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-foreground shadow hover:bg-white"
          aria-label="Previous slide"
        >
          ‹
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-foreground shadow hover:bg-white"
          aria-label="Next slide"
        >
          ›
        </button>
      </div>

      {/* Caption */}
      <p className="px-5 py-3 text-sm text-muted">{current.caption}</p>

      {/* Dots */}
      <div className="flex justify-center gap-2 pb-4">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full ${i === index ? "bg-accent" : "bg-border"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
