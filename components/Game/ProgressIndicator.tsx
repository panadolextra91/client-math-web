import React from 'react';
import { Card, CardContent } from '@/components/Common/Card';
import { formatAccuracy } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface ProgressIndicatorProps {
  totalQuestions: number;
  totalCorrect: number;
  totalWrong: number;
  accuracy: number;
  className?: string;
}

export function ProgressIndicator({
  totalQuestions,
  totalCorrect,
  totalWrong,
  accuracy,
  className,
}: ProgressIndicatorProps) {
  const accuracyPercent = accuracy * 100;

  return (
    <Card variant="outlined" className={cn('', className)}>
      <CardContent>
        <div className="space-y-4">
          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-light text-beige-900">{totalQuestions}</div>
              <div className="text-xs text-beige-600 font-light">Questions</div>
            </div>
            <div>
              <div className="text-2xl font-light text-green-600">{totalCorrect}</div>
              <div className="text-xs text-beige-600 font-light">Correct</div>
            </div>
            <div>
              <div className="text-2xl font-light text-red-500">{totalWrong}</div>
              <div className="text-xs text-beige-600 font-light">Wrong</div>
            </div>
          </div>

          {/* Accuracy Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-beige-700 font-light">Accuracy</span>
              <span className="text-sm font-medium text-beige-900">
                {formatAccuracy(accuracy)}
              </span>
            </div>
            <div className="w-full bg-beige-200 rounded-full h-2.5">
              <div
                className={cn(
                  'h-2.5 rounded-full transition-all duration-500',
                  accuracyPercent >= 80 && 'bg-green-500',
                  accuracyPercent >= 60 && accuracyPercent < 80 && 'bg-green-400',
                  accuracyPercent >= 40 && accuracyPercent < 60 && 'bg-beige-400',
                  accuracyPercent < 40 && 'bg-red-400'
                )}
                style={{ width: `${accuracyPercent}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


