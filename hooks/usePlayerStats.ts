import { useState, useCallback, useEffect, useRef } from 'react';
import { playerApi } from '@/lib/api';
import type { PlayerStats } from '@/lib/types';

interface UsePlayerStatsParams {
  playerName: string | null;
  autoLoad?: boolean;
}

interface UsePlayerStatsReturn {
  // State
  stats: PlayerStats | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  loadStats: () => Promise<void>;
  clearError: () => void;
  refresh: () => Promise<void>;
}

export function usePlayerStats(params: UsePlayerStatsParams): UsePlayerStatsReturn {
  const { playerName, autoLoad = true } = params;
  
  const [stats, setStats] = useState<PlayerStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const retryCountRef = useRef(0);

  const loadStatsInternal = useCallback(async (retryCount = 0) => {
    if (!playerName) {
      setError('Player name is required');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await playerApi.getStats(playerName);
      
      if (result.error) {
        // If "not found" error and we haven't retried, wait and retry once
        // This handles cases where the session was just ended and stats aren't ready yet
        if (
          (result.error.code === 'NOT_FOUND' || result.error.message.toLowerCase().includes('not found')) &&
          retryCount === 0
        ) {
          setIsLoading(false);
          // Wait 1.5 seconds and retry once
          setTimeout(() => {
            loadStatsInternal(1);
          }, 1500);
          return;
        }
        
        // For "not found" errors after retry, show a more user-friendly message
        if (result.error.code === 'NOT_FOUND' || result.error.message.toLowerCase().includes('not found')) {
          setError('Stats are being processed. Please try again in a moment.');
        } else {
          setError(result.error.message);
        }
        setIsLoading(false);
        retryCountRef.current = 0;
        return;
      }
      
      if (result.data) {
        setStats(result.data);
        setIsLoading(false);
        retryCountRef.current = 0;
      } else {
        setError('No stats data received');
        setIsLoading(false);
        retryCountRef.current = 0;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load player stats');
      setIsLoading(false);
      retryCountRef.current = 0;
    }
  }, [playerName]);

  const loadStats = useCallback(() => {
    retryCountRef.current = 0;
    return loadStatsInternal(0);
  }, [loadStatsInternal]);

  // Auto-load on mount if enabled and playerName is provided
  useEffect(() => {
    if (autoLoad && playerName) {
      loadStats();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerName, autoLoad]);

  const refresh = useCallback(async () => {
    retryCountRef.current = 0;
    await loadStatsInternal(0);
  }, [loadStatsInternal]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    stats,
    isLoading,
    error,
    loadStats,
    clearError,
    refresh,
  };
}

