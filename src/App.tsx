import React, { useState } from 'react';
import BottomSheet from './components/BottomSheet';
import ThemeToggle from './components/ThemeToggle';
import { ThemeProvider } from './context/ThemeContext';
import { HomeIcon, SettingsIcon, UserIcon, BellIcon } from './components/Icons';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const handleOpenSheet = () => {
    const event = new KeyboardEvent('keydown', {
      key: 'ArrowUp',
      bubbles: true,
      cancelable: true
    });
    document.dispatchEvent(event);
  };

  const handleCloseSheet = () => {
    const event = new KeyboardEvent('keydown', {
      key: 'ArrowDown',
      bubbles: true,
      cancelable: true
    });
    document.dispatchEvent(event);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 flex flex-col">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Gradient background */}
          <div className="absolute inset-0 opacity-30 dark:opacity-20">
            <div className="absolute top-0 -left-1/2 w-[200%] h-[200%] animate-slow-spin">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl" />
            </div>
          </div>

          {/* Animated Balls */}
          <div className="absolute top-20 right-[10%] w-64 h-64 animate-float">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400 to-blue-600 opacity-20 dark:opacity-10"></div>
          </div>
          <div className="absolute top-40 left-[5%] w-48 h-48 animate-float-delay-1">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-400 to-purple-600 opacity-20 dark:opacity-10"></div>
          </div>
          <div className="absolute bottom-40 right-[15%] w-56 h-56 animate-float-delay-2">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-pink-400 to-pink-600 opacity-20 dark:opacity-10"></div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <header className="p-4 flex justify-between items-center backdrop-blur-sm bg-white/30 dark:bg-gray-800/30">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                Bottom Sheet Demo
              </h1>
              <div className="hidden md:block px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium">
                Jithin Ponduru
              </div>
            </div>
            <ThemeToggle />
          </header>

          {/* Name Banner for Mobile */}
          <div className="md:hidden mx-4 mt-4 p-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium text-center shadow-lg">
            Jithin Ponduru
          </div>

          {/* Main Content */}
          <main className="flex-1 px-4 py-6 max-w-4xl mx-auto w-full">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl shadow-lg p-6 mb-4 transition-colors duration-300">
              <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-3">
                Interactive Bottom Sheet Demo
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Try these different ways to interact with the bottom sheet:
              </p>
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Gesture Controls:</h3>
                  <ul className="list-disc ml-5 text-sm text-gray-600 dark:text-gray-400">
                    <li>Drag the handle at the top to move the sheet</li>
                    <li>Swipe up or down to snap to different positions</li>
                    <li>Quick swipe to automatically move to the next position</li>
                    <li>Scroll the content when the sheet is open</li>
                  </ul>
                </div>
                
                <div className="flex flex-col gap-2">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Keyboard Navigation:</h3>
                  <ul className="list-disc ml-5 text-sm text-gray-600 dark:text-gray-400">
                    <li>Press <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">↑</kbd> to expand</li>
                    <li>Press <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">↓</kbd> to collapse</li>
                    <li>Press <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">Esc</kbd> to close</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Try it now:</h3>
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={handleOpenSheet}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
                  >
                    Open Sheet
                  </button>
                  <button 
                    onClick={handleCloseSheet}
                    className="px-4 py-2 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
                  >
                    Close Sheet
                  </button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-24">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl shadow-lg p-6 transition-colors duration-300">
                <h3 className="text-md font-medium text-gray-800 dark:text-white mb-2">
                  Technical Features
                </h3>
                <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                  <li className="flex items-start">
                    <span className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-2 py-1 rounded mr-2 mt-0.5">
                      React Hooks
                    </span>
                    <span>Using useState, useRef, useEffect, useCallback</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded mr-2 mt-0.5">
                      Custom Animation
                    </span>
                    <span>Self-implemented spring physics with requestAnimationFrame</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs px-2 py-1 rounded mr-2 mt-0.5">
                      Gestures
                    </span>
                    <span>Manual touch/mouse event handling for drag gestures</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl shadow-lg p-6 transition-colors duration-300">
                <h3 className="text-md font-medium text-gray-800 dark:text-white mb-2">
                  Accessibility
                </h3>
                <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                  <li className="flex items-start">
                    <span className="inline-block bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs px-2 py-1 rounded mr-2 mt-0.5">
                      WCAG 2.1
                    </span>
                    <span>Compliant with accessibility guidelines</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-xs px-2 py-1 rounded mr-2 mt-0.5">
                      Keyboard
                    </span>
                    <span>Full keyboard navigation and focus management</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs px-2 py-1 rounded mr-2 mt-0.5">
                      ARIA
                    </span>
                    <span>Proper ARIA attributes for screen readers</span>
                  </li>
                </ul>
              </div>
            </div>
          </main>

          {/* Bottom Sheet */}
          <BottomSheet />

          {/* Mobile Navigation */}
          <nav className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 px-6 py-2 transition-colors duration-300 z-10">
            <div className="flex justify-around max-w-md mx-auto">
              <button 
                className={`p-2 rounded-full flex flex-col items-center ${activeTab === 'home' ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'}`}
                onClick={() => setActiveTab('home')}
                aria-label="Home"
              >
                <HomeIcon />
                <span className="text-xs mt-1">Home</span>
              </button>
              <button 
                className={`p-2 rounded-full flex flex-col items-center ${activeTab === 'notifications' ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'}`}
                onClick={() => setActiveTab('notifications')}
                aria-label="Notifications"
              >
                <BellIcon />
                <span className="text-xs mt-1">Alerts</span>
              </button>
              <button 
                className={`p-2 rounded-full flex flex-col items-center ${activeTab === 'profile' ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'}`}
                onClick={() => setActiveTab('profile')}
                aria-label="Profile"
              >
                <UserIcon />
                <span className="text-xs mt-1">Profile</span>
              </button>
              <button 
                className={`p-2 rounded-full flex flex-col items-center ${activeTab === 'settings' ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'}`}
                onClick={() => setActiveTab('settings')}
                aria-label="Settings"
              >
                <SettingsIcon />
                <span className="text-xs mt-1">Settings</span>
              </button>
            </div>
          </nav>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;