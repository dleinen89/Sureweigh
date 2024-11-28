"use client";

import { FC, ReactNode } from 'react';
import { OctagonAlert, AlertTriangle, CheckCircle } from 'lucide-react';
import Image from 'next/image';

// Import images
import FrontAxleImage from '../../../public/Front Axle.png';
import RearAxleImage from '../../../public/Rear Axle.png';
import GVMImage from '../../../public/GVM.png';
import AggregateTrailerMassImage from '../../../public/Aggregate Trailer Mass.png';
import GrossTrailerMassImage from '../../../public/Gross Trailer Mass.png';
import CombinationImage from '../../../public/Combination.png';
import TowBallLoadImage from '../../../public/Tow Ball Load.png';
import TowCapImage from '../../../public/Tow Capacity.png';

interface WeightAnalysisCardProps {
  title: string;
  current: number;
  max: number;
  formula?: string;
  section: string;
  extraInfo?: string;
  details?: string;
  activeSection: string | null;
  onSectionChange: (section: string | null) => void;
  children?: ReactNode; // Allow children as optional
}

export const WeightAnalysisCard: FC<WeightAnalysisCardProps> = ({
  title,
  current,
  max,
  formula,
  section,
  details,
  extraInfo,
  activeSection,
  onSectionChange,
  children,
}) => {
  const percentage = (current / max) * 100;
  
  const getStatusColor = (percentage: number) => {
    if (percentage > 100) return 'text-red-500';
    if (percentage > 90) return 'text-amber-500';
    return 'text-emerald-500';
  };

  const getProgressBarColor = (percentage: number) => {
    if (percentage > 100) return 'bg-red-500';
    if (percentage > 90) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  const getStatusIcon = (percentage: number) => {
    if (percentage > 100) return <OctagonAlert className="w-5 h-5 text-red-500" />;
    if (percentage > 90) return <AlertTriangle className="w-5 h-5 text-amber-500" />;
    return <CheckCircle className="w-5 h-5 text-emerald-500" />;
  };

  const getImage = () => {
    switch (title) {
      case 'Front Axle':
        return <Image src={FrontAxleImage} alt="Front Axle" width={100} height={100} />;
      case 'Rear Axle':
        return <Image src={RearAxleImage} alt="Rear Axle" width={100} height={100} />;
      case 'Gross Vehicle Mass (GVM)':
        return <Image src={GVMImage} alt="GVM" width={100} height={100} />;
      case 'Aggregate Trailer Mass (ATM)':
        return <Image src={AggregateTrailerMassImage} alt="Aggregate Trailer Mass" width={100} height={100} />;
      case 'Gross Trailer Mass (GTM)':
        return <Image src={GrossTrailerMassImage} alt="Gross Trailer Mass" width={100} height={100} />;
      case 'Combination':
        return <Image src={CombinationImage} alt="Combination" width={100} height={100} />;
      case 'Tow Ball Load (TBL)':
        return <Image src={TowBallLoadImage} alt="Tow Ball Load" width={100} height={100} />;
      case 'Gross Combination Mass (GCM)':
        return <Image src={CombinationImage} alt="Tow Ball Load" width={100} height={100} />;
      case 'Towing Capacity (TC)':
        return <Image src={TowCapImage} alt="Tow Capacity" width={100} height={100} />;
      default:
        return null;
    }
  };

  return (
    <div 
      className={`p-6 rounded-xl transition-all duration-300 hover:shadow-lg cursor-pointer
        ${activeSection === section 
          ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200' 
          : 'bg-white border-gray-100'
        } border`}
      onMouseEnter={() => onSectionChange(section)}
      onMouseLeave={() => onSectionChange(null)}
      onClick={() => onSectionChange(activeSection === section ? null : section)}
    >
      <div className="flex items-start">
        <div className="w-1/6">
          {getImage()}
        </div>
        <div className="w-5/6 pl-4">
          <div className="flex justify-between items-start mb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700">{title}</span>
              </div>
              <div className="text-sm text-gray-500">
                Maximum: {max}kg
              </div>
            </div>
            <div className="flex items-center gap-2">
              {getStatusIcon(percentage)}
              <span className={`text-2xl font-bold ${getStatusColor(percentage)}`}>
                {current}kg
              </span>
            </div>
          </div>

          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${getProgressBarColor(percentage)}`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>

          <div className="mt-3 flex justify-between text-sm">
            <span className="text-gray-600">Remaining: {max - current}kg</span>
            <span className={`font-medium ${getStatusColor(percentage)}`}>
              {percentage.toFixed(1)}%
            </span>
          </div>

          {activeSection === section && (
            <div className="mt-4 space-y-2">
              {formula && (
                <div className="text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
                  {formula}
                </div>
              )}
              {details && (
                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  {details}
                </div>
              )}
              {extraInfo && (
                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  {extraInfo}
                </div>
              )}
              {children && (
                <div className="mt-4">
                  {children}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
