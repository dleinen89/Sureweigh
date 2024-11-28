'use client';

import { FC } from 'react';
import { VehicleDetails } from '@/types/weight-analysis';

interface DetailsGridProps {
  details: VehicleDetails;
}

export const DetailsGrid: FC<DetailsGridProps> = ({ details }) => (
  <div className="grid grid-cols-3 gap-4">
    {Object.entries(details).map(([key, value]) => (
      <div key={key} className="text-sm">
        <div className="text-gray-500">{key.charAt(0).toUpperCase() + key.slice(1)}</div>
        <div className="font-medium">{value}</div>
      </div>
    ))}
  </div>
);