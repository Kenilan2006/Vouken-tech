import { ArrowUpRight, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import PageMeta from "../components/PageMeta";
import Reveal from "../components/Reveal";
import Section from "../components/Section";
import SectionHeading from "../components/SectionHeading";
import ServiceRow from "../components/ServiceRow";
import { processSteps, serviceContent } from "../data/content";
import { usePublicContent } from "../hooks/usePublicContent";

export default function ServicesPage() {
  const { items: serviceItems, loading, error, retry } = usePublicContent("Services", serviceContent);

  return (
    <>
      <PageMeta
        title="Services — Vouken Technology"
        description="Vouken Technology's five core capabilities: AI & workflow automation, AI agents, digital products, branding & digital experience, and cloud & engineering."
      />

      {/* Hero */}
      <Section divider="bottom">
        <p className="label-mono text-primary">Services</p>
        <h1 className="mt-8 max-w-4xl display-xl text-ink">
          Capabilities that turn direction into <span className="text-primary">forward motion.</span>
        </h1>
        <p className="lede mt-10 max-w-2xl text-muted-foreground">
          Engagements are shaped around the problem, the context, and the work ahead&mdash;not a generic delivery menu.
        </p>
      </Section>
      {/* Service list */}
      <Section tone="raised" divider="bottom">
        {error ? (
          <div className="mb-10 flex flex-col gap-5 border border-hairline bg-background p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-bold text-ink">Saved service content could not be loaded.</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Showing the core capability map instead. {error}
              </p>
            </div>
            <Button type="button" variant="secondary" onClick={retry} className="w-fit">
              <RefreshCw size={16} aria-hidden="true" /> Try again
            </Button>
          </div>
        ) : null}

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="h-32 animate-pulse rounded-lg bg-muted" />
            ))}
          </div>
        ) : (
          <div className="border-t border-hairline">
            {serviceItems.map((service, position) => (
              <Reveal key={service.id} delay={position * 60}>
                <ServiceRow service={service} position={position} />
              </Reveal>
            ))}
          </div>
        )}
      </Section>

      {/* How engagements run */}
      <Section divider="bottom" index="01" label="How engagements run">
        <div className="grid gap-14 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
          <SectionHeading
            eyebrow="A practical start"
            title={
              <>
                A good decision begins with the <span className="text-primary">right question.</span>
              </>
            }
          >
            <p>
              If you are considering a new system, improving an existing one, or making sense of an emerging
              opportunity, start with a conversation about the actual work.
            </p>
          </SectionHeading>

          <div className="grid gap-10 sm:grid-cols-2">
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
        </div>
      </Section>

      {/* Closing */}
      <Section tone="raised">
        <div className="panel grain relative overflow-hidden p-8 sm:p-12 lg:p-16">
          <div className="glow-field pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="relative max-w-2xl">
            <h2 className="display-md text-ink">Not sure which capability fits?</h2>
            <p className="lede mt-5 text-muted-foreground">
              Describe the problem in your own words. We will suggest the smallest sensible next step.
            </p>
            <Link
              to="/contact"
              className="group mt-9 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground transition duration-300 hover:-translate-y-0.5 hover:brightness-[1.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Start a conversation <ArrowUpRight size={16} className="arrow-shift" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
