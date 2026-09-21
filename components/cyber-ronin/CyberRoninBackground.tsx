"use client";

import { useEffect, useRef } from "react";

/**
 * Cyber Ronin // Neural Edges — animated hero background.
 *
 * Renders two sibling layers that are both children of the hero `<section>`:
 *
 *  - `--base`   (z-0)  the base plate, deliberately dimmed. It sits *under* the
 *                      hero's existing WebGL neural core and gradient overlays,
 *                      so nothing already on the page is covered or removed.
 *  - `--reveal` (z-15) the alternate image, masked to a spotlight that follows
 *                      the cursor (pointer) or finger (touch). It sits above the
 *                      gradient overlays so the reveal actually reads, but still
 *                      below the hero content (z-20).
 *
 * The spotlight is driven by the CSS custom properties `--ronin-x/--ronin-y`
 * written on `<html>`; both layers inherit them, which avoids prop drilling
 * between siblings. No new dependencies.
 */

/** Hero-local spotlight position used before the first pointer/touch event. */
const RESTING_POINT = { x: 0.68, y: 0.32 };

/** Mirror of the default spotlight easing in `cyber-ronin.css`. */
const EASE = 0.16;

/** Emitted by `PortfolioShell` once the loading screen releases the page. */
const READY_EVENT = "portfolio-ready";

/**
 * Ceiling on waiting for the loading screen. If the event never arrives, the
 * entrance animations are released anyway so the hero text can never be
 * stranded in its pre-entrance (opacity: 0) state.
 */
const READY_TIMEOUT_MS = 4000;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export interface CyberRoninBackgroundProps {
  /** Master switch — the hero turns this off in low-bandwidth performance mode. */
  active?: boolean;
  /** Renders the decorative specifications panel (md+ viewports only). */
  showSpecPanel?: boolean;
  /** Extra classes applied to both layer roots. */
  className?: string;
}

function SpecPanel() {
  return (
    <div className="ronin-panel">
      <div className="ronin-panel__thumb" />
      <div>
        <p className="ronin-panel__eyebrow">{'// Neural Edges'}</p>
        <p className="ronin-panel__title">Cyber Ronin</p>
        <dl className="ronin-panel__specs">
          <dt>Mode</dt>
          <dd>Reactive</dd>
          <dt>Asset</dt>
          <dd>Local WebP</dd>
          <dt>Theme</dt>
          <dd>Dusk Ember</dd>
        </dl>
      </div>
    </div>
  );
}

/**
 * Releases the hero entrance sequence (background zoom, spotlight, panel and
 * the staggered heading) once the loading screen has handed the page over.
 * Every entrance animation in `cyber-ronin.css` is gated on this attribute.
 */
function armEntranceGate() {
  const root = document.documentElement;
  let done = false;
  let timer = 0;

  const release = () => {
    if (done) return;
    done = true;
    window.clearTimeout(timer);
    root.dataset.roninReady = "true";
  };

  window.addEventListener(READY_EVENT, release, { once: true });

  // Already released earlier in this page's life (e.g. hero remounted), or the
  // page has been up longer than the loading screen could possibly last: the
  // loading screen only runs once per navigation.
  if (root.dataset.roninReady === "true" || performance.now() > READY_TIMEOUT_MS) {
    release();
  } else {
    timer = window.setTimeout(release, READY_TIMEOUT_MS);
  }

  return () => {
    window.clearTimeout(timer);
    window.removeEventListener(READY_EVENT, release);
  };
}

export default function CyberRoninBackground({
  active = true,
  showSpecPanel = true,
  className = "",
}: CyberRoninBackgroundProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef({ ...RESTING_POINT });
  const currentRef = useRef({ ...RESTING_POINT });
  const frameRef = useRef<number | null>(null);
  const onScreenRef = useRef(true);
  const docVisibleRef = useRef(true);
  /** Reduced motion snaps the spotlight instead of easing it in a rAF loop. */
  const snapRef = useRef(false);

  // Always armed — the hero text animations depend on the same gate, so this
  // must run even when the image layers are switched off.
  useEffect(() => armEntranceGate(), []);

  useEffect(() => {
    if (!active) return;
    const host = hostRef.current;
    if (!host) return;

    const root = document.documentElement;

    const write = (x: number, y: number) => {
      root.style.setProperty("--ronin-x", `${(x * 100).toFixed(2)}%`);
      root.style.setProperty("--ronin-y", `${(y * 100).toFixed(2)}%`);
    };

    function schedule() {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(step);
    }

    function step() {
      frameRef.current = null;
      const target = targetRef.current;
      const current = currentRef.current;
      current.x += (target.x - current.x) * EASE;
      current.y += (target.y - current.y) * EASE;
      write(current.x, current.y);
      if (Math.abs(target.x - current.x) > 0.001 || Math.abs(target.y - current.y) > 0.001) {
        schedule();
      }
    }

    const aim = (clientX: number, clientY: number) => {
      const rect = host.getBoundingClientRect();
      // Zero-size rect means the layer is hidden (high-contrast mode) or not
      // laid out yet — nothing meaningful to reveal.
      if (rect.width === 0 || rect.height === 0) return;

      const point = {
        x: clamp((clientX - rect.left) / rect.width, -0.1, 1.1),
        y: clamp((clientY - rect.top) / rect.height, -0.1, 1.1),
      };
      targetRef.current = point;

      if (snapRef.current) {
        currentRef.current = { ...point };
        write(point.x, point.y);
        return;
      }
      schedule();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!onScreenRef.current || !docVisibleRef.current) return;
      aim(event.clientX, event.clientY);
    };

    const onTouch = (event: TouchEvent) => {
      if (!onScreenRef.current || !docVisibleRef.current) return;
      const touch = event.touches[0];
      if (touch) aim(touch.clientX, touch.clientY);
    };

    const onVisibilityChange = () => {
      docVisibleRef.current = document.visibilityState === "visible";
    };

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotionPreference = () => {
      // The site's own accessibility panel toggles a class on <html> rather
      // than the OS media query, so both are honoured.
      snapRef.current = motionQuery.matches || root.classList.contains("a11y-reduced-motion");
    };
    syncMotionPreference();

    // Stop tracking while the hero is scrolled out of view.
    let intersectionObserver: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          onScreenRef.current = entry.isIntersecting;
        },
        { threshold: 0.05 }
      );
      intersectionObserver.observe(host);
    }

    const classObserver = new MutationObserver(syncMotionPreference);
    classObserver.observe(root, { attributes: true, attributeFilter: ["class"] });

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchstart", onTouch, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    motionQuery.addEventListener("change", syncMotionPreference);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchstart", onTouch);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      motionQuery.removeEventListener("change", syncMotionPreference);
      classObserver.disconnect();
      intersectionObserver?.disconnect();
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
      root.style.removeProperty("--ronin-x");
      root.style.removeProperty("--ronin-y");
    };
  }, [active]);

  return (
    <>
      <div
        ref={hostRef}
        className={`ronin-root ronin-root--base ${className}`.trim()}
        aria-hidden="true"
      >
        <div className="ronin-media ronin-base" />
        <div className="ronin-scrim" />
      </div>

      {active ? (
        <div className={`ronin-root ronin-root--reveal ${className}`.trim()} aria-hidden="true">
          <div className="ronin-media ronin-reveal" />
          <div className="ronin-spark" />
          {/* Keeps the spotlight from washing out the copy underneath it.
              Painted before the panel so the panel stays on top. */}
          <div className="ronin-guard" />
          {showSpecPanel ? <SpecPanel /> : null}
        </div>
      ) : null}
    </>
  );
}
