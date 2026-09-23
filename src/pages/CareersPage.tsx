import { ArrowRight, ArrowUpRight, UsersRound } from "lucide-react";
import { Link } from "react-router-dom";
import PageMeta from "../components/PageMeta";
import Reveal from "../components/Reveal";
import Section from "../components/Section";
import SectionHeading from "../components/SectionHeading";

const signals = [
  { label: "Systems thinking", text: "You care how the whole system fits together, not only your own layer." },
  { label: "Craft", text: "You hold a high standard for the work that carries your name." },
  { label: "Context", text: "You want to understand the operation before proposing the solution." },
];

export default function CareersPage() {
  return (
    <>
      <PageMeta
        title="Careers — Vouken Technology"
        description="Future opportunities at Vouken Technology in Nagercoil, Tamil Nadu, launching October 2026."
      />

      {/* Hero */}
      <Section divider="bottom">
        <p className="label-mono text-primary">Careers</p>
        <h1 className="mt-8 max-w-4xl display-xl text-ink">
          For people who like the hard part: <span className="text-primary">finding the problem worth solving.</span>
        </h1>
        <p className="lede mt-10 max-w-2xl text-muted-foreground">
          Vouken is planned to launch in October 2026. Future roles will be published here when there is a specific
          position to share.
        </p>
      </Section>

      {/* No open roles */}
      <Section tone="raised" divider="bottom" index="01" label="Open roles">
        <div className="grid gap-14 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
          <div className="grid size-14 place-items-center rounded-full border border-hairline text-primary">
            <UsersRound size={24} aria-hidden="true" />
          </div>
          <SectionHeading
            eyebrow="No open roles yet"
            title={
              <>
                We will name the work before we ask for the <span className="text-primary">person.</span>
              </>
            }
          >
            <p>
              We do not list speculative jobs. When a role opens, it will include enough context to explain the mission,
              the work, and the capabilities it needs.
            </p>
          </SectionHeading>
        </div>
      </Section>

      {/* What we look for */}
      <Section divider="bottom" index="02" label="What we look for">
        <div className="grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
          <SectionHeading eyebrow="A note for collaborators" size="md" title="Craft, context, and the people using the system." />
          <div className="grid gap-10 sm:grid-cols-3">
            {signals.map((item, position) => (
              <Reveal key={item.label} delay={position * 70}>
                <div className="border-t border-hairline pt-6">
                  <p className="label-mono text-primary">{item.label}</p>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Closing */}
      <Section tone="raised">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="display-md max-w-xl text-ink">If that sounds like your kind of work, introduce yourself.</h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/contact"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground transition duration-300 hover:brightness-[1.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Introduce yourself <ArrowUpRight size={16} className="arrow-shift" aria-hidden="true" />
            </Link>
            <Link
              to="/about"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border-strong px-7 py-3.5 text-sm font-bold text-ink transition duration-300 hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              About Vouken <ArrowRight size={16} className="arrow-shift" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
