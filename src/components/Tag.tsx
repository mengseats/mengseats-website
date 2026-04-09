interface TagProps {
  children: React.ReactNode;
}

export default function Tag({ children }: TagProps) {
  return (
    <span className="rounded-full border border-border bg-card px-3 py-1 text-xs uppercase tracking-[0.24em] text-muted">
      {children}
    </span>
  );
}
