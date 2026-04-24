"use client";

import { FormEvent, useState } from "react";

interface Comment {
  id: string;
  name: string;
  body: string;
  createdAt: string;
}

const starterComments: Comment[] = [
  {
    id: "starter-1",
    name: "mia",
    body: "made this and the sauce was crazy good.",
    createdAt: "just now",
  },
  {
    id: "starter-2",
    name: "jason",
    body: "need to try this for dinner this week.",
    createdAt: "2 days ago",
  },
];

export default function RecipeComments({ recipeTitle }: { recipeSlug: string; recipeTitle: string }) {
  const [comments, setComments] = useState<Comment[]>(starterComments);
  const [name, setName] = useState("");
  const [body, setBody] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedBody = body.trim();
    if (!trimmedBody) return;

    setComments((currentComments) => [
      {
        id: `local-${Date.now()}`,
        name: name.trim() || "guest",
        body: trimmedBody,
        createdAt: "just now",
      },
      ...currentComments,
    ]);
    setName("");
    setBody("");
  }

  return (
    <section className="mt-20 border-t border-border/70 pt-10" id="comments">
      <div className="mb-8 flex items-end justify-between gap-6">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            recipe notes
          </p>
          <h2 className="font-display text-3xl text-foreground md:text-4xl">comments</h2>
        </div>
        <span className="rounded-full border border-border/80 px-4 py-2 text-sm text-muted">
          {comments.length} {comments.length === 1 ? "comment" : "comments"}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="mb-8 rounded-2xl border border-border/80 bg-background/35 p-5 shadow-sm backdrop-blur-sm">
        <div className="grid gap-4 md:grid-cols-[220px_1fr]">
          <label className="block">
            <span className="mb-2 block text-sm text-muted">name</span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-xl border border-border bg-background/70 px-4 py-3 text-base text-foreground outline-none transition focus:border-accent"
              placeholder="guest"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-muted">comment</span>
            <textarea
              value={body}
              onChange={(event) => setBody(event.target.value)}
              className="min-h-28 w-full resize-y rounded-xl border border-border bg-background/70 px-4 py-3 text-base leading-relaxed text-foreground outline-none transition focus:border-accent"
              placeholder={`thoughts on ${recipeTitle.toLowerCase()}...`}
            />
          </label>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="rounded-xl bg-accent px-5 py-3 text-sm font-semibold lowercase text-background transition hover:bg-foreground"
          >
            post comment
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {comments.map((comment) => (
          <article
            key={comment.id}
            className="rounded-2xl border border-border/70 bg-background/30 p-5 backdrop-blur-sm"
          >
            <div className="mb-3 flex items-center justify-between gap-4">
              <p className="text-base font-semibold text-foreground">{comment.name}</p>
              <time className="text-xs uppercase tracking-[0.12em] text-muted">{comment.createdAt}</time>
            </div>
            <p className="text-base leading-relaxed text-muted">{comment.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
