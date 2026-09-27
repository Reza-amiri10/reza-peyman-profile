"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { navLinks, profile, sectionIdOf } from "@/lib/data";

function useClock(timeZone: string) {
  const [now, setNow] = React.useState<string | null>(null);
  React.useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [timeZone]);
  return now;
}

function tzOffsetLabel(timeZone: string) {
  try {
    const part = new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "shortOffset" })
      .formatToParts(new Date())
      .find((p) => p.type === "timeZoneName");
    return part?.value ?? "";
  } catch {
    return "";
  }
}

/** Fixed bottom bar: live local time, current section, scroll depth. */
export function StatusBar() {
  const pathname = usePathname();
  const time = useClock(profile.timeZone);
  const [scroll, setScroll] = React.useState(0);
  const [section, setSection] = React.useState("TOP");
  const [offset, setOffset] = React.useState("");

  React.useEffect(() => setOffset(tzOffsetLabel(profile.timeZone)), []);

  React.useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScroll(max > 0 ? Math.round((window.scrollY / max) * 100) : 0);

      if (pathname !== "/") {
        setSection(pathname.startsWith("/articles") ? "SYS/06 WRITING" : "—");
        return;
      }
      let current = "SYS/00 INDEX";
      for (const l of navLinks) {
        const id = sectionIdOf(l.href);
        const el = id ? document.getElementById(id) : null;
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.45) {
          current = `SYS/${l.code} ${l.label.toUpperCase()}`;
        }
      }
      setSection(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  return (
    <div
      aria-hidden
      className="glass fixed inset-x-0 bottom-0 z-40 hidden h-8 items-center border-x-0 border-b-0 font-mono text-[10.5px] uppercase tracking-[0.12em] text-subtle md:flex"
    >
      <div className="flex h-full items-center gap-2 border-r border-line px-4 text-fg">
        <span className="h-1.5 w-1.5 rounded-full bg-accent-teal" />
        Online
      </div>
      <div className="flex h-full items-center border-r border-line px-4">
        Loc <span className="ml-2 text-fg">{profile.basedIn}</span>
      </div>
      <div className="flex h-full items-center border-r border-line px-4">
        Local <span className="ml-2 tabular-nums text-fg">{time ?? "--:--:--"}</span>
        <span className="ml-2">{offset}</span>
      </div>
      <div className="hidden h-full items-center border-r border-line px-4 lg:flex">
        Now <span className="ml-2 normal-case tracking-normal text-fg">building full-stack &amp; AI products</span>
      </div>
      <div className="ml-auto flex h-full items-center border-l border-line px-4 text-fg">{section}</div>
      <div className="flex h-full w-[120px] items-center gap-2 border-l border-line px-4">
        <span className="relative h-[3px] flex-1 bg-line">
          <span className="absolute inset-y-0 left-0 bg-accent" style={{ width: `${scroll}%` }} />
        </span>
        <span className="w-8 text-right tabular-nums text-fg">{String(scroll).padStart(3, "0")}</span>
      </div>
    </div>
  );
}
