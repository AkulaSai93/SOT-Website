import Image from "next/image";

/**
 * "Where World-Class University Meets Silicon Valley Learning"
 *
 * Copy, icons and the centre illustration all come from sot.upgrad.com — the
 * two five-item columns are that section's own "UNIVERSITY ADVANTAGE" and
 * "SILICON VALLEY STYLE LEARNING" lists, verbatim.
 *
 * Presented in the two-card comparison style: a white card and a red card with
 * oversized ghost wordmarks, hairline-separated rows, and the student
 * illustration straddling the gap between them.
 */
type Item = { title: string; body: string; icon: string };

const UNIVERSITY: Item[] = [
  {
    title: "State-of-the-Art Campus",
    body: "Modern infrastructure and world-class facilities for an enriching experience.",
    icon: "universityadvantage-1.avif",
  },
  {
    title: "Engineering Degree",
    body: "UGC-recognized programs designed for tomorrow's challenges.",
    icon: "universityadvantage-2.avif",
  },
  {
    title: "Vibrant University Life",
    body: "Diverse community, clubs, events and endless opportunities.",
    icon: "universityadvantage-3.avif",
  },
  {
    title: "Interdisciplinary Curriculum",
    body: "Learn beyond boundaries with a multidisciplinary approach.",
    icon: "universityadvantage-4.avif",
  },
  {
    title: "Fully Residential Campus",
    body: "Safe, inclusive and immersive campus experience.",
    icon: "universityadvantage-5.avif",
  },
];

const SILICON: Item[] = [
  {
    title: "Sessions by MAANG Engineers",
    body: "Learn directly from experts working at top global companies.",
    icon: "siliconvalley-1.avif",
  },
  {
    title: "Coding from Day 1",
    body: "Build real-world projects and strengthen fundamentals.",
    icon: "siliconvalley-2.avif",
  },
  {
    title: "AI-First Campus",
    body: "Leverage AI tools and frameworks in everything you build.",
    icon: "siliconvalley-3.avif",
  },
  {
    title: "CXO Masterclasses",
    body: "Gain insights from leadership driving real-world impact.",
    icon: "siliconvalley-4.avif",
  },
  {
    title: "Tech with Management",
    body: "Blend technology with business and leadership skills.",
    icon: "siliconvalley-5.avif",
  },
];

function Rows({ items, dark }: { items: Item[]; dark: boolean }) {
  return (
    <ul className="relative mt-6 flex flex-1 flex-col">
      {items.map((item, i) => (
        <li
          key={item.title}
          className={`flex flex-1 items-start gap-4 py-4 ${
            i > 0
              ? dark
                ? "border-t border-white/15"
                : "border-t border-line"
              : ""
          }`}
        >
          <span
            className={`grid size-10 shrink-0 place-items-center rounded-xl ${
              dark ? "bg-white/15" : "bg-sunken"
            }`}
          >
            <Image
              src={`/images/advantage/${item.icon}`}
              alt=""
              width={24}
              height={24}
              className={`size-6 object-contain ${dark ? "brightness-0 invert" : ""}`}
            />
          </span>
          <div className="min-w-0">
            <h3
              className={`font-display text-[15.5px] font-semibold leading-snug ${
                dark ? "text-white" : "text-ink"
              }`}
            >
              {item.title}
            </h3>
            <p
              className={`mt-1 text-[13.5px] leading-snug ${
                dark ? "text-white/85" : "text-body"
              }`}
            >
              {item.body}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function Card({
  watermark,
  title,
  tagline,
  items,
  dark,
}: {
  watermark: string;
  title: string;
  tagline: string;
  items: Item[];
  dark: boolean;
}) {
  return (
    <div
      className={`relative flex h-full flex-col overflow-hidden rounded-[28px] p-6 lg:p-7 ${
        dark
          ? "bg-accent"
          : "border border-line bg-surface shadow-[var(--shadow-md)]"
      }`}
    >
      {/* oversized ghost wordmark, clipped by the card */}
      <span
        aria-hidden
        className={`pointer-events-none absolute -top-4 left-6 select-none font-display text-[72px] font-extrabold leading-none tracking-tight lg:text-[84px] ${
          dark ? "text-white/15" : "text-ink/[0.055]"
        }`}
      >
        {watermark}
      </span>

      <div className="relative flex flex-1 flex-col">
        <h3
          className={`font-display text-[19px] font-bold uppercase tracking-tight lg:text-[21px] ${
            dark ? "text-white" : "text-ink"
          }`}
        >
          {title}
        </h3>
        <span
          aria-hidden
          className={`mt-3 block h-[3px] w-14 rounded-full ${
            dark ? "bg-white" : "bg-accent"
          }`}
        />
        <p
          className={`mt-3 text-[14px] ${dark ? "text-white/85" : "text-body"}`}
        >
          {tagline}
        </p>

        <Rows items={items} dark={dark} />
      </div>
    </div>
  );
}

export function BestOfBoth() {
  return (
    <section id="best-of-both" className="bg-canvas py-20 lg:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.2] tracking-[-0.4px] text-ink">
            Where World-Class University Meets Silicon Valley Learning
          </h2>
          <p className="mt-5 text-[16.5px] leading-relaxed text-body">
            Get the credibility of a university degree with the hands-on
            learning approach of leading technology companies.
          </p>
        </div>

        {/* Three columns on desktop: the illustration sits in its own middle
            column so it never covers the card copy, which also keeps the two
            cards narrower. Both cards stretch to equal height. */}
        <div className="mt-14 grid items-stretch gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(180px,260px)_minmax(0,1fr)] lg:gap-6">
          <Card
            watermark="UNIVERSITY"
            title="University Advantage"
            tagline="Gives you the foundation"
            items={UNIVERSITY}
            dark={false}
          />

          <div className="order-last flex items-center justify-center lg:order-none">
            <Image
              src="/images/advantage/center-illustration.png"
              alt="University and Silicon Valley learning combined"
              width={378}
              height={377}
              className="h-auto w-[220px] select-none lg:w-full"
            />
          </div>

          <Card
            watermark="SILICON"
            title="Silicon Valley Style Learning"
            tagline="Helps you go further"
            items={SILICON}
            dark
          />
        </div>
      </div>
    </section>
  );
}
