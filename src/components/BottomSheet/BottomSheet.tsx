import React, { useEffect } from 'react';
import { useBottomSheet } from './useBottomSheet';
import { SnapPoint } from './types';
import { ChevronUpIcon, MinimizeIcon, MaximizeIcon } from '../Icons';

const BottomSheet: React.FC = () => {
  const {
    sheetRef,
    handleRef,
    snapPoint,
    snapTo,
    progress,
    isDragging
  } = useBottomSheet({
    initialSnapPoint: SnapPoint.CLOSED,
    onSnapChange: (point) => {
      console.log('Snap point changed to:', point);
    }
  });
  
  // Adjust overlay opacity based on sheet position
  const overlayOpacity = progress * 0.5;
  
  // Set up keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement === handleRef.current) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const nextPoint = snapPoint === SnapPoint.CLOSED 
            ? SnapPoint.HALF 
            : snapPoint === SnapPoint.HALF 
              ? SnapPoint.FULL 
              : SnapPoint.CLOSED;
          snapTo(nextPoint);
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [snapPoint, snapTo, handleRef]);
  
  return (
    <>
      {/* Background overlay */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          snapPoint === SnapPoint.CLOSED ? 'pointer-events-none' : ''
        }`}
        style={{ 
          opacity: overlayOpacity,
          zIndex: 40
        }}
        onClick={() => snapTo(SnapPoint.CLOSED)}
        aria-hidden="true"
      />
      
      {/* Bottom sheet */}
      <div
        ref={sheetRef}
        className="fixed left-0 right-0 bottom-0 bg-white dark:bg-gray-800 rounded-t-2xl shadow-lg transition-colors duration-300"
        style={{
          transform: 'translateY(100%)',
          height: '95vh',
          maxHeight: '95vh',
          zIndex: 50,
          touchAction: 'none',
          willChange: 'transform'
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="bottom-sheet-title"
      >
        {/* Handle */}
        <div
          ref={handleRef}
          className={`absolute top-0 left-0 right-0 h-10 flex justify-center items-center cursor-grab ${
            isDragging ? 'cursor-grabbing' : ''
          }`}
          tabIndex={0}
          role="button"
          aria-label={`${snapPoint === SnapPoint.CLOSED ? 'Open' : 'Adjust'} bottom sheet`}
          aria-controls="bottom-sheet-content"
          aria-expanded={snapPoint !== SnapPoint.CLOSED}
        >
          <div className="w-12 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 my-2 transition-colors duration-300" />
        </div>

        {/* Controls */}
        <div className="absolute top-2 right-4 flex space-x-2">
          <button
            className={`p-1.5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 ${
              snapPoint === SnapPoint.CLOSED 
                ? 'text-blue-500' 
                : 'text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400'
            }`}
            onClick={() => snapTo(SnapPoint.CLOSED)}
            aria-label="Close bottom sheet"
          >
            <MinimizeIcon />
          </button>
          <button
            className={`p-1.5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 ${
              snapPoint === SnapPoint.HALF 
                ? 'text-blue-500' 
                : 'text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400'
            }`}
            onClick={() => snapTo(SnapPoint.HALF)}
            aria-label="Half open bottom sheet"
          >
            <ChevronUpIcon />
          </button>
          <button
            className={`p-1.5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 ${
              snapPoint === SnapPoint.FULL 
                ? 'text-blue-500' 
                : 'text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400'
            }`}
            onClick={() => snapTo(SnapPoint.FULL)}
            aria-label="Fully open bottom sheet"
          >
            <MaximizeIcon />
          </button>
        </div>
        
        {/* Content */}
        <div 
          className="px-6 pt-12 pb-20 h-full overflow-y-auto overscroll-contain" 
          id="bottom-sheet-content"
          style={{ touchAction: 'pan-y' }}
        >
          <h2 id="bottom-sheet-title" className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Bottom Sheet Content
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg transition-colors duration-300">
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-medium text-blue-600 dark:text-blue-400">React Component:</span> Built with functional components and hooks
              </p>
            </div>
            
            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg transition-colors duration-300">
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-medium text-green-600 dark:text-green-400">Spring Animation:</span> Custom physics-based spring animation
              </p>
            </div>
            
            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg transition-colors duration-300">
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-medium text-purple-600 dark:text-purple-400">Gesture Control:</span> Swipe up/down to change sheet position
              </p>
            </div>
            
            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg transition-colors duration-300">
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-medium text-red-600 dark:text-red-400">Accessibility:</span> Keyboard navigation, ARIA attributes, focus management
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 transition-colors duration-300">
                  <div className="w-full h-20 bg-gray-200 dark:bg-gray-600 rounded-md mb-2 transition-colors duration-300" />
                  <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-600 rounded-md transition-colors duration-300" />
                </div>
              ))}
            </div>
            
            <div className="my-8">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Implementation Details</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                <li>Uses React's useRef, useState, useEffect, and useCallback hooks</li>
                <li>Custom spring physics for natural motion feel</li>
                <li>Velocity-based snap point selection</li>
                <li>Touch and mouse event handling</li>
                <li>Keyboard accessibility with arrow keys and escape</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-blue-800 dark:text-blue-300 transition-colors duration-300">
              <p className="text-sm">
                Try dragging the handle at the top or using the buttons to switch between snap points.
                You can also use keyboard: Arrow Up/Down to change position, Escape to close.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomSheet;