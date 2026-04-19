"use client";

import { useEffect, useState } from "react";

interface Slide {
  title: string;
  caption: string;
  src?: string;
}

export default function Slideshow({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showIncoming, setShowIncoming] = useState(true);
  const current = slides[activeIndex];
  const previous = previousIndex !== null ? slides[previousIndex] : null;

  const prev = () => setIndex((index - 1 + slides.length) % slides.length);
  const next = () => setIndex((index + 1) % slides.length);

  useEffect(() => {
    if (index === activeIndex) {
      return;
    }

    setPreviousIndex(activeIndex);
    setActiveIndex(index);
    setIsTransitioning(true);
    setShowIncoming(false);

    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => setShowIncoming(true));
    });

    const timeout = setTimeout(() => {
      setPreviousIndex(null);
      setIsTransitioning(false);
      setShowIncoming(true);
    }, 420);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timeout);
    };
  }, [index, activeIndex]);

  return (
    <div className="group relative overflow-hidden rounded-xl">
      {/* Image area */}
      <div className="relative mx-auto aspect-[4/5] w-full max-w-[460px] overflow-hidden rounded-xl">
        {previous ? (
          previous.src ? (
            <img
              key={`previous-${previous.src}-${previousIndex}`}
              src={previous.src}
              alt={previous.caption || previous.title}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out ${
                isTransitioning ? (showIncoming ? "opacity-0" : "opacity-100") : "opacity-100"
              }`}
            />
          ) : (
            <div
              className={`absolute inset-0 flex h-full w-full items-center justify-center bg-gradient-to-br from-sand/40 to-border text-sm text-muted transition-opacity duration-500 ease-out ${
                isTransitioning ? (showIncoming ? "opacity-0" : "opacity-100") : "opacity-100"
              }`}
            >
              {previous.title}
            </div>
          )
        ) : null}

        {current.src ? (
            <img
              key={`current-${current.src}-${index}`}
              src={current.src}
              alt={current.caption || current.title}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out ${
                isTransitioning && previous
                  ? showIncoming
                    ? "opacity-100"
                    : "opacity-0"
                  : "opacity-100"
              }`}
            />
          ) : (
            <div
              className={`absolute inset-0 flex h-full w-full items-center justify-center bg-gradient-to-br from-sand/40 to-border text-sm text-muted transition-opacity duration-500 ease-out ${
                isTransitioning && previous
                  ? showIncoming
                    ? "opacity-100"
                    : "opacity-0"
                  : "opacity-100"
              }`}
            >
              {current.title}
            </div>
          )}

        {/* Prev / Next arrows */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-foreground opacity-0 shadow transition-all duration-300 group-hover:opacity-100 hover:scale-105 hover:bg-white"
          aria-label="Previous slide"
        >
          ‹
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-foreground opacity-0 shadow transition-all duration-300 group-hover:opacity-100 hover:scale-105 hover:bg-white"
          aria-label="Next slide"
        >
          ›
        </button>
      </div>

      {/* Caption */}
      <p className="px-5 py-3 text-center text-sm text-muted">{current.caption}</p>

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
