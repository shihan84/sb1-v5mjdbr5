import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  className?: string;
}

export function ErrorMessage({ message, className = '' }: ErrorMessageProps) {
  return (
    <div className={`flex items-center p-4 text-red-700 bg-red-50 rounded-lg ${className}`}>
      <AlertCircle className="w-5 h-5 mr-2" />
      <span>{message}</span>
    </div>
  );
}