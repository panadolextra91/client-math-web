'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/Common/Input';
import { Button } from '@/components/Common/Button';
import { validateNumericAnswer } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface AnswerInputProps {
  onSubmit: (answer: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  className?: string;
}

export function AnswerInput({
  onSubmit,
  isLoading = false,
  disabled = false,
  autoFocus = true,
  className,
}: AnswerInputProps) {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState<string | undefined>();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current && !disabled) {
      inputRef.current.focus();
    }
  }, [autoFocus, disabled]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAnswer(value);
    
    // Clear error when user starts typing
    if (error) {
      setError(undefined);
    }
  };

  const handleSubmit = () => {
    const validation = validateNumericAnswer(answer);
    
    if (!validation.isValid) {
      setError(validation.error);
      return;
    }

    onSubmit(answer);
    setAnswer('');
    setError(undefined);
    
    // Refocus input after submission
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading && !disabled) {
      handleSubmit();
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      <Input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        placeholder="Enter your answer"
        value={answer}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        error={error}
        disabled={disabled || isLoading}
        className="text-center text-2xl font-light"
      />
      <div className="flex justify-center">
        <Button
          variant="primary"
          size="lg"
          onClick={handleSubmit}
          isLoading={isLoading}
          disabled={disabled || !answer.trim()}
          className="min-w-[200px]"
        >
          Submit Answer
        </Button>
      </div>
    </div>
  );
}

