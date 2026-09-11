"use client";

export type AnalyticsEvent =
  | "resume_download"
  | "case_study_open"
  | "github_click"
  | "linkedin_click"
  | "contact_click"
  | "theme_toggle"
  | "cyberbot_interact"
  | "command_palette_open"
  | "filter_category_click"
  | "copy_email";

export function trackEvent(name: AnalyticsEvent, properties?: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  const eventPayload = {
    name,
    properties: properties || {},
    timestamp: new Date().toISOString(),
    path: window.location.pathname,
  };

  try {
    const customEvent = new CustomEvent("portfolio_analytics", {
      detail: eventPayload,
    });
    window.dispatchEvent(customEvent);
  } catch {
    // Ignore environments without CustomEvent
  }

  if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
    console.log(`[Analytics] 📈 Event: "${name}"`, properties || {});
  }

  if (typeof (window as any).plausible === "function") {
    (window as any).plausible(name, { props: properties });
  }
}
