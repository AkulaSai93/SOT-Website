import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { GlowButton } from "@/components/site/GlowButton";
import { HeroFacts } from "@/components/site/HeroFacts";
import { CompanyLogos } from "@/components/site/CompanyLogos";

/** Existing upGrad SoT hero footage. Swap for a self-hosted /videos/hero.webm later. */
const VIDEO_BASE =
  "https://dd848r0fq5a5i.cloudfront.net/asset-optimization/video/landing_herosection_video/landing_herosection_video";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-var(--header-h))] items-center overflow-hidden">
      {/* ------------------------------------------- background video layer */}
      <video
        aria-hidden
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 -z-10 size-full object-cover"
      >
        <source src={`${VIDEO_BASE}.webm`} type="video/webm" />
        <source src={`${VIDEO_BASE}.mp4`} type="video/mp4" />
      </video>

      {/* ------------------------------------------------- dark tint overlay */}
      {/* Even black wash so the footage stays readable but white copy wins. */}
      {/* Vignette, copied from the upGrad Framer hero: the frame stays clear
          around 68%/29% and falls to 90% black at the edges, so the footage
          reads on the right while the copy sits on darkness. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(44%_78%_at_67.7%_29.4%,rgba(0,0,0,0),rgba(0,0,0,0.9))]"
      />
      {/* Light base so the copy holds up on the brightest frames. */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-black/25" />

      {/* -------------------------------------------------------- foreground */}
      <div className="container-page relative grid w-full items-end gap-12 py-16 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-10 lg:py-20">
        <div className="animate-rise min-w-0 max-w-2xl">
          <h1 className="font-display text-[clamp(2.5rem,5.2vw,4.25rem)] font-semibold leading-[1.1] text-white">
            AI-First B.Tech in{" "}
            <span className="text-accent">Computer Science</span>
          </h1>

          {/* Always one line: capped at 16.5px, and below ~610px wide the type
              scales with the viewport (2.7vw) so it shrinks to fit instead of
              wrapping or being clipped. */}
          <p className="mt-6 whitespace-nowrap text-[min(1.03rem,2.35vw)] leading-relaxed text-white/90">
            Quantum Computing <span className="text-white/45">|</span> GenAI &amp; ML{" "}
            <span className="text-white/45">|</span> Full Stack Development &amp; Cloud
            Innovation
          </p>

          <p className="mt-5 font-display text-[17px] font-bold text-white">
            Admission starts with uGNET
          </p>

          <HeroFacts className="mt-5" />

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <GlowButton href="#apply">
              Apply Now
              <ArrowRight size={16} strokeWidth={2} aria-hidden />
            </GlowButton>
            <Link
              href="#brochure"
              className="inline-flex items-center gap-2 rounded-[4px] border border-white/60 bg-transparent px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              <Download size={16} strokeWidth={2} aria-hidden />
              Download Brochure
            </Link>
          </div>
        </div>

        <CompanyLogos className="animate-rise [animation-delay:160ms] lg:pb-2" />
      </div>
    </section>
  );
}
