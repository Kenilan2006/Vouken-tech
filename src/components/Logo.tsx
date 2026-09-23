import { Link } from 'react-router-dom'

export default function Logo() {
  return (
    <Link
      to="/"
      className="group inline-flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label="Vouken Technology home"
    >
      <span className="grid size-9 place-items-center overflow-hidden rounded-md border border-border-strong bg-[#aaa39b] transition-colors duration-300 group-hover:border-primary/60">
        <svg viewBox="0 0 100 100" aria-hidden="true" className="size-full">
          <defs>
            <filter id="logo-shadow" x="-30%" y="-30%" width="160%" height="170%">
              <feDropShadow dx="-3" dy="5" stdDeviation="3.5" floodColor="#28231f" floodOpacity="0.55" />
            </filter>
          </defs>
          <g filter="url(#logo-shadow)">
            <path d="M21 24h16l21 53H42L21 24Z" fill="#f5f5f3" />
            <path d="M79 24H63L42 77h16l21-53Z" fill="#26364d" />
            <path d="M51 57l7 20H42l-5-13 7 13 7-20Z" fill="#e2e5e6" />
          </g>
        </svg>
      </span>
      <span className="flex flex-col justify-center leading-none">
        <span className="text-[1.02rem] font-extrabold lowercase tracking-[-0.03em] text-ink">vouken</span>
        <span className="label-mono-tight mt-0.5 text-[0.58rem] text-subtle-foreground">technology</span>
      </span>
    </Link>
  )
}
