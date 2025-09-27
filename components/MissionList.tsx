'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setCurrentPage } from '@/store/launchesSlice';
import { Launch } from '@/types/spacex';
import { getYearFromDate } from '@/utils';
import MissionCard from './MissionCard';
import MissionModal from './MissionModal';
import LoadingSkeleton from './LoadingSkeleton';
import ErrorMessage from './ErrorMessage';
import EmptyState from './EmptyState';

const MissionsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    launches,
    rockets,
    loading,
    error,
    searchTerm,
    selectedYear,
    showSuccessfulOnly,
    showFavoritesOnly,
    favorites,
    currentPage,
  } = useAppSelector((state) => state.launches);

  const [selectedLaunch, setSelectedLaunch] = useState<Launch | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const itemsPerPage = 9;

  const filteredLaunches = useMemo(() => {
    return launches.filter((launch) => {
      if (searchTerm && !launch.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      if (selectedYear && getYearFromDate(launch.date_utc) !== selectedYear) {
        return false;
      }
      if (showSuccessfulOnly && !launch.success) {
        return false;
      }
      if (showFavoritesOnly && !favorites.includes(launch.id)) {
        return false;
      }
      return true;
    });
  }, [launches, searchTerm, selectedYear, showSuccessfulOnly, showFavoritesOnly, favorites]);

  const totalPages = Math.ceil(filteredLaunches.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedLaunches = filteredLaunches.slice(startIndex, endIndex);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      dispatch(setCurrentPage(totalPages));
    }
  }, [currentPage, totalPages, dispatch]);

  const handleMissionClick = (launch: Launch) => {
    setSelectedLaunch(launch);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedLaunch(null);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(setCurrentPage(newPage));
    }
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (filteredLaunches.length === 0) {
    return (
        <EmptyState
            title="No missions found"
            description="Try adjusting your search criteria."
            icon={
                <svg className="w-16 h-16 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
            }
        />
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-[var(--foreground)] opacity-80">
          Showing {paginatedLaunches.length} of {filteredLaunches.length} missions
        </p>

        <div className="flex flex-wrap items-center justify-end gap-2 text-xs">
          {searchTerm && (
            <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 px-2 py-1 rounded-full">
              Search: {searchTerm}
            </span>
          )}
          {selectedYear && (
            <span className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 px-2 py-1 rounded-full">
              Year: {selectedYear}
            </span>
          )}
          {showSuccessfulOnly && (
            <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 px-2 py-1 rounded-full">
              Successful only
            </span>
          )}
          {showFavoritesOnly && (
            <span className="bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300 px-2 py-1 rounded-full">
              Favorites only
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedLaunches.map((launch) => (
          <MissionCard
            key={launch.id}
            launch={launch}
            rocket={rockets[launch.rocket]}
            onClick={() => handleMissionClick(launch)}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-medium text-[var(--foreground)] bg-[var(--card-background)] border border-[var(--card-border)] rounded-l-md hover:bg-[var(--background)] hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-sm text-[var(--foreground)] bg-[var(--card-background)] border-t border-b border-[var(--card-border)]">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm font-medium text-[var(--foreground)] bg-[var(--card-background)] border border-[var(--card-border)] rounded-r-md hover:bg-[var(--background)] hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}

      <MissionModal
        launch={selectedLaunch}
        rocket={selectedLaunch ? rockets[selectedLaunch.rocket] : undefined}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </>
  );
};

export default MissionsList;