import React from 'react';
import { Loader2, ChefHat } from 'lucide-react';

const LoadingSpinner = ({ size = 'md', text = '로딩 중...' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative">
        <Loader2 className={`${sizeClasses[size]} animate-spin text-orange-500`} />
        <ChefHat className={`${sizeClasses[size]} absolute inset-0 text-orange-300 animate-pulse`} />
      </div>
      {text && (
        <p className="mt-4 text-gray-600 font-medium">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
