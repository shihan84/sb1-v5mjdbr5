import React from 'react';
import { Activity } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
}

export function LoadingSpinner({ size = 24, className = '' }: LoadingSpinnerProps) {
  return (
    <div className={`flex items-center justify-center p-4 ${className}`}>
      <Activity className="animate-spin text-gray-500" size={size} />
    </div>
  );
}