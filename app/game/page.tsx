'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGameSession } from '@/hooks/useGameSession';
import {
  QuestionCard,
  AnswerInput,
  ScoreDisplay,
  Timer,
  FeedbackMessage,
  ProgressIndicator,
  GameControls,
} from '@/components/Game';
import { ErrorToastContainer } from '@/components/Common/ErrorToast';
import { LoadingSpinner } from '@/components/Common/LoadingSpinner';
import type { GameMode, Difficulty, AnswerResult } from '@/lib/types';

export default function GamePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const playerName = searchParams.get('player') || '';
  const mode = (searchParams.get('mode') as GameMode) || 'arithmetic';
  const difficulty = (searchParams.get('difficulty') as Difficulty) || 'easy';

  const {
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
  } = useGameSession();

  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [previousScore, setPreviousScore] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{
    isCorrect: boolean;
    correctAnswer?: string;
    scoreDelta?: number;
  } | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  // Initialize session
  useEffect(() => {
    if (playerName && !sessionId && !isLoading) {
      startSession(playerName, mode, difficulty);
    }
  }, [playerName, mode, difficulty, sessionId, isLoading, startSession]);

  // Generate first question
  useEffect(() => {
    if (sessionId && !currentQuestion && !isLoading) {
      generateQuestion(mode, difficulty);
    }
  }, [sessionId, currentQuestion, mode, difficulty, isLoading, generateQuestion]);

  // Start timer when question loads
  useEffect(() => {
    if (currentQuestion) {
      setStartTime(Date.now());
      setFeedback(null);
    }
  }, [currentQuestion]);

  // Handle errors
  useEffect(() => {
    if (error) {
      setErrors((prev) => [...prev, error]);
      clearError();
    }
  }, [error, clearError]);

  const handleAnswerSubmit = async (userAnswer: string) => {
    if (!startTime || !currentQuestion) return;

    const elapsedMs = Date.now() - startTime;
    const result: AnswerResult | null = await submitAnswer(userAnswer, elapsedMs);

    if (result) {
      setPreviousScore(score);
      setScore(result.totalScore);
      setFeedback({
        isCorrect: result.isCorrect,
        correctAnswer: result.correctAnswer,
        scoreDelta: result.scoreDelta,
      });
      setStartTime(null);
    }
  };

  const handleFeedbackComplete = () => {
    setFeedback(null);
    // Generate next question
    if (sessionId) {
      generateQuestion(mode, difficulty);
    }
  };

  const handleEndGame = async () => {
    const result = await endSession();
    // Small delay to ensure session is processed on the server
    setTimeout(() => {
      router.push(`/stats/${encodeURIComponent(playerName)}`);
    }, 500);
  };

  const handleDismissError = (index: number) => {
    setErrors((prev) => prev.filter((_, i) => i !== index));
  };

  // Redirect if no player name
  if (!playerName) {
    router.push('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-beige-50 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-light text-beige-900 mb-2">
            {playerName}
          </h1>
          <p className="text-sm text-beige-600 capitalize">
            {mode} • {difficulty}
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ScoreDisplay score={score} previousScore={previousScore} />
          <Timer
            startTime={startTime}
            maxTimeMs={currentQuestion?.maxTimeMs}
          />
          {stats && (
            <ProgressIndicator
              totalQuestions={stats.totalQuestions}
              totalCorrect={stats.totalCorrect}
              totalWrong={stats.totalWrong}
              accuracy={stats.accuracy}
              className="sm:col-span-2 lg:col-span-1"
            />
          )}
        </div>

        {/* Question Card */}
        <QuestionCard question={currentQuestion} isLoading={isLoading} />

        {/* Answer Input */}
        {currentQuestion && !feedback && (
          <AnswerInput
            onSubmit={handleAnswerSubmit}
            isLoading={isLoading}
            disabled={!!feedback}
          />
        )}

        {/* Game Controls */}
        <GameControls onEndGame={handleEndGame} isLoading={isLoading} />

        {/* Feedback Message */}
        {feedback && (
          <FeedbackMessage
            isCorrect={feedback.isCorrect}
            correctAnswer={feedback.correctAnswer}
            scoreDelta={feedback.scoreDelta}
            onAnimationComplete={handleFeedbackComplete}
          />
        )}

        {/* Error Toasts */}
        <ErrorToastContainer errors={errors} onDismiss={handleDismissError} />
      </div>
    </div>
  );
}

