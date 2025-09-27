'use client';

import React, { useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useDebounce } from '@/hooks/useDebounce';
import {
  setSearchTerm,
  setSelectedYear,
  toggleSuccessfulOnly,
  toggleFavoritesOnly,
} from '@/store/launchesSlice';
import { getUniqueYears } from '@/utils';
import CustomDropdown from './CustomDropdown';

const SearchAndFilters: React.FC = () => {
  const dispatch = useAppDispatch();
  const { launches, searchTerm, selectedYear, showSuccessfulOnly, showFavoritesOnly } = useAppSelector(
    (state) => state.launches
  );

  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const debouncedSearchTerm = useDebounce(localSearchTerm, 900);

  React.useEffect(() => {
    dispatch(setSearchTerm(debouncedSearchTerm));
  }, [debouncedSearchTerm, dispatch]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchTerm(e.target.value);
  }, []);

  const handleYearChange = useCallback((year: string) => {
    dispatch(setSelectedYear(year));
  }, [dispatch]);

  const handleSuccessToggle = useCallback(() => {
    dispatch(toggleSuccessfulOnly());
  }, [dispatch]);

  const handleFavoritesToggle = useCallback(() => {
    dispatch(toggleFavoritesOnly());
  }, [dispatch]);

  const uniqueYears = getUniqueYears(launches);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-end md:space-x-4 space-y-4 md:space-y-0">
        <div className="flex-1">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search Missions
          </label>
          <div className="relative">
            <input
              id="search"
              type="text"
              value={localSearchTerm}
              onChange={handleSearchChange}
              placeholder="Search by mission name..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex-shrink-0">
          <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
            Launch Year
          </label>
          <CustomDropdown
            options={uniqueYears}
            value={selectedYear}
            onChange={handleYearChange}
            placeholder="All years"
          />
        </div>

        <div className="flex-shrink-0">
          <div className="flex flex-row gap-4 h-full items-center">
            <label className="flex flex-col items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={showSuccessfulOnly}
                  onChange={handleSuccessToggle}
                  className="sr-only"
                />
                <div
                  className={`block w-14 h-8 rounded-full ${
                    showSuccessfulOnly ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                ></div>
                <div
                  className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${
                    showSuccessfulOnly ? 'transform translate-x-full' : ''
                  }`}
                ></div>
              </div>
              <span className="mt-2 text-xs text-gray-700">Successful only</span>
            </label>
            <label className="flex flex-col items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={showFavoritesOnly}
                  onChange={handleFavoritesToggle}
                  className="sr-only" 
                />
                <div
                  className={`block w-14 h-8 rounded-full ${
                    showFavoritesOnly ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                ></div>
                <div
                  className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${
                    showFavoritesOnly ? 'transform translate-x-full' : ''
                  }`}
                ></div>
              </div>
              <span className="mt-2 text-xs text-gray-700">Favorites only</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilters;