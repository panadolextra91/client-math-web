'use client';

import React from 'react';
import { LoadingSpinner } from '@/components/Common/LoadingSpinner';
import { Card, CardContent } from '@/components/Common/Card';
import { StatsCard } from './StatsCard';
import { DifficultyBreakdown } from './DifficultyBreakdown';
import { formatAccuracy, formatTime, formatNumber } from '@/lib/utils';
import type { PlayerStats as PlayerStatsType } from '@/lib/types';
import { cn } from '@/lib/utils';

interface PlayerStatsProps {
  stats: PlayerStatsType | null;
  isLoading?: boolean;
  error?: string | null;
  className?: string;
}

export function PlayerStats({
  stats,
  isLoading = false,
  error,
  className,
}: PlayerStatsProps) {
  if (isLoading) {
    return (
      <div className={cn('flex items-center justify-center min-h-[400px]', className)}>
        <LoadingSpinner text="Loading player stats..." />
      </div>
    );
  }

  if (error) {
    const isNotFound = error.toLowerCase().includes('not found') || 
                       error.toLowerCase().includes('being processed');
    
    return (
      <Card className={cn('', className)}>
        <CardContent>
          <div className="text-center py-8">
            {isNotFound ? (
              <>
                <p className="text-beige-700 mb-2">Stats are being processed</p>
                <p className="text-beige-600 text-sm mb-4">
                  Your game session has been saved. Stats may take a moment to update.
                </p>
                <p className="text-beige-500 text-xs">
                  You can check the leaderboard or try refreshing this page in a few seconds.
                </p>
              </>
            ) : (
              <>
                <p className="text-red-600 mb-2">Error loading stats</p>
                <p className="text-beige-600 text-sm">{error}</p>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!stats) {
    return (
      <Card className={cn('', className)}>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-beige-600">No stats available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* Player Header */}
      <Card variant="elevated">
        <CardContent>
          <div className="text-center">
            <h1 className="text-3xl font-light text-beige-900 mb-2">
              {stats.playerName}
            </h1>
            <p className="text-beige-600 text-sm">Player Statistics</p>
          </div>
        </CardContent>
      </Card>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Score"
          value={formatNumber(stats.totalScore)}
          variant="highlight"
        />
        <StatsCard
          title="Best Score"
          value={formatNumber(stats.bestScore)}
          variant="success"
        />
        <StatsCard
          title="Accuracy"
          value={formatAccuracy(stats.accuracy)}
          subtitle={`${stats.totalCorrect} / ${stats.totalQuestions} correct`}
          variant={stats.accuracy >= 0.8 ? 'success' : stats.accuracy >= 0.6 ? 'default' : 'warning'}
        />
        <StatsCard
          title="Avg Time"
          value={stats.avgTimeMs ? formatTime(stats.avgTimeMs) : 'N/A'}
          subtitle="per question"
        />
      </div>

      {/* Secondary Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          title="Total Sessions"
          value={formatNumber(stats.totalSessions)}
        />
        <StatsCard
          title="Total Questions"
          value={formatNumber(stats.totalQuestions)}
        />
        <StatsCard
          title="Correct Answers"
          value={formatNumber(stats.totalCorrect)}
          variant="success"
        />
      </div>

      {/* Difficulty Breakdown */}
      {stats.byDifficulty && stats.byDifficulty.length > 0 && (
        <DifficultyBreakdown byDifficulty={stats.byDifficulty} />
      )}
    </div>
  );
}

