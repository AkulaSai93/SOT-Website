"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Campuses", href: "#campuses" },
  { label: "More", href: "#more" },
  { label: "FAQs", href: "#faqs" },
  { label: "Admission", href: "#admission" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-200 ${
        scrolled
          ? "border-line bg-white shadow-[var(--shadow-sm)]"
          : "border-transparent bg-white"
      }`}
    >
      <nav className="container-page flex h-[56px] items-center justify-between gap-6">
        <Logo />

        <ul className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="relative whitespace-nowrap text-[14px] font-medium text-body transition-colors hover:text-ink after:absolute after:-bottom-1.5 after:left-0 after:h-[2px] after:w-0 after:bg-accent after:transition-all hover:after:w-full"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2.5">
          <Link
            href="#visit"
            className="hidden whitespace-nowrap rounded-[4px] border border-line-strong px-4 py-2 text-[13.5px] font-semibold text-ink transition-colors hover:border-ink hover:bg-sunken sm:inline-flex"
          >
            Get in Touch
          </Link>
          <Link
            href="#apply"
            className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-[4px] bg-accent px-4.5 py-2 text-[13.5px] font-semibold text-white shadow-[var(--shadow-sm)] transition-colors hover:bg-accent-hover"
          >
            Apply Now
            <ArrowRight size={14} strokeWidth={2} aria-hidden />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle navigation menu"
            className="grid size-9 place-items-center rounded-[4px] border border-line-strong text-ink lg:hidden"
          >
            {open ? <X size={17} aria-hidden /> : <Menu size={17} aria-hidden />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-line bg-surface lg:hidden">
          <ul className="container-page flex flex-col py-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-line py-3 text-[15px] font-medium text-ink last:border-0"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
