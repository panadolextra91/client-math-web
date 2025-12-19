'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/Common/Card';
import { formatTime } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface TimerProps {
  startTime: number | null;
  maxTimeMs?: number;
  onTimeout?: () => void;
  className?: string;
}

export function Timer({ startTime, maxTimeMs, onTimeout, className }: TimerProps) {
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!startTime) {
      setElapsed(0);
      setIsRunning(false);
      return;
    }

    setIsRunning(true);
    const interval = setInterval(() => {
      const now = Date.now();
      const elapsedMs = now - startTime;
      setElapsed(elapsedMs);

      // Check for timeout
      if (maxTimeMs && elapsedMs >= maxTimeMs) {
        setIsRunning(false);
        clearInterval(interval);
        if (onTimeout) {
          onTimeout();
        }
      }
    }, 100); // Update every 100ms for smooth display

    return () => clearInterval(interval);
  }, [startTime, maxTimeMs, onTimeout]);

  const getTimeColor = () => {
    if (!maxTimeMs) return 'text-beige-700';
    
    const remaining = maxTimeMs - elapsed;
    const percentage = (remaining / maxTimeMs) * 100;
    
    if (percentage > 50) return 'text-green-600';
    if (percentage > 25) return 'text-beige-600';
    return 'text-red-500';
  };

  const getRemainingTime = () => {
    if (!maxTimeMs) return null;
    return Math.max(0, maxTimeMs - elapsed);
  };

  const remainingTime = getRemainingTime();

  return (
    <Card variant="outlined" className={cn('', className)}>
      <CardContent>
        <div className="text-center">
          <div className="text-sm text-beige-600 font-light mb-1">Time</div>
          <div className={cn('text-3xl font-light transition-colors', getTimeColor())}>
            {formatTime(elapsed)}
          </div>
          {remainingTime !== null && maxTimeMs && (
            <div className="mt-2">
              <div className="w-full bg-beige-200 rounded-full h-2">
                <div
                  className={cn(
                    'h-2 rounded-full transition-all duration-100',
                    remainingTime / maxTimeMs > 0.5 && 'bg-green-500',
                    remainingTime / maxTimeMs > 0.25 && remainingTime / maxTimeMs <= 0.5 && 'bg-beige-400',
                    remainingTime / maxTimeMs <= 0.25 && 'bg-red-500'
                  )}
                  style={{ width: `${(remainingTime / maxTimeMs) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}



