import { useState, useCallback, useEffect } from 'react';
import { leaderboardApi } from '@/lib/api';
import type { LeaderboardResponse, LeaderboardEntry } from '@/lib/types';

interface UseLeaderboardParams {
  scope?: 'all' | 'weekly' | 'daily';
  limit?: number;
  autoLoad?: boolean;
}

interface UseLeaderboardReturn {
  // State
  leaderboard: LeaderboardResponse | null;
  entries: LeaderboardEntry[];
  isLoading: boolean;
  error: string | null;
  
  // Pagination
  currentPage: number;
  hasMore: boolean;
  total: number;
  
  // Actions
  loadLeaderboard: (params?: { scope?: 'all' | 'weekly' | 'daily'; page?: number }) => Promise<void>;
  nextPage: () => Promise<void>;
  previousPage: () => Promise<void>;
  setScope: (scope: 'all' | 'weekly' | 'daily') => Promise<void>;
  clearError: () => void;
  refresh: () => Promise<void>;
}

export function useLeaderboard(params: UseLeaderboardParams = {}): UseLeaderboardReturn {
  const { scope: initialScope = 'all', limit = 20, autoLoad = true } = params;
  
  const [leaderboard, setLeaderboard] = useState<LeaderboardResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentScope, setCurrentScope] = useState<'all' | 'weekly' | 'daily'>(initialScope);
  const [currentPage, setCurrentPage] = useState(1);

  // Auto-load on mount if enabled
  useEffect(() => {
    if (autoLoad) {
      loadLeaderboard({ scope: currentScope, page: 1 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadLeaderboard = useCallback(
    async (params?: { scope?: 'all' | 'weekly' | 'daily'; page?: number }) => {
      const scope = params?.scope ?? currentScope;
      const page = params?.page ?? currentPage;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const result = await leaderboardApi.get({
          scope,
          limit,
          page,
        });
        
        if (result.error) {
          setError(result.error.message);
          setIsLoading(false);
          return;
        }
        
        if (result.data) {
          setLeaderboard(result.data);
          setCurrentScope(scope);
          setCurrentPage(page);
          setIsLoading(false);
        } else {
          setError('No data received');
          setIsLoading(false);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load leaderboard');
        setIsLoading(false);
      }
    },
    [currentScope, currentPage, limit]
  );

  const nextPage = useCallback(async () => {
    if (leaderboard?.pagination.hasMore) {
      await loadLeaderboard({ scope: currentScope, page: currentPage + 1 });
    }
  }, [leaderboard, currentScope, currentPage, loadLeaderboard]);

  const previousPage = useCallback(async () => {
    if (currentPage > 1) {
      await loadLeaderboard({ scope: currentScope, page: currentPage - 1 });
    }
  }, [currentScope, currentPage, loadLeaderboard]);

  const setScope = useCallback(
    async (scope: 'all' | 'weekly' | 'daily') => {
      await loadLeaderboard({ scope, page: 1 });
    },
    [loadLeaderboard]
  );

  const refresh = useCallback(async () => {
    await loadLeaderboard({ scope: currentScope, page: currentPage });
  }, [currentScope, currentPage, loadLeaderboard]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    leaderboard,
    entries: leaderboard?.entries ?? [],
    isLoading,
    error,
    currentPage: leaderboard?.pagination.page ?? currentPage,
    hasMore: leaderboard?.pagination.hasMore ?? false,
    total: leaderboard?.pagination.total ?? 0,
    loadLeaderboard,
    nextPage,
    previousPage,
    setScope,
    clearError,
    refresh,
  };
}



