import React from 'react';
import Link from 'next/link';
import type { LeaderboardEntry as LeaderboardEntryType } from '@/lib/types';
import { formatAccuracy, formatTime, formatNumber } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface LeaderboardEntryProps {
  entry: LeaderboardEntryType;
  highlightPlayer?: string;
  className?: string;
}

export function LeaderboardEntry({
  entry,
  highlightPlayer,
  className,
}: LeaderboardEntryProps) {
  const isHighlighted = highlightPlayer && entry.playerName === highlightPlayer;

  const getRankColor = () => {
    if (entry.rank === 1) return 'text-yellow-600';
    if (entry.rank === 2) return 'text-beige-600';
    if (entry.rank === 3) return 'text-beige-500';
    return 'text-beige-700';
  };

  const getRankBadge = () => {
    if (entry.rank <= 3) {
      return (
        <span className={cn('text-lg font-medium', getRankColor())}>
          #{entry.rank}
        </span>
      );
    }
    return <span className="text-beige-600">#{entry.rank}</span>;
  };

  return (
    <tr
      className={cn(
        'border-b border-beige-200 transition-colors hover:bg-beige-50 animate-slide-up',
        isHighlighted && 'bg-green-50 border-green-200',
        className
      )}
      style={{ animationDelay: `${(entry.rank % 10) * 20}ms` }}
    >
      <td className="px-2 sm:px-4 py-3 text-center">
        {getRankBadge()}
      </td>
      <td className="px-2 sm:px-4 py-3">
        <Link
          href={`/stats/${encodeURIComponent(entry.playerName)}`}
          className={cn(
            'font-medium hover:text-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 rounded',
            isHighlighted ? 'text-green-700' : 'text-beige-900'
          )}
          aria-label={`View stats for ${entry.playerName}`}
        >
          {entry.playerName}
        </Link>
      </td>
      <td className="px-2 sm:px-4 py-3 text-right font-medium text-beige-900">
        {formatNumber(entry.totalScore)}
      </td>
      <td className="px-2 sm:px-4 py-3 text-right text-beige-700 hidden sm:table-cell">
        {formatNumber(entry.totalQuestions)}
      </td>
      <td className="px-2 sm:px-4 py-3 text-right">
        <span
          className={cn(
            'font-medium',
            entry.accuracy >= 0.8 && 'text-green-600',
            entry.accuracy >= 0.6 && entry.accuracy < 0.8 && 'text-beige-600',
            entry.accuracy < 0.6 && 'text-red-500'
          )}
        >
          {formatAccuracy(entry.accuracy)}
        </span>
      </td>
      <td className="px-2 sm:px-4 py-3 text-right text-beige-600 hidden md:table-cell">
        {entry.avgTimeMs ? formatTime(entry.avgTimeMs) : 'N/A'}
      </td>
    </tr>
  );
}

