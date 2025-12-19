'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Common/Card';
import { formatNumber, formatAccuracy } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface MetricsChartsProps {
  metrics: any;
  className?: string;
}

const COLORS = {
  green: ['#5bb57d', '#3a9b5f', '#2b7d4c'],
  beige: ['#b5a894', '#9d8f78', '#827562'],
  accent: ['#8fd1a8', '#5bb57d', '#3a9b5f'],
};

export function QuestionsPerHourChart({ data }: { data: Array<{ hour: number; count: number }> }) {
  const chartData = data.map((item) => ({
    hour: `${item.hour}:00`,
    count: item.count,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ebe7e0" />
        <XAxis
          dataKey="hour"
          stroke="#827562"
          fontSize={12}
          angle={-45}
          textAnchor="end"
          height={80}
        />
        <YAxis stroke="#827562" fontSize={12} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#faf9f7',
            border: '1px solid #ebe7e0',
            borderRadius: '8px',
          }}
        />
        <Bar dataKey="count" fill="#5bb57d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function TopicsByModeChart({ data }: { data: Array<{ mode: string; count: number; accuracy: number }> }) {
  const pieData = data.map((item) => ({
    name: item.mode.charAt(0).toUpperCase() + item.mode.slice(1),
    value: item.count,
    accuracy: item.accuracy,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS.accent[index % COLORS.accent.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: '#faf9f7',
            border: '1px solid #ebe7e0',
            borderRadius: '8px',
          }}
          formatter={(value: number, name: string, props: any) => [
            `${formatNumber(value)} questions (${formatAccuracy(props.payload.accuracy)})`,
            name,
          ]}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function TopicsByDifficultyChart({
  data,
}: {
  data: Array<{ difficulty: string; count: number; accuracy: number }>;
}) {
  const pieData = data.map((item) => ({
    name: item.difficulty.charAt(0).toUpperCase() + item.difficulty.slice(1),
    value: item.count,
    accuracy: item.accuracy,
  }));

  const difficultyColors: Record<string, string> = {
    Easy: COLORS.green[0],
    Medium: COLORS.beige[1],
    Hard: COLORS.beige[2],
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {pieData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={difficultyColors[entry.name] || COLORS.accent[index % COLORS.accent.length]}
            />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: '#faf9f7',
            border: '1px solid #ebe7e0',
            borderRadius: '8px',
          }}
          formatter={(value: number, name: string, props: any) => [
            `${formatNumber(value)} questions (${formatAccuracy(props.payload.accuracy)})`,
            name,
          ]}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function StatusCodesChart({ data }: { data: Record<number, number> }) {
  const chartData = Object.entries(data)
    .map(([code, count]) => ({
      code: String(code),
      count: count as number,
    }))
    .sort((a, b) => Number(a.code) - Number(b.code));

  const getColor = (code: string) => {
    const num = Number(code);
    if (num >= 200 && num < 300) return COLORS.green[0];
    if (num >= 300 && num < 400) return COLORS.beige[1];
    if (num >= 400 && num < 500) return '#f59e0b';
    if (num >= 500) return '#ef4444';
    return COLORS.beige[2];
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ebe7e0" />
        <XAxis dataKey="code" stroke="#827562" fontSize={12} />
        <YAxis stroke="#827562" fontSize={12} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#faf9f7',
            border: '1px solid #ebe7e0',
            borderRadius: '8px',
          }}
        />
        <Bar dataKey="count" radius={[4, 4, 0, 0]}>
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getColor(entry.code)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function EndpointsChart({
  data,
}: {
  data: Record<string, { count: number; avgResponseTime: number; errors: number }>;
}) {
  const chartData = Object.entries(data)
    .map(([endpoint, stats]) => ({
      endpoint: endpoint.length > 20 ? endpoint.substring(0, 20) + '...' : endpoint,
      fullEndpoint: endpoint,
      count: stats.count,
      avgResponseTime: stats.avgResponseTime,
      errors: stats.errors,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10); // Top 10 endpoints

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" stroke="#ebe7e0" />
        <XAxis type="number" stroke="#827562" fontSize={12} />
        <YAxis
          dataKey="endpoint"
          type="category"
          stroke="#827562"
          fontSize={11}
          width={150}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#faf9f7',
            border: '1px solid #ebe7e0',
            borderRadius: '8px',
          }}
          formatter={(value: number, name: string, props: any) => {
            if (name === 'count') {
              return [
                `${formatNumber(value)} requests`,
                'Requests',
              ];
            }
            if (name === 'avgResponseTime') {
              return [`${formatNumber(value)}ms`, 'Avg Response Time'];
            }
            if (name === 'errors') {
              return [`${formatNumber(value)}`, 'Errors'];
            }
            return [value, name];
          }}
          labelFormatter={(label) => `Endpoint: ${chartData.find((d) => d.endpoint === label)?.fullEndpoint || label}`}
        />
        <Legend />
        <Bar dataKey="count" fill={COLORS.green[0]} name="Requests" radius={[0, 4, 4, 0]} />
        <Bar dataKey="errors" fill="#ef4444" name="Errors" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function ResponseTimePercentilesChart({
  percentiles,
}: {
  percentiles: { p50: number; p95: number; p99: number };
}) {
  const chartData = [
    { name: 'P50 (Median)', value: percentiles.p50 },
    { name: 'P95', value: percentiles.p95 },
    { name: 'P99', value: percentiles.p99 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ebe7e0" />
        <XAxis dataKey="name" stroke="#827562" fontSize={12} />
        <YAxis stroke="#827562" fontSize={12} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#faf9f7',
            border: '1px solid #ebe7e0',
            borderRadius: '8px',
          }}
          formatter={(value: number) => [`${formatNumber(value)}ms`, 'Response Time']}
        />
        <Bar dataKey="value" fill={COLORS.green[1]} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function AccuracyComparisonChart({
  overall,
  today,
  thisMonth,
}: {
  overall: number;
  today: number;
  thisMonth: number;
}) {
  const chartData = [
    { period: 'Overall', accuracy: overall * 100 },
    { period: 'Today', accuracy: today * 100 },
    { period: 'This Month', accuracy: thisMonth * 100 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ebe7e0" />
        <XAxis dataKey="period" stroke="#827562" fontSize={12} />
        <YAxis stroke="#827562" fontSize={12} domain={[0, 100]} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#faf9f7',
            border: '1px solid #ebe7e0',
            borderRadius: '8px',
          }}
          formatter={(value: number) => [`${value.toFixed(1)}%`, 'Accuracy']}
        />
        <Bar dataKey="accuracy" fill={COLORS.green[0]} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function MetricsCharts({ metrics, className }: MetricsChartsProps) {
  if (!metrics) return null;

  return (
    <div className={cn('space-y-6', className)}>
      {/* Questions per Hour Chart */}
      {metrics.analytics?.activity?.questionsPerHour && (
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Activity Pattern - Questions per Hour</CardTitle>
          </CardHeader>
          <CardContent>
            <QuestionsPerHourChart data={metrics.analytics.activity.questionsPerHour} />
          </CardContent>
        </Card>
      )}

      {/* Topics Charts */}
      {metrics.analytics?.topics && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {metrics.analytics.topics.byMode && metrics.analytics.topics.byMode.length > 0 && (
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Topics by Mode</CardTitle>
              </CardHeader>
              <CardContent>
                <TopicsByModeChart data={metrics.analytics.topics.byMode} />
              </CardContent>
            </Card>
          )}

          {metrics.analytics.topics.byDifficulty &&
            metrics.analytics.topics.byDifficulty.length > 0 && (
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>Topics by Difficulty</CardTitle>
                </CardHeader>
                <CardContent>
                  <TopicsByDifficultyChart data={metrics.analytics.topics.byDifficulty} />
                </CardContent>
              </Card>
            )}
        </div>
      )}

      {/* Accuracy Comparison */}
      {metrics.analytics?.questions && (
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Accuracy Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <AccuracyComparisonChart
              overall={metrics.analytics.questions.overallAccuracy}
              today={metrics.analytics.questions.todayAccuracy}
              thisMonth={metrics.analytics.questions.thisMonthAccuracy}
            />
          </CardContent>
        </Card>
      )}

      {/* Response Time Percentiles */}
      {metrics.responseTimePercentiles && (
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Response Time Percentiles</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponseTimePercentilesChart percentiles={metrics.responseTimePercentiles} />
          </CardContent>
        </Card>
      )}

      {/* Status Codes Chart */}
      {metrics.statusCodes && Object.keys(metrics.statusCodes).length > 0 && (
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>HTTP Status Codes Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <StatusCodesChart data={metrics.statusCodes} />
          </CardContent>
        </Card>
      )}

      {/* Endpoints Chart */}
      {metrics.endpoints && Object.keys(metrics.endpoints).length > 0 && (
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Top Endpoints Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <EndpointsChart data={metrics.endpoints} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}



