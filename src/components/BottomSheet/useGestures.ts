import { useEffect, useCallback, useState } from 'react';
import { UseGesturesOptions } from './types';

export function useGestures({
  sheetRef,
  handleRef,
  snapPoints,
  onDragStart,
  onDrag,
  onDragEnd,
  enabled = true
}: UseGesturesOptions) {
  const [isDragging, setIsDragging] = useState(false);
  
  // Track touch/mouse position and velocity
  const touchStartY = useCallback((event: TouchEvent | MouseEvent) => {
    if (!enabled) return;
    
    // Prevent default behavior only for mouse events to avoid
    // interfering with native touch behaviors
    if (event.type === 'mousedown') {
      event.preventDefault();
    }
    
    setIsDragging(true);
    if (onDragStart) onDragStart();
    
    // Get the initial touch/click position
    const startY = 'touches' in event 
      ? event.touches[0].clientY 
      : event.clientY;
    
    // Track time for velocity calculation
    let lastY = startY;
    let lastTime = Date.now();
    let velocity = 0;
    
    // Function to handle touch/mouse move
    const handleTouchMove = (moveEvent: TouchEvent | MouseEvent) => {
      if (!isDragging) return;
      
      // Get current position
      const currentY = 'touches' in moveEvent 
        ? moveEvent.touches[0].clientY 
        : moveEvent.clientY;
      
      // Calculate velocity
      const now = Date.now();
      const dt = now - lastTime;
      
      if (dt > 0) {
        // Positive velocity means moving down
        velocity = (currentY - lastY) / dt;
        
        lastY = currentY;
        lastTime = now;
      }
      
      // Call the onDrag callback with the current position
      if (onDrag) onDrag(currentY);
    };
    
    // Function to handle touch/mouse end
    const handleTouchEnd = () => {
      if (!isDragging) return;
      
      setIsDragging(false);
      
      // Call the onDragEnd callback with the final velocity
      if (onDragEnd) onDragEnd(velocity * 1000, lastY); // Convert to pixels per second
      
      // Remove event listeners
      document.removeEventListener('touchmove', handleTouchMove as EventListener);
      document.removeEventListener('mousemove', handleTouchMove as EventListener);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('mouseup', handleTouchEnd);
    };
    
    // Add event listeners for move and end events
    document.addEventListener('touchmove', handleTouchMove as EventListener, { passive: false });
    document.addEventListener('mousemove', handleTouchMove as EventListener);
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('mouseup', handleTouchEnd);
  }, [enabled, isDragging, onDrag, onDragEnd, onDragStart]);
  
  // Add event listeners to the handle and sheet elements
  useEffect(() => {
    const handle = handleRef.current;
    const sheet = sheetRef.current;
    
    if (!handle || !sheet || !enabled) return;
    
    // Add touch/mouse start event listeners
    handle.addEventListener('touchstart', touchStartY as EventListener, { passive: false });
    handle.addEventListener('mousedown', touchStartY as EventListener);
    
    // Only make the sheet draggable if there's no handle
    if (!handle) {
      sheet.addEventListener('touchstart', touchStartY as EventListener, { passive: false });
      sheet.addEventListener('mousedown', touchStartY as EventListener);
    }
    
    // Clean up event listeners on unmount
    return () => {
      if (handle) {
        handle.removeEventListener('touchstart', touchStartY as EventListener);
        handle.removeEventListener('mousedown', touchStartY as EventListener);
      }
      
      if (!handle && sheet) {
        sheet.removeEventListener('touchstart', touchStartY as EventListener);
        sheet.removeEventListener('mousedown', touchStartY as EventListener);
      }
    };
  }, [handleRef, sheetRef, touchStartY, enabled]);
  
  return { isDragging };
}