import type { Metadata } from "next";
import Link from "next/link";
import { getShortformEntries } from "@/lib/site-content";

export const metadata: Metadata = { title: "Shortform" };
export const revalidate = 300;

export default async function ShortformPage() {
  const entries = await getShortformEntries();

  return (
    <div className="mx-auto max-w-[1200px] px-6 pt-28 pb-10">
      <div className="mb-8 text-center">
        <h1 className="font-display text-3xl font-normal lowercase text-foreground">
          shortform
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-muted">
          Pulled from Notion when your integration is connected, with a local fallback so the page stays usable while you set it up.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {entries.map((entry) => (
          <Link
            key={entry.id}
            href={`/shortform/${entry.slug}`}
            className="group rounded-[0.35rem] border border-border bg-card p-6 transition-colors hover:border-accent/40 hover:bg-[#f7efe4]"
          >
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="font-display text-2xl text-foreground transition-colors group-hover:text-accent">
                {entry.title}
              </h2>
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

            {entry.description ? (
              <p className="mt-4 text-sm leading-7 text-muted">{entry.description}</p>
            ) : null}

            <div className="mt-5 grid gap-5">
              {entry.notes ? (
                <section>
                  <h3 className="text-sm font-semibold lowercase text-foreground">notes</h3>
                  <p className="mt-2 line-clamp-5 whitespace-pre-wrap text-sm leading-7 text-muted">
                    {entry.notes}
                  </p>
                </section>
              ) : null}

              {entry.script ? (
                <section>
                  <h3 className="text-sm font-semibold lowercase text-foreground">script</h3>
                  <p className="mt-2 line-clamp-6 whitespace-pre-wrap text-sm leading-7 text-muted">
                    {entry.script}
                  </p>
                </section>
              ) : null}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3 text-xs lowercase text-muted">
              {entry.date ? <span>{entry.date}</span> : null}
              {entry.hook ? <span>hook</span> : null}
              {entry.sponsorship ? <span>sponsorship</span> : null}
              <span className="text-accent">read more</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
