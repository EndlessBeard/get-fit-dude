import { useState, useCallback } from 'react';

/**
 * Custom hook for detecting swipe gestures to adjust values
 * @param {Object} options - Configuration options
 * @param {Function} options.onValueChange - Callback for value change
 * @returns {Object} Functions for handling swipe gestures
 */
function useGestureDetection({ onValueChange } = {}) {
  const [isGesturing, setIsGesturing] = useState(false);
  const [gestureData, setGestureData] = useState({
    startY: 0,
    fieldName: null,
    id: null,
    currentValue: 0,
    lastValue: 0
  });

  // Start tracking a swipe gesture
  const handleSwipeStart = useCallback((e, fieldName, id, currentValue) => {
    e.preventDefault(); // Prevent default to avoid scroll interference
    
    // Get starting position
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    setGestureData({
      startY: clientY,
      fieldName,
      id,
      currentValue,
      lastValue: currentValue
    });
    
    setIsGesturing(true);
  }, []);

  // Track movement during a swipe gesture
  const handleSwipeMove = useCallback((e) => {
    if (!isGesturing) return;
    
    e.preventDefault(); // Prevent default to avoid scroll interference
    
    // Get current position
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const diffY = gestureData.startY - clientY;
    
    // Determine value change based on movement
    // Every 20px of movement changes the value by 1
    const valueChange = Math.floor(diffY / 20);
    const newValue = gestureData.currentValue + valueChange;
    
    // Only call onValueChange if the value has changed from the last update
    if (newValue !== gestureData.lastValue && newValue > 0) {
      onValueChange(gestureData.fieldName, gestureData.id, newValue);
      setGestureData(prev => ({ ...prev, lastValue: newValue }));
    }
  }, [isGesturing, gestureData, onValueChange]);

  // End a swipe gesture
  const handleSwipeEnd = useCallback((e) => {
    if (!isGesturing) return;
    
    e.preventDefault(); // Prevent default to avoid scroll interference
    setIsGesturing(false);
  }, [isGesturing]);

  return {
    handleSwipeStart,
    handleSwipeMove,
    handleSwipeEnd,
    isGesturing
  };
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