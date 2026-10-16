/**
 * Fact strip under the hero copy, in the style of the Newton School hero.
 *
 * Every value is sourced from the live site — nothing invented:
 *  - Duration:    sot.upgrad.com/admission fee table runs Sem 1–8 → 4 years
 *  - uGNET:       sot.upgrad.com/uGNET — "MODE: Online (Assessment Platform)",
 *                 "EXAM TIME: Scheduled after you call admissions".
 *                 There is no fixed exam date published, so this cell states
 *                 the real scheduling model rather than a made-up date.
 *  - Eligibility: sot.upgrad.com/admission — "Minimum 50% in PCM in Class 12",
 *                 "Below 20 years of age before July 2026"
 */
const FACTS = [
  { label: "Course duration", value: "4 Years", note: "8 semesters" },
  { label: "uGNET exam", value: "Scheduled on call", note: "Online test" },
  { label: "Eligibility", value: "50% in PCM", note: "Under 20 by Jul 2026" },
] as const;

export function HeroFacts({ className = "" }: { className?: string }) {
  return (
    <dl className={`flex flex-wrap items-stretch gap-x-7 gap-y-4 ${className}`}>
      {FACTS.map((fact, i) => (
        <div
          key={fact.label}
          /* Divider only once the cells actually sit side by side; stacked on
             a phone a left rule reads as stray decoration. */
          className={i > 0 ? "sm:border-l sm:border-white/25 sm:pl-7" : undefined}
        >
          <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/65">
            {fact.label}
          </dt>
          <dd className="mt-1 font-display text-[18px] font-bold leading-none text-white">
            {fact.value}
          </dd>
          <p className="mt-1 text-[12px] text-white/60">{fact.note}</p>
        </div>
      ))}
    </dl>
  );
}
