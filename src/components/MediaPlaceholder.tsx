interface MediaPlaceholderProps {
  label: string;
  caption?: string;
  className?: string;
}

export default function MediaPlaceholder({
  label,
  caption,
  className = "",
}: MediaPlaceholderProps) {
  return (
    <div
      className={`overflow-hidden rounded-[2rem] border border-border bg-card shadow-[0_18px_60px_rgba(57,42,30,0.08)] ${className}`}
    >
      <div className="relative flex min-h-[220px] items-end justify-between overflow-hidden bg-[linear-gradient(135deg,rgba(186,74,47,0.14),rgba(91,100,66,0.12),rgba(255,250,244,0.96))] p-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.7),transparent_30%),linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.45)_32%,transparent_65%)]" />
        <div className="relative space-y-3">
          <p className="text-xs uppercase tracking-[0.32em] text-muted">media slot</p>
          <p className="max-w-[16rem] font-display text-3xl leading-none text-foreground">
            {label}
          </p>
        </div>
        <div className="relative h-20 w-20 rounded-[1.6rem] border border-white/70 bg-white/40" />
      </div>
      {caption ? <p className="px-6 py-4 text-sm leading-7 text-muted">{caption}</p> : null}
    </div>
  );
}
