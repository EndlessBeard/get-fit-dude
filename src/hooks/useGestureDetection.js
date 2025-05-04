import { useRef, useEffect } from 'react';

/**
 * Custom hook for detecting touch gestures
 * @param {Object} options - Configuration options
 * @param {Function} options.onSwipeUp - Callback for swipe up gesture
 * @param {Function} options.onSwipeDown - Callback for swipe down gesture
 * @param {Function} options.onSwipeLeft - Callback for swipe left gesture
 * @param {Function} options.onSwipeRight - Callback for swipe right gesture
 * @param {Function} options.onTap - Callback for tap gesture
 * @param {number} options.threshold - Minimum distance for swipe detection (pixels)
 * @returns {Object} Reference object to attach to the target element
 */
function useGestureDetection({
  onSwipeUp,
  onSwipeDown,
  onSwipeLeft,
  onSwipeRight,
  onTap,
  threshold = 50
} = {}) {
  const elementRef = useRef(null);
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let startX = 0;
    let startY = 0;
    let startTime = 0;
    const TAP_THRESHOLD = 200; // milliseconds
    const TAP_MOVEMENT_THRESHOLD = 10; // pixels

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      startTime = Date.now();
    };

    const handleTouchEnd = (e) => {
      if (!e.changedTouches || !e.changedTouches[0]) return;
      
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const endTime = Date.now();
      
      const diffX = endX - startX;
      const diffY = endY - startY;
      const diffTime = endTime - startTime;
      
      // Check for tap
      if (
        onTap && 
        Math.abs(diffX) < TAP_MOVEMENT_THRESHOLD && 
        Math.abs(diffY) < TAP_MOVEMENT_THRESHOLD &&
        diffTime < TAP_THRESHOLD
      ) {
        onTap(e);
        return;
      }
      
      // Check if horizontal swipe is more significant than vertical swipe
      if (Math.abs(diffX) > Math.abs(diffY)) {
        if (Math.abs(diffX) > threshold) {
          if (diffX > 0 && onSwipeRight) {
            onSwipeRight(e, diffX);
          } else if (diffX < 0 && onSwipeLeft) {
            onSwipeLeft(e, Math.abs(diffX));
          }
        }
      } else {
        if (Math.abs(diffY) > threshold) {
          if (diffY > 0 && onSwipeDown) {
            onSwipeDown(e, diffY);
          } else if (diffY < 0 && onSwipeUp) {
            onSwipeUp(e, Math.abs(diffY));
          }
        }
      }
    };

    // Add event listeners
    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchend', handleTouchEnd);

    // Cleanup
    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onSwipeUp, onSwipeDown, onSwipeLeft, onSwipeRight, onTap, threshold]);

  return elementRef;
}

/**
 * Utility function to create a swipe feedback animation
 * @param {Element} element - DOM element to animate
 * @param {string} direction - Direction of the swipe ('up', 'down', 'left', 'right')
 */
export const createSwipeFeedback = (element, direction) => {
  if (!element) return;
  
  // Add and remove animation class
  element.classList.add('swipe-feedback');
  element.setAttribute('data-swipe', direction);
  
  setTimeout(() => {
    element.classList.remove('swipe-feedback');
    element.removeAttribute('data-swipe');
  }, 300);
};

export default useGestureDetection;