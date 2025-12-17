import { useState, useCallback, useEffect } from 'react';
import { sessionApi, questionApi, answerApi } from '@/lib/api';
import type { GameMode, Difficulty, Question, AnswerResult } from '@/lib/types';

interface UseGameSessionReturn {
  // State
  sessionId: number | null;
  currentQuestion: Question | null;
  isLoading: boolean;
  error: string | null;
  stats: AnswerResult['stats'] | null;
  
  // Actions
  startSession: (playerName: string, mode?: GameMode, difficulty?: Difficulty) => Promise<boolean>;
  generateQuestion: (mode: GameMode, difficulty: Difficulty) => Promise<Question | null>;
  submitAnswer: (userAnswer: string, elapsedMs: number) => Promise<AnswerResult | null>;
  endSession: () => Promise<any>;
  clearError: () => void;
  reset: () => void;
}

export function useGameSession(): UseGameSessionReturn {
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<AnswerResult['stats'] | null>(null);

  // Load session from sessionStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedSessionId = sessionStorage.getItem('gameSessionId');
      if (storedSessionId) {
        setSessionId(Number(storedSessionId));
      }
    }
  }, []);

  // Save sessionId to sessionStorage when it changes
  useEffect(() => {
    if (sessionId && typeof window !== 'undefined') {
      sessionStorage.setItem('gameSessionId', sessionId.toString());
    } else if (!sessionId && typeof window !== 'undefined') {
      sessionStorage.removeItem('gameSessionId');
    }
  }, [sessionId]);

  const startSession = useCallback(
    async (playerName: string, mode?: GameMode, difficulty?: Difficulty): Promise<boolean> => {
      setIsLoading(true);
      setError(null);
      
      try {
        const result = await sessionApi.create(playerName, mode, difficulty);
        
        if (result.error) {
          setError(result.error.message);
          setIsLoading(false);
          return false;
        }
        
        if (result.data) {
          setSessionId(result.data.sessionId);
          setIsLoading(false);
          return true;
        }
        
        setIsLoading(false);
        return false;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to start session');
        setIsLoading(false);
        return false;
      }
    },
    []
  );

  const generateQuestion = useCallback(
    async (mode: GameMode, difficulty: Difficulty): Promise<Question | null> => {
      if (!sessionId) {
        setError('No active session');
        return null;
      }
      
      setIsLoading(true);
      setError(null);
      
      try {
        const result = await questionApi.generate(sessionId, mode, difficulty);
        
        if (result.error) {
          setError(result.error.message);
          setIsLoading(false);
          return null;
        }
        
        if (result.data) {
          setCurrentQuestion(result.data);
          setIsLoading(false);
          return result.data;
        }
        
        setIsLoading(false);
        return null;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to generate question');
        setIsLoading(false);
        return null;
      }
    },
    [sessionId]
  );

  const submitAnswer = useCallback(
    async (userAnswer: string, elapsedMs: number): Promise<AnswerResult | null> => {
      if (!sessionId || !currentQuestion) {
        setError('No active session or question');
        return null;
      }
      
      setIsLoading(true);
      setError(null);
      
      try {
        const result = await answerApi.submit(
          sessionId,
          currentQuestion.questionId,
          currentQuestion.mode,
          currentQuestion.difficulty,
          currentQuestion.questionText,
          userAnswer,
          elapsedMs
        );
        
        if (result.error) {
          setError(result.error.message);
          setIsLoading(false);
          return null;
        }
        
        if (result.data) {
          setStats(result.data.stats);
          setIsLoading(false);
          return result.data;
        }
        
        setIsLoading(false);
        return null;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to submit answer');
        setIsLoading(false);
        return null;
      }
    },
    [sessionId, currentQuestion]
  );

  const endSession = useCallback(async () => {
    if (!sessionId) {
      return null;
    }
    
    setIsLoading(true);
    
    try {
      const result = await sessionApi.end(sessionId);
      setIsLoading(false);
      
      // Clear session state
      setSessionId(null);
      setCurrentQuestion(null);
      setStats(null);
      
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('gameSessionId');
      }
      
      return result.data || null;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to end session');
      setIsLoading(false);
      return null;
    }
  }, [sessionId]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const reset = useCallback(() => {
    setSessionId(null);
    setCurrentQuestion(null);
    setStats(null);
    setError(null);
    setIsLoading(false);
    
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('gameSessionId');
    }
  }, []);

  return {
    sessionId,
    currentQuestion,
    isLoading,
    error,
    stats,
    startSession,
    generateQuestion,
    submitAnswer,
    endSession,
    clearError,
    reset,
  };
}

