'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Launch, Rocket } from '@/types/spacex';
import { formatDate, getStatusColor, getStatusText } from '@/utils';

interface MissionModalProps {
  launch: Launch | null;
  rocket?: Rocket;
  isOpen: boolean;
  onClose: () => void;
}

const MissionModal: React.FC<MissionModalProps> = ({ launch, rocket, isOpen, onClose }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !launch) return null;

  const statusColor = getStatusColor(launch.success);
  const statusText = getStatusText(launch.success, launch.upcoming);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={handleBackdropClick} role="dialog"
    >
      <div
        className={`bg-[var(--card-background)] rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-300 ${
          isOpen ? 'scale-100' : 'scale-95'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-[var(--card-border)] sticky top-0 bg-[var(--card-background)] z-10">
          <h2 className="text-3xl font-bold text-[var(--foreground)]">{launch.name}</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 rounded-full transition-all duration-200 hover:bg-gray-200 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            aria-label="Close modal"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="mb-6 flex justify-center">
                <div className="relative w-[220px] h-[220px] bg-gray-200 dark:bg-gray-700 rounded-full">
                    <Image
                      src={launch.links.patch?.large || launch.links.patch?.small || '/demo-pic.svg'}
                      alt={`${launch.name} mission patch`}
                      fill
                        sizes="(max-width: 1024px) 30vw, 220px"
                      className="object-contain p-2"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/demo-pic.svg';
                      }}
                    />
                </div>
              </div>

              <div className="space-y-5">
                <div className="p-4 bg-[var(--background)] rounded-lg">
                  <span className="block text-sm font-semibold text-gray-500 dark:text-gray-400">Flight Number</span>
                  <p className="text-xl font-bold text-[var(--foreground)]">{launch.flight_number}</p>
                </div>
                <div className="p-4 bg-[var(--background)] rounded-lg">
                  <span className="block text-sm font-semibold text-gray-500 dark:text-gray-400">Launch Date</span>
                  <p className="text-lg text-[var(--foreground)]">{formatDate(launch.date_utc)}</p>
                </div>
                <div className="p-4 bg-[var(--background)] rounded-lg">
                  <span className="block text-sm font-semibold text-gray-500 dark:text-gray-400">Status</span>
                  <div className="flex items-center space-x-3 mt-1">
                    <div className={`w-4 h-4 rounded-full ${statusColor}`}></div>
                    <span className="text-xl font-bold text-[var(--foreground)]">{statusText}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">Mission Details</h3>
                  <div className="bg-[var(--background)] rounded-lg p-5">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {launch.details || 'No mission details available.'}
                    </p>
                  </div>
                </div>

                {rocket && (
                  <div>
                    <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">Rocket: {rocket.name}</h3>
                    {rocket.description && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 italic">{rocket.description}</p>
                    )}
                    <div className="bg-[var(--background)] rounded-lg p-5 grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">Height</span>
                        <p className="text-lg font-medium text-[var(--foreground)]">{rocket.height.meters}m ({rocket.height.feet}ft)</p>
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">Mass</span>
                        <p className="text-lg font-medium text-[var(--foreground)]">{rocket.mass.kg.toLocaleString()} kg</p>
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">Success Rate</span>
                        <p className="text-lg font-medium text-[var(--foreground)]">{rocket.success_rate_pct}%</p>
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">Cost per Launch</span>
                        <p className="text-lg font-medium text-[var(--foreground)]">${rocket.cost_per_launch.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">External Links</h3>
                  <div className="flex flex-wrap gap-3">
                    {launch.links.webcast && (
                      <Link href={launch.links.webcast} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 shadow-md transition-all duration-200">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                        Watch Launch
                      </Link>
                    )}
                    {launch.links.wikipedia && (
                      <Link href={launch.links.wikipedia} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 border border-[var(--card-border)] text-base font-medium rounded-lg text-[var(--foreground)] bg-[var(--background)] hover:brightness-95 dark:hover:brightness-125 shadow-md transition-all duration-200">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm-1.313 21.346c-.207-.084-.426-.146-.633-.25a9.799 9.799 0 0 1-1.896-1.207 10.427 10.427 0 0 1-1.618-1.706 10.633 10.633 0 0 1-1.268-2.077 10.97 10.97 0 0 1-.794-2.342 11.34 11.34 0 0 1-.238-2.398c.013-.813.081-1.623.238-2.398a10.97 10.97 0 0 1 .794-2.342 10.633 10.633 0 0 1 1.268-2.077 10.427 10.427 0 0 1 1.618-1.706 9.799 9.799 0 0 1 1.896-1.207c.207-.104.426-.166.633-.25V21.346z"/></svg>
                        Wikipedia
                      </Link>
                    )}
                    {launch.links.article && (
                      <Link href={launch.links.article} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 border border-[var(--card-border)] text-base font-medium rounded-lg text-[var(--foreground)] bg-[var(--background)] hover:brightness-95 dark:hover:brightness-125 shadow-md transition-all duration-200">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        Read Article
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionModal;