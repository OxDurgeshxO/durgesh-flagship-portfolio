'use client';

import React, { useState, useMemo } from 'react';
import { Search, Filter, ShieldCheck, CheckCircle2, SlidersHorizontal, Calendar } from 'lucide-react';
import { RepositoryHealth, REPOSITORY_HEALTH_DATA, getHealthSummary } from '@/lib/github-health';
import { RepositoryHealthCard } from './RepositoryHealthCard';

type CategoryFilter = 'all' | 'aiml' | 'fullstack' | 'agent' | 'portfolio';
type SortOption = 'updated' | 'name';

export function HealthDashboardClient() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('updated');

  const summary = useMemo(() => getHealthSummary(), []);

  const filteredRepos = useMemo(() => {
    return REPOSITORY_HEALTH_DATA.filter((repo) => {
      const matchesCategory = category === 'all' || repo.category === category;
      const matchesSearch =
        search === '' ||
        repo.name.toLowerCase().includes(search.toLowerCase()) ||
        repo.description.toLowerCase().includes(search.toLowerCase()) ||
        repo.primaryLanguage.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return new Date(b.lastCommitDate).getTime() - new Date(a.lastCommitDate).getTime();
    });
  }, [search, category, sortBy]);

  const categories: { id: CategoryFilter; label: string }[] = [
    { id: 'all', label: 'All Repositories' },
    { id: 'aiml', label: 'AI/ML & Computer Vision' },
    { id: 'agent', label: 'Autonomous Agents & LLMs' },
    { id: 'fullstack', label: 'Full-Stack Systems' },
    { id: 'portfolio', label: 'Flagship Platform' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-border/80 bg-card p-4">
          <div className="text-xs font-mono uppercase text-muted-foreground">Portfolio Ecosystem</div>
          <div className="text-3xl font-black text-foreground mt-1">{summary.total} Repositories</div>
          <div className="text-xs text-[var(--accent-lab)] flex items-center gap-1 mt-1">
            <CheckCircle2 className="h-3 w-3" /> {summary.productionCount} Production-Ready
          </div>
        </div>

        <div className="rounded-xl border border-border/80 bg-card p-4">
          <div className="text-xs font-mono uppercase text-muted-foreground">Automated Test Suites</div>
          <div className="text-3xl font-black text-[var(--accent-lab)] mt-1">{summary.verifiedTestsCount} Repos</div>
          <div className="text-xs text-muted-foreground mt-1">Verified Unit/Integration Tests</div>
        </div>

        <div className="rounded-xl border border-border/80 bg-card p-4">
          <div className="text-xs font-mono uppercase text-muted-foreground">Snapshot Verification</div>
          <div className="text-xl font-bold text-[var(--accent-signal)] mt-2 flex items-center gap-1.5">
            <Calendar className="h-4 w-4" /> as of {summary.snapshotDate}
          </div>
          <div className="text-xs text-muted-foreground mt-1">Grounded Static Audit</div>
        </div>

        <div className="rounded-xl border border-border/80 bg-card p-4">
          <div className="text-xs font-mono uppercase text-muted-foreground">Open Source Codebases</div>
          <div className="text-3xl font-black text-foreground mt-1">100% Public</div>
          <div className="text-xs text-muted-foreground mt-1">All Repos Reachable on GitHub</div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-xl border border-border/80 bg-card/50">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            aria-label="Search repositories"
            placeholder="Search verified repositories by name, language, or topic..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-background rounded-lg border border-border/80 focus:outline-none focus:ring-2 focus:ring-primary/40 text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
          <select
            aria-label="Sort repositories"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="text-xs bg-background text-foreground border border-border/80 rounded-lg px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            <option value="updated">Sort by: Recently Updated</option>
            <option value="name">Sort by: Name (A-Z)</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              category === cat.id
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-card hover:bg-muted text-muted-foreground hover:text-foreground border border-border/60'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredRepos.map((repo) => (
          <RepositoryHealthCard key={repo.id} repo={repo} />
        ))}
      </div>

      {filteredRepos.length === 0 && (
        <div className="text-center py-12 text-muted-foreground text-sm">
          No repositories match your current search criteria.
        </div>
      )}
    </div>
  );
}
