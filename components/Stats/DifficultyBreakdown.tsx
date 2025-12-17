import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Common/Card';
import { formatAccuracy, formatTime, formatNumber } from '@/lib/utils';
import { cn } from '@/lib/utils';
import type { PlayerStats } from '@/lib/types';

interface DifficultyBreakdownProps {
  byDifficulty: PlayerStats['byDifficulty'];
  className?: string;
}

export function DifficultyBreakdown({
  byDifficulty,
  className,
}: DifficultyBreakdownProps) {
  if (byDifficulty.length === 0) {
    return (
      <Card className={cn('', className)}>
        <CardContent>
          <p className="text-beige-500 text-center">No difficulty data available</p>
        </CardContent>
      </Card>
    );
  }

  const getDifficultyColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'medium':
        return 'bg-beige-100 text-beige-700 border-beige-200';
      case 'hard':
        return 'bg-beige-200 text-beige-900 border-beige-300';
      default:
        return 'bg-beige-100 text-beige-700 border-beige-200';
    }
  };

  return (
    <Card className={cn('', className)}>
      <CardHeader>
        <CardTitle>Performance by Difficulty</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {byDifficulty.map((difficulty) => (
            <div
              key={difficulty.level}
              className={cn(
                'p-4 rounded-lg border',
                getDifficultyColor(difficulty.level)
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-medium capitalize">
                  {difficulty.level}
                </h4>
                <span className="text-sm font-light">
                  {formatNumber(difficulty.totalQuestions)} questions
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-beige-600 mb-1">Accuracy</div>
                  <div
                    className={cn(
                      'text-xl font-medium',
                      difficulty.accuracy >= 0.8 && 'text-green-600',
                      difficulty.accuracy >= 0.6 && difficulty.accuracy < 0.8 && 'text-beige-600',
                      difficulty.accuracy < 0.6 && 'text-red-500'
                    )}
                  >
                    {formatAccuracy(difficulty.accuracy)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-beige-600 mb-1">Avg Time</div>
                  <div className="text-xl font-medium text-beige-700">
                    {difficulty.avgTimeMs ? formatTime(difficulty.avgTimeMs) : 'N/A'}
                  </div>
                </div>
              </div>
              
              {/* Accuracy Bar */}
              <div className="mt-3">
                <div className="w-full bg-beige-200 rounded-full h-2">
                  <div
                    className={cn(
                      'h-2 rounded-full transition-all',
                      difficulty.accuracy >= 0.8 && 'bg-green-500',
                      difficulty.accuracy >= 0.6 && difficulty.accuracy < 0.8 && 'bg-green-400',
                      difficulty.accuracy >= 0.4 && difficulty.accuracy < 0.6 && 'bg-beige-400',
                      difficulty.accuracy < 0.4 && 'bg-red-400'
                    )}
                    style={{ width: `${difficulty.accuracy * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}


