import { ArrowLeft, ArrowRight, FolderOpen } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import PageMeta from "../components/PageMeta";
import Reveal from "../components/Reveal";
import Section from "../components/Section";
import SectionHeading from "../components/SectionHeading";
import { usePublicContent } from "../hooks/usePublicContent";

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const { items, loading } = usePublicContent("Projects");
  const project = items.find((item) => item.slug === slug || item.id === slug);

  if (loading)
    return (
      <Section>
        <PageMeta title="Project" description="Loading Vouken Technology project details." />
        <div className="h-5 w-40 animate-pulse rounded bg-muted" />
        <div className="mt-14 h-64 max-w-3xl animate-pulse rounded-lg bg-muted" />
      </Section>
    );

  if (!project)
    return (
      <Section divider="bottom">
        <PageMeta
          title="Project archive"
          description="Vouken Technology project details will be published after the company's October 2026 launch."
        />
        <Link
          to="/projects"
          className="label-mono inline-flex items-center gap-2 text-subtle-foreground transition-colors duration-300 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeft size={14} aria-hidden="true" /> Project archive
        </Link>
        <div className="mt-14 panel grain max-w-3xl p-8 sm:p-12">
          <div className="grid size-12 place-items-center rounded-full border border-hairline text-primary">
            <FolderOpen size={20} aria-hidden="true" />
          </div>
          <h1 className="mt-8 display-md text-ink">Project details are coming soon.</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
            This route is reserved for a future, publicly shareable case study. No project information is published here
            yet.
          </p>
          <Link
            to="/contact"
            className="link-underline mt-9 inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors duration-300 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Discuss a future project <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </Section>
    );

  return (
    <>
      <PageMeta title={project.title} description={project.summary || "Vouken Technology project note."} />
      {/* Note */}
      <Section divider="bottom">
        <Link
          to="/projects"
          className="label-mono inline-flex items-center gap-2 text-subtle-foreground transition-colors duration-300 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeft size={14} aria-hidden="true" /> Project archive
        </Link>
        <p className="label-mono mt-14 text-primary">Project note</p>
        <h1 className="mt-8 max-w-3xl display-xl text-ink">{project.title}</h1>
        <p className="lede mt-10 max-w-2xl text-muted-foreground">
          {project.summary || "Details will be expanded by the Vouken team."}
        </p>
        {project.updatedAt ? (
          <p className="label-mono-tight mt-10 text-subtle-foreground">
            Updated{" "}
            {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(project.updatedAt))}
          </p>
        ) : null}
      </Section>

      {/* Note structure */}
      <Section tone="raised" divider="bottom" index="01" label="Note structure">
        <div className="grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
          <SectionHeading eyebrow="What this note covers" size="md" title="Context, decisions, and the route taken." />
          <div className="grid gap-10 sm:grid-cols-2">
            {[
              { label: "Challenge", text: "The operational problem and the constraints that shaped it." },
              { label: "Decisions", text: "The architectural and product choices, including what was rejected." },
              { label: "Engineering", text: "How the system was built, integrated, and made observable." },
              { label: "Outcome", text: "What changed for the people using it—without invented metrics." },
            ].map((item, position) => (
              <Reveal key={item.label} delay={position * 70}>
                <div className="border-t border-hairline pt-6">
                  <span className="label-mono-tight text-subtle-foreground tabular-nums">
                    {String(position + 1).padStart(2, "0")}
                  </span>
                  <h2 className="mt-5 text-lg font-bold tracking-[-.02em] text-ink">{item.label}</h2>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Closing */}
      <Section>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="display-md max-w-xl text-ink">Planning something similar?</h2>
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
