"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * "Where World-Class University Meets Silicon Valley Learning"
 *
 * Motion is modelled on the courso.framer.website section: a tall track holds a
 * `position: sticky` stage; the headline is split into two halves that start
 * off-screen left and right and slide inward, while the media between them
 * narrows to nothing — so the two halves close into a single line. The ten
 * feature cards then reveal below.
 *
 * Progress is one rAF-throttled handler writing two CSS custom properties:
 *   --a      headline converge + media narrow
 *   --lift   headline travels to the top of the frame
 *   --cards  panels fade up underneath it
 * They run in sequence, not together: the panels must not appear while the
 * heading is still moving, or the two overlap mid-flight.
 *
 * Below lg, and for prefers-reduced-motion, the pinning is skipped entirely and
 * the section renders as a plain heading + card grid: a pinned stage that eats
 * scroll is hostile on a phone.
 *
 * CENTRE VIDEO: currently the hero footage (CloudFront, webm + mp4). The
 * section's own clip is on disk at public/videos/best-of-both.mp4. The slot
 * keeps a brand-tinted panel behind the video so there is never a black flash
 * before the first frame decodes.
 *
 * Sizing follows the reference, whose stage is 900x570 in a 1440 viewport —
 * about 62% of the width and 63% of the height.
 */
/** Hero footage, reused here for now. The file supplied for this section is
 *  kept at public/videos/best-of-both.mp4 and can be swapped back in by
 *  pointing VIDEO_BASE's <source> list at it. */
const HERO_VIDEO =
  "https://dd848r0fq5a5i.cloudfront.net/asset-optimization/video/landing_herosection_video/landing_herosection_video";

/* The heading is two lines sliced vertically down the middle: the left block
   holds the start of both lines, the right block the end. Converged they read
   "Where World-Class University" / "Meets Silicon Valley Learning". */
const HEAD_LEFT = ["Where World-", "Meets Silicon\u00a0"];
const HEAD_RIGHT = ["Class University", "Valley Learning"];

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

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));

