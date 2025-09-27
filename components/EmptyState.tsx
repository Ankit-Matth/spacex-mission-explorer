'use client';

import React from 'react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  title, 
  description, 
  icon 
}) => {
  const defaultIcon = (
    <svg className="w-16 h-16 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-64 text-center p-8">
      <div className="mb-4">
        {icon || defaultIcon}
      </div>
      <h3 className="text-xl font-medium text-[var(--foreground)] mb-2">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-md">{description}</p>
    </div>
  );
};

export default EmptyState;