'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme;
      }
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 bg-black/20 backdrop-blur-sm rounded-full text-[var(--foreground)] hover:bg-black/30 transition-colors duration-300 hover:cursor-pointer"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Image src="/moon.svg" alt="Switch to dark mode" width={20} height={20} />
      ) : (
        <Image src="/sun.svg" alt="Switch to light mode" width={20} height={20} />
      )}
    </button>
  );
};

export default ThemeToggle;