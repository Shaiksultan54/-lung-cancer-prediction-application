import React, { ReactNode } from 'react';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';

interface StatProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  change?: number;
  isPositive?: boolean;
  className?: string;
}

const Stat: React.FC<StatProps> = ({
  title,
  value,
  icon,
  change,
  isPositive,
  className = '',
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-neutral-500">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-neutral-900">{value}</p>
        </div>
        {icon && (
          <div className="p-2 bg-primary-50 rounded-full text-primary-600">
            {icon}
          </div>
        )}
      </div>
      {typeof change !== 'undefined' && (
        <div className="mt-4 flex items-center">
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
              isPositive ? 'bg-success-100 text-success-800' : 'bg-error-100 text-error-800'
            }`}
          >
            {isPositive ? (
              <ArrowUpIcon className="mr-1 h-3 w-3" />
            ) : (
              <ArrowDownIcon className="mr-1 h-3 w-3" />
            )}
            {Math.abs(change)}%
          </span>
          <span className="ml-2 text-xs text-neutral-500">from previous period</span>
        </div>
      )}
    </div>
  );
};

export default Stat;