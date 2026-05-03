// Mono ID label that introduces every major section.
// Pattern: "01 / SERVIZI" — index in mono + uppercase title with id-tracking.

type Props = {
  index: string;
  children: React.ReactNode;
  accent?: boolean;
  className?: string;
};

export function SectionEyebrow({ index, children, accent = false, className = '' }: Props) {
  return (
    <p className={`eyebrow ${accent ? 'eyebrow-accent' : ''} ${className}`}>
      <span className="text-text-muted">{index}</span>
      <span className="mx-2 text-text-subtle">/</span>
      <span>{children}</span>
    </p>
  );
}
