import { Instagram } from "lucide-react";
import { socialLinks } from "../data/content";

/**
 * Official Vouken channels, rendered from `socialLinks` in `src/data/content.ts`
 * so the footer and the contact page never drift apart. Every channel opens in a
 * new tab with `rel="noopener noreferrer"` and carries a descriptive label — the
 * visible handle is only the account name, which is not enough on its own for
 * screen-reader users.
 */
export default function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={className}>
      {socialLinks.map((social) => (
        <li key={social.id}>
          <a
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Vouken Technology on ${social.label} (${social.handle})`}
            className="inline-flex min-h-9 items-center gap-2 text-sm font-bold text-muted-foreground transition-colors duration-300 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Instagram size={15} aria-hidden="true" className="text-primary" />
            {social.handle}
          </a>
        </li>
      ))}
    </ul>
  );
}
