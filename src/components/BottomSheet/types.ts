export enum SnapPoint {
  CLOSED = 0,
  HALF = 1,
  FULL = 2
}

export interface SpringConfig {
  tension: number;
  friction: number;
  precision: number;
}

export interface BottomSheetProps {
  initialSnapPoint?: SnapPoint;
  showHandle?: boolean;
  showControls?: boolean;
  enableDrag?: boolean;
  enableKeyboard?: boolean;
  springConfig?: SpringConfig;
  className?: string;
  onSnapChange?: (snapPoint: SnapPoint) => void;
  id?: string;
}

export interface BottomSheetContextType {
  currentSnapPoint: SnapPoint;
  snapTo: (point: SnapPoint) => void;
  isAnimating: boolean;
  progress: number;
}

export interface UseBottomSheetOptions {
  initialSnapPoint?: SnapPoint;
  springConfig?: SpringConfig;
  onSnapChange?: (snapPoint: SnapPoint) => void;
}

export interface UseGesturesOptions {
  sheetRef: React.RefObject<HTMLDivElement>;
  handleRef: React.RefObject<HTMLDivElement>;
  snapPoints: number[];
  onDragStart?: () => void;
  onDrag?: (y: number) => void;
  onDragEnd?: (velocity: number, y: number) => void;
  enabled?: boolean;
}

export interface UseSpringAnimationOptions {
  initialValue?: number;
  springConfig?: SpringConfig;
  onUpdate?: (value: number) => void;
  onComplete?: () => void;
}