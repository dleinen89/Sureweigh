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
    <div className="p-6 rounded-xl transition-all duration-300 hover:shadow-lg bg-white border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Icon className="w-5 h-5 text-gray-400" />
            <span className="font-semibold text-gray-700">{title}</span>
          </div>
        </div>
      </div>
      
      {children && <div className="mt-4">{children}</div>} {/* Render children if provided */}
    </div>
  );
};
