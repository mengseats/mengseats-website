interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center items-center" : "text-left";

  return (
    <div className={`flex max-w-3xl flex-col gap-3 ${alignment}`}>
      <p className="text-xs uppercase tracking-[0.28em] text-accent">{eyebrow}</p>
      <h2 className="font-display text-4xl leading-none text-foreground sm:text-5xl">
        {title}
      </h2>
      <p className="text-base leading-8 text-muted sm:text-lg">{description}</p>
    </div>
  );
}