function Rows({ items, dark }: { items: Item[]; dark: boolean }) {
  return (
    <ul className="relative mt-4 flex flex-1 flex-col">
      {items.map((item, i) => (
        <li
          key={item.title}
          className={`flex flex-1 items-start gap-3 py-2.5 ${
            i > 0
              ? dark
                ? "border-t border-white/15"
                : "border-t border-line"
              : ""
          }`}
        >
          <span
            className={`grid size-9 shrink-0 place-items-center rounded-lg ${
              dark ? "bg-white/15" : "bg-sunken"
            }`}
          >
            <Image
              src={`/images/advantage/${item.icon}`}
              alt=""
              width={24}
              height={24}
              className={`size-5 object-contain ${dark ? "brightness-0 invert" : ""}`}
            />
          </span>
          <div className="min-w-0">
            <h4
              className={`font-display text-[14px] font-semibold leading-snug ${
                dark ? "text-white" : "text-ink"
              }`}
            >
              {item.title}
            </h4>
            <p
              className={`mt-0.5 text-[12.5px] leading-snug ${
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

function Panel({
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
      className={`relative flex h-full flex-col overflow-hidden rounded-[24px] p-5 lg:p-6 ${
        dark
          ? "bg-accent"
          : "border border-line bg-surface shadow-[var(--shadow-md)]"
      }`}
    >
      {/* oversized ghost wordmark, clipped by the panel */}
      <span
        aria-hidden
        className={`pointer-events-none absolute -top-4 left-6 select-none font-display text-[58px] font-extrabold leading-none tracking-tight lg:text-[66px] ${
          dark ? "text-white/15" : "text-ink/[0.055]"
        }`}
      >
        {watermark}
      </span>

      <div className="relative flex flex-1 flex-col">
        <h3
          className={`font-display text-[16px] font-bold uppercase tracking-tight lg:text-[18px] ${
            dark ? "text-white" : "text-ink"
          }`}
        >
          {title}
        </h3>
        <span
          aria-hidden
          className={`mt-2 block h-[3px] w-12 rounded-full ${
            dark ? "bg-white" : "bg-accent"
          }`}
        />
        <p
          className={`mt-2 text-[13px] ${dark ? "text-white/85" : "text-body"}`}
        >
          {tagline}
        </p>

        <Rows items={items} dark={dark} />
      </div>
    </div>
  );
}

export function BestOfBoth() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [animated, setAnimated] = useState(false);

  // decide once whether the pinned treatment applies
  useEffect(() => {
    const lg = window.matchMedia("(min-width: 1024px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const decide = () => setAnimated(lg.matches && !reduce.matches);
    decide();
    lg.addEventListener("change", decide);
    reduce.addEventListener("change", decide);
    return () => {
      lg.removeEventListener("change", decide);
      reduce.removeEventListener("change", decide);
    };
  }, []);

  // scroll -> --a (converge) and --b (reveal)
  useEffect(() => {
    if (!animated) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const track = trackRef.current;
      const stage = stageRef.current;
      if (!track || !stage) return;

      const r = track.getBoundingClientRect();
      const travel = r.height - window.innerHeight;
      const p = travel > 0 ? clamp(-r.top / travel, 0, 1) : 0;

      // Three phases, strictly in order, so nothing overlaps:
      //   --a     0.00 -> 0.55  video narrows, headline halves close
      //   --lift  0.55 -> 0.74  headline travels to the top of the frame
      //   --cards 0.78 -> 0.95  panels fade up underneath it
      stage.style.setProperty("--a", String(clamp(p / 0.55, 0, 1)));
      stage.style.setProperty("--lift", String(clamp((p - 0.55) / 0.19, 0, 1)));
      stage.style.setProperty(
        "--cards",
        String(clamp((p - 0.78) / 0.17, 0, 1)),
      );
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [animated]);

  // Autoplay alone wasn't starting this video (loaded, readyState 4, but left
  // paused), which shows as an empty gradient panel. Start it explicitly once
  // the pinned stage exists, and again whenever it scrolls into view.
  useEffect(() => {
    if (!animated) return;
    const video = stageRef.current?.querySelector("video");
    if (!video) return;
    const play = () => {
      video.muted = true;
      void video.play().catch(() => {});
    };
    play();
    const io = new IntersectionObserver(
      (entries) => entries.some((e) => e.isIntersecting) && play(),
      { threshold: 0.1 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [animated]);

  const headingClass =
    // Two lines rather than one, so the converged block is far narrower and
    // the type can be much larger: 5.2vw still clears a 48px gutter at 1024,
    // 1280 and 1440.
    "font-display text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.33] tracking-[-0.4px] text-ink whitespace-nowrap";

  return (
    <section id="best-of-both" className="bg-white">
      {animated ? (
        <div ref={trackRef} className="relative" style={{ height: "260vh" }}>
          <div
            ref={stageRef}
            className="sticky top-0 h-screen overflow-hidden"
            style={{
              ["--a" as string]: 0,
              ["--lift" as string]: 0,
              ["--cards" as string]: 0,
            }}
          >
            <h2
              className="absolute left-1/2 top-1/2 grid w-full grid-cols-[1fr_auto_1fr] items-center"
              style={{
                transform:
                  "translate(-50%, calc(-50% - var(--lift) * (41vh - 59px)))",
              }}
            >
              <span className="sr-only">
                {HEAD_LEFT[0]}
                {HEAD_RIGHT[0]} {HEAD_LEFT[1]}
                {HEAD_RIGHT[1]}
              </span>
              {/* Both blocks sit flush against the media in the flex row — no
                  extra translate. All the movement comes from the video
                  narrowing, which pulls the halves together and keeps the copy
                  tight to the video edge the whole way (as in the reference,
                  where the outer words are clipped by the viewport). At the
                  widest video the halves sit entirely outside the viewport, so
                  the opening frame shows video only — no fade needed, the
                  geometry does it. */}
              <span
                aria-hidden
                className={`${headingClass} flex min-w-0 flex-col items-end text-right`}
                style={{ opacity: "clamp(0, (var(--a) - 0.05) * 6, 1)" }}
              >
                {HEAD_LEFT.map((line, i) => (
                  <span key={line} className="block">
                    {i === 1 ? (
                      <>
                        Meets{" "}
                        <span className="text-[#e6161f]">Silicon</span>
                        {"\u00a0"}
                      </>
                    ) : (
                      line
                    )}
                  </span>
                ))}
              </span>

              {/* Media narrows horizontally only — it keeps full height right
                  down to a sliver, as in the reference. The outer span carries
                  the animated WIDTH but zero height, so the headline row is
                  only as tall as the text and still centres (and later lifts)
                  correctly; the video itself is absolutely positioned and
                  vertically centred inside it. */}
              <span
                aria-hidden
                className="relative block h-0 shrink-0"
                style={{
                  width: "calc((1 - var(--a)) * 62vw)",
                  marginInline: "calc((1 - var(--a)) * 12px)",
                }}
              >
                <span className="absolute left-0 top-1/2 block w-full -translate-y-1/2 overflow-hidden rounded-lg bg-[linear-gradient(145deg,#e9edf4,#f3e6e8)] [height:min(68vh,620px)]">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="size-full object-cover"
                  >
                    <source src={`${HERO_VIDEO}.webm`} type="video/webm" />
                    <source src={`${HERO_VIDEO}.mp4`} type="video/mp4" />
                  </video>
                </span>
              </span>

              <span aria-hidden className={`${headingClass} flex min-w-0 flex-col items-start text-left`}
                style={{ opacity: "clamp(0, (var(--a) - 0.05) * 6, 1)" }}>
                {HEAD_RIGHT.map((line, i) => (
                  <span
                    key={line}
                    className={`block ${i === 1 ? "text-[#e6161f]" : ""}`}
                  >
                    {line}
                  </span>
                ))}
              </span>
            </h2>

            {/* panels share the pinned frame, sliding up under the heading */}
            <div
              className="absolute inset-x-0"
              style={{
                top: "calc(9vh + 198px)",
                opacity: "var(--cards)",
                transform: "translateY(calc((1 - var(--cards)) * 36px))",
              }}
            >
              <div className="container-page">
                <div className="grid items-stretch gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(150px,210px)_minmax(0,1fr)] lg:gap-5">
                  <Panel
                    watermark="UNIVERSITY"
                    title="University Advantage"
                    tagline="Gives you the foundation"
                    items={UNIVERSITY}
                    dark={false}
                  />
                  <div className="hidden items-center justify-center lg:flex">
                    <Image
                      src="/images/advantage/center-illustration.png"
                      alt="University and Silicon Valley learning combined"
                      width={378}
                      height={377}
                      className="h-auto w-full select-none"
                    />
                  </div>
                  <Panel
                    watermark="SILICON"
                    title="Silicon Valley Style Learning"
                    tagline="Helps you go further"
                    items={SILICON}
                    dark
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container-page pt-20 lg:pt-28">
          <h2 className="mx-auto max-w-3xl text-center font-display text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.33] tracking-[-0.4px] text-ink">
            {HEAD_LEFT[0]}
            {HEAD_RIGHT[0]} Meets{" "}
            <span className="text-[#e6161f]">
              Silicon {HEAD_RIGHT[1]}
            </span>
          </h2>
        </div>
      )}
    </section>
  );
}
