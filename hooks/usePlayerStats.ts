import { useState, useCallback, useEffect } from 'react';
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

  // Auto-load on mount if enabled and playerName is provided
  useEffect(() => {
    if (autoLoad && playerName) {
      loadStats();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerName, autoLoad]);

  const loadStats = useCallback(async () => {
    if (!playerName) {
      setError('Player name is required');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await playerApi.getStats(playerName);
      
      if (result.error) {
        setError(result.error.message);
        setIsLoading(false);
        return;
      }
      
      if (result.data) {
        setStats(result.data);
        setIsLoading(false);
      } else {
        setError('No stats data received');
        setIsLoading(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load player stats');
      setIsLoading(false);
    }
  }, [playerName]);

  const refresh = useCallback(async () => {
    await loadStats();
  }, [loadStats]);

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

