'use client';

import { FC } from 'react';

interface WeightDistributionCardProps {
  title: string;
  leftLabel: string;
  rightLabel: string;
  leftValue: string;
  rightValue: string;
}

export const WeightDistributionCard: FC<WeightDistributionCardProps> = ({
  title,
  leftLabel,
  rightLabel,
  leftValue,
  rightValue,
}) => (
  <div className="bg-white p-4 rounded-xl border border-gray-100">
    <h4 className="text-sm font-medium text-gray-700 mb-2">{title}</h4>
    <div className="flex justify-between text-sm mb-1">
      <span>{leftLabel}: {leftValue}%</span>
      <span>{rightLabel}: {rightValue}%</span>
    </div>
    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
      <div 
        className="h-full bg-blue-500 rounded-full"
        style={{ width: `${leftValue}%` }}
      />
    </div>
  </div>
);