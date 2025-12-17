const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export interface ApiResponse<T> {
  data?: T;
  error?: {
    code: string;
    message: string;
    requestId?: string;
    details?: any;
  };
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        error: data.error || {
          code: 'UNKNOWN_ERROR',
          message: 'An error occurred',
        },
      };
    }

    return { data };
  } catch (error) {
    return {
      error: {
        code: 'NETWORK_ERROR',
        message: error instanceof Error ? error.message : 'Network error',
      },
    };
  }
}

// Session API
export const sessionApi = {
  create: async (playerName: string, mode?: string, difficulty?: string) => {
    return apiRequest<{
      sessionId: number;
      playerName: string;
      startedAt: string;
    }>('/sessions', {
      method: 'POST',
      body: JSON.stringify({ playerName, mode, difficulty }),
    });
  },

  end: async (sessionId: number) => {
    return apiRequest<{
      sessionId: number;
      finishedAt: string;
      summary: any;
    }>(`/sessions/${sessionId}/end`, {
      method: 'PATCH',
    });
  },

  getSummary: async (sessionId: number) => {
    return apiRequest<any>(`/sessions/${sessionId}/summary`);
  },
};

// Question API
export const questionApi = {
  generate: async (sessionId: number, mode: string, difficulty: string) => {
    return apiRequest<{
      questionId: string;
      mode: string;
      difficulty: string;
      type: string;
      questionText: string;
      payload: any;
      maxTimeMs?: number;
    }>('/questions/generate', {
      method: 'POST',
      body: JSON.stringify({ sessionId, mode, difficulty }),
    });
  },
};

// Answer API
export const answerApi = {
  submit: async (
    sessionId: number,
    questionId: string | undefined,
    mode: string,
    difficulty: string,
    questionText: string,
    userAnswer: string,
    elapsedMs: number,
    correctAnswer?: string
  ) => {
    return apiRequest<{
      isCorrect: boolean;
      correctAnswer: string;
      scoreDelta: number;
      totalScore: number;
      stats: {
        totalQuestions: number;
        totalCorrect: number;
        totalWrong: number;
        accuracy: number;
        avgTimeMs: number;
      };
    }>('/answers/submit', {
      method: 'POST',
      body: JSON.stringify({
        sessionId,
        questionId,
        mode,
        difficulty,
        questionText,
        userAnswer,
        elapsedMs,
        correctAnswer,
      }),
    });
  },
};

// Leaderboard API
export const leaderboardApi = {
  get: async (params: {
    scope?: 'all' | 'weekly' | 'daily';
    limit?: number;
    page?: number;
    offset?: number;
  } = {}) => {
    const queryParams = new URLSearchParams();
    if (params.scope) queryParams.set('scope', params.scope);
    if (params.limit) queryParams.set('limit', params.limit.toString());
    if (params.page) queryParams.set('page', params.page.toString());
    if (params.offset) queryParams.set('offset', params.offset.toString());

    return apiRequest<{
      scope: string;
      updatedAt: string;
      entries: Array<{
        rank: number;
        playerName: string;
        totalScore: number;
        totalQuestions: number;
        accuracy: number;
        avgTimeMs: number | null;
      }>;
      pagination: {
        limit: number;
        offset: number;
        page: number | null;
        total: number;
        hasMore: boolean;
      };
    }>(`/leaderboard?${queryParams.toString()}`);
  },
};

// Player Stats API
export const playerApi = {
  getStats: async (playerName: string) => {
    return apiRequest<{
      playerName: string;
      totalSessions: number;
      totalQuestions: number;
      totalCorrect: number;
      totalWrong: number;
      accuracy: number;
      avgTimeMs: number | null;
      totalScore: number;
      bestScore: number;
      byDifficulty: Array<{
        level: string;
        totalQuestions: number;
        accuracy: number;
        avgTimeMs: number | null;
      }>;
    }>(`/players/${encodeURIComponent(playerName)}/stats`);
  },

  getMetrics: async (playerName: string) => {
    return apiRequest<{
      playerName: string;
      totalSessions: number;
      totalQuestions: number;
      totalCorrect: number;
      totalWrong: number;
      accuracy: number;
      averageResponseTime: number | null;
      totalScore: number;
      bestScore: number;
      byDifficulty: Array<{
        level: string;
        totalQuestions: number;
        accuracy: number;
        avgTimeMs: number | null;
      }>;
      timestamp: string;
    }>(`/players/${encodeURIComponent(playerName)}/metrics`);
  },
};

// Analytics API (optional - for admin)
export const analyticsApi = {
  getOverview: async (level?: string) => {
    const url = level ? `/analytics/overview?level=${level}` : '/analytics/overview';
    return apiRequest<any>(url);
  },
};

// Metrics API (admin only)
export const metricsApi = {
  get: async (adminApiKey: string) => {
    return apiRequest<{
      // Real-time performance metrics (60-second window)
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
      // Enhanced analytics (all-time and time-based)
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
    }>('/metrics', {
      headers: {
        'X-Admin-API-Key': adminApiKey,
      },
    });
  },

  reset: async (adminApiKey: string) => {
    return apiRequest<{ message: string }>('/metrics/reset', {
      method: 'POST',
      headers: {
        'X-Admin-API-Key': adminApiKey,
      },
    });
  },
};

