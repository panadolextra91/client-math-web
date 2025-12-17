'use client';

import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ErrorToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
  className?: string;
}

export function ErrorToast({
  message,
  onClose,
  duration = 5000,
  className,
}: ErrorToastProps) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);
  
  return (
    <div
      className={cn(
        'fixed top-4 right-4 z-50 max-w-md',
        'bg-red-50 border-2 border-red-200 rounded-lg shadow-lg',
        'p-4 flex items-start gap-3',
        'animate-in slide-in-from-top-5 fade-in',
        className
      )}
      role="alert"
    >
      <div className="flex-shrink-0">
        <svg
          className="w-5 h-5 text-red-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-red-800">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="flex-shrink-0 text-red-400 hover:text-red-600 transition-colors"
        aria-label="Close error message"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}

interface ErrorToastContainerProps {
  errors: string[];
  onDismiss: (index: number) => void;
}

export function ErrorToastContainer({
  errors,
  onDismiss,
}: ErrorToastContainerProps) {
  if (errors.length === 0) return null;
  
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {errors.map((error, index) => (
        <ErrorToast
          key={index}
          message={error}
          onClose={() => onDismiss(index)}
        />
      ))}
    </div>
  );
}


