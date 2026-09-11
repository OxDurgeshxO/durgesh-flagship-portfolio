import React from 'react';
import { ChangelogEntry, CHANGELOG_DATA } from '@/lib/changelog';
import { ChangelogEntryCard } from './ChangelogEntryCard';

export function ChangelogTimeline() {
  return (
    <div className="relative pl-6 sm:pl-8 border-l-2 border-border/60 space-y-12 my-8">
      {CHANGELOG_DATA.map((entry, index) => (
        <div key={entry.version} className="relative">
          {/* Timeline Node */}
          <div className="absolute -left-[31px] sm:-left-[39px] top-6 flex items-center justify-center">
            <div
              className={`h-4 w-4 rounded-full border-2 bg-background transition-transform duration-300 ${
                index === 0
                  ? 'border-primary shadow-lg shadow-primary/50 scale-125'
                  : 'border-muted-foreground/50'
              }`}
            >
              {index === 0 && <div className="h-1.5 w-1.5 rounded-full bg-primary mx-auto my-0.5 animate-pulse" />}
            </div>
          </div>

          <ChangelogEntryCard entry={entry} />
        </div>
      ))}
    </div>
  );
}
