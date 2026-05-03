// Pullquote with hot-pink «» glyphs at 1.6× height per guide.md §1.5.
// General Sans 500 italic at subheading size. Used in Workshop section
// + optional Lavori Firmati blocks.

type Props = {
  children: React.ReactNode;
  cite?: string;
  role?: string;
  className?: string;
};

export function Pullquote({ children, cite, role, className = '' }: Props) {
  return (
    <figure className={`relative ${className}`}>
      <span
        aria-hidden
        className="absolute -top-2 -left-3 font-display text-primary leading-none"
        style={{ fontSize: '1.6em' }}
      >
        «
      </span>
      <blockquote className="body-lg italic text-text-default font-medium pl-6 pr-4">
        {children}
        <span aria-hidden className="font-display text-primary leading-none ml-1" style={{ fontSize: '1.6em' }}>
          »
        </span>
      </blockquote>
      {(cite || role) && (
        <figcaption className="caption-mono mt-4 pl-6 flex items-center gap-2">
          {cite && <span className="text-text-default uppercase">{cite}</span>}
          {role && (
            <>
              <span className="text-text-subtle">·</span>
              <span>{role}</span>
            </>
          )}
        </figcaption>
      )}
    </figure>
  );
}
