import React from 'react';
import { LoadingSpinner } from '@/components/Common/LoadingSpinner';
import { Card, CardContent } from '@/components/Common/Card';
import { LeaderboardEntry } from './LeaderboardEntry';
import type { LeaderboardEntry as LeaderboardEntryType } from '@/lib/types';
import { cn } from '@/lib/utils';

interface LeaderboardTableProps {
  entries: LeaderboardEntryType[];
  isLoading?: boolean;
  highlightPlayer?: string;
  className?: string;
}

export function LeaderboardTable({
  entries,
  isLoading = false,
  highlightPlayer,
  className,
}: LeaderboardTableProps) {
  if (isLoading) {
    return (
      <Card className={cn('min-h-[400px] flex items-center justify-center', className)}>
        <CardContent>
          <LoadingSpinner text="Loading leaderboard..." />
        </CardContent>
      </Card>
    );
  }

  if (entries.length === 0) {
    return (
      <Card className={cn('min-h-[400px] flex items-center justify-center', className)}>
        <CardContent>
          <div className="text-center">
            <p className="text-beige-600 text-lg mb-2">No entries yet</p>
            <p className="text-beige-500 text-sm">Be the first to play!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn('overflow-hidden', className)}>
      <div className="overflow-x-auto">
        <table className="w-full" role="table" aria-label="Leaderboard">
          <thead className="bg-beige-100 border-b-2 border-beige-200">
            <tr>
              <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-beige-700 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-beige-700 uppercase tracking-wider">
                Player
              </th>
              <th className="px-2 sm:px-4 py-3 text-right text-xs font-medium text-beige-700 uppercase tracking-wider">
                Score
              </th>
              <th className="px-2 sm:px-4 py-3 text-right text-xs font-medium text-beige-700 uppercase tracking-wider hidden sm:table-cell">
                Questions
              </th>
              <th className="px-2 sm:px-4 py-3 text-right text-xs font-medium text-beige-700 uppercase tracking-wider">
                Accuracy
              </th>
              <th className="px-2 sm:px-4 py-3 text-right text-xs font-medium text-beige-700 uppercase tracking-wider hidden md:table-cell">
                Avg Time
              </th>
            </tr>
          </thead>
          <tbody className="bg-beige-50 divide-y divide-beige-200">
            {entries.map((entry, index) => (
              <LeaderboardEntry
                key={entry.rank}
                entry={entry}
                highlightPlayer={highlightPlayer}
              />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

