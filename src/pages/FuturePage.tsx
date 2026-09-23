import { ArrowRight, ArrowUpRight, Radar } from "lucide-react";
import { Link } from "react-router-dom";
import PageMeta from "../components/PageMeta";
import Reveal from "../components/Reveal";
import RouteArtwork from "../components/RouteArtwork";
import Section from "../components/Section";
import SectionHeading from "../components/SectionHeading";

const stance = [
  { label: "Signal", text: "What is actually changing, and what is only noise?" },
  { label: "Context", text: "Where could it matter, and for whom?" },
  { label: "Proof", text: "What evidence earns adoption in a live system?" },
];

export default function FuturePage() {
  return (
    <>
      <PageMeta
        title="Future Technology"
        description="Vouken Technology's considered perspective on navigating future technology without losing practical engineering discipline."
      />

      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-hairline">
        <RouteArtwork />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 section-y">
          <p className="label-mono text-primary">Future technology</p>
          <h1 className="mt-8 max-w-4xl display-xl text-ink">
            Look ahead with both <span className="text-primary">curiosity</span> and engineering discipline.
          </h1>
          <p className="lede mt-10 max-w-2xl text-muted-foreground">
            Emerging technology can change the map. The challenge is deciding which signals matter, what they mean in
            context, and when the ground is firm enough to move.
          </p>
        </div>
      </section>

      {/* Stance */}
      <Section divider="bottom" index="01" label="Our stance">
        <div className="grid gap-14 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
          <SectionHeading
            eyebrow="Position"
            size="md"
            title={
              <>
                Future-ready does not mean <span className="text-primary">trend-led.</span>
              </>
            }
          >
            <p>
              We are interested in new capability where it creates a clear advantage, a better experience, or a more
              resilient system. We are equally interested in knowing when restraint is the sounder engineering choice.
            </p>
          </SectionHeading>
          <div className="grid gap-10 sm:grid-cols-3">
            {stance.map((item, position) => (
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

      {/* Horizon */}
      <Section tone="raised" divider="bottom" index="02" label="Continuing horizon">
        <div className="grid gap-14 lg:grid-cols-[1fr_.85fr] lg:gap-20">
          <SectionHeading
            eyebrow="The horizon"
            title={
              <>
                The route is never <span className="text-primary">static.</span>
              </>
            }
          >
            <p>
              As Vouken grows, this space will share the technical themes we are observing, the questions we are testing,
              and the principles that shape our decisions.
            </p>
          </SectionHeading>
          <Reveal delay={80}>
            <div className="panel h-full p-8 sm:p-10">
              <div className="grid size-12 place-items-center rounded-full border border-hairline text-primary">
                <Radar size={22} aria-hidden="true" />
              </div>
              <p className="label-mono mt-8 text-primary">Signals we watch</p>
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                <li>Applied AI and automation in operational systems</li>
                <li>Data foundations that make intelligence possible</li>
                <li>Interfaces that keep complex systems understandable</li>
                <li>Delivery practices that survive real-world change</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Closing */}
      <Section>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="display-md max-w-xl text-ink">Start a future-focused conversation.</h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/contact"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground transition duration-300 hover:brightness-[1.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Start a conversation <ArrowUpRight size={16} className="arrow-shift" aria-hidden="true" />
            </Link>
            <Link
              to="/innovation"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border-strong px-7 py-3.5 text-sm font-bold text-ink transition duration-300 hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Innovation &amp; R&amp;D <ArrowRight size={16} className="arrow-shift" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
