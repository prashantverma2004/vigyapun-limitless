"use client";

import type { CSSProperties, MouseEvent, ReactNode } from "react";

export const CALENDLY_URL = "https://calendly.com/rahul-naidu-vigyapunlimitless/30min";

const SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";
const STYLE_HREF = "https://assets.calendly.com/assets/external/widget.css";

type CalendlyWindow = Window & {
  Calendly?: { initPopupWidget: (options: { url: string }) => void };
};

let loader: Promise<void> | null = null;

/** Loads Calendly's popup widget script + styles once, on first need. */
function loadCalendly(): Promise<void> {
  if ((window as CalendlyWindow).Calendly) return Promise.resolve();
  if (loader) return loader;

  if (!document.querySelector(`link[href="${STYLE_HREF}"]`)) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = STYLE_HREF;
    document.head.appendChild(link);
  }

  loader = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      loader = null;
      script.remove();
      reject(new Error("Calendly failed to load"));
    };
    document.body.appendChild(script);
  });
  return loader;
}

interface CalendlyButtonProps {
  children: ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
}

/**
 * A booking link that opens the Calendly scheduler in a popup. It is a real
 * link to Calendly, so it still works (in a new tab) if the widget script
 * can't load, and supports open-in-new-tab / middle-click.
 */
export default function CalendlyButton({ children, className, id, style }: CalendlyButtonProps) {
  const handleClick = async (e: MouseEvent<HTMLAnchorElement>) => {
    // Let modified clicks (new tab / window) behave like a normal link.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    try {
      await loadCalendly();
      (window as CalendlyWindow).Calendly!.initPopupWidget({ url: CALENDLY_URL });
    } catch {
      // Popup unavailable: go to Calendly directly (not blocked like window.open after await).
      window.location.assign(CALENDLY_URL);
    }
  };

  return (
    <a
      href={CALENDLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      id={id}
      style={style}
      onClick={handleClick}
      // Warm up the script so the popup opens instantly on click/tap.
      onPointerEnter={() => loadCalendly().catch(() => {})}
      onTouchStart={() => loadCalendly().catch(() => {})}
    >
      {children}
    </a>
  );
}
