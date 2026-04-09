import type { Metadata } from "next";
import MediaPlaceholder from "@/components/MediaPlaceholder";
import SectionHeading from "@/components/SectionHeading";
import Tag from "@/components/Tag";
import { blogPosts } from "@/data/content";

export const metadata: Metadata = {
  title: "Blog",
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
      <section className="grid gap-8 rounded-[2.5rem] border border-border bg-card px-6 py-8 sm:px-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div className="space-y-5">
          <SectionHeading
            eyebrow="Blog"
            title="A space for stories behind the food."
            description="This matches your sketch with a featured intro area up top and a tidy post grid underneath. Real article pages can be added later once your writing is ready."
          />
          <div className="flex flex-wrap gap-3">
            <Tag>Food notes</Tag>
            <Tag>Monthly updates</Tag>
            <Tag>Behind the scenes</Tag>
          </div>
        </div>
        <MediaPlaceholder
          label="Featured blog image"
          caption="Use this area for a portrait, a writing setup shot, or a hero image for your latest post."
        />
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <article
            key={post.slug}
            className="flex flex-col rounded-[2rem] border border-border bg-card p-6"
          >
            <p className="text-xs uppercase tracking-[0.28em] text-accent">
              {post.category}
            </p>
            <h2 className="mt-4 font-display text-4xl leading-none text-foreground">
              {post.title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted">{post.excerpt}</p>
            <p className="mt-6 text-sm uppercase tracking-[0.2em] text-muted">
              {post.date}
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}
