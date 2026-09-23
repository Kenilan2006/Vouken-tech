import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import PageMeta from "../components/PageMeta";
import Section from "../components/Section";

export default function NotFoundPage() {
  return (
    <Section divider="bottom">
      <PageMeta title="Page not found" description="The requested Vouken Technology page could not be found." />
      <div className="max-w-2xl">
        <p className="label-mono text-primary">404 · Not found here</p>
        <h1 className="mt-8 display-xl text-ink">This page isn&rsquo;t where you expected it to be.</h1>
        <p className="lede mt-8 max-w-xl text-muted-foreground">
          The page you are looking for may have moved, or it may not exist yet.
        </p>
        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/"
            className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground transition duration-300 hover:brightness-[1.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ArrowLeft size={16} className="arrow-shift" aria-hidden="true" /> Return home
          </Link>
          <Link
            to="/services"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-border-strong px-7 py-3.5 text-sm font-bold text-ink transition duration-300 hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Browse services
          </Link>
        </div>
        <div className="mt-14 flex items-center gap-4 border-t border-hairline pt-8">
          <span className="label-mono-tight text-subtle-foreground">Nagercoil · Tamil Nadu · Launching October 2026</span>
        </div>
      </div>
    </Section>
  );
}
