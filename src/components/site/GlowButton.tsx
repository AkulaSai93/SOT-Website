import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Primary CTA with a rotating border glow.
 *
 * Structure mirrors the upGrad Framer hero: an oversized
 * `conic-gradient(transparent 200deg, white)` spins behind the button, and the
 * solid fill sits 1px inside on top of it, so only a sweeping sliver of light
 * shows around the edge. The glow holds still under prefers-reduced-motion.
 */
export function GlowButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`relative inline-flex overflow-hidden rounded-[4px] p-px ${className}`}
    >
      <span
        aria-hidden
        className="cta-glow absolute left-1/2 top-1/2 h-[320%] w-[320%] bg-[conic-gradient(transparent_200deg,#fff)]"
      />
      <span className="relative z-[2] inline-flex items-center gap-2 rounded-[3px] bg-accent px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-accent-hover">
        {children}
      </span>
    </Link>
  );
}
