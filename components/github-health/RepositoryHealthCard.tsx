import React from 'react';
import Link from 'next/link';
import { Github, ExternalLink, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { RepositoryHealth } from '@/lib/github-health';
import { StatusBadge, CiBadge, AuditDateBadge } from './HealthBadge';

interface Props {
  repo: RepositoryHealth;
}

export function RepositoryHealthCard({ repo }: Props) {
  return (
    <div className="group rounded-2xl border border-border/80 bg-card p-6 shadow-md hover:shadow-xl hover:border-primary/40 transition-all duration-300 flex flex-col justify-between">
      <div className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                {repo.name}
              </h3>
              <StatusBadge status={repo.status} />
              <CiBadge status={repo.ciStatus} />
            </div>
            <div className="text-xs font-mono text-muted-foreground flex items-center gap-2">
              <Github className="h-3.5 w-3.5" />
              <span>{repo.fullName}</span>
            </div>
          </div>

          <AuditDateBadge date={repo.asOfDate} />
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {repo.description}
        </p>

        <div className="rounded-xl border border-border/60 bg-muted/20 p-3 space-y-1.5">
          <div className="text-[11px] font-semibold text-foreground uppercase tracking-wider font-mono">
            Key Architecture Points:
          </div>
          <ul className="space-y-1">
            {repo.highlights.map((h, i) => (
              <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 text-xs">
          <div className="rounded-lg border border-border/40 bg-background/50 p-2">
            <div className="text-[10px] text-muted-foreground font-mono">Architecture</div>
            <div className="font-semibold text-foreground truncate">{repo.metrics.architectureType}</div>
          </div>
          <div className="rounded-lg border border-border/40 bg-background/50 p-2">
            <div className="text-[10px] text-muted-foreground font-mono">Language</div>
            <div className="font-semibold text-foreground">{repo.primaryLanguage}</div>
          </div>
          <div className="rounded-lg border border-border/40 bg-background/50 p-2">
            <div className="text-[10px] text-muted-foreground font-mono">License</div>
            <div className="font-semibold text-foreground">{repo.license}</div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-border/40 mt-6">
        <div className="text-xs text-muted-foreground font-mono">
          Last Verified: {repo.lastCommitDate}
        </div>

        <div className="flex items-center gap-2">
          {repo.caseStudyUrl && (
            <Link
              href={repo.caseStudyUrl}
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
            >
              <span>Case Study</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          )}

          <a
            href={repo.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-muted/40 hover:bg-muted px-3 py-1.5 text-xs font-semibold text-foreground transition-colors"
          >
            <Github className="h-3.5 w-3.5" />
            <span>GitHub</span>
            <ExternalLink className="h-3 w-3 opacity-60" />
          </a>
        </div>
      </div>
    </div>
  );
}
