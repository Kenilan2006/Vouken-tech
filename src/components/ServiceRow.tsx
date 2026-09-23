import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { PublicContentItem } from "../data/content";
import { serviceMeta } from "../data/content";

/**
 * Editorial service row for the service list. The whole row is a single link to
 * the service detail route; hover/focus lifts it slightly and reveals the "Overview"
 * label. All states resolve statically under reduced motion (handled in main.css)
 * and the row keeps a visible focus ring.
 */
export default function ServiceRow({
  service,
  position,
}: {
  service: PublicContentItem;
  position: number;
}) {
  const meta = serviceMeta[service.slug];
  const summary = service.summary ?? meta?.note ?? "";

  return (
    <Link
      to={`/services/${service.slug}`}
      className="service-row group relative grid items-start gap-4 border-b border-hairline px-3 py-9 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:py-11 lg:grid-cols-[5rem_1fr_auto] lg:items-center lg:gap-8"
      aria-label={`${service.title} — ${summary}`}
    >
      <span
        className="tabular-nums text-subtle-foreground transition-colors duration-300 group-hover:text-primary"
        aria-hidden="true"
      >
        {service.number ?? String(position + 1).padStart(2, "0")}
      </span>
      <span className="min-w-0">
        <span className="block text-2xl font-extrabold uppercase leading-tight tracking-[-.02em] text-ink transition-colors duration-300 group-hover:text-primary sm:text-3xl lg:text-4xl">
          {service.title}
        </span>
        {summary ? (
          <span className="mt-3 block max-w-2xl text-sm leading-7 text-muted-foreground">
            {summary}
          </span>
        ) : null}
      </span>
      <span className="flex items-center gap-3 text-subtle-foreground transition-colors duration-300 group-hover:text-primary">
        <span className="text-[0.62rem] font-medium uppercase tracking-[0.22em]">
          Overview
        </span>
        <ArrowRight size={13} className="arrow-shift" aria-hidden="true" />
      </span>
    </Link>
  );
}
