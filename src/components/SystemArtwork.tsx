/**
 * System-field artwork for hero/section backgrounds.
 * Quiet digital-system layer: grid veil + signal traces + nodes.
 * No route/map/waypoint/beacon language in class names or copy.
 */
export default function SystemArtwork({ compact = false }: { compact?: boolean }) {
  return (
    <div className="glow-field grain pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="system-grid absolute inset-0" />
      <svg className="absolute inset-0 size-full" viewBox="0 0 1200 680" fill="none" preserveAspectRatio="none">
        <g className="system-traces" opacity=".5">
          <path d="M-40 520 C 160 460, 260 560, 430 430 S 640 170, 850 260 S 1040 180, 1240 120" stroke="var(--hairline)" strokeWidth="1" />
          <path d="M-40 470 C 180 410, 280 510, 460 390 S 660 140, 870 230 S 1050 160, 1240 90" stroke="var(--hairline)" strokeWidth="1" />
          <path d="M-30 430 C 190 380, 300 470, 480 350 S 680 120, 890 200 S 1070 140, 1240 70" stroke="var(--hairline)" strokeWidth="1" />
          <path d="M-30 470 C 185 390, 260 560, 445 405 S 620 140, 855 235 S 1020 170, 1230 95" stroke="var(--primary)" strokeWidth="1.1" opacity=".45" strokeLinecap="round" />
        </g>
        <g fill="var(--primary)" opacity=".85">
          <circle cx="445" cy="405" r="1.6" />
          <circle cx="855" cy="235" r="1.6" />
        </g>
        {!compact && (
          <g stroke="var(--border-strong)" opacity=".45">
            <rect x="990" y="134" width="52" height="52" strokeWidth="1" />
            <rect x="998" y="142" width="36" height="36" strokeWidth="1" opacity=".6" />
          </g>
        )}
      </svg>
    </div>
  );
}
