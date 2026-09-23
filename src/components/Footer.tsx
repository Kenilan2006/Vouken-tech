import { ArrowUpRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import Reveal from "./Reveal";

const links = [
  { label: "Services", to: "/services" },
  { label: "Work", to: "/projects" },
  { label: "About", to: "/about" },
  { label: "Insights", to: "/insights" },
  { label: "Careers", to: "/careers" },
  { label: "Contact", to: "/contact" },
];

const secondaryLinks = [
  { label: "Solutions", to: "/solutions" },
  { label: "Innovation", to: "/innovation" },
  { label: "Future technology", to: "/future-technology" },
];

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-hairline bg-surface">
      {/* Upper — oversized statement + CTA */}
      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-20 sm:px-8 lg:pb-20 lg:pt-28">
        <p className="label-mono text-primary">Begin</p>
        <Reveal>
          <h2 className="mt-6 max-w-5xl display-xl text-ink">
            Ready to build <span className="heading-accent text-primary">what&rsquo;s next?</span>
          </h2>
        </Reveal>
        <Link
          to="/contact"
          data-cursor-cta
          data-magnetic
          className="group mt-12 inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground transition duration-300 hover:brightness-[1.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          Let&rsquo;s talk <ArrowUpRight size={16} className="arrow-shift" aria-hidden="true" />
        </Link>
      </div>

      {/* Middle — brand, navigation, location */}
      <div className="mx-auto max-w-7xl border-t border-hairline px-5 py-14 sm:px-8 lg:grid lg:grid-cols-[1.2fr_.8fr_.8fr] lg:gap-16">
        <div>
          <Logo />
          <p className="label-mono mt-6 text-subtle-foreground">AI · Digital · Branding · Engineering</p>
          <p className="mt-5 max-w-sm text-sm leading-7 text-muted-foreground">
            A technology partner for ambitious digital systems&mdash;direction, design, and engineering in one
            practice.
          </p>
          <p className="label-mono-tight mt-6 text-subtle-foreground">Email</p>
          <a
            href="mailto:voukentechnology@gmail.com"
            className="mt-2 inline-flex min-h-9 items-center gap-2 text-sm font-bold text-muted-foreground transition-colors duration-300 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Mail size={15} aria-hidden="true" className="text-primary" />
            voukentechnology@gmail.com
          </a>
        </div>
        <nav aria-label="Footer" className="mt-12 lg:mt-0">
          <p className="label-mono-tight text-subtle-foreground">Menu</p>
          <ul className="mt-6 space-y-1">
            {links.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="group inline-flex min-h-9 items-center gap-2 text-base font-bold tracking-[-.01em] text-muted-foreground transition-colors duration-300 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className="h-px w-0 bg-primary transition-all duration-300 group-hover:w-5" aria-hidden="true" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-12 lg:mt-0">
          <p className="label-mono-tight text-subtle-foreground">Location</p>
          <p className="mt-6 text-sm leading-6 text-muted-foreground">
              Vouken Technology
              <br />
              Nagercoil, Tamil Nadu, India
            </p>
          <div className="mt-10 border-t border-hairline pt-6">
            <p className="label-mono-tight text-subtle-foreground">More</p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
              {secondaryLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="label-mono-tight w-fit text-muted-foreground transition-colors duration-300 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Oversized wordmark — decorative, not a second heading */}
      <div className="pointer-events-none select-none px-5 pb-4 sm:px-8" aria-hidden="true">
        <p className="mx-auto max-w-7xl text-[clamp(3.5rem,15vw,12rem)] font-extrabold lowercase leading-[0.8] tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_var(--border-strong)]">
          vouken
        </p>
      </div>

      <div className="border-t border-hairline">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-7 text-xs text-subtle-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="label-mono-tight">© 2026 Vouken Technology · Launching October 2026</p>
          <Link
            to="/login"
            className="label-mono-tight w-fit opacity-50 transition-opacity duration-300 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Team access
          </Link>
        </div>
      </div>
    </footer>
  );
}

