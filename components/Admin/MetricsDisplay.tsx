'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Common/Card';
import { LoadingSpinner } from '@/components/Common/LoadingSpinner';
import { MetricsCharts } from './MetricsCharts';
import { formatNumber, formatTime, formatAccuracy } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface MetricsData {
  totalRequests: number;
  totalErrors: number;
  averageResponseTime: number;
  minResponseTime: number;
  maxResponseTime: number;
  requestsPerSecond: number;
  statusCodes: Record<number, number>;
  endpoints: Record<string, {
    count: number;
    avgResponseTime: number;
    errors: number;
  }>;
  responseTimePercentiles: {
    p50: number;
    p95: number;
    p99: number;
  };
  uptime: number;
  timestamp: number;
  analytics?: {
    players: {
      total: number;
      today: number;
      thisMonth: number;
      activeToday: number;
    };
    sessions: {
      total: number;
      active: number;
      completed: number;
      today: number;
      thisMonth: number;
      avgDuration: number | null;
    };
    questions: {
      total: number;
      today: number;
      thisMonth: number;
      totalCorrect: number;
      totalWrong: number;
      overallAccuracy: number;
      todayAccuracy: number;
      thisMonthAccuracy: number;
    };
    topics: {
      mostPlayed: {
        mode: string | null;
        difficulty: string | null;
        count: number;
      };
      byMode: Array<{
        mode: string;
        count: number;
        accuracy: number;
        avgTimeMs: number | null;
      }>;
      byDifficulty: Array<{
        difficulty: string;
        count: number;
        accuracy: number;
        avgTimeMs: number | null;
      }>;
      byModeAndDifficulty: Array<{
        mode: string;
        difficulty: string;
        count: number;
        accuracy: number;
      }>;
    };
    performance: {
      avgResponseTime: number | null;
      avgResponseTimeToday: number | null;
      fastestAvgResponseTime: {
        mode: string | null;
        difficulty: string | null;
        avgTimeMs: number | null;
      };
      highestAccuracy: {
        mode: string | null;
        difficulty: string | null;
        accuracy: number;
      };
    };
    activity: {
      peakHour: number | null;
      questionsPerHour: Array<{
        hour: number;
        count: number;
      }>;
    };
    scores: {
      totalScore: number;
      avgScorePerSession: number | null;
      highestScore: number;
      avgScorePerQuestion: number | null;
    };
    timestamp: string;
  };
}

interface MetricsDisplayProps {
  metrics: MetricsData;
  className?: string;
}

