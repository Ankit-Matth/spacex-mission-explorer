'use client';

import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchLaunches, fetchRockets } from '@/store/launchesSlice';
import SearchAndFilters from '@/components/SearchAndFilters';
import MissionsList from '@/components/MissionList';
import ErrorMessage from '@/components/ErrorMessage';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import Link from 'next/link';
import Image from 'next/image';
import ThemeToggle from '@/components/ThemeToggle';

export default function Home() {
  const dispatch = useAppDispatch();
  const { favorites, error, loading } = useAppSelector((state) => state.launches);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    dispatch(fetchLaunches());
    dispatch(fetchRockets());
  }, [dispatch]);

  const handleRetry = () => {
    dispatch(fetchLaunches());
    dispatch(fetchRockets());
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="bg-[var(--card-background)] text-[var(--foreground)] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between animate-fade-in-down space-y-4 md:space-y-0">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
                Atmosly • SpaceX Mission Explorer
              </h1>
              <p className="mt-2 text-sm sm:text-base text-gray-400">
                Your portal to the cosmos of SpaceX achievements.
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 sm:space-x-3 bg-black/20 backdrop-blur-sm rounded-full px-3 py-2 text-sm lg:text-base">
                <Image src={'/red-heart.svg'} alt="Favourite" width={20} height={20} />
                <span className="font-semibold text-[var(--foreground)]">
                  {isClient ? `${favorites.length} Favorites` : '...'}
                </span>
              </div>
              <ThemeToggle /> 
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <SearchAndFilters />
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <ErrorMessage message="Failed to fetch data." onRetry={handleRetry} />
        ) : (
          <MissionsList />
        )}
      </main>

      <footer className="bg-[var(--card-background)] shadow-inner mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between text-gray-400">
            <div className="text-sm">
              <p>
                Data courtesy of the{' '}
                <Link
                  href="https://github.com/r-spacex/SpaceX-API"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[var(--primary)] hover:brightness-125 transition-colors"
                >
                  SpaceX-API Project
                </Link>
              </p>
            </div>
            <div className="text-sm font-medium">
              <p>&copy; {new Date().getFullYear()} Atmosly Mission Explorer</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}