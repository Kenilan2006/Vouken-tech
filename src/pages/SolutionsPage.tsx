import { ArrowRight, ArrowUpRight, Boxes, PackageOpen, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import PageMeta from "../components/PageMeta";
import Reveal from "../components/Reveal";
import Section from "../components/Section";
import SectionHeading from "../components/SectionHeading";
import { usePublicContent } from "../hooks/usePublicContent";

const productFilter = [
  { label: "Useful", text: "It must help someone make a better technical decision." },
  { label: "Understandable", text: "Its behaviour should be legible without a manual." },
  { label: "Built to last", text: "It should still make sense after the next round of change." },
];

export default function SolutionsPage() {
  const { items, loading, error, retry } = usePublicContent("Products");

  return (
    <>
      <PageMeta
        title="Products & Solutions"
        description="Vouken Technology is developing focused digital products and solution frameworks for future release."
      />

      {/* Hero */}
      <Section divider="bottom">
        <p className="label-mono text-primary">Products &amp; solutions</p>
        <h1 className="mt-8 max-w-4xl display-xl text-ink">
          Reusable thinking for complex <span className="text-primary">digital terrain.</span>
        </h1>
        <p className="lede mt-10 max-w-2xl text-muted-foreground">
          Vouken is exploring focused products and solution frameworks that make difficult digital work easier to
          understand, build, and evolve.
        </p>
      </Section>
      {/* Product directions */}
      <Section tone="raised" divider="bottom">
        {error ? (
          <div className="mb-10 flex flex-col gap-5 border border-hairline bg-background p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-bold text-ink">Product entries could not be loaded.</p>
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
                    <PackageOpen className="size-6 text-primary" aria-hidden="true" />
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
          <div className="grid gap-14 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
            <div className="grid size-14 place-items-center rounded-full border border-hairline text-primary">
              <Boxes size={24} aria-hidden="true" />
            </div>
            <div>
              <SectionHeading eyebrow="In formation" title="No product claims before there is a product.">
                <p>
                  Good technology products earn their place through clarity and utility. Solution directions will be
                  published only when they are ready to help a real team move forward.
                </p>
              </SectionHeading>
              <Link
                to="/contact"
                className="link-underline mt-8 inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors duration-300 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Share a product challenge <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        )}
      </Section>

      {/* Filter */}
      <Section divider="bottom" index="01" label="Our filter">
        <div className="grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
          <SectionHeading
            eyebrow="What earns a release"
            title={
              <>
                Useful, understandable, and built to <span className="text-primary">last.</span>
              </>
            }
          />
          <div className="grid gap-10 sm:grid-cols-3">
            {productFilter.map((item, position) => (
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
      <Section tone="raised">
        <div className="panel grain relative overflow-hidden p-8 sm:p-12 lg:p-16">
          <div className="glow-field pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="relative max-w-2xl">
            <h2 className="display-md text-ink">Automation, AI, or a product idea of your own?</h2>
            <p className="lede mt-5 text-muted-foreground">
              Tell us what repeats in your operation. Repetition is usually where a product should start.
            </p>
            <Link
              to="/contact"
              className="group mt-9 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground transition duration-300 hover:brightness-[1.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Start a conversation <ArrowUpRight size={16} className="arrow-shift" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
