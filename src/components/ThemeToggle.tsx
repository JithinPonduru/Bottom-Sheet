import React from 'react';
import { SunIcon, MoonIcon } from './Icons';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500"
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};

export default ThemeToggle;