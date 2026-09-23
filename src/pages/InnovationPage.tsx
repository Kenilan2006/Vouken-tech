import { ArrowRight, Beaker, GitBranch, RefreshCw, ScanSearch } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import PageMeta from "../components/PageMeta";
import Reveal from "../components/Reveal";
import Section from "../components/Section";
import SectionHeading from "../components/SectionHeading";
import { usePublicContent } from "../hooks/usePublicContent";

const loop = [
  {
    icon: ScanSearch,
    title: "Observe",
    text: "Track the technology shifts, engineering patterns, and operational questions that may change the field.",
  },
  {
    icon: GitBranch,
    title: "Frame",
    text: "Translate a signal into a specific, testable hypothesis—not a vague trend report.",
  },
  {
    icon: Beaker,
    title: "Test",
    text: "Prototype, evaluate, and document the evidence needed for a responsible decision.",
  },
];

export default function InnovationPage() {
  const { items, loading, error, retry } = usePublicContent("Innovation & R&D");

  return (
    <>
      <PageMeta
        title="Innovation & R&D"
        description="Vouken Technology's approach to applied research, emerging technology, and responsible innovation."
      />

      {/* Hero */}
      <Section divider="bottom">
        <p className="label-mono text-primary">Innovation &amp; R&amp;D</p>
        <h1 className="mt-8 max-w-4xl display-xl text-ink">
          Curiosity needs a <span className="text-primary">method.</span>
        </h1>
        <p className="lede mt-10 max-w-2xl text-muted-foreground">
          Vouken&rsquo;s research posture is deliberately practical: explore emerging capability, test it against real
          constraints, and only then consider where it belongs.
        </p>
      </Section>
      {/* Research loop */}
      <Section tone="raised" divider="bottom" index="01" label="Research loop">
        <SectionHeading
          eyebrow="Our loop"
          title={
            <>
              Observe. Frame. Test. <span className="text-primary">Decide.</span>
            </>
          }
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {loop.map(({ icon: Icon, title, text }, position) => (
            <Reveal key={title} delay={position * 80}>
              <article className="panel panel-hover edge-sweep group flex h-full flex-col justify-between p-7 sm:p-9">
                <div className="flex items-start justify-between gap-6">
                  <span className="index-number index-number-sm">{String(position + 1).padStart(2, "0")}</span>
                  <Icon className="size-6 text-primary" aria-hidden="true" />
                </div>
                <div className="mt-16">
                  <h2 className="display-sm text-ink">{title}</h2>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Research notes */}
      <Section divider="bottom" index="02" label="Research notes">
        <SectionHeading eyebrow="Published work" title="Shared when there is something useful to say.">
          <p>
            Vouken will publish research notes and experiments when they carry a clear practical lesson. Until then, we
            prefer quiet study over speculative announcements.
          </p>
        </SectionHeading>

        {error ? (
          <div className="mt-12 flex flex-col gap-5 border border-hairline bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-bold text-ink">Research entries could not be loaded.</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{error}</p>
            </div>
            <Button type="button" variant="secondary" onClick={retry} className="w-fit">
              <RefreshCw size={16} aria-hidden="true" /> Try again
            </Button>
          </div>
        ) : null}

        {loading ? (
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {[1, 2].map((item) => (
              <div key={item} className="h-48 animate-pulse rounded-lg bg-muted" />
            ))}
          </div>
        ) : items.length > 0 ? (
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {items.map((item, position) => (
              <Reveal key={item.id} delay={position * 70}>
                <article className="panel panel-hover edge-sweep group flex h-full flex-col justify-between p-8">
                  <div className="flex items-start justify-between gap-6">
                    <p className="label-mono text-primary">R&amp;D note</p>
                    <span className="index-number index-number-sm">{String(position + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="mt-12">
                    <h3 className="display-sm text-ink">{item.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">
                      {item.summary || "Details will be expanded by the Vouken team."}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal className="mt-14">
            <div className="panel grain p-8 sm:p-12">
              <p className="label-mono text-primary">In progress</p>
              <h3 className="mt-6 display-md max-w-2xl text-ink">The first notes are still being written.</h3>
              <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
                Research will be published with its context, its evidence, and its limits&mdash;so you can judge whether
                it applies to your terrain.
              </p>
              <Link
                to="/contact"
                className="link-underline mt-9 inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors duration-300 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Suggest a research question <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        )}
      </Section>

      {/* Closing */}
      <Section tone="raised">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="display-md max-w-xl text-ink">Have a question worth testing properly?</h2>
          <Link
            to="/contact"
            className="group inline-flex w-fit min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground transition duration-300 hover:brightness-[1.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Start a conversation <ArrowRight size={16} className="arrow-shift" aria-hidden="true" />
          </Link>
        </div>
      </Section>
    </>
  );
}
