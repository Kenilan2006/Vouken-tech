import { useEffect, useState } from "react";
import { ArrowRight, KeyRound, Mail, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageMeta from "../components/PageMeta";
import Button from "../components/Button";
import { getErrorMessage } from "../lib/utils";
import { useToast } from "../components/ToastProvider";

export default function LoginPage() {
  const navigate = useNavigate();
  const { notify } = useToast();
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<"google" | "magic" | "password" | null>(null);
  const [magicSent, setMagicSent] = useState(false);
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    const boot = async () => {
      try {
        if (!window.genmb?.auth) throw new Error("Secure sign-in is not available right now.");
        await window.genmb.auth.ready();
        if (window.genmb.auth.getUser()) navigate("/admin", { replace: true });
      } catch (error) {
        notify({ variant: "error", title: "Sign-in unavailable", description: getErrorMessage(error) });
      } finally {
        setReady(true);
      }
    };
    void boot();
  }, [navigate, notify]);

  const validEmail = () => {
    const valid = /^\S+@\S+\.\S+$/.test(email);
    setEmailError(valid ? "" : "Enter a valid email address.");
    return valid;
  };
  const handleGoogle = async () => {
    setLoading("google");
    try {
      const user = await window.genmb.auth.signIn();
      if (user) navigate("/admin");
    } catch (error) {
      notify({ variant: "error", title: "Sign-in failed", description: getErrorMessage(error) });
    } finally {
      setLoading(null);
    }
  };
  const handleMagic = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validEmail()) return;
    setLoading("magic");
    try {
      await window.genmb.auth.sendMagicLink(email);
      setMagicSent(true);
      notify({
        variant: "info",
        title: "Check your email",
        description: "A secure sign-in link has been sent if that address can receive it.",
      });
    } catch (error) {
      notify({ variant: "error", title: "Could not send link", description: getErrorMessage(error) });
    } finally {
      setLoading(null);
    }
  };
  const handlePassword = async (event: React.FormEvent) => {
    event.preventDefault();
    const emailValid = validEmail();
    if (!emailValid || password.length < 1) {
      if (emailValid) document.getElementById("login-password")?.focus();
      return;
    }
    setLoading("password");
    try {
      const user = await window.genmb.auth.signInWithPassword(email, password);
      if (user) navigate("/admin");
    } catch (error) {
      notify({ variant: "error", title: "Sign-in failed", description: getErrorMessage(error) });
    } finally {
      setLoading(null);
    }
  };

  return (
    <>
      <PageMeta title="Secure sign in" description="Secure administrative sign-in for Vouken Technology." />
      <section className="mx-auto max-w-7xl px-5 sm:px-8 section-y">
        <div className="panel mx-auto max-w-md p-6 sm:p-8">
          <div className="grid size-12 place-items-center rounded-full border border-hairline text-primary">
            <ShieldCheck size={22} aria-hidden="true" />
          </div>
          <h1 className="mt-6 display-md text-ink">Secure team access</h1>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Sign in to access Vouken's protected administration workspace.
          </p>
          {!ready ? (
            <div className="mt-8 h-12 animate-pulse rounded-lg bg-muted" aria-hidden="true" />
          ) : (
            <>
              <Button
                type="button"
                onClick={handleGoogle}
                loading={loading === "google"}
                disabled={loading !== null}
                className="mt-8 w-full"
              >
                Continue with Google <ArrowRight size={16} aria-hidden="true" />
              </Button>
              <div className="my-8 flex items-center gap-3 label-mono-tight text-subtle-foreground">
                <span className="h-px flex-1 bg-hairline" />
                or use email
                <span className="h-px flex-1 bg-hairline" />
              </div>
              <form noValidate onSubmit={handlePassword}>
                <label htmlFor="login-email" className="text-sm font-bold">
                  Email address
                </label>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setMagicSent(false);
                  }}
                  onBlur={validEmail}
                  aria-invalid={Boolean(emailError)}
                  aria-describedby={emailError ? "login-email-error" : undefined}
                  className="mt-3 w-full rounded-md border border-input bg-background px-4 py-3 text-sm text-ink outline-none transition-colors duration-300 placeholder:text-subtle-foreground focus-visible:border-primary/60 focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="you@company.com"
                  disabled={loading !== null}
                />
                {emailError ? (
                  <p id="login-email-error" className="mt-2 text-sm text-destructive">
                    {emailError}
                  </p>
                ) : null}
                <label htmlFor="login-password" className="mt-5 block text-sm font-bold">
                  Password
                </label>
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="mt-3 w-full rounded-md border border-input bg-background px-4 py-3 text-sm text-ink outline-none transition-colors duration-300 placeholder:text-subtle-foreground focus-visible:border-primary/60 focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="Your password"
                  disabled={loading !== null}
                />
                <Button type="submit" loading={loading === "password"} className="mt-5 w-full">
                  <KeyRound size={16} aria-hidden="true" /> Sign in with password
                </Button>
              </form>
              <form noValidate onSubmit={handleMagic} className="mt-3">
                <Button
                  type="submit"
                  variant="ghost"
                  loading={loading === "magic"}
                  disabled={loading !== null || !email}
                  className="w-full"
                >
                  <Mail size={16} aria-hidden="true" /> Email me a magic link
                </Button>
              </form>
              {magicSent ? (
                <p
                  className="mt-5 rounded-md border border-hairline bg-muted p-4 text-sm leading-6 text-muted-foreground"
                  aria-live="polite"
                >
                  Check your email for a secure sign-in link. For privacy, this message is the same whether or not an
                  account exists.
                </p>
              ) : null}
            </>
          )}
        </div>
      </section>
    </>
  );
}
