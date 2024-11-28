'use client';

import { FC } from 'react';

interface TabButtonProps {
  id: string;
  label: string;
  activeTab: string;
  onTabChange: (id: string) => void;
}

export const TabButton: FC<TabButtonProps> = ({ id, label, activeTab, onTabChange }) => (
  <button
    className={`px-6 py-2 text-sm font-medium rounded-full transition-all
      ${activeTab === id 
        ? 'bg-blue-600 text-white shadow-md' 
        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
      }`}
    onClick={() => onTabChange(id)}
  >
    {label}
  </button>
);