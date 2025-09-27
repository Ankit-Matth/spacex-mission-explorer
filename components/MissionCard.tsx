'use client';

import React, { memo } from 'react';
import { Launch, Rocket } from '@/types/spacex';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { toggleFavorite } from '@/store/launchesSlice';
import { formatDate, truncateText, getStatusColor, getStatusText } from '@/utils';
import Image from 'next/image';

interface MissionCardProps {
  launch: Launch;
  rocket?: Rocket;
  onClick: () => void;
}

const MissionCard: React.FC<MissionCardProps> = memo(({ launch, rocket, onClick }) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.launches.favorites);
  const isFavorite = favorites.includes(launch.id);
  const statusColor = getStatusColor(launch.success);
  const statusText = getStatusText(launch.success, launch.upcoming);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleFavorite(launch.id));
  };

  return (
    <div
      className="bg-[var(--card-background)] rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-[var(--foreground)] truncate mb-1">
            {launch.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {formatDate(launch.date_utc)}
          </p>
        </div>
        
        <div className="w-20 h-20 ml-4 flex-shrink-0">
          <Image
            src={launch.links.patch.small || '/demo-pic.svg'}
            alt={`${launch.name} mission patch`}
            width={80}
            height={80}
            className="w-full h-full object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/demo-pic.svg';
            }}
          />
        </div>
      </div>

      <div className="mb-6 flex-grow">
        <p className="text-base text-[var(--foreground)]">
          <span className="font-semibold">Rocket:</span> {rocket?.name || 'N/A'}
        </p>
        {launch.details && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 italic">
            {truncateText(launch.details, 120)}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center space-x-3">
          <div className={`w-4 h-4 rounded-full ${statusColor}`}></div>
          <span className="text-base font-semibold text-[var(--foreground)]">{statusText}</span>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={handleFavoriteClick}
            className={`p-2 rounded-full transition-all duration-300 transform hover:cursor-pointer hover:scale-110 ${
              isFavorite
                ? 'bg-red-100 dark:bg-red-900/50'
                : 'bg-gray-100 text-gray-500 hover:bg-red-100 hover:text-red-500 dark:bg-gray-700/50 dark:text-gray-400 dark:hover:bg-red-900/50 dark:hover:text-red-400'
            }`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Image 
              src={isFavorite ? '/red-heart.svg' : '/outlined-heart.svg'} 
              width={20} 
              height={20} 
              alt='Favorite'
            />
          </button>
          
          <button 
            onClick={onClick}
            className="px-4 py-2 text-base font-semibold bg-[var(--primary)] text-white rounded-lg shadow-md hover:brightness-110 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-opacity-75 transition-all duration-300"
            aria-label={`View details for ${launch.name}`}
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
});

MissionCard.displayName = 'MissionCard';

export default MissionCard;