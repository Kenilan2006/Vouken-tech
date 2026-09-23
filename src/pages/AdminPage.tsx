import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import {
  ChevronRight,
  FilePlus2,
  LayoutDashboard,
  Loader2,
  LogOut,
  Pencil,
  RefreshCw,
  ShieldAlert,
  Trash2,
} from "lucide-react";
import PageMeta from "../components/PageMeta";
import AuthGate from "../components/AuthGate";
import Button from "../components/Button";
import Dialog from "../components/Dialog";
import { adminCollections, type AdminCollection } from "../data/content";
import { getErrorMessage } from "../lib/utils";
import { useToast } from "../components/ToastProvider";

type AdminItem = { id: string; slug?: string; title: string; summary?: string; updatedAt?: string };
type Role = "owner" | "admin" | "denied";

const emailPattern = /^\S+@\S+\.\S+$/;

function formatDate(value?: string) {
  if (!value) return "—";
  const timestamp = Date.parse(value);
  if (Number.isNaN(timestamp)) return "—";
  return new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(timestamp);
}

function collectionHelp(collection: AdminCollection) {
  if (collection === "Administrators")
    return "Add the email address of an existing team account. App owners always keep access; listed administrators can manage content but not administrator access.";
  if (collection === "Enquiries")
    return "Enquiries are normally created from the public contact form. You can edit notes or remove resolved records here.";
  if (collection === "Media")
    return "Track approved media references and usage notes. File uploads can be connected when the file storage capability is enabled.";
  if (collection === "Website Settings")
    return "Keep launch copy, notices, and operational website notes aligned for the team.";
  return "Create and maintain public-facing content. Published entries appear on the corresponding website pages.";
}

