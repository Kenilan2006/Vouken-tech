import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import PageMeta from "../components/PageMeta";
import Reveal from "../components/Reveal";
import Section from "../components/Section";
import { serviceContent, serviceMeta } from "../data/content";
import { usePublicContent } from "../hooks/usePublicContent";

const approach = [
  {
    title: "Shared context first",
    text: "We start with objectives, constraints, users, and the operational reality the system has to live inside.",
  },
  {
    title: "Decisions made visible",
    text: "Trade-offs are documented and explained, so the reasoning survives long after the kickoff conversation.",
  },
  {
    title: "Incremental delivery",
    text: "Work lands in reviewable increments with production-quality code rather than a single end-of-project reveal.",
  },
  {
    title: "Handover you can extend",
    text: "Documentation, clear interfaces, and a roadmap keep your team in control of what happens next.",
  },
];

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const { items: services, loading } = usePublicContent("Services", serviceContent);
  const service = services.find((item) => item.slug === slug || item.id === slug);
  const meta = service ? serviceMeta[service.slug] : undefined;
  const focus = service?.outcomes?.length ? service.outcomes : (meta?.focus ?? []);
  const others = services.filter((item) => item.slug !== service?.slug).slice(0, 3);

  if (loading)
    return (
      <Section>
        <PageMeta title="Service" description="Loading Vouken Technology service details." />
        <div className="h-5 w-40 animate-pulse rounded bg-muted" />
        <div className="mt-14 h-16 max-w-3xl animate-pulse rounded bg-muted" />
        <div className="mt-8 h-28 max-w-2xl animate-pulse rounded bg-muted" />
      </Section>
    );

  if (!service)
    return (
      <Section>
        <PageMeta title="Service not found" description="The selected Vouken Technology service could not be found." />
        <p className="label-mono text-primary">Not found</p>
        <h1 className="mt-8 display-lg text-ink">That service isn't listed here.</h1>
        <Link
          to="/services"
          className="link-underline mt-10 inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors duration-300 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeft size={16} aria-hidden="true" /> Back to services
        </Link>
      </Section>
    );

  return (
    <>
      <PageMeta
        title={service.title}
        description={`${service.title} from Vouken Technology: ${service.summary ?? "service details."}`}
      />
      {/* Hero */}
      <section className="border-b border-hairline">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 section-y">
          <Link
            to="/services"
            className="label-mono inline-flex items-center gap-2 text-subtle-foreground transition-colors duration-300 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ArrowLeft size={14} aria-hidden="true" /> All services
          </Link>
          <p className="label-mono mt-14 text-primary">Service {service.number ?? "—"}</p>
          <h1 className="mt-8 max-w-3xl display-xl text-ink">{service.title} with a clear line of sight.</h1>
          <p className="lede mt-10 max-w-2xl text-muted-foreground">{service.summary}</p>
          {meta?.note ? <p className="label-mono-tight mt-8 text-primary">{meta.note}</p> : null}
        </div>
      </section>

      {/* Approach and outputs */}
      <Section divider="bottom">
        <div className="grid gap-16 lg:grid-cols-[1fr_.8fr] lg:gap-20">
          <div>
            <h2 className="display-md text-ink">How we approach the work.</h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground">
              Every engagement starts by building shared context. From there the work is structured around the decisions
              that unlock a dependable next step. Scope, methods, and the delivery path are set with the
              problem&mdash;not assumed in advance.
            </p>
            <div className="mt-14 grid gap-10 sm:grid-cols-2">
              {approach.map((item, position) => (
                <Reveal key={item.title} delay={position * 70}>
                  <div className="border-t border-hairline pt-6">
                    <span className="label-mono-tight text-subtle-foreground tabular-nums">
                      {String(position + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-5 text-lg font-bold tracking-[-.02em] text-ink">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={80}>
            <aside className="panel h-full p-8 sm:p-10">
              <p className="label-mono text-primary">Typical outputs</p>
              {focus.length ? (
                <ul className="mt-8 divide-y divide-hairline border-t border-hairline">
                  {focus.map((item, position) => (
                    <li key={item} className="flex items-start gap-5 py-5">
                      <span className="label-mono-tight pt-0.5 text-subtle-foreground tabular-nums">
                        {String(position + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm font-semibold text-ink">{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-6 text-sm leading-7 text-muted-foreground">
                  Specific outputs for this service will be shaped around the problem, the constraints, and the technical
                  decisions of the engagement.
                </p>
              )}
            </aside>
          </Reveal>
        </div>
      </Section>

      {/* Related services */}
      {others.length ? (
        <Section tone="raised" divider="bottom" index="01" label="Related services">
          <div className="grid gap-5 md:grid-cols-3">
            {others.map((item, position) => (
              <Reveal key={item.id} delay={position * 70}>
                <Link
                  to={`/services/${item.slug}`}
                  className="panel panel-hover edge-sweep group flex h-full flex-col justify-between p-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className="index-number index-number-sm">
                    {item.number ?? String(position + 1).padStart(2, "0")}
                  </span>
                  <div className="mt-12">
                    <h2 className="display-sm text-ink">{item.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.summary}</p>
                    <span className="reveal-detail label-mono-tight mt-5 inline-flex items-center gap-2 text-primary">
                      Open <ArrowRight size={14} className="arrow-shift" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>
      ) : null}

      {/* Closing */}
      <Section>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="display-md max-w-xl text-ink">Discuss this service in the context of your work.</h2>
          <Link
            to="/contact"
            className="group inline-flex w-fit min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground transition duration-300 hover:brightness-[1.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Discuss this service <ArrowRight size={16} className="arrow-shift" aria-hidden="true" />
          </Link>
        </div>
      </Section>
    </>
  );
}
