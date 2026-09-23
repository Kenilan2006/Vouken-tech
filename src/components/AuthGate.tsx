import { LockKeyhole, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import Section from "./Section";

export default function AuthGate({ title, children }: { title: string; children: string }) {
  return (
    <Section divider="bottom">
      <div className="mx-auto max-w-xl text-center">
        <div className="mx-auto grid size-14 place-items-center rounded-full border border-hairline text-primary">
          <LockKeyhole size={22} aria-hidden="true" />
        </div>
        <h1 className="mt-8 display-md text-ink">{title}</h1>
        <p className="mt-5 text-sm leading-7 text-muted-foreground">{children}</p>
        <Link
          to="/login"
          className="group mt-9 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground transition duration-300 hover:brightness-[1.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <LogIn size={16} aria-hidden="true" /> Sign in securely
        </Link>
      </div>
    </Section>
  );
}

