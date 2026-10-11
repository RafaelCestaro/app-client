
import React from 'react';
import { Card } from './Card';

interface KpiCardProps {
  metric: string;
  value: string;
  unit: string;
  className?: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({ metric, value, unit, className }) => {
  return (
    <Card className={`text-center ${className}`}>
      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{metric}</p>
      <p className="text-2xl md:text-3xl font-bold text-loco-red">
        {value}<span className="text-lg text-gray-700 dark:text-gray-300 ml-1">{unit}</span>
      </p>
    </Card>
  );
};
