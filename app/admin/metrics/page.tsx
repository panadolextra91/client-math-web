'use client';

import { useState, useEffect } from 'react';
import { useMetrics } from '@/hooks/useMetrics';
import { MetricsViewer } from '@/components/Admin/MetricsDisplay';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Common/Card';
import { Input } from '@/components/Common/Input';
import { Button } from '@/components/Common/Button';
import { ErrorToastContainer } from '@/components/Common/ErrorToast';
import Link from 'next/link';

export default function AdminMetricsPage() {
  const { metrics, isLoading, error, loadMetrics, resetMetrics, clearError } = useMetrics();
  const [apiKey, setApiKey] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);

  const handleLoadMetrics = async () => {
    if (!apiKey.trim()) {
      setErrors(['Please provide an admin API key']);
      return;
    }

    setErrors([]);
    await loadMetrics(apiKey);
  };

  const handleResetMetrics = async () => {
    if (!window.confirm('Are you sure you want to reset all metrics? This action cannot be undone.')) {
      return;
    }

    if (!apiKey.trim()) {
      setErrors(['Admin API key is required']);
      return;
    }

    await resetMetrics(apiKey);
  };

  // Auto-refresh functionality
  useEffect(() => {
    if (!autoRefresh || !isAuthenticated || !apiKey) return;

    const interval = setInterval(() => {
      if (apiKey) {
        loadMetrics(apiKey);
      }
    }, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval);
  }, [autoRefresh, isAuthenticated, apiKey, loadMetrics]);

  const handleDismissError = (index: number) => {
    setErrors((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle errors and success from the hook
  useEffect(() => {
    if (error) {
      setErrors((prev) => [...prev, error]);
      setIsAuthenticated(false);
      clearError();
    } else if (metrics && !isAuthenticated) {
      // Successfully loaded metrics, mark as authenticated
      setIsAuthenticated(true);
    }
  }, [error, metrics, isAuthenticated, clearError]);

  return (
    <div className="min-h-screen bg-beige-50 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-light text-beige-900 mb-2">Admin Metrics</h1>
            <p className="text-beige-600 text-sm">Server metrics and statistics</p>
          </div>
          <Link href="/">
            <Button variant="ghost" size="sm">
              ← Back to Home
            </Button>
          </Link>
        </div>

        {/* Authentication */}
        {!isAuthenticated && (
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Admin Authentication</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                type="password"
                label="Admin API Key"
                placeholder="Enter admin API key"
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                  setErrors([]);
                }}
                onKeyPress={(e) => e.key === 'Enter' && handleLoadMetrics()}
                helperText="Enter your admin API key to view server metrics"
                error={errors[0]}
              />
              <Button
                variant="primary"
                onClick={handleLoadMetrics}
                isLoading={isLoading}
                disabled={!apiKey.trim()}
                className="w-full"
              >
                Load Metrics
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Metrics Display */}
        {isAuthenticated && metrics && (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="text-sm text-beige-600">
                Authenticated
              </div>
              <div className="flex gap-2 flex-wrap">
                <label className="flex items-center gap-2 text-sm text-beige-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoRefresh}
                    onChange={(e) => setAutoRefresh(e.target.checked)}
                    className="rounded border-beige-300 text-green-500 focus:ring-green-500"
                  />
                  Auto-refresh (5s)
                </label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLoadMetrics}
                  isLoading={isLoading}
                >
                  Refresh Metrics
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResetMetrics}
                  isLoading={isLoading}
                  className="text-red-600 border-red-300 hover:bg-red-50"
                >
                  Reset Metrics
                </Button>
              </div>
            </div>

            <MetricsViewer
              metrics={metrics}
              isLoading={isLoading}
              error={error || undefined}
            />
          </>
        )}

        {/* Error Toasts */}
        <ErrorToastContainer errors={errors} onDismiss={handleDismissError} />
      </div>
    </div>
  );
}

