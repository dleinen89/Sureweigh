'use client';

import { FC } from 'react';

interface WeightDisplayProps {
  label: string;
  weight: number;
  isHighlighted: boolean;
  className?: string;
}

export const WeightDisplay: FC<WeightDisplayProps> = ({ 
  label, 
  weight, 
  isHighlighted, 
  className = '' 
}) => (
  <div className={`p-4 rounded-xl transition-all duration-300 ${
    isHighlighted 
      ? 'bg-gradient-to-br from-blue-50 to-blue-100 shadow-md scale-105' 
      : 'bg-gradient-to-br from-gray-50 to-gray-100'
    } ${className}`}>
    <div className="text-sm font-medium text-gray-600 text-center">{label}</div>
    <div className="mt-1 flex items-center justify-center">
      <span className={`text-2xl font-bold ${isHighlighted ? 'text-blue-600' : 'text-gray-700'}`}>
        {weight}
      </span>
      <span className="ml-1 text-sm text-gray-500">kg</span>
    </div>
  </div>
);
