import { cn } from "@/lib/utils";

/**
 * GK monogram: a "G" drawn as an open circuit arc whose crossbar ends in a
 * node, joined to a "K" whose upper arm terminates in a second node — two
 * connected points, the data → workflow idea in one mark.
 */
export function BrandMark({ className, title = "Gia Khánh" }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" role="img" aria-label={title} className={cn("size-9", className)}>
      <rect x="0.75" y="0.75" width="30.5" height="30.5" rx="8" fill="#03080d" stroke="rgba(62,230,212,0.45)" strokeWidth="1.5" />
      <path d="M1 11.5h2.5M1 20.5h2.5M28.5 11.5H31M28.5 20.5H31" stroke="rgba(62,230,212,0.35)" strokeWidth="1" />
      <g stroke="#e8f6ff" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15.4 11.9A5.4 5.4 0 1 0 17.1 16H13" />
        <path d="M20.2 10.6v10.8M20.2 16l5-5.4M21.9 14.2l3.6 7.2" />
      </g>
      <circle cx="13" cy="16" r="1.9" fill="#3ee6d4" />
      <circle cx="25.2" cy="10.6" r="1.9" fill="#3ee6d4" />
    </svg>
  );
}
