import { useRef, useCallback, useEffect } from 'react';
import { UseSpringAnimationOptions, SpringConfig } from './types';

const DEFAULT_SPRING_CONFIG: SpringConfig = {
  tension: 170,
  friction: 26,
  precision: 0.01
};

export function useSpringAnimation({
  initialValue = 0,
  springConfig = DEFAULT_SPRING_CONFIG,
  onUpdate,
  onComplete
}: UseSpringAnimationOptions) {
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  
  // State values
  const valueRef = useRef<number>(initialValue);
  const targetRef = useRef<number>(initialValue);
  const velocityRef = useRef<number>(0);
  const isAnimatingRef = useRef<boolean>(false);
  
  // Spring configuration
  const configRef = useRef<SpringConfig>(springConfig);
  
  // Update configuration if it changes
  useEffect(() => {
    configRef.current = springConfig;
  }, [springConfig]);
  
  const animate = useCallback((timestamp: number) => {
    if (!isAnimatingRef.current) return;
    
    // Calculate delta time
    const deltaTime = lastTimeRef.current ? Math.min((timestamp - lastTimeRef.current) / 1000, 0.064) : 0;
    lastTimeRef.current = timestamp;
    
    if (deltaTime === 0) {
      frameRef.current = requestAnimationFrame(animate);
      return;
    }
    
    // Spring physics calculation
    const { tension, friction, precision } = configRef.current;
    
    // Calculate spring force
    const displacement = targetRef.current - valueRef.current;
    const springForce = tension * displacement;
    
    // Calculate damping force
    const dampingForce = -friction * velocityRef.current;
    
    // Calculate acceleration
    const acceleration = springForce + dampingForce;
    
    // Update velocity
    velocityRef.current += acceleration * deltaTime;
    
    // Update position
    const delta = velocityRef.current * deltaTime;
    valueRef.current += delta;
    
    // Notify about the update
    if (onUpdate) {
      onUpdate(valueRef.current);
    }
    
    // Check if animation should stop
    if (
      Math.abs(displacement) < precision &&
      Math.abs(velocityRef.current) < precision
    ) {
      // Snap exactly to target
      valueRef.current = targetRef.current;
      if (onUpdate) onUpdate(valueRef.current);
      
      isAnimatingRef.current = false;
      if (onComplete) onComplete();
      return;
    }
    
    // Continue animation
    frameRef.current = requestAnimationFrame(animate);
  }, [onUpdate, onComplete]);
  
  const start = useCallback((target: number, initialVelocity = 0) => {
    // Cancel any ongoing animation
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
    }
    
    // Set target and initial velocity
    targetRef.current = target;
    velocityRef.current = initialVelocity;
    
    // Start animation
    isAnimatingRef.current = true;
    lastTimeRef.current = 0;
    frameRef.current = requestAnimationFrame(animate);
  }, [animate]);
  
  const stop = useCallback(() => {
    isAnimatingRef.current = false;
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  }, []);
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);
  
  return {
    start,
    stop,
    isAnimating: isAnimatingRef.current,
    value: valueRef.current
  };
}