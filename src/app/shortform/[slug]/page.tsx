/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getShortformEntries, getShortformEntryBySlug } from "@/lib/site-content";

export const revalidate = 300;

export async function generateStaticParams() {
  const entries = await getShortformEntries();
  return entries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getShortformEntryBySlug(slug);

  if (!entry) {
    return { title: "Shortform" };
  }

  return {
    title: `${entry.title} | Shortform`,
  };
}

export default async function ShortformDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = await getShortformEntryBySlug(slug);

  if (!entry) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-[1200px] px-6 pt-28 pb-10">
      <div className="mb-8">
        <Link
          href="/shortform"
          className="text-sm lowercase text-muted transition-colors hover:text-accent"
        >
          back to shortform
        </Link>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <h1 className="font-display text-4xl font-normal lowercase text-foreground">
            {entry.title}
          </h1>
          {entry.status ? (
            <span className="rounded-[0.25rem] bg-sand px-2 py-1 text-xs lowercase text-foreground">
              {entry.status}
            </span>
          ) : null}
          {entry.type ? (
            <span className="rounded-[0.25rem] border border-border px-2 py-1 text-xs lowercase text-muted">
              {entry.type}
            </span>
          ) : null}
        </div>
        <div className="mt-4 flex flex-wrap gap-3 text-xs lowercase text-muted">
          {entry.date ? <span>{entry.date}</span> : null}
          {entry.url ? (
            <a
              href={entry.url}
              target="_blank"
              rel="noreferrer"
              className="text-accent transition-colors hover:text-accent-hover"
            >
              open link
            </a>
          ) : null}
        </div>
      </div>

      <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[...entry.images, ...Array(Math.max(0, 4 - entry.images.length)).fill(null)]
          .slice(0, 4)
          .map((image, index) => (
            <div
              key={`${entry.id}-image-${index}`}
              className="aspect-square overflow-hidden rounded-xl bg-border"
            >
              {typeof image === "string" && /^https?:\/\//.test(image) ? (
                <img
                  src={image}
                  alt={`${entry.title} ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm text-muted">
                  photo {index + 1}
                </div>
              )}
            </div>
          ))}
      </div>

      <div className="grid gap-12 md:grid-cols-[1fr_1.5fr]">
        <div>
          <h2 className="mb-6 font-display text-2xl text-foreground">ingredients</h2>
          {entry.ingredientGroups.length > 0 ? (
            entry.ingredientGroups.map((group) => (
              <div key={group.name} className="mb-6">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-accent">
                  {group.name}
                </h3>
                {group.items.length > 0 ? (
                  <ul className="space-y-2 border-l-2 border-border pl-4">
                    {group.items.map((item) => (
                      <li key={item} className="text-sm leading-relaxed text-muted">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm leading-relaxed text-muted">
                    No ingredient list was extracted yet for this entry.
                  </p>
                )}
              </div>
            ))
          ) : (
            <p className="text-sm leading-relaxed text-muted">
              No ingredient list was extracted yet for this entry.
            </p>
          )}
        </div>

        <div>
          <h2 className="mb-6 font-display text-2xl text-foreground">instructions</h2>
          {entry.instructions.length > 0 ? (
            <ol className="space-y-4">
              {entry.instructions.map((step, index) => (
                <li key={`${entry.id}-step-${index}`} className="flex gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-muted">{step}</p>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-sm leading-relaxed text-muted">
              No step-by-step instructions were extracted yet for this entry.
            </p>
          )}
        </div>
      </div>

      {entry.extras.length > 0 ? (
        <section className="mt-12 rounded-[0.35rem] border border-border bg-card p-6">
          <h2 className="text-sm font-semibold lowercase text-foreground">extras</h2>
          <div className="mt-4 space-y-4">
            {entry.extras.map((extra, index) =>
              /^https?:\/\//.test(extra) ? (
                <a
                  key={`${entry.id}-extra-${index}`}
                  href={extra}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-sm lowercase text-accent transition-colors hover:text-accent-hover"
                >
                  {extra}
                </a>
              ) : (
                <p
                  key={`${entry.id}-extra-${index}`}
                  className="whitespace-pre-wrap text-sm leading-8 text-muted"
                >
                  {extra}
                </p>
              ),
            )}
          </div>
        </section>
      ) : null}

      {entry.description ? (
        <div className="mt-8 rounded-[0.35rem] border border-border bg-card p-6">
          <h2 className="text-sm font-semibold lowercase text-foreground">description</h2>
          <p className="mt-4 whitespace-pre-wrap text-sm leading-8 text-muted">
            {entry.description}
          </p>
        </div>
      ) : null}
      
      {entry.script && entry.instructions.length === 0 ? (
        <div className="mt-8 rounded-[0.35rem] border border-border bg-card p-6">
          <h2 className="text-sm font-semibold lowercase text-foreground">script</h2>
          <p className="mt-4 whitespace-pre-wrap text-sm leading-8 text-muted">
            {entry.script}
          </p>
        </div>
      ) : null}
      
      {entry.notes && entry.ingredientGroups.every((group) => group.items.length === 0) ? (
        <div className="mt-8 rounded-[0.35rem] border border-border bg-card p-6">
          <h2 className="text-sm font-semibold lowercase text-foreground">notes</h2>
          <p className="mt-4 whitespace-pre-wrap text-sm leading-8 text-muted">
            {entry.notes}
          </p>
        </div>
      ) : null}
    </div>
  );
}
