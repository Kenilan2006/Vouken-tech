import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import PageMeta from "../components/PageMeta";
import Reveal from "../components/Reveal";
import RouteArtwork from "../components/RouteArtwork";
import SystemArtwork from "../components/SystemArtwork";
import Section from "../components/Section";
import SectionHeading from "../components/SectionHeading";
import { processSteps } from "../data/content";

/**
 * The five practices Vouken combines. Curated editorial copy — no invented
 * statistics, clients, or credentials anywhere on this page.
 */
const capabilities = [
  {
    index: "01",
    label: "Engineering",
    text: "Systems built to production standards—architecture, integrations, and code a team can maintain.",
  },
  {
    index: "02",
    label: "Design",
    text: "Interfaces and identities that make complex technology feel clear and worth trusting.",
  },
  {
    index: "03",
    label: "AI",
    text: "Applied where it changes a decision—assistants, reasoning workflows, and evaluation before adoption.",
  },
  {
    index: "04",
    label: "Automation",
    text: "Repetitive work handed to software, with the process mapped before the tooling is chosen.",
  },
  {
    index: "05",
    label: "Digital strategy",
    text: "Direction before delivery: what to build, what to connect, and what can wait.",
  },
];

/** The durable principles behind how Vouken thinks about technology. */
const principles = [
  {
    index: "01",
    title: "Build with purpose",
    text: "Technology should solve a real problem. If the problem is not clear yet, we start there.",
  },
  {
    index: "02",
    title: "Simplify complexity",
    text: "Good systems make difficult things easier—for the people operating them, not only the people building them.",
  },
  {
    index: "03",
    title: "Design for people",
    text: "Technology is successful when people actually want to use it.",
  },
  {
    index: "04",
    title: "Keep moving",
    text: "Build, learn, improve—working in reviewable increments instead of waiting for a perfect plan.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageMeta
        title="About — Vouken Technology"
        description="Vouken Technology is a technology company for AI, digital products, automation, and engineering for ambitious businesses. Launching October 2026."
      />

      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-hairline">
        <RouteArtwork compact />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 section-y">
          <p className="text-[0.62rem] font-medium uppercase tracking-[0.22em] text-primary">About Vouken</p>
          <h1 className="mt-8 max-w-5xl display-xl text-ink">
            We&rsquo;re building a <span className="heading-accent text-primary">different kind</span> of technology company.
          </h1>
          <div className="mt-12 grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
            <Reveal>
              <p className="lede max-w-2xl text-muted-foreground">
                Vouken Technology combines engineering, design, AI, automation, and digital strategy into one
                practice&mdash;a technology partner that takes responsibility for direction, not just execution.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <div className="grid gap-4 border-t border-hairline pt-6 sm:grid-cols-3 lg:border-t-0 lg:pt-0">
                <p className="text-[0.66rem] font-medium uppercase tracking-[0.22em] text-subtle-foreground">
                  Nagercoil · Tamil Nadu · India
                </p>
                <p className="text-[0.66rem] font-medium uppercase tracking-[0.22em] text-subtle-foreground">
                  Launching October 2026
                </p>
                <p className="text-[0.66rem] font-medium uppercase tracking-[0.22em] text-subtle-foreground">
                  Engineering · Design · AI · Automation · Strategy
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      {/* What we combine — partner positioning */}
      <Section index="01" label="What we combine" divider="bottom">
        <div className="grid gap-14 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
          <SectionHeading
            eyebrow="A technology partner"
            title={
              <>
                Not a vendor waiting for instructions&mdash;a partner who shapes the{" "}
                <span className="text-primary">direction.</span>
              </>
            }
          >
            <p>
              Conventional outsourcing begins with a finished specification. We begin earlier: with the problem, the
              context, and the outcome the business needs&mdash;then stay responsible for design, engineering, and the
              decisions in between.
            </p>
          </SectionHeading>

          <ul className="border-t border-hairline">
            {capabilities.map((capability, position) => (
              <Reveal key={capability.label} delay={position * 60}>
                <li className="group flex gap-6 border-b border-hairline py-6">
                  <span className="label-mono-tight w-8 shrink-0 pt-1 text-subtle-foreground tabular-nums">
                    {capability.index}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold tracking-[-.01em] text-ink transition-colors duration-300 group-hover:text-primary">
                      {capability.label}
                    </h3>
                    <p className="mt-1 max-w-xl text-sm leading-6 text-muted-foreground">{capability.text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* How we think */}
      <Section tone="raised" divider="bottom" label="How we think">
        <SectionHeading
          eyebrow="Principles"
          title={
            <>
              How we think, applied to <span className="text-primary">every decision.</span>
            </>
          }
        >
          <p>Tools change. These principles are the durable part.</p>
        </SectionHeading>

        <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-hairline bg-hairline sm:grid-cols-2">
          {principles.map((principle, position) => (
            <Reveal key={principle.index} delay={position * 70}>
              <div className="h-full bg-surface p-8 sm:p-10">
                <h3 className="mt-2 text-xl font-extrabold uppercase tracking-[-0.01em] text-ink">{principle.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{principle.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
      {/* Working model */}
      <Section tone="raised" divider="bottom" index="03" label="How we work">
        <SectionHeading
          eyebrow="Working model"
          title={
            <>
              Engineering should create capability, not <span className="text-primary">dependency.</span>
            </>
          }
        >
          <p>
            We aim to create useful systems and a clear understanding of how they work&mdash;so the people responsible
            for the next move stay in control of the journey.
          </p>
        </SectionHeading>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, position) => (
            <Reveal key={step.index} delay={position * 70}>
              <div className="border-t border-hairline pt-6">
                <span className="label-mono-tight text-subtle-foreground tabular-nums">{step.index}</span>
                <h3 className="mt-5 text-lg font-bold tracking-[-.02em] text-ink">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{step.text}</p>
                <p className="label-mono-tight mt-5 text-primary">{step.output}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
      {/* Closing */}
      <Section label="Start here">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="Work with us" size="md" title="Bring us the problem you cannot solve alone.">
            <p>
              Share the ambition, the constraints, and where the current approach runs out. We will help you work out what
              happens next.
            </p>
          </SectionHeading>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/contact"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground transition duration-300 hover:-translate-y-0.5 hover:brightness-[1.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Start a conversation <ArrowUpRight size={16} className="arrow-shift" aria-hidden="true" />
            </Link>
            <Link
              to="/services"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border-strong px-7 py-3.5 text-sm font-bold text-ink transition duration-300 hover:-translate-y-0.5 hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Explore services <ArrowRight size={16} className="arrow-shift" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
