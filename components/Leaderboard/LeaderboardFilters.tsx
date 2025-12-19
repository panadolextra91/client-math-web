'use client';

import React from 'react';
import { Button } from '@/components/Common/Button';
import { cn } from '@/lib/utils';

type Scope = 'all' | 'weekly' | 'daily';

interface LeaderboardFiltersProps {
  currentScope: Scope;
  onScopeChange: (scope: Scope) => void;
  className?: string;
}

export function LeaderboardFilters({
  currentScope,
  onScopeChange,
  className,
}: LeaderboardFiltersProps) {
  const filters: { scope: Scope; label: string }[] = [
    { scope: 'all', label: 'All Time' },
    { scope: 'weekly', label: 'Weekly' },
    { scope: 'daily', label: 'Daily' },
  ];

  return (
    <div className={cn('flex gap-2 justify-center flex-wrap', className)}>
      {filters.map(({ scope, label }) => (
        <Button
          key={scope}
          variant={currentScope === scope ? 'primary' : 'outline'}
          size="md"
          onClick={() => onScopeChange(scope)}
          className="min-w-[100px]"
        >
          {label}
        </Button>
      ))}
    </div>
  );
}



