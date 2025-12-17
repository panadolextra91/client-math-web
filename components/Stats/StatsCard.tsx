import React from 'react';
import { Card, CardContent } from '@/components/Common/Card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  variant?: 'default' | 'highlight' | 'success' | 'warning';
  icon?: React.ReactNode;
  className?: string;
}

export function StatsCard({
  title,
  value,
  subtitle,
  variant = 'default',
  icon,
  className,
}: StatsCardProps) {
  const variants = {
    default: 'text-beige-900',
    highlight: 'text-green-600',
    success: 'text-green-600',
    warning: 'text-red-500',
  };

  return (
    <Card variant="elevated" className={cn('', className)}>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-beige-600 uppercase tracking-wide">
              {title}
            </h3>
            {icon && <div className="text-beige-400">{icon}</div>}
          </div>
          <div className={cn('text-3xl font-light', variants[variant])}>
            {value}
          </div>
          {subtitle && (
            <p className="text-xs text-beige-500 font-light">{subtitle}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}


