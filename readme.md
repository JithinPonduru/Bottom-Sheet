# Bottom Sheet Component for React

![React](https://img.shields.io/badge/React-18.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-blue)
![Vite](https://img.shields.io/badge/Vite-5.4-blue)

A customizable, accessible bottom sheet component for React with physics-based animations, gesture controls, and keyboard navigation.

## Features

- 🌊 Smooth spring physics animations
- 🖐️ Touch/mouse gesture support with velocity-based snap points
- 📱 Responsive design with mobile-first approach
- ⌨️ Full keyboard navigation and accessibility features
- 🌗 Light/dark mode support
- 📏 Three snap points: closed, half-open, and fully-open

## Demo Preview

The project showcases a bottom sheet component that can be interacted with in multiple ways:

- Drag the handle at the top to move the sheet
- Swipe up/down with velocity-based snapping
- Use keyboard arrows and escape key
- Click the control buttons at the top right

## Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project folder
cd bottom-sheet-component

# Install dependencies
npm install
```

## Usage

### Basic Usage

```tsx
import { BottomSheet, SnapPoint } from './components/BottomSheet';

function App() {
  return (
    <div>
      {/* Your app content */}
      <BottomSheet />
    </div>
  );
}
```

### Using the Hook

The component provides a custom hook for more control:

```tsx
import { useBottomSheet, SnapPoint } from './components/BottomSheet';

function MyComponent() {
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
      console.log('Sheet snapped to:', point);
    }
  });
  
  return (
    <div>
      <button onClick={() => snapTo(SnapPoint.HALF)}>
        Open Sheet
      </button>
      
      {/* Custom sheet implementation */}
    </div>
  );
}
```

## Technical Implementation

The bottom sheet is built with several key components:

- [`useBottomSheet`](src/components/BottomSheet/useBottomSheet.ts ): Main hook that manages the sheet state and coordinates other hooks
- [`useSpringAnimation`](src/components/BottomSheet/useSpringAnimation.ts ): Custom spring physics for natural motion
- [`useGestures`](src/components/BottomSheet/useGestures.ts ): Touch and mouse event handling
- [`BottomSheetContext`](src/components/BottomSheet/BottomSheetContext.tsx ): Context API for sharing sheet state

### Spring Physics

The animation uses a custom spring physics implementation with configurable tension, friction, and precision parameters.

```ts
interface SpringConfig {
  tension: number;   // Controls the "stiffness" of the spring
  friction: number;  // Controls the "damping" effect
  precision: number; // Threshold to determine when to stop animation
}
```

## Development

```bash
# Start development server
npm run dev

# Lint code
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

## Accessibility

The component follows WCAG 2.1 accessibility guidelines with:

- Proper ARIA roles and attributes
- Keyboard navigation (arrow keys, escape)
- Focus management
- Touch-friendly targets
- Color contrast compliance

## Browser Compatibility

- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers on iOS and Android
- Progressive enhancement for older browsers

## License

MIT

## Author

Jithin Ponduru

---

Made with React, TypeScript, and Tailwind CSS. Uses the [Vite](https://vitejs.dev/) build tool for fast development.