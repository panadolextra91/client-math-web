'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/Common/Card';
import { formatNumber } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface ScoreDisplayProps {
  score: number;
  previousScore?: number;
  className?: string;
}

export function ScoreDisplay({ score, previousScore, className }: ScoreDisplayProps) {
  const [displayScore, setDisplayScore] = useState(score);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (previousScore !== undefined && score !== previousScore) {
      setIsAnimating(true);
      
      // Animate score change
      const startScore = previousScore;
      const endScore = score;
      const difference = endScore - startScore;
      const duration = 500; // 500ms animation
      const steps = 20;
      const stepValue = difference / steps;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const newScore = Math.round(startScore + stepValue * currentStep);
        setDisplayScore(newScore);

        if (currentStep >= steps) {
          setDisplayScore(endScore);
          clearInterval(interval);
          setTimeout(() => setIsAnimating(false), 200);
        }
      }, stepDuration);
    } else {
      setDisplayScore(score);
    }
  }, [score, previousScore]);

  return (
    <Card variant="outlined" className={cn('', className)}>
      <CardContent>
        <div className="text-center">
          <div className="text-sm text-beige-600 font-light mb-1">Score</div>
          <div
            className={cn(
              'text-4xl font-light text-green-600 transition-all duration-300',
              isAnimating && 'scale-110'
            )}
          >
            {formatNumber(displayScore)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}



