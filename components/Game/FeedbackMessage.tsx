'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/Common/Card';
import { cn } from '@/lib/utils';

interface FeedbackMessageProps {
  isCorrect: boolean | null;
  correctAnswer?: string;
  scoreDelta?: number;
  onAnimationComplete?: () => void;
  className?: string;
}

export function FeedbackMessage({
  isCorrect,
  correctAnswer,
  scoreDelta,
  onAnimationComplete,
  className,
}: FeedbackMessageProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isCorrect !== null) {
      setIsVisible(true);
      
      // Auto-hide after 2 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onAnimationComplete) {
          setTimeout(onAnimationComplete, 300); // Wait for fade out
        }
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isCorrect, onAnimationComplete]);

  if (isCorrect === null || !isVisible) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed inset-0 flex items-center justify-center z-50 pointer-events-none',
        className
      )}
    >
      <Card
        variant="elevated"
        className={cn(
          'pointer-events-auto animate-in zoom-in-95 fade-in duration-300',
          isCorrect ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'
        )}
      >
        <CardContent className="text-center py-8 px-12">
          <div className="mb-4">
            {isCorrect ? (
              <svg
                className="w-16 h-16 mx-auto text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
              <svg
                className="w-16 h-16 mx-auto text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
          </div>
          
          <h3
            className={cn(
              'text-2xl font-medium mb-2',
              isCorrect ? 'text-green-800' : 'text-red-800'
            )}
          >
            {isCorrect ? 'Correct!' : 'Incorrect'}
          </h3>
          
          {correctAnswer && !isCorrect && (
            <p className="text-beige-700 mb-2">
              Correct answer: <span className="font-semibold">{correctAnswer}</span>
            </p>
          )}
          
          {scoreDelta !== undefined && scoreDelta !== 0 && (
            <p
              className={cn(
                'text-lg font-medium',
                scoreDelta > 0 ? 'text-green-600' : 'text-red-600'
              )}
            >
              {scoreDelta > 0 ? '+' : ''}{scoreDelta} points
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

