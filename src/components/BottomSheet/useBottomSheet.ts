import { useRef, useState, useCallback, useEffect } from 'react';
import { SnapPoint, UseBottomSheetOptions } from './types';
import { useSpringAnimation } from './useSpringAnimation';
import { useGestures } from './useGestures';

const SNAP_POINT_HEIGHTS = [5, 50, 95];

export function useBottomSheet({
  initialSnapPoint = SnapPoint.CLOSED,
  springConfig,
  onSnapChange
}: UseBottomSheetOptions = {}) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const [snapPoint, setSnapPoint] = useState<SnapPoint>(initialSnapPoint);
  const [sheetHeight, setSheetHeight] = useState<number>(0);
  const [containerHeight, setContainerHeight] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  const getSnapPointPixels = useCallback(() => {
    if (!containerHeight) return [0, 0, 0];
    return SNAP_POINT_HEIGHTS.map(percentage => 
      containerHeight - (containerHeight * percentage / 100)
    );
  }, [containerHeight]);

  const getCurrentSnapPointPixels = useCallback(() => {
    const snapPoints = getSnapPointPixels();
    return snapPoints[snapPoint];
  }, [snapPoint, getSnapPointPixels]);

  const { start: startAnimation, stop: stopAnimation } = useSpringAnimation({
    initialValue: getCurrentSnapPointPixels(),
    springConfig,
    onUpdate: (value) => {
      if (sheetRef.current) {
        sheetRef.current.style.transform = `translateY(${value}px)`;
        const snapPoints = getSnapPointPixels();
        const closedPosition = snapPoints[SnapPoint.CLOSED];
        const fullPosition = snapPoints[SnapPoint.FULL];
        const range = closedPosition - fullPosition;
        if (range > 0) {
          const currentProgress = (closedPosition - value) / range;
          setProgress(Math.max(0, Math.min(1, currentProgress)));
        }
      }
    }
  });

  const { isDragging } = useGestures({
    sheetRef,
    handleRef,
    snapPoints: getSnapPointPixels(),
    onDragStart: stopAnimation,
    onDrag: (y) => {
      if (sheetRef.current) {
        const maxY = containerHeight - (containerHeight * 0.05);
        const minY = containerHeight * 0.05;
        const newY = Math.max(minY, Math.min(y, maxY));
        sheetRef.current.style.transform = `translateY(${newY}px)`;
        
        const snapPoints = getSnapPointPixels();
        const closedPosition = snapPoints[SnapPoint.CLOSED];
        const fullPosition = snapPoints[SnapPoint.FULL];
        const range = closedPosition - fullPosition;
        
        if (range > 0) {
          const currentProgress = (closedPosition - newY) / range;
          setProgress(Math.max(0, Math.min(1, currentProgress)));
        }
      }
    },
    onDragEnd: (velocity, y) => {
      const snapPoints = getSnapPointPixels();
      let closestSnapPoint = SnapPoint.CLOSED;
      let closestDistance = Infinity;
      
      const VELOCITY_THRESHOLD = 300;
      
      if (Math.abs(velocity) > VELOCITY_THRESHOLD) {
        closestSnapPoint = velocity > 0 
          ? Math.max(SnapPoint.CLOSED, snapPoint - 1)
          : Math.min(SnapPoint.FULL, snapPoint + 1);
      } else {
        snapPoints.forEach((point, index) => {
          const distance = Math.abs(point - y);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestSnapPoint = index as SnapPoint;
          }
        });
      }
      
      snapTo(closestSnapPoint);
    }
  });

  const snapTo = useCallback((point: SnapPoint) => {
    setSnapPoint(point);
    startAnimation(getSnapPointPixels()[point]);
    if (onSnapChange) {
      onSnapChange(point);
    }
  }, [getSnapPointPixels, startAnimation, onSnapChange]);

  useEffect(() => {
    const updateDimensions = () => {
      if (sheetRef.current) {
        setSheetHeight(sheetRef.current.offsetHeight);
        setContainerHeight(window.innerHeight);
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!isDragging) {
      startAnimation(getCurrentSnapPointPixels());
    }
  }, [snapPoint, containerHeight, getCurrentSnapPointPixels, isDragging, startAnimation]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        snapTo(SnapPoint.CLOSED);
      } else if (e.key === 'ArrowUp' && snapPoint < SnapPoint.FULL) {
        snapTo((snapPoint + 1) as SnapPoint);
      } else if (e.key === 'ArrowDown' && snapPoint > SnapPoint.CLOSED) {
        snapTo((snapPoint - 1) as SnapPoint);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [snapPoint, snapTo]);

  return {
    sheetRef,
    handleRef,
    snapPoint,
    snapTo,
    progress,
    isDragging
  };
}