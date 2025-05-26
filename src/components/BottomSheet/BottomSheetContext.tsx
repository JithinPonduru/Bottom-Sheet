import React, { createContext, useContext, useState, useCallback } from 'react';
import { SnapPoint, BottomSheetContextType } from './types';

const BottomSheetContext = createContext<BottomSheetContextType | undefined>(undefined);

export function useBottomSheetContext(): BottomSheetContextType {
  const context = useContext(BottomSheetContext);
  if (context === undefined) {
    throw new Error('useBottomSheetContext must be used within a BottomSheetProvider');
  }
  return context;
}

interface BottomSheetProviderProps {
  children: React.ReactNode;
  initialSnapPoint?: SnapPoint;
}

export function BottomSheetProvider({
  children,
  initialSnapPoint = SnapPoint.CLOSED
}: BottomSheetProviderProps) {
  const [currentSnapPoint, setCurrentSnapPoint] = useState<SnapPoint>(initialSnapPoint);
  const [isAnimating, setIsAnimating] = useState(false);
  const [progress, setProgress] = useState(0);

  const snapTo = useCallback((point: SnapPoint) => {
    setIsAnimating(true);
    setCurrentSnapPoint(point);
    // Animation will be handled by the actual component
    // This is just for state management
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  }, []);

  const value = {
    currentSnapPoint,
    snapTo,
    isAnimating,
    progress
  };

  return (
    <BottomSheetContext.Provider value={value}>
      {children}
    </BottomSheetContext.Provider>
  );
}