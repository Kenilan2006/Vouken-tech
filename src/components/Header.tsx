import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { navigation } from "../data/content";
import { cn } from "../lib/utils";

/**
 * Sticky agency navbar: transparent with a hairline border at rest, settling
 * into a slightly more solid tinted blur once the page scrolls. Below `lg`
 * the primary links collapse into a full-screen menu; Solutions, Innovation,
 * Future Technology and Careers remain reachable via the footer directory.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  /* Solidify once the page scrolls — rAF-throttled, mirroring ScrollProgress. */
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 16);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  /* Route changes always dismiss the mobile menu and return focus to the
     toggle, so keyboard users are never stranded inside a removed dialog. */
  useEffect(() => {
    setMenuOpen((open) => {
      if (open) toggleRef.current?.focus();
      return false;
    });
  }, [location.pathname]);

  /* Scroll lock, Escape close and focus containment while the menu is open.
     On open, focus lands on the first menu item; Escape returns focus to the
     toggle. The toggle stays focusable and participates in the Tab cycle,
     wrapping back into the menu items. */
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    const onViewportChange = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const items = [
        toggleRef.current,
        ...Array.from(menuRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []),
      ].filter((element): element is HTMLElement => Boolean(element));
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      const inside =
        active === toggleRef.current ||
        Boolean(active instanceof Node && menuRef.current?.contains(active));
      if (event.shiftKey && (active === first || !inside)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("resize", onViewportChange);
    document.addEventListener("keydown", onKeyDown);
    menuRef.current?.querySelector<HTMLElement>("a[href], button:not([disabled])")?.focus();
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("resize", onViewportChange);
      document.removeEventListener("keydown", onKeyDown);
      previous?.focus();
    };
  }, [menuOpen]);


  return (
    <>
      <header
        className={cn(
          "site-header sticky inset-x-0 top-0 z-40 border-b",
          scrolled || menuOpen
            ? "border-border-strong bg-background/85 backdrop-blur-md"
            : "border-hairline bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:h-20">
          <Logo />
          <nav aria-label="Primary" className="hidden items-center lg:flex">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="nav-link relative inline-flex min-h-11 items-center rounded-md px-4 text-sm font-semibold tracking-[-0.01em] text-muted-foreground transition-colors duration-300 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-[current=page]:text-primary"
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              to="/contact"
              data-cursor-cta
              data-magnetic
              className="group hidden min-h-11 items-center gap-2 rounded-md border border-primary/50 bg-primary/5 px-5 py-2.5 text-sm font-bold tracking-[-0.01em] text-ink transition duration-300 hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] lg:inline-flex"
            >
              Let&apos;s Talk
              <ArrowUpRight size={15} className="arrow-shift" aria-hidden="true" />
            </Link>
            <button
              type="button"
              ref={toggleRef}
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="grid size-11 place-items-center rounded-md text-ink transition-colors duration-300 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
            >
              {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="mobile-menu fixed inset-0 z-30 bg-background/95 lg:hidden"
        >
          <div className="flex h-full flex-col overflow-y-auto px-5 pb-10 pt-24 sm:px-8">
            <p className="label-mono mb-6 text-primary">
              Site menu
            </p>
            <nav aria-label="Mobile" className="mt-4 flex flex-col">
              {navigation.map((item, index) => (
                <div
                  key={item.to}
                  className="mobile-menu-item border-b border-hairline"
                  style={{ "--item-index": index + 1 } as CSSProperties}
                >
                  <NavLink
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    className="group flex min-h-16 items-center justify-between gap-6 py-5 text-[clamp(1.8rem,6.5vw,2.6rem)] font-extrabold leading-none tracking-[-0.03em] text-ink transition-colors duration-300 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring aria-[current=page]:text-primary"
                  >
                    <span>{item.label}</span>
                    <span
                      className="label-mono-tight text-xs text-subtle-foreground transition-colors duration-300 group-hover:text-primary"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </NavLink>
                </div>
              ))}
            </nav>
            <div
              className="mobile-menu-item mt-auto pt-10"
              style={{ "--item-index": navigation.length + 1 } as CSSProperties}
            >
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="group flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground transition duration-300 hover:brightness-[1.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Let&apos;s Talk
                <ArrowUpRight size={16} className="arrow-shift" aria-hidden="true" />
              </Link>
              <p className="mt-5 text-center text-sm text-muted-foreground">
                Nagercoil, Tamil Nadu · Launching October 2026
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
