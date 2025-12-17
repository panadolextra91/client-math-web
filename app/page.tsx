'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Common/Card';
import { Input } from '@/components/Common/Input';
import { Button } from '@/components/Common/Button';
import { validatePlayerName, sanitizePlayerName } from '@/lib/utils';
import type { GameMode, Difficulty } from '@/lib/types';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const [playerName, setPlayerName] = useState('');
  const [mode, setMode] = useState<GameMode>('arithmetic');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [error, setError] = useState<string | undefined>();
  const [isStarting, setIsStarting] = useState(false);

  const handleStart = () => {
    const validation = validatePlayerName(playerName);
    
    if (!validation.isValid) {
      setError(validation.error);
      return;
    }

    const sanitized = sanitizePlayerName(playerName);
    setIsStarting(true);
    
    // Navigate to game page with query params
    router.push(
      `/game?player=${encodeURIComponent(sanitized)}&mode=${mode}&difficulty=${difficulty}`
    );
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 bg-beige-50">
      <div className="max-w-2xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-light text-beige-900 tracking-tight">
            Math Learning Game
          </h1>
          <p className="text-lg text-beige-700 font-light">
            Practice math skills with fun challenges
          </p>
        </div>

        {/* Game Setup Form */}
        <Card variant="elevated" className="w-full">
          <CardHeader>
            <CardTitle>Start New Game</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Player Name Input */}
            <Input
              label="Player Name"
              placeholder="Enter your name"
              value={playerName}
              onChange={(e) => {
                setPlayerName(e.target.value);
                setError(undefined);
              }}
              error={error}
              helperText="Your name will appear on the leaderboard"
              onKeyPress={(e) => e.key === 'Enter' && handleStart()}
              autoFocus
            />

            {/* Game Mode Selection */}
            <div>
              <label className="block text-sm font-medium text-beige-700 mb-2">
                Game Mode
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setMode('arithmetic')}
                  aria-pressed={mode === 'arithmetic'}
                  className={`
                    px-4 py-3 rounded-lg border-2 transition-all font-medium
                    focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                    ${
                      mode === 'arithmetic'
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-beige-300 bg-beige-50 text-beige-700 hover:border-beige-400 active:scale-95'
                    }
                  `}
                >
                  Arithmetic
                </button>
                <button
                  onClick={() => setMode('equation')}
                  aria-pressed={mode === 'equation'}
                  className={`
                    px-4 py-3 rounded-lg border-2 transition-all font-medium
                    focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                    ${
                      mode === 'equation'
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-beige-300 bg-beige-50 text-beige-700 hover:border-beige-400 active:scale-95'
                    }
                  `}
                >
                  Equation
                </button>
              </div>
            </div>

            {/* Difficulty Selection */}
            <div>
              <label className="block text-sm font-medium text-beige-700 mb-2">
                Difficulty
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['easy', 'medium', 'hard'] as Difficulty[]).map((level) => (
                  <button
                    key={level}
                    onClick={() => setDifficulty(level)}
                    aria-pressed={difficulty === level}
                    className={`
                      px-2 sm:px-4 py-3 rounded-lg border-2 transition-all font-medium capitalize
                      focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                      ${
                        difficulty === level
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-beige-300 bg-beige-50 text-beige-700 hover:border-beige-400 active:scale-95'
                      }
                    `}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Start Button */}
            <Button
              variant="primary"
              size="lg"
              onClick={handleStart}
              isLoading={isStarting}
              disabled={!playerName.trim()}
              className="w-full"
            >
              Start Game
            </Button>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/leaderboard">
            <Button variant="outline" size="md" className="w-full sm:w-auto">
              View Leaderboard
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
