import React from 'react';
import { Card, CardContent } from '@/components/Common/Card';
import type { Question } from '@/lib/types';
import { cn } from '@/lib/utils';

interface QuestionCardProps {
  question: Question | null;
  isLoading?: boolean;
  className?: string;
}

export function QuestionCard({ question, isLoading, className }: QuestionCardProps) {
  if (isLoading) {
    return (
      <Card className={cn('min-h-[200px] flex items-center justify-center', className)}>
        <CardContent>
          <div className="text-center">
            <div className="inline-block w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-beige-600">Generating question...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!question) {
    return (
      <Card className={cn('min-h-[200px] flex items-center justify-center', className)}>
        <CardContent>
          <p className="text-beige-500 text-center">No question available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="elevated" className={cn('min-h-[200px] animate-fade-in', className)}>
      <CardContent>
        <div className="text-center space-y-4">
          {/* Difficulty Badge */}
          <div className="flex justify-center animate-slide-down">
            <span
              className={cn(
                'px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide',
                question.difficulty === 'easy' && 'bg-green-100 text-green-700',
                question.difficulty === 'medium' && 'bg-beige-200 text-beige-700',
                question.difficulty === 'hard' && 'bg-beige-300 text-beige-900'
              )}
            >
              {question.difficulty}
            </span>
          </div>

          {/* Question Text */}
          <div className="py-6 animate-scale-in">
            <p className="text-2xl sm:text-3xl md:text-4xl font-light text-beige-900 break-words">
              {question.questionText}
            </p>
          </div>

          {/* Mode Indicator */}
          <div className="text-sm text-beige-600 font-light animate-fade-in">
            {question.mode === 'arithmetic' ? 'Arithmetic' : 'Equation'} Mode
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

