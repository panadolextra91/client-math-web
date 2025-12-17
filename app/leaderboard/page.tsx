'use client';

import { useLeaderboard } from '@/hooks/useLeaderboard';
import {
  LeaderboardTable,
  LeaderboardFilters,
  LeaderboardPagination,
} from '@/components/Leaderboard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Common/Card';
import { ErrorToastContainer } from '@/components/Common/ErrorToast';
import { useState, useEffect } from 'react';

export default function LeaderboardPage() {
  const {
    entries,
    isLoading,
    error,
    currentPage,
    hasMore,
    total,
    setScope,
    nextPage,
    previousPage,
    clearError,
  } = useLeaderboard({ scope: 'all', limit: 20, autoLoad: true });

  const [currentScope, setCurrentScope] = useState<'all' | 'weekly' | 'daily'>('all');
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (error) {
      setErrors((prev) => [...prev, error]);
      clearError();
    }
  }, [error, clearError]);

  const handleScopeChange = async (scope: 'all' | 'weekly' | 'daily') => {
    setCurrentScope(scope);
    await setScope(scope);
  };

  const handleDismissError = (index: number) => {
    setErrors((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-beige-50 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle className="text-center">Leaderboard</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-beige-600 text-sm">
              Compete with other players and see who's on top!
            </p>
          </CardContent>
        </Card>

        {/* Filters */}
        <LeaderboardFilters
          currentScope={currentScope}
          onScopeChange={handleScopeChange}
        />

        {/* Leaderboard Table */}
        <LeaderboardTable entries={entries} isLoading={isLoading} />

        {/* Pagination */}
        {entries.length > 0 && (
          <LeaderboardPagination
            currentPage={currentPage}
            hasMore={hasMore}
            total={total}
            onPrevious={previousPage}
            onNext={nextPage}
            isLoading={isLoading}
          />
        )}

        {/* Error Toasts */}
        <ErrorToastContainer errors={errors} onDismiss={handleDismissError} />
      </div>
    </div>
  );
}

