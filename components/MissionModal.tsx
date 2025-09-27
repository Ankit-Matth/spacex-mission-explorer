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
      className={`fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={handleBackdropClick}
    >
      <div
        className={`bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-300 ${
          isOpen ? 'scale-100' : 'scale-95'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h2 className="text-3xl font-bold text-gray-900">{launch.name}</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-800 rounded-full transition-all duration-200"
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
              <div className="mb-6 text-center">
                <Image
                  src={launch.links.patch?.large || launch.links.patch?.small || '/demo-pic.svg'}
                  alt={`${launch.name} mission patch`}
                  width={220}
                  height={220}
                  className="mx-auto object-contain rounded-full shadow-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/demo-pic.svg';
                  }}
                />
              </div>

              <div className="space-y-5">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <label className="block text-sm font-semibold text-gray-600">Flight Number</label>
                  <p className="text-xl font-bold text-gray-900">{launch.flight_number}</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <label className="block text-sm font-semibold text-gray-600">Launch Date</label>
                  <p className="text-lg text-gray-800">{formatDate(launch.date_utc)}</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <label className="block text-sm font-semibold text-gray-600">Status</label>
                  <div className="flex items-center space-x-3 mt-1">
                    <div className={`w-4 h-4 rounded-full ${statusColor}`}></div>
                    <span className="text-xl font-bold text-gray-900">{statusText}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Mission Details</h3>
                  <div className="bg-gray-50 rounded-lg p-5 prose prose-sm max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      {launch.details || 'No mission details available.'}
                    </p>
                  </div>
                </div>

                {rocket && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Rocket: {rocket.name}</h3>
                    {rocket.description && (
                      <p className="text-sm text-gray-600 mb-4 italic">{rocket.description}</p>
                    )}
                    <div className="bg-gray-50 rounded-lg p-5 grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-semibold text-gray-600">Height</label>
                        <p className="text-lg font-medium text-gray-900">{rocket.height.meters}m ({rocket.height.feet}ft)</p>
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-gray-600">Mass</label>
                        <p className="text-lg font-medium text-gray-900">{rocket.mass.kg.toLocaleString()} kg</p>
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-gray-600">Success Rate</label>
                        <p className="text-lg font-medium text-gray-900">{rocket.success_rate_pct}%</p>
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-gray-600">Cost per Launch</label>
                        <p className="text-lg font-medium text-gray-900">${rocket.cost_per_launch.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">External Links</h3>
                  <div className="flex flex-wrap gap-3">
                    {launch.links.webcast && (
                      <Link
                        href={launch.links.webcast}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 shadow-md transition-all duration-200"
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                        Watch Launch
                      </Link>
                    )}
                    {launch.links.wikipedia && (
                      <Link
                        href={launch.links.wikipedia}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-100 shadow-md transition-all duration-200"
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm-1.313 21.346c-.207-.084-.426-.146-.633-.25a9.799 9.799 0 0 1-1.896-1.207 10.427 10.427 0 0 1-1.618-1.706 10.633 10.633 0 0 1-1.268-2.077 10.97 10.97 0 0 1-.794-2.342 11.34 11.34 0 0 1-.238-2.398c.013-.813.081-1.623.238-2.398a10.97 10.97 0 0 1 .794-2.342 10.633 10.633 0 0 1 1.268-2.077 10.427 10.427 0 0 1 1.618-1.706 9.799 9.799 0 0 1 1.896-1.207c.207-.104.426-.166.633-.25V21.346z"/></svg>
                        Wikipedia
                      </Link>
                    )}
                    {launch.links.article && (
                      <Link
                        href={launch.links.article}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-100 shadow-md transition-all duration-200"
                      >
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