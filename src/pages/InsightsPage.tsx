import { ArrowRight, ArrowUpRight, BookOpenText, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import PageMeta from "../components/PageMeta";
import Reveal from "../components/Reveal";
import Section from "../components/Section";
import SectionHeading from "../components/SectionHeading";
import { usePublicContent } from "../hooks/usePublicContent";

const themes = ["Digital engineering", "Product thinking", "Useful technology", "Changing systems"];

export default function InsightsPage() {
  const { items, loading, error, retry } = usePublicContent("Articles");

  return (
    <>
      <PageMeta
        title="Insights — Vouken Technology"
        description="Vouken Technology's Insights share considered notes on AI, digital products, automation, and engineering direction for businesses navigating complex technology."
      />

      {/* Hero */}
      <Section divider="bottom">
        <p className="label-mono text-primary">Insights</p>
        <h1 className="mt-8 max-w-4xl display-xl text-ink">
          Notes from the <span className="text-primary">work.</span>
        </h1>
        <p className="lede mt-10 max-w-2xl text-muted-foreground">
          A future journal on engineering direction, product thinking, useful technology, and the work of changing
          complex technology.
        </p>
        <ul className="mt-12 flex flex-wrap gap-2">
          {themes.map((theme) => (
            <li
              key={theme}
              className="label-mono-tight rounded-full border border-hairline px-3.5 py-1.5 text-muted-foreground"
            >
              {theme}
            </li>
          ))}
        </ul>
      </Section>
      {/* Articles */}
      <Section tone="raised" divider="bottom">
        {error ? (
          <div className="mb-10 flex flex-col gap-5 border border-hairline bg-background p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-bold text-ink">Article entries could not be loaded.</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{error}</p>
            </div>
            <Button type="button" variant="secondary" onClick={retry} className="w-fit">
              <RefreshCw size={16} aria-hidden="true" /> Try again
            </Button>
          </div>
        ) : null}

        {loading ? (
          <div className="grid gap-5 md:grid-cols-2">
            {[1, 2].map((item) => (
              <div key={item} className="h-52 animate-pulse rounded-lg bg-muted" />
            ))}
          </div>
        ) : items.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            {items.map((item, position) => (
              <Reveal key={item.id} delay={position * 70}>
                <article className="panel panel-hover edge-sweep group flex h-full flex-col justify-between p-8 sm:p-10">
                  <div className="flex items-start justify-between gap-6">
                    <p className="label-mono text-primary">Article</p>
                    <span className="index-number index-number-sm">{String(position + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="mt-14">
                    <h2 className="display-sm text-ink">{item.title}</h2>
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">
                      {item.summary || "Details will be expanded by the Vouken team."}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="panel grain p-8 sm:p-14">
              <div className="grid size-12 place-items-center rounded-full border border-hairline text-primary">
                <BookOpenText size={20} aria-hidden="true" />
              </div>
              <h2 className="mt-8 display-md max-w-2xl text-ink">The journal opens with the launch.</h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
                We will publish only when there is a perspective worth keeping: clear context, evidence, and a practical
                observation a team can use.
              </p>
              <Link
                to="/contact"
                className="link-underline mt-9 inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors duration-300 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Suggest a topic <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        )}
      </Section>

      {/* Editorial standard */}
      <Section divider="bottom" index="01" label="Editorial standard">
        <div className="grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
          <SectionHeading eyebrow="How we write" size="md" title="No thought leadership without experience behind it." />
          <div className="grid gap-10 sm:grid-cols-3">
            {[
              { label: "Specific", text: "Real technical context, not recycled trend summaries." },
              { label: "Useful", text: "Something a team can apply to their own system." },
              { label: "Honest", text: "Limits stated as clearly as the conclusions." },
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
          <h2 className="display-md max-w-xl text-ink">Want these notes when they are published?</h2>
          <Link
            to="/contact"
            className="group inline-flex w-fit min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground transition duration-300 hover:brightness-[1.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Keep in touch <ArrowUpRight size={16} className="arrow-shift" aria-hidden="true" />
          </Link>
        </div>
      </Section>
    </>
  );
}
