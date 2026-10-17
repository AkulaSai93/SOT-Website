"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * "New-Gen Engineering Specializations"
 *
 * Copy and imagery from sot.upgrad.com — heading, intro and the six domains,
 * verbatim.
 *
 * Motion follows creativo-code.com/projects:
 *  - the heading is sticky and sits *behind* the cards, so they travel over it
 *  - the cards stay hidden until that heading has pinned, then fade up into
 *    view (latched, so scrolling back up does not hide them again)
 *  - the grid is three columns, and the columns move at different speeds: the
 *    outer two (4 cards) rise fast, the middle one (2 cards) rises slowly,
 *    which is what keeps the movement from looking uniform
 *
 * Column offsets are written as a CSS variable per column and multiplied by a
 * scroll progress variable, so the whole effect is one rAF-throttled write.
 * Parallax is skipped under prefers-reduced-motion and below lg, where a single
 * column has nothing to parallax against.
 */
const SPECIALIZATIONS = [
  {
    label: "AI & ML",
    title: "Artificial Intelligence & Machine Learning",
    body: "Build intelligent systems that learn and adapt",
    key: "aiml",
  },
  {
    label: "Blockchain",
    title: "Blockchain",
    body: "Master decentralized technologies and Web3",
    key: "blockchain",
  },
  {
    label: "Security",
    title: "Cybersecurity",
    body: "Protect systems with advanced security practices",
    key: "cybersecurity",
  },
  {
    label: "Web Dev",
    title: "FullStack Web Development",
    body: "Create modern web applications end-to-end",
    key: "webdev",
  },
  {
    label: "Quantum",
    title: "Quantum Computing",
    body: "Explore next-generation computational power",
    key: "quantum",
  },
  {
    label: "Cloud",
    title: "Cloud Innovation",
    body: "Design scalable cloud-native architectures",
    key: "cloud",
  },
] as const;

/** cards grouped into the three columns: outer, middle, outer */
const COLUMNS = [
  [SPECIALIZATIONS[0], SPECIALIZATIONS[3]],
  [SPECIALIZATIONS[1], SPECIALIZATIONS[4]],
  [SPECIALIZATIONS[2], SPECIALIZATIONS[5]],
];

/** px of travel per column — outer columns fast, middle slow */
const SPEED = [260, 90, 260];

function Card({ spec }: { spec: (typeof SPECIALIZATIONS)[number] }) {
  return (
    <article className="group">
      <div className="overflow-hidden rounded-3xl bg-sunken">
        <div className="relative aspect-[4/5]">
          <Image
            src={`/images/specializations/${spec.key}-front.avif`}
            alt=""
            fill
            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>
      </div>

      <div className="mt-5">
        <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#e7000b]">
          {spec.label}
        </span>
        <h3 className="mt-2 text-[19px] font-semibold leading-snug text-ink">
          {spec.title}
        </h3>
        <p className="mt-1.5 text-[14.5px] leading-relaxed text-body">
          {spec.body}
        </p>
      </div>
    </article>
  );
}

const STICKY_TOP = 120;

export function Specializations() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);
  /** latched once the heading has pinned — cards never hide again after that */
  const revealed = useRef(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const lg = window.matchMedia("(min-width: 1024px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    let frame = 0;
    const reveal = () => {
      if (revealed.current) return;
      revealed.current = true;
      setShown(true);
    };
    const clear = () => {
      colRefs.current.forEach((c) => c?.style.setProperty("--shift", "0px"));
      reveal(); // no parallax here, so never gate the content
    };

    const update = () => {
      frame = 0;
      if (!lg.matches || reduce.matches) return clear();

      // Cards stay hidden until the heading has actually pinned to the top of
      // the viewport; once it has, the reveal is latched so scrolling back up
      // (where the heading unpins) doesn't hide them again.
      if (!revealed.current) {
        const h = headerRef.current?.getBoundingClientRect();
        if (h && h.top <= STICKY_TOP + 1) reveal();
      }

      const r = section.getBoundingClientRect();
      // 0 as the section's top reaches the bottom of the viewport,
      // 1 once its bottom has reached the top — the window it travels through.
      const total = r.height + window.innerHeight;
      const p = Math.min(1, Math.max(0, (window.innerHeight - r.top) / total));

      colRefs.current.forEach((col, i) => {
        if (col) col.style.setProperty("--shift", `${-p * SPEED[i]}px`);
      });
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    lg.addEventListener("change", schedule);
    reduce.addEventListener("change", schedule);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      lg.removeEventListener("change", schedule);
      reduce.removeEventListener("change", schedule);
    };
  }, []);

  return (
    <section id="specializations" className="relative bg-canvas py-20 lg:py-28">
      <div ref={sectionRef} className="container-page relative">
        {/* Sticky heading, sitting behind the cards so they travel over it */}
        <header
          ref={headerRef}
          className="pointer-events-none top-[120px] z-0 mx-auto max-w-[934px] text-center lg:sticky"
        >
          <h2 className="text-[32px] font-semibold leading-tight text-ink sm:text-[36px] lg:text-[40px]">
            New-Gen Engineering{" "}
            <span className="text-[#e7000b]">Specializations</span>
          </h2>
          <p className="mt-5 text-base font-normal leading-normal text-body">
            Explore future-focused domains shaping the next decade of technology
            &mdash; AI / ML, Cloud, Blockchain and many more
          </p>
        </header>

        {/* Styles are inline rather than in globals.css: this project's dev
            server does not reliably pick up new rules added there. */}
        <div
          ref={gridRef}
          style={{
            opacity: shown ? 1 : 0,
            transform: shown ? "none" : "translateY(40px)",
            transition:
              "opacity 650ms cubic-bezier(0.22,1,0.36,1), transform 650ms cubic-bezier(0.22,1,0.36,1)",
          }}
          className="relative z-10 mt-12 grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-10 lg:grid-cols-3 lg:gap-10"
        >
          {COLUMNS.map((column, i) => (
            <div
              key={i}
              ref={(el) => {
                colRefs.current[i] = el;
              }}
              style={{ transform: "translate3d(0, var(--shift, 0px), 0)" }}
              className={`flex flex-col gap-16 will-change-transform md:gap-10 ${
                i === 1 ? "lg:mt-28" : i === 2 ? "lg:mt-14" : ""
              }`}
            >
              {column.map((spec) => (
                <Card key={spec.key} spec={spec} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
