import Image from "next/image";

/**
 * Company marks lifted from the uGSOT Catalyst page
 * (public/images/logos/*.png — intrinsic height 177px for all six).
 *
 * Colour handling is per-logo, decided by how much of each mark is dark enough
 * to vanish against the darkened video (share of opaque pixels below luma 90):
 *
 *   Google 0.3%, Flipkart 0.9%    -> keep brand colour as-is
 *   Accenture 99.5%, Goldman 100% -> `invert` to a white silhouette
 *
 * Groww and Haptik are mixed: a bright coloured icon next to a dark wordmark.
 * Inverting the whole mark turned Groww's teal circle into a white blob, so
 * each has a prebuilt `-onDark.png` where only the wordmark is painted white
 * and the icon keeps its brand colour. See scripts note in the repo history:
 * Groww split on colour (neutral dark -> white), Haptik split at x=138, the
 * gap between its icon and wordmark.
 *
 * The row scrolls right-to-left forever: the track renders the list twice and
 * shifts by -50%, so the loop has no seam. It pauses on hover and holds still
 * under prefers-reduced-motion.
 */
const LOGOS = [
  { name: "Google", file: "Google.png", w: 486, invert: false },
  { name: "Goldman Sachs", file: "GoldmanSachs.png", w: 382, invert: true },
  { name: "Flipkart", file: "Flipkart.png", w: 583, invert: false },
  { name: "Accenture", file: "Accenture.png", w: 623, invert: true },
  { name: "Groww", file: "Groww-onDark.png", w: 547, invert: false },
  { name: "Haptik", file: "Haptik-onDark.png", w: 402, invert: false },
] as const;

const INTRINSIC_H = 177;
const RENDER_H = 34;

function LogoRow({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul
      className="flex shrink-0 items-center gap-x-10 pr-10"
      aria-hidden={duplicate || undefined}
    >
      {LOGOS.map((logo) => (
        <li key={logo.name}>
          <Image
            src={`/images/logos/${logo.file}`}
            alt={duplicate ? "" : logo.name}
            width={Math.round((logo.w / INTRINSIC_H) * RENDER_H)}
            height={RENDER_H}
            className={`h-[34px] w-auto max-w-none ${
              logo.invert ? "brightness-0 invert" : ""
            }`}
          />
        </li>
      ))}
    </ul>
  );
}

export function CompanyLogos({ className = "" }: { className?: string }) {
  return (
    <div className={`min-w-0 ${className}`}>
      <p className="text-[17px] font-medium text-white/90 lg:text-right">
        Built by people who&rsquo;ve worked at
      </p>

      <div className="marquee-mask mt-4 w-full lg:w-[480px]">
        <div className="marquee-track">
          <LogoRow />
          <LogoRow duplicate />
        </div>
      </div>
    </div>
  );
}
