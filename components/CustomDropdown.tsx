'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';

interface CustomDropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={handleToggle}
        className="w-full px-4 py-2 space-x-2 text-left bg-[var(--background)] border border-[var(--card-border)] rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent flex justify-between items-center"
      >
        <span>{value || placeholder}</span>
        <svg
          className={`h-5 w-5 text-gray-500 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-[var(--background)] border border-[var(--card-border)] rounded-md shadow-lg">
          <ul className="py-1" style={{ maxHeight: `${7 * 2.5}rem`, overflowY: 'auto' }}>
            <li
              key="all-years"
              className="px-3 py-2 text-sm text-[var(--foreground)] hover:bg-gray-700 cursor-pointer"
            >
              {placeholder}
            </li>
            {options.map((option) => (
              <li
                key={option}
                onClick={() => handleOptionClick(option)}
                className="px-3 py-2 text-sm text-[var(--foreground)] hover:bg-gray-700 cursor-pointer"
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
