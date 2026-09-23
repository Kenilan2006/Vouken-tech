import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import PageMeta from "../components/PageMeta";
import Reveal from "../components/Reveal";
import RevealLine from "../components/RevealLine";
import RouteArtwork from "../components/RouteArtwork";
import Section from "../components/Section";
import ShutterModal from "../components/ShutterModal";
import { getErrorMessage } from "../lib/utils";
import { useToast } from "../components/ToastProvider";

type FormState = { name: string; email: string; subject: string; message: string };
type FormErrors = Partial<Record<keyof FormState, string>>;
const initialForm: FormState = { name: "", email: "", subject: "", message: "" };

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};
  if (values.name.trim().length < 1) errors.name = "Please enter your name.";
  else if (values.name.trim().length > 200) errors.name = "Name must be 200 characters or fewer.";
  if (!/^\S+@\S+\.\S+$/.test(values.email)) errors.email = "Enter a valid email address.";
  if (values.subject.length > 500) errors.subject = "Subject must be 500 characters or fewer.";
  if (values.message.trim().length < 1) errors.message = "Tell us a little about the work ahead.";
  else if (values.message.length > 5000) errors.message = "Message must be 5,000 characters or fewer.";
  return errors;
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [shutterOpen, setShutterOpen] = useState(true);
  const { notify } = useToast();
  const update = (key: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    setSent(false);
  };
  const onBlur = (key: keyof FormState) => setErrors((current) => ({ ...current, [key]: validate(form)[key] }));

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validate(form);
    setErrors(validation);
    const firstInvalid = Object.keys(validation)[0] as keyof FormState | undefined;
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }
    setSubmitting(true);
    try {
      if (!window.genmb?.contactForm)
        throw new Error("The contact service is not available right now. Please try again shortly.");
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim() || undefined,
        message: form.message.trim(),
      };
      await window.genmb.contactForm.submit(payload);
      let archiveWarning = "";
      if (window.genmb.fn) {
        try {
          await window.genmb.fn.invoke("enquiryIntake", payload);
        } catch (archiveError) {
          archiveWarning = getErrorMessage(archiveError);
        }
      }
      setForm(initialForm);
      setErrors({});
      setSent(true);
      notify(
        archiveWarning
          ? {
              variant: "info",
              title: "Message sent",
              description: `Your enquiry was emailed successfully, but the admin archive could not be updated: ${archiveWarning}`,
            }
          : {
              variant: "success",
              title: "Message sent",
              description:
                "Thanks for reaching out. Vouken will receive your enquiry and it has been added to the admin queue.",
            },
      );
    } catch (error) {
      notify({ variant: "error", title: "Message not sent", description: getErrorMessage(error) });
    } finally {
      setSubmitting(false);
    }
  };

  const fieldClass = (key: keyof FormState) =>
    `mt-3 w-full rounded-md border bg-background px-4 py-3 text-sm text-ink outline-none transition-colors duration-300 placeholder:text-subtle-foreground focus-visible:border-primary/60 focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${
      errors[key] ? "border-destructive" : "border-input"
    }`;

  return (
    <>
      <PageMeta
        title="Contact — Vouken Technology"
        description="Start a considered conversation with Vouken Technology about AI workflows, digital products, automation, and the engineering challenges shaping your business."
      />
      <ShutterModal open={shutterOpen} onClose={() => setShutterOpen(false)} />

      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-hairline">
        <RouteArtwork compact />
        <div className="relative mx-auto max-w-7xl px-5 section-y sm:px-8">
          <p className="label-mono text-primary">Contact · Vouken Technology</p>
          <h1 className="mt-8 max-w-5xl display-xl text-ink">
            Let&rsquo;s build <span className="heading-accent text-primary">something.</span>
          </h1>
          <p className="lede mt-10 max-w-2xl text-muted-foreground">
            Have an idea, a problem worth solving, or a system that needs to evolve? Tell us what you&rsquo;re working
            on.
          </p>
        </div>
      </section>
      {/* Enquiry */}
      <Section tone="raised">
        <div className="grid gap-16 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="label-mono text-primary">Nagercoil, Tamil Nadu</p>
            <h2 className="mt-6 display-md text-ink">A considered first conversation.</h2>
            <p className="mt-6 text-sm leading-7 text-muted-foreground">
              Share as much context as is useful. We will use it to understand the question and decide on the most
              practical next step.
            </p>
            <p className="mt-8 flex gap-3 text-sm leading-6 text-muted-foreground">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              <span>
                Vouken Technology
                <br />
                Nagercoil, Tamil Nadu, India
              </span>
            </p>
            <div className="mt-10 border-t border-hairline pt-6">
              <p className="label-mono-tight text-subtle-foreground">What happens next</p>
              <ol className="mt-5 space-y-4">
                {[
                  "We read your note and check the fit.",
                  "You receive a practical next step, or an honest no.",
                  "If it fits, we scope the smallest useful route.",
                ].map((step, position) => (
                  <li key={step} className="flex gap-4 text-sm leading-6 text-muted-foreground">
                    <span className="label-mono-tight text-primary tabular-nums">
                      {String(position + 1).padStart(2, "0")}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
            <div className="mt-10 border-t border-hairline pt-6">
              <p className="label-mono-tight text-subtle-foreground">How your message is handled</p>
              <p className="mt-4 flex gap-3 text-sm leading-6 text-muted-foreground">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                <span>
                  Your enquiry is sent to the team and archived to the internal review queue&mdash;nothing is lost
                  between channels.
                </span>
              </p>
            </div>
          </aside>

          <Reveal delay={60}>
            <form noValidate onSubmit={submit} className="panel grain relative overflow-hidden p-6 sm:p-9 lg:p-12">
              <div className="glow-field pointer-events-none absolute inset-0" aria-hidden="true" />
              <div className="relative">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="text-sm font-bold text-ink">
                    Name
                  </label>
                  <input
                    id="name"
                    value={form.name}
                    onChange={(event) => update("name", event.target.value)}
                    onBlur={() => onBlur("name")}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={fieldClass("name")}
                    placeholder="Your name"
                    disabled={submitting}
                  />
                  {errors.name ? (
                    <p id="name-error" className="mt-2 text-sm text-destructive">
                      {errors.name}
                    </p>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-bold text-ink">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(event) => update("email", event.target.value)}
                    onBlur={() => onBlur("email")}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={fieldClass("email")}
                    placeholder="you@company.com"
                    disabled={submitting}
                  />
                  {errors.email ? (
                    <p id="email-error" className="mt-2 text-sm text-destructive">
                      {errors.email}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="mt-6">
                <label htmlFor="subject" className="text-sm font-bold text-ink">
                  Subject <span className="font-normal text-subtle-foreground">(optional)</span>
                </label>
                <input
                  id="subject"
                  value={form.subject}
                  onChange={(event) => update("subject", event.target.value)}
                  onBlur={() => onBlur("subject")}
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={errors.subject ? "subject-error" : undefined}
                  className={fieldClass("subject")}
                  placeholder="What would you like to discuss?"
                  disabled={submitting}
                />
                {errors.subject ? (
                  <p id="subject-error" className="mt-2 text-sm text-destructive">
                    {errors.subject}
                  </p>
                ) : null}
              </div>

              <div className="mt-6">
                <label htmlFor="message" className="text-sm font-bold text-ink">
                  Your message
                </label>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={(event) => update("message", event.target.value)}
                  onBlur={() => onBlur("message")}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={`${fieldClass("message")} min-h-40 resize-y`}
                  placeholder="Tell us about the work, question, or opportunity."
                  disabled={submitting}
                />
                {errors.message ? (
                  <p id="message-error" className="mt-2 text-sm text-destructive">
                    {errors.message}
                  </p>
                ) : null}
              </div>

              </div>

              <div className="relative mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button type="submit" loading={submitting}>
                  Start the conversation <ArrowRight size={16} aria-hidden="true" />
                </Button>
                {sent ? (
                  <p className="flex items-center gap-2 text-sm font-semibold text-primary" aria-live="polite">
                    <CheckCircle2 size={17} aria-hidden="true" /> Enquiry received.
                  </p>
                ) : null}
              </div>
            </form>
          </Reveal>
        </div>
      </Section>
      {/* Closing statement */}
      <Section>
        <Reveal variant="left">
          <p className="display-lg max-w-4xl text-ink">
            Good technology starts with a <span className="text-primary">good conversation.</span>
          </p>
        </Reveal>
        <Reveal delay={90}>
          <RevealLine className="mt-12 h-px bg-border-strong" />
          <div className="flex flex-col gap-6 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              <Link
                to="/services"
                className="link-underline inline-flex items-center gap-2 text-sm font-bold text-ink transition-colors duration-300 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Explore services <ArrowRight size={15} aria-hidden="true" />
              </Link>
              <Link
                to="/projects"
                className="link-underline inline-flex items-center gap-2 text-sm font-bold text-ink transition-colors duration-300 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                See selected work <ArrowRight size={15} aria-hidden="true" />
              </Link>
              <Link
                to="/about"
                className="link-underline inline-flex items-center gap-2 text-sm font-bold text-ink transition-colors duration-300 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Learn how we work <ArrowRight size={15} className="arrow-shift" aria-hidden="true" />
              </Link>
            </div>
            <p className="label-mono text-subtle-foreground">
              Enquiries are stored securely and reviewed by the Vouken team
            </p>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
