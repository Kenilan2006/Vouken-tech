import { ArrowRight, ArrowUpRight, FolderOpen, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import PageMeta from "../components/PageMeta";
import Reveal from "../components/Reveal";
import Section from "../components/Section";
import SectionHeading from "../components/SectionHeading";
import { usePublicContent } from "../hooks/usePublicContent";

export default function ProjectsPage() {
  const { items, loading, error, retry } = usePublicContent("Projects");

  return (
    <>
      <PageMeta
        title="Projects — Vouken Technology"
        description="Vouken Technology's project archive shares engineering case notes on real digital work: the problem, the approach, and what changed. Launching October 2026."
      />

      {/* Hero */}
      <Section divider="bottom">
        <p className="label-mono text-primary">Projects</p>
        <h1 className="mt-8 max-w-4xl display-xl text-ink">
          Engineering stories, shared when the <span className="text-primary">work is ready.</span>
        </h1>
        <p className="lede mt-10 max-w-2xl text-muted-foreground">
          We will never create a portfolio out of invented work. The archive opens with Vouken&rsquo;s public launch in
          October 2026.
        </p>
      </Section>
      {/* Archive */}
      <Section tone="raised" divider="bottom">
        {error ? (
          <div className="mb-10 flex flex-col gap-5 border border-hairline bg-background p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-bold text-ink">Project entries could not be loaded.</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{error}</p>
            </div>
            <Button type="button" variant="secondary" onClick={retry} className="w-fit">
              <RefreshCw size={16} aria-hidden="true" /> Try again
            </Button>
          </div>
        ) : null}

        {loading ? (
          <div className="grid gap-5 md:grid-cols-2">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="h-56 animate-pulse rounded-lg bg-muted" />
            ))}
          </div>
        ) : items.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            {items.map((project, position) => (
              <Reveal key={project.id} delay={position * 70}>
                <Link
                  to={`/projects/${project.slug}`}
                  className="panel panel-hover edge-sweep group flex h-full flex-col justify-between p-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-10"
                >
                  <div className="flex items-start justify-between gap-6">
                    <p className="label-mono text-primary">Project note</p>
                    <span className="index-number index-number-sm">{String(position + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="mt-14">
                    <h2 className="display-sm text-ink">{project.title}</h2>
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">
                      {project.summary || "Details will be expanded by the Vouken team."}
                    </p>
                    <span className="reveal-detail label-mono-tight mt-6 inline-flex items-center gap-2 text-ink">
                      Read details <ArrowRight size={14} className="arrow-shift" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="panel grain p-8 sm:p-14">
              <div className="grid size-12 place-items-center rounded-full border border-hairline text-primary">
                <FolderOpen size={20} aria-hidden="true" />
              </div>
              <h2 className="mt-8 display-md text-ink">Project archive in formation.</h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
                When projects can be disclosed, each case note will focus on the decision trail: the challenge, the
                decisions, the engineering work, and what changed as a result.
              </p>
              <Link
                to="/contact"
                className="link-underline mt-9 inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors duration-300 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Discuss a future project <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        )}
      </Section>

      {/* Documentation standard */}
      <Section divider="bottom" index="01" label="Documentation">
        <div className="grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
          <SectionHeading
            eyebrow="How we document work"
            title={
              <>
                Evidence over <span className="text-primary">theatre.</span>
              </>
            }
          />
          <div className="grid gap-10 sm:grid-cols-3">
            {[
              { label: "Challenge", text: "The real constraint, not the polished brief." },
              { label: "Decisions", text: "What we chose, what we rejected, and why." },
              { label: "Outcome", text: "What changed—described honestly and without vanity metrics." },
            ].map((item, position) => (
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
          <h2 className="display-md max-w-xl text-ink">Have work you would rather not take on alone?</h2>
          <Link
            to="/contact"
            className="group inline-flex w-fit min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground transition duration-300 hover:brightness-[1.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Start a conversation <ArrowUpRight size={16} className="arrow-shift" aria-hidden="true" />
          </Link>
        </div>
      </Section>
    </>
  );
}
