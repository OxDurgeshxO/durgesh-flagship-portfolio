"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  FileText,
  Copy,
  ExternalLink,
  Sparkles,
  Cpu,
  GraduationCap,
  Briefcase,
  User,
  Mail,
  Volume2,
  VolumeX,
  X,
  Command,
  ArrowRight,
  FlaskConical,
  Activity,
  History,
  ShieldCheck,
} from "lucide-react";
import { OWNER } from "@/lib/data";
import { trackEvent } from "@/lib/analytics";

interface PaletteAction {
  id: string;
  category: "Navigation" | "Quick Actions" | "Case Studies";
  title: string;
  subtitle: string;
  icon: React.ElementType;
  shortcut?: string;
  perform: () => void;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const [toast, setToast] = useState<string | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const triggerToast = (msg: string) => {
    setToast(msg);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => setToast(null), 3200);
  };

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  // Toggle on Ctrl+K / Cmd+K and custom window event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };

    const handleOpenCustom = () => setOpen(true);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleOpenCustom);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleOpenCustom);
    };
  }, []);

  // Auto-focus input on open
  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      setToast(null);
      setTimeout(() => inputRef.current?.focus(), 50);
      trackEvent("command_palette_open");
    }
  }, [open]);

  const actions: PaletteAction[] = useMemo(
    () => [
      // Quick Actions
      {
        id: "resume-html",
        category: "Quick Actions",
        title: "View Official HTML Resume",
        subtitle: "Print-friendly, ATS optimized with downloadable PDF",
        icon: FileText,
        shortcut: "/resume",
        perform: () => {
          window.location.href = "/resume";
        },
      },
      {
        id: "recruiter-mode",
        category: "Quick Actions",
        title: "Recruiter Fast-Track Overview",
        subtitle: "High-density candidate profile with 0 WebGL overhead",
        icon: Sparkles,
        shortcut: "/recruiter",
        perform: () => {
          window.location.href = "/recruiter";
        },
      },
      {
        id: "perf-center",
        category: "Quick Actions",
        title: "Open Performance Center",
        subtitle: "Lighthouse telemetry and WebGL mode controls",
        icon: Cpu,
        shortcut: "/performance",
        perform: () => {
          window.location.href = "/performance";
        },
      },
      {
        id: "ai-lab",
        category: "Quick Actions",
        title: "Interactive AI Engineering Lab",
        subtitle: "Live ATS scoring, pose kinematics, and PCA clustering",
        icon: FlaskConical,
        shortcut: "/lab",
        perform: () => {
          window.location.href = "/lab";
        },
      },
      {
        id: "github-health",
        category: "Quick Actions",
        title: "GitHub Repository Health Telemetry",
        subtitle: "Audited code quality, CI status, and test coverage",
        icon: Activity,
        shortcut: "/github-health",
        perform: () => {
          window.location.href = "/github-health";
        },
      },
      {
        id: "changelog",
        category: "Quick Actions",
        title: "Public Engineering Changelog",
        subtitle: "Problem-Implementation-Result records across all versions",
        icon: History,
        shortcut: "/changelog",
        perform: () => {
          window.location.href = "/changelog";
        },
      },
      {
        id: "privacy-disclosure",
        category: "Quick Actions",
        title: "Privacy & Zero Server Persistence Policy",
        subtitle: "Ephemeral browser-only model execution disclosure",
        icon: ShieldCheck,
        shortcut: "PRIVACY",
        perform: () => {
          triggerToast("🔒 Zero server persistence: all model inputs run strictly in ephemeral edge memory.");
        },
      },
      {
        id: "copy-email",
        category: "Quick Actions",
        title: "Copy Direct Email Address",
        subtitle: OWNER.email,
        icon: Copy,
        shortcut: "EMAIL",
        perform: () => {
          navigator.clipboard.writeText(OWNER.email);
          triggerToast("✓ Direct email copied to clipboard!");
          trackEvent("copy_email", { source: "command_palette" });
        },
      },
      {
        id: "github",
        category: "Quick Actions",
        title: "Visit GitHub Profile",
        subtitle: "github.com/OxDurgeshxO",
        icon: ExternalLink,
        shortcut: "GIT",
        perform: () => {
          window.open(OWNER.github, "_blank");
        },
      },
      {
        id: "linkedin",
        category: "Quick Actions",
        title: "Connect on LinkedIn",
        subtitle: "Durgesh Dutt Sinha",
        icon: ExternalLink,
        shortcut: "IN",
        perform: () => {
          window.open(OWNER.linkedin, "_blank");
        },
      },
      {
        id: "toggle-sound",
        category: "Quick Actions",
        title: "Toggle CyberBot Audio Mute",
        subtitle: "Mute or unmute companion sound synthesis",
        icon: Volume2,
        shortcut: "AUDIO",
        perform: () => {
          const current = localStorage.getItem("cyberbot_muted") === "true";
          const next = !current;
          localStorage.setItem("cyberbot_muted", String(next));
          window.dispatchEvent(new CustomEvent("cyberbot-mute-toggle", { detail: { muted: next } }));
          triggerToast(next ? "🔇 CyberBot audio muted" : "🔊 CyberBot audio unmuted");
          trackEvent("cyberbot_interact", { action: "toggle_sound", muted: next });
        },
      },

      // Navigation
      {
        id: "nav-projects",
        category: "Navigation",
        title: "Featured Platforms & Case Studies",
        subtitle: "Jump to Flagship AI & Full-Stack Projects",
        icon: Sparkles,
        shortcut: "#projects",
        perform: () => {
          document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
        },
      },
      {
        id: "nav-github",
        category: "Navigation",
        title: "Curated GitHub Repositories",
        subtitle: "Jump to Top 5 GitHub Showcases",
        icon: Cpu,
        shortcut: "#github",
        perform: () => {
          document.getElementById("github-projects")?.scrollIntoView({ behavior: "smooth" });
        },
      },
      {
        id: "nav-education",
        category: "Navigation",
        title: "Academic Pedigree & Credentials",
        subtitle: "MCA AIML at Sri Balaji University & AWS Credentials",
        icon: GraduationCap,
        shortcut: "#education",
        perform: () => {
          document.getElementById("education")?.scrollIntoView({ behavior: "smooth" });
        },
      },
      {
        id: "nav-experience",
        category: "Navigation",
        title: "Industry Experience & Fellowships",
        subtitle: "Be10x AI Cohort, UNLOX Fellow, SBUP",
        icon: Briefcase,
        shortcut: "#experience",
        perform: () => {
          document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
        },
      },
      {
        id: "nav-about",
        category: "Navigation",
        title: "About Durgesh Dutt Sinha",
        subtitle: "Biography, core skills, and background stats",
        icon: User,
        shortcut: "#about",
        perform: () => {
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
        },
      },
      {
        id: "nav-contact",
        category: "Navigation",
        title: "Get in Touch / Contact Form",
        subtitle: "Direct message, time zone info, and availability",
        icon: Mail,
        shortcut: "#contact",
        perform: () => {
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        },
      },

      // Case Studies Quick Jump
      {
        id: "cs-roleradar",
        category: "Case Studies",
        title: "RoleRadar — Deep Engineering Case Study",
        subtitle: "Next.js 16 • Drizzle ORM • Dual-Mode Storage Architecture",
        icon: Sparkles,
        shortcut: "STUDY",
        perform: () => {
          window.location.href = "/work/roleradar";
        },
      },
      {
        id: "cs-fitness",
        category: "Case Studies",
        title: "AI Fitness Platform — Pose Architecture Study",
        subtitle: "MediaPipe 33-point pose kinematics & Web Workers",
        icon: Cpu,
        shortcut: "STUDY",
        perform: () => {
          window.location.href = "/work/fitness-platform";
        },
      },
      {
        id: "cs-marketmatch",
        category: "Case Studies",
        title: "MarketMatch AI — Unsupervised ML Study",
        subtitle: "K-Means, DBSCAN & Nearest Neighbors recommender",
        icon: Sparkles,
        shortcut: "STUDY",
        perform: () => {
          window.location.href = "/work/marketmatch-ai";
        },
      },
    ],
    []
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return actions;
    const q = query.toLowerCase();
    return actions.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.subtitle.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        (a.shortcut && a.shortcut.toLowerCase().includes(q))
    );
  }, [actions, query]);

  const isToastAction = (id: string) =>
    id === "resume" || id === "copy-email" || id === "toggle-sound";

  // Keyboard navigation within results
  const handleKeyNav = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const targetAction = filtered[selectedIndex];
      if (targetAction) {
        targetAction.perform();
        if (!isToastAction(targetAction.id)) {
          setOpen(false);
        }
      }
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Palette Dialog Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -16 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-2xl glass rounded-2xl border border-purple-500/40 shadow-2xl shadow-purple-500/30 overflow-hidden z-10 bg-[#0c0a18]/95"
          >
            {/* Top ambient color strip */}
            <div className="h-1 bg-gradient-to-r from-purple-500 via-rose-500 to-purple-500" />

            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
              <Search className="size-5 text-rose-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a command, section, or keyword... (e.g. resume, github, projects)"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyNav}
                className="w-full bg-transparent text-white text-sm sm:text-base placeholder-slate-500 focus:outline-none font-medium"
              />
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono font-bold bg-white/5 border border-white/10 text-slate-400 px-2 py-0.5 rounded">
                ESC to close
              </span>
              <button
                onClick={() => setOpen(false)}
                className="sm:hidden text-slate-400 hover:text-white p-1"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* In-Palette Notification Toast Banner */}
            <AnimatePresence>
              {toast && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-5 py-2.5 bg-gradient-to-r from-purple-900/40 via-rose-900/30 to-purple-900/40 border-b border-purple-500/30 flex items-center justify-between text-xs text-rose-200 font-medium"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="size-3.5 text-rose-400 animate-pulse shrink-0" />
                    <span>{toast}</span>
                  </div>
                  <button
                    onClick={() => setToast(null)}
                    className="text-slate-400 hover:text-white p-0.5 text-xs cursor-pointer"
                  >
                    ✕
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Command Results List */}
            <div className="max-h-[60vh] overflow-y-auto p-2 space-y-1">
              {filtered.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-sm">
                  <Command className="size-8 mx-auto mb-2 text-slate-600" />
                  No matching commands or actions found.
                </div>
              ) : (
                filtered.map((action, idx) => {
                  const Icon = action.icon;
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={action.id}
                      onClick={() => {
                        action.perform();
                        if (!isToastAction(action.id)) {
                          setOpen(false);
                        }
                      }}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full text-left px-4 py-3 rounded-xl flex items-center justify-between gap-3 transition-all cursor-pointer ${
                        isSelected
                          ? "bg-purple-500/20 border border-purple-500/40 text-white shadow-md shadow-purple-500/10"
                          : "text-slate-300 hover:bg-white/5 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                            isSelected
                              ? "bg-gradient-to-br from-purple-600 to-rose-500 text-white shadow-md shadow-purple-500/30"
                              : "bg-white/5 text-purple-300 border border-white/10"
                          }`}
                        >
                          <Icon className="size-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-semibold truncate flex items-center gap-2">
                            <span>{action.title}</span>
                            <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-white/5 text-slate-400 font-normal">
                              {action.category}
                            </span>
                          </div>
                          <div className="text-xs text-slate-400 truncate">
                            {action.subtitle}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {action.shortcut && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-rose-300 font-bold">
                            {action.shortcut}
                          </span>
                        )}
                        {isSelected && (
                          <ArrowRight className="size-4 text-rose-400 animate-pulse" />
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer Hotkey Tips */}
            <div className="px-5 py-2.5 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-500 bg-white/[0.01]">
              <div className="flex items-center gap-4">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
              </div>
              <div className="flex items-center gap-1.5 text-purple-300">
                <span>Neo-Tokyo HUD</span>
                <span>•</span>
                <span>DDS Portfolio</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
