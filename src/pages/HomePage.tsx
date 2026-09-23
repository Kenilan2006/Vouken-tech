import { ArrowRight, ArrowUpRight, Activity, Cpu, FlaskConical, Hexagon, Layers3, Orbit, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import Marquee from "../components/Marquee";
import PageMeta from "../components/PageMeta";
import Reveal from "../components/Reveal";
import RouteArtwork from "../components/RouteArtwork";
import SystemArtwork from "../components/SystemArtwork";
import Section from "../components/Section";
import SectionHeading from "../components/SectionHeading";
import {
  brandPillars,
  capabilityClusters,
  capabilityGroups,
  partnershipReasons,
  processSteps,
  serviceContent,
} from "../data/content";
import { usePublicContent } from "../hooks/usePublicContent";
import ServiceRow from "../components/ServiceRow";
import { cn } from "../lib/utils";

const buildAreas = [
  {
    icon: Layers3,
    title: "Digital foundations",
    text: "Clear systems, considered architecture, and a direction a team can actually follow.",
    detail: "Architecture · platforms · data",
  },
  {
    icon: Cpu,
    title: "Intelligent products",
    text: "Applications and automation shaped around real decisions, workflows, and people.",
    detail: "AI · automation · product engineering",
  },
  {
    icon: Orbit,
    title: "Brand & experience",
    text: "Interfaces and identities that make complex technology legible and worth trusting.",
    detail: "Design systems · interface · identity",
  },
];

const researchSignals = [
  { icon: FlaskConical, title: "Applied exploration", text: "Turning emerging capability into specific, testable technical questions." },
  { icon: Activity, title: "Engineering signals", text: "Watching the tools, patterns, and constraints that change what a system can do." },
  { icon: ShieldCheck, title: "Responsible adoption", text: "Balancing opportunity with clarity, reliability, and care." },
];

const problemRoutes = [
  {
    index: "01",
    problem: "Repetitive work",
    text: "Teams spend hours doing tasks that should be automated.",
    solution: "AI automation",
    to: "/services/ai-workflow-automation",
  },
  {
    index: "02",
    problem: "Slow operations",
    text: "Important information is scattered across tools and systems.",
    solution: "AI agents",
    to: "/services/ai-agents",
  },
  {
    index: "03",
    problem: "Weak digital presence",
    text: "A great business can still look invisible online.",
    solution: "Digital products",
    to: "/services/digital-products",
  },
  {
    index: "04",
    problem: "Fragmented systems",
    text: "Tools exist, but they don't communicate with each other.",
    solution: "Integrated systems",
    to: "/services/cloud-engineering",
  },
  {
    index: "05",
    problem: "Slow customer response",
    text: "Leads and customers wait because processes depend on manual work.",
    solution: "Brand + digital experience",
    to: "/services/branding-experience",
  },
];

const brandLayers = [
  {
    label: "Strategy",
    text: "Positioning, voice, and message decided before pixels move.",
  },
  {
    label: "Visual identity",
    text: "Marks, colour, and type that hold together across every surface.",
  },
  {
    label: "UI/UX",
    text: "Interfaces shaped around the people who use them daily.",
  },
  {
    label: "Website design",
    text: "Sites that present the work clearly and turn attention into enquiries.",
  },
  {
    label: "Digital experience",
    text: "Product, site, and brand reading as one coherent system.",
  },
];

export default function HomePage() {
  const { items: serviceItems } = usePublicContent("Services", serviceContent);
  const { items: projectItems, loading: projectsLoading } = usePublicContent("Projects");
  const { items: productItems } = usePublicContent("Products");
  const { items: innovationItems } = usePublicContent("Innovation & R&D");

  return (
    <>
      <PageMeta
        title="Vouken Technology — AI, Digital Products & Automation"
        description="Vouken Technology builds AI-powered workflows, digital products, automation systems and modern digital experiences for ambitious businesses."
      />

      {/* Hero — staggered entrance: eyebrow → heading → paragraph → CTAs → visual */}
      <section className="relative isolate overflow-hidden">
        <div className="hero-enter hero-enter-5 pointer-events-none absolute inset-0" aria-hidden="true">
        <RouteArtwork compact />
        </div>

        <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-7xl flex-col justify-center px-5 pb-24 pt-14 sm:px-8 sm:pt-20 lg:min-h-[calc(100svh-5rem)] lg:pb-28 lg:pt-24">
          <div className="hero-enter flex flex-wrap items-center gap-x-6 gap-y-2">
              <div className="label-mono text-primary">VOuken Technology · Engineering & creative technology</div>
              <div className="text-[0.62rem] font-medium uppercase tracking-[0.22em] text-subtle-foreground">Launching October 2026</div>
          </div>

          <h1 className="hero-enter hero-enter-2 mt-8 max-w-5xl display-xl text-ink sm:mt-10">
            WE BUILD
            <br />
            WHAT&rsquo;S NEXT.
          </h1>

          <p className="hero-enter hero-enter-3 lede mt-8 max-w-2xl text-muted-foreground sm:mt-10">
            We combine AI, engineering, design and automation to build digital experiences and systems that move
            businesses forward.
          </p>

          <div className="hero-enter hero-enter-4 mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              to="/contact"
              data-cursor-cta
              data-magnetic
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground transition duration-300 hover:brightness-[1.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Let&apos;s build something <ArrowUpRight size={16} className="arrow-shift" aria-hidden="true" />
            </Link>
            <Link
              to="/projects"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border-strong px-7 py-3.5 text-sm font-bold text-ink transition duration-300 hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Explore our work <ArrowRight size={16} className="arrow-shift" aria-hidden="true" />
            </Link>
          </div>
        </div>


      </section>

      <Marquee items={brandPillars} />
      {/* What we do — asymmetric editorial statement */}
      <Section index="01" label="What we do" divider="bottom">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_.6fr] lg:gap-16">
          <Reveal variant="left">
            <h2 className="display-lg max-w-3xl text-ink">
              We turn complex technology into <span className="text-primary">simple, useful experiences.</span>
            </h2>
          </Reveal>
          <Reveal delay={90} variant="right">
            <div className="border-t border-hairline pt-8 lg:border-t-0 lg:border-l lg:pl-12 lg:pt-24">
              <p className="text-base leading-8 text-muted-foreground">
                From AI-powered workflows to digital products, websites and brand systems, Vouken helps ambitious
                businesses turn ideas into technology that works.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={140}>
          <div className="mt-16 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-hairline pt-8 sm:gap-x-14 lg:mt-24 lg:gap-x-20">
            {[
              "AI & automation",
              "Digital products",
              "Brand & experience",
              "Engineering",
            ].map((item) => (
              <p
                key={item}
                className="flex items-center gap-3 text-subtle-foreground"
              >
                <span className="h-px w-6 bg-primary/40" aria-hidden="true" />
                <span>{item}</span>
              </p>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* The problem → the route forward */}
      <Section index="02" label="The problem" divider="bottom">
        <Reveal>
          <h2 className="display-lg max-w-4xl text-ink">The problem isn&rsquo;t technology.</h2>
          <p className="lede mt-6 max-w-3xl text-muted-foreground">
            It&rsquo;s what happens when technology doesn&rsquo;t fit the way your business works.
          </p>
        </Reveal>

        <div className="mt-16 border-t border-hairline lg:mt-24">
          {problemRoutes.map((row, position) => (
            <Reveal key={row.problem} delay={position * 60}>
              <div className="grid items-start gap-4 border-b border-hairline py-8 lg:grid-cols-[4rem_1fr_auto] lg:items-center lg:gap-10">
                <span className="label-mono-tight text-subtle-foreground tabular-nums">{row.index}</span>
                <div>
                  <h3 className="text-lg font-bold uppercase tracking-[-.01em] text-ink">{row.problem}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">{row.text}</p>
                </div>
                <div className="flex items-center gap-4">
                  <ArrowRight size={16} className="hidden text-subtle-foreground lg:block" aria-hidden="true" />
                  <Link
                    to={row.to}
                    className="label-mono w-fit rounded-full border border-border-strong px-4 py-2 text-primary transition-colors duration-300 hover:border-primary/60 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {row.solution}
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="panel grain relative mt-16 overflow-hidden p-8 sm:p-12 lg:mt-24 lg:p-16">
            <div className="glow-field pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="relative flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="label-mono text-primary">The field</p>
                <p className="display-md mt-6 text-ink">We build the system around you.</p>
              </div>
              <ul className="flex flex-col gap-3">
                {problemRoutes.map((row) => (
                  <li key={row.solution}>
                    <Link
                      to={row.to}
                      className="link-underline inline-flex items-center gap-3 text-sm font-bold text-ink transition-colors duration-300 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {row.solution} <ArrowUpRight size={15} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Capabilities */}
      <Section tone="raised" divider="bottom" index="03" label="What we build">
        <SectionHeading
          eyebrow="Capabilities"
          title={
            <>
              Systems with direction, not just <span className="text-primary">deliverables.</span>
            </>
          }
        >
          <p>
            From early decisions to working platforms, we build the connected digital pieces that let a business move
            with confidence—across AI, product, brand, and engineering.
          </p>
        </SectionHeading>

        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          {buildAreas.map(({ icon: Icon, title, text, detail }, position) => (
            <Reveal
              key={title}
              delay={position * 90}
              className={cn("lg:col-span-4", position === 0 && "lg:col-span-5", position === 2 && "lg:col-span-3")}
            >
              <article className="group flex h-full flex-col justify-between p-7 sm:p-9">
                <div className="flex items-start justify-between gap-6">
                                    <span className="text-[0.62rem] font-medium uppercase tracking-[0.22em] text-primary tabular-nums">
                      {String(position + 1).padStart(2, "0")}
                    </span>
                  <Icon className="size-6 text-primary" aria-hidden="true" />
                </div>
                <div className="mt-16">
                  <h3 className="display-sm text-ink">{title}</h3>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{text}</p>
                  <p className="reveal-detail label-mono-tight mt-6 text-primary">{detail}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>
      {/* Services */}
      <Section index="04" label="Services" divider="bottom">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Engagement"
            title={
              <>
                                From the first plan to a <span className="text-primary">working system.</span>
              </>
            }
          >
            <p>Five ways to engage, shaped around the problem in front of you rather than a fixed delivery menu.</p>
          </SectionHeading>
          <Link
            to="/services"
            className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-border-strong px-6 py-3 text-sm font-bold text-ink transition duration-300 hover:-translate-y-0.5 hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            All services <ArrowRight size={16} className="arrow-shift" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-14 border-t border-hairline">
          {serviceItems.map((service, position) => (
            <Reveal key={service.id} delay={position * 60}>
              <ServiceRow service={service} position={position} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Process */}
      {/* Process — journey timeline */}
      <Section tone="raised" divider="bottom" index="05" label="Process">
        <SectionHeading
          eyebrow="How we work"
          title={
            <>
              From idea to <span className="text-primary">impact.</span>
            </>
          }
        >
          <p>
            Every stage produces something you can review, question, and build on—so progress is never just a status
            report.
          </p>
        </SectionHeading>

        <div className="relative mt-16 lg:mt-24">
          <div
            className="absolute inset-x-[0.8rem] top-[1.2rem] sm:inset-x-0 sm:top-[1.85rem] hidden h-px bg-[hsl(0_0%_86%)_60%_0%_var(--border-strong)_55%_var(--hairline)] lg:block"
            aria-hidden="true"
          />
          <ol className="relative flex flex-col gap-10 lg:grid lg:grid-cols-4 lg:gap-10">
            {processSteps.map((step, position) => (
              <li key={step.index}>
                <Reveal delay={position * 100}>
                  <div
                    className={cn("process-stage", position === processSteps.length - 1 && "process-stage-final")}
                  >
                    <span className="process-node" aria-hidden="true" />
                    <p className="label-mono-tight text-subtle-foreground tabular-nums">{step.index}</p>
                    <h3 className="mt-3 text-xl font-extrabold uppercase tracking-[-.01em] text-ink">{step.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{step.text}</p>
                    <p className="label-mono-tight mt-5 text-primary">{step.output}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Section>
      {/* Technology — capability clusters */}
      <Section divider="bottom" index="06" label="Technology">
        <div className="grid gap-14 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
          <SectionHeading
            eyebrow="Capabilities"
            title={
              <>
                Built for the <span className="text-primary">next move.</span>
              </>
            }
          >
                        <p>
              Four working areas, one connected practice—AI, digital products, engineering, and brand—so each
              engagement is shaped around the work ahead, not a fixed stack.
            </p>
            <p className="mt-5">
              <Link
                to="/future-technology"
                className="link-underline inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors duration-300 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                How we think about future technology <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </p>
          </SectionHeading>

          <div>
            <div className="border-t border-hairline">
              {capabilityClusters.map((cluster, position) => (
                <Reveal key={cluster.key} delay={position * 70}>
                  <div className="group grid items-center gap-5 border-b border-hairline py-8 sm:py-9 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
                    <div className="flex items-center gap-5">
                      <span className="label-mono-tight text-subtle-foreground tabular-nums">
                        {String(position + 1).padStart(2, "0")}
                      </span>
                      <h3 className="display-md font-extrabold uppercase tracking-[-.02em] text-ink transition-colors duration-300 group-hover:text-primary">
                        {cluster.label}
                      </h3>
                    </div>
                    <ul className="grid grid-cols-1 gap-y-3 sm:grid-cols-2 sm:gap-x-10">
                      {cluster.items.map((item, itemIndex) => (
                        <li
                          key={item}
                          style={{ transitionDelay: `${itemIndex * 45}ms` }}
                          className="flex items-center gap-3 text-sm font-semibold text-muted-foreground transition-all duration-500 [transition-timing-function:cubic-bezier(.2,.8,.2,1)] lg:opacity-60 lg:group-hover:translate-x-1 lg:group-hover:opacity-100 lg:group-hover:text-ink"
                        >
                          <span
                            className="h-px w-4 shrink-0 bg-primary/40 transition-all duration-500 lg:group-hover:w-7 lg:group-hover:bg-primary"
                            aria-hidden="true"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
            <p className="mt-10 text-xs leading-6 text-subtle-foreground">
              Specific platforms are chosen per engagement. These areas describe the kind of work Vouken takes on, not a
              fixed stack.
            </p>
          </div>
        </div>
      </Section>
      {/* Projects — case-study showcase */}
      <Section tone="raised" divider="bottom" index="07" label="Projects">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading title={<>Selected <span className="text-primary">work.</span></>}>
            <p>Digital systems built to solve real problems.</p>
          </SectionHeading>
          <Link
            to="/projects"
            className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-border-strong px-6 py-3 text-sm font-bold text-ink transition duration-300 hover:-translate-y-0.5 hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Visit project archive <ArrowRight size={16} className="arrow-shift" aria-hidden="true" />
          </Link>
        </div>

        {projectsLoading ? (
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-12">
            <div className="h-72 animate-pulse rounded-lg bg-muted lg:col-span-7" />
            <div className="h-72 animate-pulse rounded-lg bg-muted lg:col-span-5" />
          </div>
        ) : projectItems.length > 0 ? (
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-12">
            {projectItems.slice(0, 4).map((project, position) => {
              const pattern = position % 4;
              const large = pattern === 0 || pattern === 3;
              const category = project.outcomes?.[0] ?? "Case study";
              const year = project.updatedAt ? String(new Date(project.updatedAt).getFullYear()) : "2026";
              return (
                <Reveal
                  key={project.id}
                  delay={(position % 2) * 90}
                  variant="scale"
                  className={cn("md:col-span-1", large ? "lg:col-span-7" : "lg:col-span-5")}
                >
                  <Link
                    to={`/projects/${project.slug}`}
                    className="group relative block overflow-hidden rounded-lg border border-hairline transition-colors duration-300 hover:border-border-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface-raised"
                  >
                                        <div className={cn("relative", large ? "aspect-[16/10]" : "aspect-[4/3]")}>
                      {/* Generated technical artwork — static decoration (no hover zoom: avoids full-tile repaint) */}
                      <div className="absolute inset-0">
                        <SystemArtwork compact />
                      </div>
                      {/* Overlay is static: no hover gradient transition (full-tile repaint) */}
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/30 to-transparent"
                        aria-hidden="true"
                      />
                      {/* Metadata — category + year */}
                      <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-4 p-6 sm:p-8">
                        <p className="rounded-full border border-hairline bg-background/60 px-3 py-1.5 text-subtle-foreground">
                          {category}
                        </p>
                        <p className="text-subtle-foreground tabular-nums">{year}</p>
                      </div>
                      {/* Title, description and arrow */}
                      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                        <h3 className="display-sm text-ink">{project.title}</h3>
                        <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground opacity-80">
                          {project.summary || "A concise case note is being prepared for this project."}
                        </p>
                        <span>Read the note <ArrowRight size={16} className="arrow-shift" aria-hidden="true" /></span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        ) : (
          <Reveal className="mt-14">
            <div className="panel grain relative overflow-hidden p-8 sm:p-12 lg:p-16">
              <div className="glow-field pointer-events-none absolute inset-0" aria-hidden="true" />
              <div className="relative max-w-2xl">
                <p className="label-mono text-primary">Work in progress</p>
                <h3 className="mt-6 display-md max-w-2xl text-ink">Work is currently being documented.</h3>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground">
                  We do not invent client projects. Case notes are published only when real work is ready to
                  share&mdash;each one focused on the problem, the engineering decisions, and the practical outcome
                  rather than vanity metrics.
                </p>
                <Link
                  to="/contact"
                  className="link-underline mt-8 inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors duration-300 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Discuss a future project <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </Reveal>
        )}
      </Section>

      {/* Products & solutions */}
      {/* Branding — creative statement + identity board */}
      <Section index="08" label="Branding" divider="bottom">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_.95fr] lg:items-start lg:gap-20">
          <div>
            <Reveal>
              <h2 className="display-xl max-w-xl text-ink">
                Your brand should feel as good as your <span className="text-primary">product works.</span>
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="lede mt-8 max-w-xl text-muted-foreground">
                Brand is not decoration. It is the way a system speaks&mdash;and it works best when strategy, identity,
                and interface are designed together.
              </p>
            </Reveal>
            <ul className="mt-12 border-t border-hairline">
              {brandLayers.map((layer, position) => (
                <Reveal key={layer.label} delay={position * 60}>
                  <li className="group flex gap-6 border-b border-hairline py-5">
                    <span className="label-mono-tight w-8 shrink-0 pt-1 text-subtle-foreground tabular-nums">
                      {String(position + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-lg font-bold tracking-[-.01em] text-ink transition-colors duration-300 group-hover:text-primary">
                        {layer.label}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">{layer.text}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={220}>
              <Link
                to="/services/branding-experience"
                className="link-underline mt-10 inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors duration-300 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Branding &amp; digital experience <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </Reveal>
          </div>

          {/* Identity board — type, color, and system mark */}
          <Reveal delay={120}>
            <div className="lg:sticky lg:top-28">
              <div className="grid grid-cols-2 overflow-hidden rounded-lg border border-hairline">
                <div className="relative flex aspect-[4/3] items-center justify-center border-b border-r border-hairline bg-surface-raised">
                  <p className="text-[clamp(3.5rem,7vw,6rem)] font-extrabold leading-none tracking-[-.04em] text-ink">
                    Aa
                  </p>
                  <p className="label-mono-tight absolute bottom-4 left-4 text-subtle-foreground">Manrope · display</p>
                </div>
                <div className="relative flex aspect-[4/3] items-end border-b border-hairline bg-primary p-5">
                  <p className="label-mono-tight text-primary-foreground">#B8E06D</p>
                </div>
                <div className="relative grid aspect-[4/3] place-items-center border-r border-hairline bg-surface">
                  <span className="grid size-20 place-items-center rounded-md border border-border-strong bg-surface-raised text-primary transition-colors duration-300 group-hover:border-primary/60">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-6">
                      <rect x="3" y="3" width="7" height="7" />
                      <rect x="14" y="3" width="4" height="4" />
                      <rect x="14" y="10" width="7" height="7" />
                      <rect x="3" y="14" width="4" height="4" />
                    </svg>
                  </span>
                  <p className="label-mono-tight absolute bottom-4 left-4 text-subtle-foreground">
                    Mark · systems
                  </p>
                </div>
                <div className="relative aspect-[4/3] overflow-hidden bg-surface-raised">
                  <div className="absolute inset-0">
                    <div className="glow-field absolute inset-0" aria-hidden="true" />
                    <div className="grid-veil absolute inset-0" aria-hidden="true" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" aria-hidden="true" />
                  <p className="label-mono-tight absolute bottom-4 left-4 text-subtle-foreground">
                    Systems &amp; patterns
                  </p>
                </div>
              </div>
              <p className="label-mono-tight mt-5 text-subtle-foreground">
                Vouken&rsquo;s own identity system, built from the same type, colour, and mark system used across our work.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section divider="bottom" index="09" label="Products & solutions">
        <div className="grid gap-14 lg:grid-cols-[1fr_.9fr] lg:gap-20">
          <SectionHeading
            eyebrow="Products & solutions"
            title={
              <>
                Reusable thinking for complex <span className="text-primary">digital systems.</span>
              </>
            }
          >
            <p>
              Alongside tailored engineering partnerships, Vouken is exploring focused products and solution frameworks
              for work that repeats across teams.
            </p>
            <p className="mt-5">
              <Link
                to="/solutions"
                className="link-underline inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors duration-300 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Explore solutions <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </p>
          </SectionHeading>

          <Reveal delay={80}>
            <div className="panel h-full p-8 sm:p-10">
              <p className="label-mono text-primary">
                {productItems.length > 0 ? "Solution direction" : "In formation"}
              </p>
              <h3 className="mt-6 display-sm text-ink">
                {productItems[0]?.title ?? "Solution directions will be shared when they meet our standard for usefulness."}
              </h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                {productItems[0]?.summary ||
                  "A Vouken product ships only when it helps a real team make better technical decisions."}
              </p>
            </div>
          </Reveal>
        </div>
      </Section>
      {/* Innovation & R&D */}
      <Section tone="raised" divider="bottom" index="10" label="Innovation & R&D">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
          <SectionHeading
            eyebrow="Innovation & R&D"
            title={
              <>
                Explore with discipline. <span className="text-primary">Build with evidence.</span>
              </>
            }
          >
            <p>
              Research at Vouken is rooted in practical questions: what should be tested, where a new capability creates
              value, and what must be true before it enters a real system?
            </p>
            <p className="mt-5">
              <Link
                to="/innovation"
                className="link-underline inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors duration-300 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Our research posture <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </p>
          </SectionHeading>

          <div className="border-t border-hairline">
            {(innovationItems.length > 0
              ? innovationItems.slice(0, 3).map((item) => ({
                  icon: FlaskConical,
                  title: item.title,
                  text: item.summary || "Research note details will be expanded by the Vouken team.",
                }))
              : researchSignals
            ).map(({ icon: Icon, title, text }, position) => (
              <Reveal key={title} delay={position * 70}>
                <div className="flex gap-5 border-b border-hairline py-7">
                  <Icon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                  <div>
                    <h3 className="font-bold tracking-[-.02em] text-ink">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

            {/* Future technology */}
      <Section divider="bottom" index="11" label="Future technology" className="overflow-hidden">
        <div className="relative" style={{ perspective: '1600px' }}>
          <div className="glow-field absolute inset-0" aria-hidden="true" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--primary)_0%,_transparent_60%)] opacity-[0.04]" aria-hidden="true" />
        </div>

        <div className="relative">
                    <h2 className="display-lg max-w-3xl text-ink">
            Look ahead without losing the <span className="text-primary">ground beneath you.</span>
          </h2>
          <p className="lede mt-8 max-w-2xl text-muted-foreground">
            We are interested in the technologies that may reshape how teams design, operate, and understand digital
            systems. Our job is not to chase every signal; it is to find the ones worth building.
          </p>
          <Link
            to="/future-technology"
            className="link-underline mt-10 inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors duration-300 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Explore our perspective <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </Section>
      {/* Why partner with Vouken */}
      <Section tone="raised" divider="bottom" index="12" label="Why Vouken">
        <div className="grid gap-14 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
          <SectionHeading
            eyebrow="Why partner with Vouken"
            title={
              <>
                A considered partner for <span className="text-primary">unfamiliar problems.</span>
              </>
            }
          >
            <p>
                          We are being built for teams that need judgment as much as output&mdash;where the decision matters as much as
              the release.
            </p>
          </SectionHeading>

          <div className="grid sm:grid-cols-2">
            {partnershipReasons.map((reason, position) => (
              <Reveal key={reason.index} delay={position * 60}>
                <div className="group h-full border-t border-hairline p-7 transition-colors duration-300 hover:bg-surface sm:border-l sm:p-8">
                  <span className="text-[0.62rem] font-medium uppercase tracking-[0.22em] text-primary tabular-nums">{reason.index}</span>
                  <h3 className="mt-8 text-lg font-bold tracking-[-.02em] text-ink">{reason.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{reason.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Vision */}
      <Section divider="bottom" index="13" label="Vision">
        <div className="max-w-4xl">
          <p className="display-lg text-ink">
            To make advanced digital progress feel <span className="text-primary">possible</span> for teams with big
            ambitions and limited time.
          </p>
          <p className="lede mt-8 max-w-2xl text-muted-foreground">
            We see technology as a field worth building in with both curiosity and engineering discipline. Vouken exists
            to help organisations move through it with a clearer sense of what to build, and why.
          </p>
        </div>
      </Section>

      {/* Closing call to action */}
      <Section tone="raised" index="14" label="Start here">
        <div className="panel grain relative overflow-hidden p-8 sm:p-14 lg:p-20">
          <div className="glow-field pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="relative max-w-3xl">
            <h2 className="display-lg text-ink">Where are you headed next?</h2>
            <p className="lede mt-6 text-muted-foreground">
              Tell us what you are building. We will begin with a practical conversation about the work, the constraints,
              and what to build next.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/contact"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground transition duration-300 hover:brightness-[1.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface-raised"
              >
                Start a conversation <ArrowUpRight size={16} className="arrow-shift" aria-hidden="true" />
              </Link>
              <Link
                to="/services"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border-strong px-7 py-3.5 text-sm font-bold text-ink transition duration-300 hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface-raised"
              >
                See how we work <ArrowRight size={16} className="arrow-shift" aria-hidden="true" />
              </Link>
            </div>
            <p className="label-mono mt-12 text-subtle-foreground">Nagercoil, Tamil Nadu · Launching October 2026</p>
          </div>
        </div>
      </Section>
    </>
  );
}
