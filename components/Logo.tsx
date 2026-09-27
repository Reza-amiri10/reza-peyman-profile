import Link from "next/link";

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} aria-label="Reza Peyman Amiri — home" className="group flex items-center gap-3">
      <span className="relative flex h-7 w-7 items-center justify-center border border-fg font-mono text-[10px] font-semibold tracking-tight transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-white">
        RA
        <span className="absolute -right-[3px] -top-[3px] h-1.5 w-1.5 bg-accent transition-colors group-hover:bg-fg" />
      </span>
      <span className="hidden whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.14em] sm:inline lg:hidden xl:inline">
        Reza Peyman Amiri
      </span>
    </Link>
  );
}