export default function AdminPage() {
  const { notify } = useToast();
  const titleInputRef = useRef<HTMLInputElement>(null);
  const [authReady, setAuthReady] = useState(false);
  const [roleResolving, setRoleResolving] = useState(false);
  const [user, setUser] = useState<GenMBUser | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [activeCollection, setActiveCollection] = useState<AdminCollection>("Services");
  const [items, setItems] = useState<AdminItem[]>([]);
  const [loadingItems, setLoadingItems] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [editorOpen, setEditorOpen] = useState(false);
  const [editing, setEditing] = useState<AdminItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminItem | null>(null);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [titleError, setTitleError] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const invoke = useCallback(async (name: string, payload?: unknown) => {
    if (!window.genmb?.fn) throw new Error("The secure administration service is not available in this environment.");
    return window.genmb.fn.invoke(name, payload);
  }, []);

  const availableCollections = useMemo(
    () =>
      role === "owner"
        ? [...adminCollections]
        : adminCollections.filter((collection) => collection !== "Administrators"),
    [role],
  );
  const titleLabel = activeCollection === "Administrators" ? "Administrator email" : "Title";
  const summaryLabel =
    activeCollection === "Administrators"
      ? "Access note"
      : activeCollection === "Enquiries"
        ? "Message and notes"
        : "Summary";

  const validateTitle = useCallback(() => {
    const trimmed = title.trim();
    if (!trimmed)
      return activeCollection === "Administrators" ? "Enter an administrator email address." : "Enter a title.";
    if (activeCollection === "Administrators" && !emailPattern.test(trimmed))
      return "Enter a valid administrator email address.";
    return "";
  }, [activeCollection, title]);

  const loadItems = useCallback(
    async (collection: AdminCollection) => {
      setLoadingItems(true);
      setLoadError("");
      try {
        const result = await invoke("adminContent", { action: "list", collection });
        const data = result as { items?: AdminItem[] };
        setItems(Array.isArray(data.items) ? data.items : []);
      } catch (error) {
        setLoadError(getErrorMessage(error));
        setItems([]);
      } finally {
        setLoadingItems(false);
      }
    },
    [invoke],
  );

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    const boot = async () => {
      try {
        if (!window.genmb?.auth) throw new Error("Secure authentication is not available.");
        await window.genmb.auth.ready();
        setUser(window.genmb.auth.getUser());
        unsubscribe = window.genmb.auth.onAuthStateChange((nextUser) => {
          setUser(nextUser);
          setRole(null);
        });
      } catch (error) {
        notify({ variant: "error", title: "Secure access unavailable", description: getErrorMessage(error) });
      } finally {
        setAuthReady(true);
      }
    };
    void boot();
    return () => unsubscribe?.();
  }, [notify]);

  useEffect(() => {
    if (!authReady) return;
    if (!user) {
      setRole(null);
      setRoleResolving(false);
      return;
    }
    let active = true;
    const resolve = async () => {
      setRoleResolving(true);
      try {
        const response = (await invoke("resolveRole")) as { role?: Role };
        if (active) setRole(response.role === "owner" || response.role === "admin" ? response.role : "denied");
      } catch {
        if (active) setRole("denied");
      } finally {
        if (active) setRoleResolving(false);
      }
    };
    void resolve();
    return () => {
      active = false;
    };
  }, [authReady, invoke, user]);

  useEffect(() => {
    if (role === "admin" && activeCollection === "Administrators") setActiveCollection("Services");
  }, [activeCollection, role]);

  useEffect(() => {
    if (role === "owner" || role === "admin") void loadItems(activeCollection);
  }, [activeCollection, loadItems, role]);

  const selectCollection = (collection: AdminCollection) => {
    setActiveCollection(collection);
    setEditorOpen(false);
    setDeleteTarget(null);
    setTitleError("");
  };
  const openCreate = () => {
    setEditing(null);
    setTitle("");
    setSummary("");
    setTitleError("");
    setEditorOpen(true);
  };
  const openEdit = (item: AdminItem) => {
    setEditing(item);
    setTitle(item.title);
    setSummary(item.summary ?? "");
    setTitleError("");
    setEditorOpen(true);
  };
  const closeEditor = () => {
    if (!saving) setEditorOpen(false);
  };
  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validateTitle();
    setTitleError(validation);
    if (validation) {
      titleInputRef.current?.focus();
      return;
    }
    setSaving(true);
    try {
      await invoke("adminContent", {
        action: editing ? "update" : "create",
        collection: activeCollection,
        item: { id: editing?.id, title: title.trim(), summary: summary.trim() },
      });
      await loadItems(activeCollection);
      setEditorOpen(false);
      notify({
        variant: "success",
        title: editing ? "Entry updated" : "Entry created",
        description: `${activeCollection} content has been securely saved.`,
      });
    } catch (error) {
      notify({ variant: "error", title: "Could not save entry", description: getErrorMessage(error) });
    } finally {
      setSaving(false);
    }
  };
  const remove = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await invoke("adminContent", { action: "delete", collection: activeCollection, item: { id: deleteTarget.id } });
      await loadItems(activeCollection);
      setDeleteTarget(null);
      notify({
        variant: "success",
        title: "Entry deleted",
        description: "The selected entry was permanently removed.",
      });
    } catch (error) {
      notify({ variant: "error", title: "Could not delete entry", description: getErrorMessage(error) });
    } finally {
      setDeleting(false);
    }
  };
  const signOut = async () => {
    try {
      await window.genmb.auth.signOut();
      setUser(null);
      setRole(null);
      notify({ variant: "success", title: "Signed out" });
    } catch (error) {
      notify({ variant: "error", title: "Could not sign out", description: getErrorMessage(error) });
    }
  };

  if (!authReady || roleResolving)
    return (
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <PageMeta title="Administration" description="Secure Vouken Technology administration." />
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin text-primary" aria-hidden="true" /> Resolving secure access
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-[240px_1fr]">
          <div className="h-96 animate-pulse rounded-lg bg-muted" />
          <div className="h-96 animate-pulse rounded-lg bg-muted" />
        </div>
      </section>
    );
  if (!user)
    return (
      <>
        <PageMeta title="Administration" description="Secure Vouken Technology administration." />
        <AuthGate title="Administrative workspace">
          Sign in with an authorised team account to access Vouken's content and website management area.
        </AuthGate>
      </>
    );
  if (role !== "owner" && role !== "admin")
    return (
      <>
        <PageMeta
          title="Administration access denied"
          description="Vouken Technology administrative access is restricted."
        />
        <section className="mx-auto max-w-xl px-5 py-24 sm:px-8">
          <div className="panel p-8 text-center">
            <div className="mx-auto grid size-12 place-items-center rounded-full border border-hairline text-destructive">
              <ShieldAlert size={22} aria-hidden="true" />
            </div>
            <h1 className="mt-5 display-md text-ink">Access denied</h1>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              {user.email} is signed in, but this account does not have administrative access to Vouken Technology.
            </p>
            <Button type="button" variant="secondary" onClick={signOut} className="mt-8">
              <LogOut size={16} aria-hidden="true" /> Sign out
            </Button>
          </div>
        </section>
      </>
    );

  return (
    <>
      <PageMeta title="Administration" description="Secure Vouken Technology content administration." />
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-16">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="label-mono text-primary">
              {role === "owner" ? "Owner workspace" : "Administrator workspace"}
            </p>
            <h1 className="mt-3 display-md text-ink">Website administration</h1>
            <p className="mt-2 text-sm text-muted-foreground">Signed in as {user.email}</p>
          </div>
          <Button type="button" variant="secondary" onClick={signOut}>
            <LogOut size={16} aria-hidden="true" /> Sign out
          </Button>
        </div>
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="panel h-fit p-3">
            <div className="flex items-center gap-2 px-3 py-3 text-sm font-bold">
              <LayoutDashboard size={17} className="text-primary" /> Manage content
            </div>
            <nav className="mt-2 space-y-1" aria-label="Administration collections">
              {availableCollections.map((collection) => (
                <button
                  type="button"
                  key={collection}
                  onClick={() => selectCollection(collection)}
                  className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${activeCollection === collection ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground"}`}
                >
                  <span>{collection}</span>
                  <ChevronRight size={15} />
                </button>
              ))}
            </nav>
          </aside>
          <section className="panel min-w-0">
            <div className="flex flex-col gap-4 border-b border-hairline p-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="label-mono text-primary">Collection</p>
                <h2 className="mt-2 display-sm text-ink">{activeCollection}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                  {collectionHelp(activeCollection)}
                </p>
              </div>
              <Button type="button" onClick={openCreate}>
                <FilePlus2 size={16} /> New entry
              </Button>
            </div>
            <div className="p-5">
              {loadingItems ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="h-16 animate-pulse rounded-lg bg-muted" />
                  ))}
                </div>
              ) : loadError ? (
                <div className="rounded-md border border-destructive bg-muted p-6">
                  <p className="font-bold text-destructive">Could not load {activeCollection.toLowerCase()}.</p>
                  <p className="mt-2 text-sm text-muted-foreground">{loadError}</p>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => void loadItems(activeCollection)}
                    className="mt-5"
                  >
                    <RefreshCw size={16} /> Try again
                  </Button>
                </div>
              ) : items.length === 0 ? (
                <div className="py-16 text-center">
                  <div className="mx-auto grid size-12 place-items-center rounded-full bg-muted text-primary">
                    <FilePlus2 size={21} />
                  </div>
                  <h3 className="mt-5 text-lg font-bold">No {activeCollection.toLowerCase()} entries yet.</h3>
                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                    Create the first entry to begin managing this part of the website.
                  </p>
                  <Button type="button" onClick={openCreate} className="mt-6">
                    Create entry
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[680px] text-left text-sm">
                    <thead className="bg-muted text-xs uppercase tracking-[.12em] text-muted-foreground">
                      <tr>
                        <th scope="col" className="px-4 py-3 font-medium">Title</th>
                        <th scope="col" className="px-4 py-3 font-medium">Summary</th>
                        <th scope="col" className="px-4 py-3 font-medium">Updated</th>
                        <th scope="col" className="px-4 py-3 text-right font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                          <td className="px-4 py-3 font-bold">{item.title}</td>
                          <td className="max-w-xs truncate px-4 py-3 text-muted-foreground">{item.summary || "—"}</td>
                          <td className="px-4 py-3 text-muted-foreground">{formatDate(item.updatedAt)}</td>
                          <td className="px-4 py-3">
                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => openEdit(item)}
                                aria-label={`Edit ${item.title}`}
                                className="grid size-9 place-items-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                              >
                                <Pencil size={16} />
                              </button>
                              <button
                                type="button"
                                onClick={() => setDeleteTarget(item)}
                                aria-label={`Delete ${item.title}`}
                                className="grid size-9 place-items-center rounded-md text-muted-foreground hover:bg-accent hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        </div>
      </section>
      <Dialog
        open={editorOpen}
        onClose={closeEditor}
        title={editing ? `Edit ${activeCollection} entry` : `New ${activeCollection} entry`}
      >
        <form noValidate onSubmit={save}>
          <label htmlFor="admin-title" className="text-sm font-bold">
            {titleLabel}
          </label>
          <input
            ref={titleInputRef}
            id="admin-title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              if (titleError) setTitleError("");
            }}
            onBlur={() => setTitleError(validateTitle())}
            aria-invalid={Boolean(titleError)}
            aria-describedby={titleError ? "admin-title-error" : "admin-title-help"}
            className={`mt-3 w-full rounded-md border bg-background px-4 py-3 text-sm text-ink outline-none transition-colors duration-300 placeholder:text-subtle-foreground focus-visible:border-primary/60 focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 ${titleError ? "border-destructive" : "border-input"}`}
            placeholder={activeCollection === "Administrators" ? "admin@example.com" : "Entry title"}
            disabled={saving}
          />
          <p
            id={titleError ? "admin-title-error" : "admin-title-help"}
            className={`mt-2 text-sm ${titleError ? "text-destructive" : "text-muted-foreground"}`}
          >
            {titleError ||
              (activeCollection === "Administrators"
                ? "This email will be authorised by the server-side role resolver."
                : "Use a clear, public-safe title.")}
          </p>
          <label htmlFor="admin-summary" className="mt-5 block text-sm font-bold">
            {summaryLabel} <span className="font-normal text-muted-foreground">(optional)</span>
          </label>
          <textarea
            id="admin-summary"
            value={summary}
            onChange={(event) => setSummary(event.target.value)}
            className="mt-3 min-h-28 w-full resize-y rounded-md border border-input bg-background px-4 py-3 text-sm text-ink outline-none transition-colors duration-300 placeholder:text-subtle-foreground focus-visible:border-primary/60 focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
            placeholder="Short description, internal note, or public summary"
            disabled={saving}
          />
          <div className="mt-6 flex justify-end gap-3">
            <Button type="button" variant="secondary" onClick={closeEditor} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" loading={saving}>
              Save entry
            </Button>
          </div>
        </form>
      </Dialog>
      <Dialog
        open={Boolean(deleteTarget)}
        onClose={() => {
          if (!deleting) setDeleteTarget(null);
        }}
        title="Delete entry?"
      >
        <p className="text-sm leading-7 text-muted-foreground">
          This permanently removes <strong className="text-foreground">{deleteTarget?.title}</strong> from{" "}
          {activeCollection}. This action cannot be undone.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button type="button" variant="secondary" onClick={() => setDeleteTarget(null)} disabled={deleting}>
            Cancel
          </Button>
          <Button type="button" variant="destructive" loading={deleting} onClick={() => void remove()}>
            Delete entry
          </Button>
        </div>
      </Dialog>
    </>
  );
}
