'use client';

import { useParams, useRouter } from 'next/navigation';
import { usePlayerStats } from '@/hooks/usePlayerStats';
import { PlayerStats } from '@/components/Stats';
import { Button } from '@/components/Common/Button';
import { ErrorToastContainer } from '@/components/Common/ErrorToast';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PlayerStatsPage() {
  const params = useParams();
  const router = useRouter();
  const playerName = params.playerName as string;

  const { stats, isLoading, error, refresh, clearError } = usePlayerStats({
    playerName: playerName || null,
    autoLoad: true,
  });

  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (error) {
      setErrors((prev) => [...prev, error]);
      clearError();
    }
  }, [error, clearError]);

  const handleDismissError = (index: number) => {
    setErrors((prev) => prev.filter((_, i) => i !== index));
  };

  if (!playerName) {
    router.push('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-beige-50 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Link href="/">
            <Button variant="ghost" size="sm">
              ← Back to Home
            </Button>
          </Link>
          <Link href="/leaderboard">
            <Button variant="outline" size="sm">
              View Leaderboard
            </Button>
          </Link>
        </div>

        {/* Player Stats */}
        <PlayerStats stats={stats} isLoading={isLoading} error={error || undefined} />

        {/* Action Buttons */}
        {stats && (
          <div className="flex justify-center gap-4">
            <Link href={`/game?player=${encodeURIComponent(playerName)}&mode=arithmetic&difficulty=easy`}>
              <Button variant="primary" size="lg">
                Play Again
              </Button>
            </Link>
          </div>
        )}

        {/* Error Toasts */}
        <ErrorToastContainer errors={errors} onDismiss={handleDismissError} />
      </div>
    </div>
  );
}


