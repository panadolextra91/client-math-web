import React from 'react';
import { Button } from '@/components/Common/Button';
import { cn } from '@/lib/utils';

interface GameControlsProps {
  onEndGame: () => void;
  isLoading?: boolean;
  className?: string;
}

export function GameControls({ onEndGame, isLoading, className }: GameControlsProps) {
  const handleEndGame = () => {
    if (window.confirm('Are you sure you want to end the game? Your progress will be saved.')) {
      onEndGame();
    }
  };

  return (
    <div className={cn('flex justify-center gap-4', className)}>
      <Button
        variant="outline"
        size="md"
        onClick={handleEndGame}
        disabled={isLoading}
      >
        End Game
      </Button>
    </div>
  );
}



