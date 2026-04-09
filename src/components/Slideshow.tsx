"use client";

import { useState } from "react";

interface Slide {
  title: string;
  caption: string;
}

interface SlideshowProps {
  slides: Slide[];
}

export default function Slideshow({ slides }: SlideshowProps) {
  const [index, setIndex] = useState(0);
  const current = slides[index];

  return (
    <div className="rounded-[2rem] border border-border bg-card p-4 shadow-[0_18px_60px_rgba(57,42,30,0.08)]">
      <div className="flex min-h-[340px] flex-col justify-between rounded-[1.5rem] bg-[linear-gradient(135deg,rgba(186,74,47,0.12),rgba(91,100,66,0.14),rgba(255,250,244,0.96))] p-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.28em] text-muted">slideshow placeholder</p>
          <h3 className="font-display text-4xl leading-none text-foreground">
            {current.title}
          </h3>
        </div>

        <div className="space-y-6">
          <div className="h-36 rounded-[1.5rem] border border-white/70 bg-white/40" />
          <p className="max-w-lg text-sm leading-7 text-ink-soft">{current.caption}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex gap-2">
          {slides.map((slide, slideIndex) => (
            <button
              key={slide.title}
              type="button"
              onClick={() => setIndex(slideIndex)}
              className={`h-2.5 rounded-full ${
                slideIndex === index ? "w-8 bg-accent" : "w-2.5 bg-border"
              }`}
              aria-label={`Show slide ${slideIndex + 1}`}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setIndex((index - 1 + slides.length) % slides.length)}
            className="rounded-full border border-border px-4 py-2 text-sm text-foreground hover:border-foreground/50"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={() => setIndex((index + 1) % slides.length)}
            className="rounded-full border border-foreground bg-foreground px-4 py-2 text-sm text-background"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
