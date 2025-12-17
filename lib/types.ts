export type GameMode = 'arithmetic' | 'equation';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Session {
  sessionId: number;
  playerName: string;
  mode: GameMode | null;
  difficulty: Difficulty | null;
  startedAt: string;
  finishedAt?: string;
}

export interface Question {
  questionId: string;
  mode: GameMode;
  difficulty: Difficulty;
  type: GameMode;
  questionText: string;
  payload: {
    operands?: number[];
    operators?: string[];
    result?: number;
    answer?: string;
    // For equations
    coefficient?: number;
    constant?: number;
    solution?: number;
  };
  maxTimeMs?: number;
}

export interface AnswerResult {
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
}

export interface LeaderboardEntry {
  rank: number;
  playerName: string;
  totalScore: number;
  totalQuestions: number;
  accuracy: number;
  avgTimeMs: number | null;
}

export interface LeaderboardResponse {
  scope: string;
  updatedAt: string;
  entries: LeaderboardEntry[];
  pagination: {
    limit: number;
    offset: number;
    page: number | null;
    total: number;
    hasMore: boolean;
  };
}

export interface PlayerStats {
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
}


