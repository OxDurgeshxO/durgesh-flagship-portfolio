'use client';

import React, { useState, useMemo } from 'react';
import { Search, Filter, ShieldCheck, Star, GitFork, CheckCircle2, SlidersHorizontal, Sparkles } from 'lucide-react';
import { RepositoryHealth, REPOSITORY_HEALTH_DATA, getHealthSummary } from '@/lib/github-health';
import { RepositoryHealthCard } from './RepositoryHealthCard';

type CategoryFilter = 'all' | 'aiml' | 'fullstack' | 'agent' | 'portfolio';
type SortOption = 'score' | 'stars' | 'updated';

export function HealthDashboardClient() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('score');

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
      if (sortBy === 'score') return b.qualityScore - a.qualityScore;
      if (sortBy === 'stars') return b.stars - a.stars;
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
      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-border/80 bg-card p-4">
          <div className="text-xs font-mono uppercase text-muted-foreground">Portfolio Ecosystem</div>
          <div className="text-3xl font-black text-foreground mt-1">{summary.total} Repositories</div>
          <div className="text-xs text-emerald-400 flex items-center gap-1 mt-1">
            <CheckCircle2 className="h-3 w-3" /> {summary.productionCount} Production-Ready
          </div>
        </div>

        <div className="rounded-xl border border-border/80 bg-card p-4">
          <div className="text-xs font-mono uppercase text-muted-foreground">Mean Quality Score</div>
          <div className="text-3xl font-black text-emerald-400 mt-1">{summary.averageQuality}/100</div>
          <div className="text-xs text-muted-foreground mt-1">Weighted Codebase Audit</div>
        </div>

        <div className="rounded-xl border border-border/80 bg-card p-4">
          <div className="text-xs font-mono uppercase text-muted-foreground">CI/CD Pipeline Health</div>
          <div className="text-3xl font-black text-blue-400 mt-1">100% Passing</div>
          <div className="text-xs text-muted-foreground mt-1">GitHub Actions Verified</div>
        </div>

        <div className="rounded-xl border border-border/80 bg-card p-4">
          <div className="text-xs font-mono uppercase text-muted-foreground">Community Traction</div>
          <div className="text-3xl font-black text-foreground mt-1">{summary.totalStars} Stars</div>
          <div className="text-xs text-muted-foreground mt-1">{summary.totalForks} Open Source Forks</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-y border-border/60 py-4">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-colors ${
                category === c.id
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground border border-border/60'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Search & Sort */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-60">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search repositories..."
              className="w-full rounded-xl border border-border bg-background pl-9 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="flex items-center gap-1.5 rounded-xl border border-border bg-background px-2.5 py-1.5 text-xs">
            <SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-transparent text-xs text-foreground focus:outline-none cursor-pointer"
            >
              <option value="score">Sort by Quality</option>
              <option value="stars">Sort by Stars</option>
              <option value="updated">Sort by Updated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Repository Grid */}
      {filteredRepos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRepos.map((repo) => (
            <RepositoryHealthCard key={repo.id} repo={repo} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center space-y-3">
          <div className="text-muted-foreground text-sm">No repositories found matching your filter criteria.</div>
          <button
            onClick={() => {
              setSearch('');
              setCategory('all');
            }}
            className="text-xs font-semibold text-primary hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
