'use client';

import { FC, ReactNode } from 'react';

interface InfoCardProps {
  title: string;
  icon: FC<{ className?: string }>; // Ensure the icon prop accepts className
  data: {
    reportInfo: {
      date: string;
      reportNumber: string;
      reportType: string;
    };
  };
  children?: ReactNode; // Add children property to accept children elements
}

export const InfoCard: FC<InfoCardProps> = ({ title, icon: Icon, children }) => {
  return (
<div className="p-4 rounded-xl transition-all duration-300 hover:shadow-lg bg-white border border-gray-100">
  <div className="grid grid-cols-[auto,1fr] gap-4 items-start"> {/* Grid layout */}
    <Icon className="w-5 h-5 text-gray-400" /> {/* Icon */}
    <div>
      <h3 className="font-semibold text-gray-700 text-lg">{title}</h3> {/* Title */}
      {children && <div className="mt-2 text-sm text-gray-600">{children}</div>}
    </div>
  </div>
</div>

  );
};
