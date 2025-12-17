'use client';

import React from 'react';
import { Button } from '@/components/Common/Button';
import { cn } from '@/lib/utils';

interface LeaderboardPaginationProps {
  currentPage: number;
  hasMore: boolean;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
  isLoading?: boolean;
  className?: string;
}

export function LeaderboardPagination({
  currentPage,
  hasMore,
  total,
  onPrevious,
  onNext,
  isLoading = false,
  className,
}: LeaderboardPaginationProps) {
  if (total === 0) {
    return null;
  }

  return (
    <div className={cn('flex items-center justify-center gap-4', className)}>
      <Button
        variant="outline"
        size="sm"
        onClick={onPrevious}
        disabled={currentPage <= 1 || isLoading}
      >
        Previous
      </Button>
      
      <div className="text-sm text-beige-700 font-medium min-w-[120px] text-center">
        Page {currentPage}
        {total > 0 && (
          <span className="text-beige-500 font-light ml-1">
            ({total} total)
          </span>
        )}
      </div>
      
      <Button
        variant="outline"
        size="sm"
        onClick={onNext}
        disabled={!hasMore || isLoading}
      >
        Next
      </Button>
    </div>
  );
}