export function MetricsDisplay({ metrics, className }: MetricsDisplayProps) {
  const formatUptime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ${hours % 24}h`;
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Real-time Performance Summary Cards */}
      <div>
        <h2 className="text-2xl font-light text-beige-900 mb-4">Real-time Performance (Last 60 seconds)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card variant="elevated">
            <CardContent>
              <div className="text-center">
                <div className="text-sm text-beige-600 font-light mb-1">Total Requests</div>
                <div className="text-3xl font-light text-beige-900">
                  {formatNumber(metrics.totalRequests)}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardContent>
              <div className="text-center">
                <div className="text-sm text-beige-600 font-light mb-1">Total Errors</div>
                <div className="text-3xl font-light text-red-500">
                  {formatNumber(metrics.totalErrors)}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardContent>
              <div className="text-center">
                <div className="text-sm text-beige-600 font-light mb-1">Avg Response Time</div>
                <div className="text-3xl font-light text-green-600">
                  {formatNumber(metrics.averageResponseTime)}ms
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardContent>
              <div className="text-center">
                <div className="text-sm text-beige-600 font-light mb-1">Requests/Second</div>
                <div className="text-3xl font-light text-beige-900">
                  {metrics.requestsPerSecond.toFixed(2)}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardContent>
              <div className="text-center">
                <div className="text-sm text-beige-600 font-light mb-1">Uptime</div>
                <div className="text-3xl font-light text-green-600">
                  {formatUptime(metrics.uptime)}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Charts Section */}
      <MetricsCharts metrics={metrics} />

      {/* Enhanced Analytics Summary */}
      {metrics.analytics && (
        <>
          {/* Players Analytics */}
          <div>
            <h2 className="text-2xl font-light text-beige-900 mb-4">Players Analytics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card variant="elevated">
                <CardContent>
                  <div className="text-center">
                    <div className="text-sm text-beige-600 font-light mb-1">Total Players</div>
                    <div className="text-3xl font-light text-beige-900">
                      {formatNumber(metrics.analytics.players.total)}
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card variant="elevated">
                <CardContent>
                  <div className="text-center">
                    <div className="text-sm text-beige-600 font-light mb-1">Players Today</div>
                    <div className="text-3xl font-light text-green-600">
                      {formatNumber(metrics.analytics.players.today)}
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card variant="elevated">
                <CardContent>
                  <div className="text-center">
                    <div className="text-sm text-beige-600 font-light mb-1">This Month</div>
                    <div className="text-3xl font-light text-beige-900">
                      {formatNumber(metrics.analytics.players.thisMonth)}
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card variant="elevated">
                <CardContent>
                  <div className="text-center">
                    <div className="text-sm text-beige-600 font-light mb-1">Active Today</div>
                    <div className="text-3xl font-light text-green-600">
                      {formatNumber(metrics.analytics.players.activeToday)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sessions Analytics */}
          <div>
            <h2 className="text-2xl font-light text-beige-900 mb-4">Sessions Analytics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card variant="elevated">
                <CardContent>
                  <div className="text-center">
                    <div className="text-sm text-beige-600 font-light mb-1">Total Sessions</div>
                    <div className="text-3xl font-light text-beige-900">
                      {formatNumber(metrics.analytics.sessions.total)}
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card variant="elevated">
                <CardContent>
                  <div className="text-center">
                    <div className="text-sm text-beige-600 font-light mb-1">Active Sessions</div>
                    <div className="text-3xl font-light text-green-600">
                      {formatNumber(metrics.analytics.sessions.active)}
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card variant="elevated">
                <CardContent>
                  <div className="text-center">
                    <div className="text-sm text-beige-600 font-light mb-1">Completed</div>
                    <div className="text-3xl font-light text-beige-900">
                      {formatNumber(metrics.analytics.sessions.completed)}
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card variant="elevated">
                <CardContent>
                  <div className="text-center">
                    <div className="text-sm text-beige-600 font-light mb-1">Sessions Today</div>
                    <div className="text-3xl font-light text-green-600">
                      {formatNumber(metrics.analytics.sessions.today)}
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card variant="elevated">
                <CardContent>
                  <div className="text-center">
                    <div className="text-sm text-beige-600 font-light mb-1">This Month</div>
                    <div className="text-3xl font-light text-beige-900">
                      {formatNumber(metrics.analytics.sessions.thisMonth)}
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card variant="elevated">
                <CardContent>
                  <div className="text-center">
                    <div className="text-sm text-beige-600 font-light mb-1">Avg Duration</div>
                    <div className="text-3xl font-light text-beige-900">
                      {metrics.analytics.sessions.avgDuration
                        ? `${Math.round(metrics.analytics.sessions.avgDuration)} min`
                        : 'N/A'}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Questions Analytics */}
          <div>
            <h2 className="text-2xl font-light text-beige-900 mb-4">Questions & Answers Analytics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card variant="elevated">
                <CardContent>
                  <div className="text-center">
                    <div className="text-sm text-beige-600 font-light mb-1">Total Questions</div>
                    <div className="text-3xl font-light text-beige-900">
                      {formatNumber(metrics.analytics.questions.total)}
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card variant="elevated">
                <CardContent>
                  <div className="text-center">
                    <div className="text-sm text-beige-600 font-light mb-1">Today</div>
                    <div className="text-3xl font-light text-green-600">
                      {formatNumber(metrics.analytics.questions.today)}
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card variant="elevated">
                <CardContent>
                  <div className="text-center">
                    <div className="text-sm text-beige-600 font-light mb-1">This Month</div>
                    <div className="text-3xl font-light text-beige-900">
                      {formatNumber(metrics.analytics.questions.thisMonth)}
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card variant="elevated">
                <CardContent>
                  <div className="text-center">
                    <div className="text-sm text-beige-600 font-light mb-1">Overall Accuracy</div>
                    <div className="text-3xl font-light text-green-600">
                      {formatAccuracy(metrics.analytics.questions.overallAccuracy)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Most Played Topic */}
          {metrics.analytics.topics.mostPlayed && (
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Most Played Topic</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-sm text-beige-600 mb-1">Mode</div>
                    <div className="text-lg font-medium text-beige-900 capitalize">
                      {metrics.analytics.topics.mostPlayed.mode || 'N/A'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-beige-600 mb-1">Difficulty</div>
                    <div className="text-lg font-medium text-beige-900 capitalize">
                      {metrics.analytics.topics.mostPlayed.difficulty || 'N/A'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-beige-600 mb-1">Questions</div>
                    <div className="text-lg font-medium text-green-600">
                      {formatNumber(metrics.analytics.topics.mostPlayed.count)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Performance Insights */}
          {metrics.analytics.performance && (
            <div>
              <h2 className="text-2xl font-light text-beige-900 mb-4">Performance Insights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card variant="elevated">
                  <CardContent>
                    <div className="text-center">
                      <div className="text-sm text-beige-600 font-light mb-1">Fastest Mode/Difficulty</div>
                      <div className="text-lg font-medium text-beige-900 capitalize mb-2">
                        {metrics.analytics.performance.fastestAvgResponseTime.mode || 'N/A'} /{' '}
                        {metrics.analytics.performance.fastestAvgResponseTime.difficulty || 'N/A'}
                      </div>
                      <div className="text-2xl font-light text-green-600">
                        {metrics.analytics.performance.fastestAvgResponseTime.avgTimeMs
                          ? formatTime(metrics.analytics.performance.fastestAvgResponseTime.avgTimeMs)
                          : 'N/A'}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card variant="elevated">
                  <CardContent>
                    <div className="text-center">
                      <div className="text-sm text-beige-600 font-light mb-1">Highest Accuracy</div>
                      <div className="text-lg font-medium text-beige-900 capitalize mb-2">
                        {metrics.analytics.performance.highestAccuracy.mode || 'N/A'} /{' '}
                        {metrics.analytics.performance.highestAccuracy.difficulty || 'N/A'}
                      </div>
                      <div className="text-2xl font-light text-green-600">
                        {formatAccuracy(metrics.analytics.performance.highestAccuracy.accuracy)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card variant="elevated">
                  <CardContent>
                    <div className="text-center">
                      <div className="text-sm text-beige-600 font-light mb-1">Avg Response Time (All Time)</div>
                      <div className="text-3xl font-light text-beige-900">
                        {metrics.analytics.performance.avgResponseTime
                          ? formatTime(metrics.analytics.performance.avgResponseTime)
                          : 'N/A'}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card variant="elevated">
                  <CardContent>
                    <div className="text-center">
                      <div className="text-sm text-beige-600 font-light mb-1">Avg Response Time (Today)</div>
                      <div className="text-3xl font-light text-green-600">
                        {metrics.analytics.performance.avgResponseTimeToday
                          ? formatTime(metrics.analytics.performance.avgResponseTimeToday)
                          : 'N/A'}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Score Analytics */}
          {metrics.analytics.scores && (
            <div>
              <h2 className="text-2xl font-light text-beige-900 mb-4">Score Analytics</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card variant="elevated">
                  <CardContent>
                    <div className="text-center">
                      <div className="text-sm text-beige-600 font-light mb-1">Total Score</div>
                      <div className="text-3xl font-light text-beige-900">
                        {formatNumber(metrics.analytics.scores.totalScore)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card variant="elevated">
                  <CardContent>
                    <div className="text-center">
                      <div className="text-sm text-beige-600 font-light mb-1">Highest Score</div>
                      <div className="text-3xl font-light text-green-600">
                        {formatNumber(metrics.analytics.scores.highestScore)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card variant="elevated">
                  <CardContent>
                    <div className="text-center">
                      <div className="text-sm text-beige-600 font-light mb-1">Avg per Session</div>
                      <div className="text-3xl font-light text-beige-900">
                        {metrics.analytics.scores.avgScorePerSession
                          ? formatNumber(Math.round(metrics.analytics.scores.avgScorePerSession))
                          : 'N/A'}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card variant="elevated">
                  <CardContent>
                    <div className="text-center">
                      <div className="text-sm text-beige-600 font-light mb-1">Avg per Question</div>
                      <div className="text-3xl font-light text-beige-900">
                        {metrics.analytics.scores.avgScorePerQuestion
                          ? metrics.analytics.scores.avgScorePerQuestion.toFixed(2)
                          : 'N/A'}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </>
      )}

      {/* Timestamp */}
      <div className="text-center text-sm text-beige-500">
        Last updated: {new Date(metrics.timestamp).toLocaleString()}
      </div>
    </div>
  );
}

interface MetricsViewerProps {
  metrics: MetricsData | null;
  isLoading: boolean;
  error: string | null;
  className?: string;
}

export function MetricsViewer({
  metrics,
  isLoading,
  error,
  className,
}: MetricsViewerProps) {
  if (isLoading) {
    return (
      <div className={cn('flex items-center justify-center min-h-[400px]', className)}>
        <LoadingSpinner text="Loading server metrics..." />
      </div>
    );
  }

  if (error) {
    return (
      <Card className={cn('', className)}>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-red-600 mb-2">Error loading metrics</p>
            <p className="text-beige-600 text-sm">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!metrics) {
    return (
      <Card className={cn('', className)}>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-beige-600">No metrics data available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return <MetricsDisplay metrics={metrics} className={className} />;
}
