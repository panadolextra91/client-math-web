import { useState, useCallback } from 'react';
import { metricsApi } from '@/lib/api';

interface UseMetricsReturn {
  metrics: any | null;
  isLoading: boolean;
  error: string | null;
  loadMetrics: (adminApiKey: string) => Promise<void>;
  resetMetrics: (adminApiKey: string) => Promise<void>;
  clearError: () => void;
}

export function useMetrics(): UseMetricsReturn {
  const [metrics, setMetrics] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMetrics = useCallback(async (adminApiKey: string) => {
    if (!adminApiKey) {
      setError('Admin API key is required');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await metricsApi.get(adminApiKey);

      if (result.error) {
        setError(result.error.message);
        setIsLoading(false);
        return;
      }

      if (result.data) {
        setMetrics(result.data);
        setIsLoading(false);
      } else {
        setError('No metrics data received');
        setIsLoading(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load metrics');
      setIsLoading(false);
    }
  }, []);

  const resetMetrics = useCallback(async (adminApiKey: string) => {
    if (!adminApiKey) {
      setError('Admin API key is required');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await metricsApi.reset(adminApiKey);

      if (result.error) {
        setError(result.error.message);
        setIsLoading(false);
        return;
      }

      // Reload metrics after reset
      await loadMetrics(adminApiKey);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset metrics');
      setIsLoading(false);
    }
  }, [loadMetrics]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    metrics,
    isLoading,
    error,
    loadMetrics,
    resetMetrics,
    clearError,
  };
}

