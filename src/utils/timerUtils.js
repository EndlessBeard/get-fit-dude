// timerUtils.js

/**
 * Timer utility functions for Get Fit Dude app
 */

export const startTimer = (duration, onTick, onComplete) => {
    let timeRemaining = duration;
    const intervalId = setInterval(() => {
        if (timeRemaining <= 0) {
            clearInterval(intervalId);
            onComplete();
        } else {
            onTick(timeRemaining);
            timeRemaining -= 1;
        }
    }, 1000);
    return intervalId;
};

/**
 * Format seconds into MM:SS format
 * @param {number} totalSeconds - Total seconds to format
 * @returns {string} Formatted time string (MM:SS)
 */
export const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

/**
 * Parse a time string in MM:SS format into total seconds
 * @param {string} timeString - Time string in MM:SS format
 * @returns {number} Total seconds
 */
export const parseTime = (timeString) => {
    const [minutes, seconds] = timeString.split(':').map(Number);
    return (minutes * 60) + seconds;
};

/**
 * Format seconds into separate minutes and seconds
 * @param {number} totalSeconds - Total seconds
 * @returns {Object} Object with minutes and seconds properties
 */
export const getMinutesAndSeconds = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    return { minutes, seconds };
};

/**
 * Check if a timer is in final countdown phase (last 10 seconds)
 * @param {number} remainingSeconds - Remaining seconds
 * @returns {boolean} True if in final countdown
 */
export const isInFinalCountdown = (remainingSeconds) => {
    return remainingSeconds <= 10 && remainingSeconds > 0;
};

/**
 * Calculate the progress percentage of a timer
 * @param {number} elapsed - Elapsed time in seconds
 * @param {number} total - Total time in seconds
 * @returns {number} Progress percentage (0-100)
 */
export const calculateProgress = (elapsed, total) => {
    if (total <= 0) return 0;
    return Math.min(100, Math.max(0, (elapsed / total) * 100));
};

/**
 * Create a timer stage object
 * @param {string} name - Stage name
 * @param {number} duration - Stage duration in seconds
 * @returns {Object} Timer stage object
 */
export const createTimerStage = (name = 'New Stage', duration = 60) => {
    return {
        id: crypto.randomUUID(),
        name,
        duration
    };
};

/**
 * Get the total duration of multiple timer stages
 * @param {Array} stages - Array of timer stage objects
 * @returns {number} Total duration in seconds
 */
export const getTotalDuration = (stages) => {
    return stages.reduce((total, stage) => total + stage.duration, 0);
};

/**
 * Get a human-readable representation of total time
 * @param {number} totalSeconds - Total seconds
 * @returns {string} Human-readable time string
 */
export const getHumanReadableTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    if (hours > 0) {
        return `${hours}h ${minutes}m ${seconds}s`;
    } else if (minutes > 0) {
        return `${minutes}m ${seconds}s`;
    } else {
        return `${seconds}s`;
    }
};

/**
 * Reset the timer
 * @param {number} intervalId - Interval ID
 */
export const resetTimer = (intervalId) => {
    clearInterval(intervalId);
};