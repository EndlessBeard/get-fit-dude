import React from 'react';
import { useTimer } from '../../context/TimerContext';

const CountdownTimer = () => {
  const {
    formattedTime,
    isRunning,
    isPaused,
    isCompleted,
    isInFinalCountdown,
    progress,
  } = useTimer();

  // Calculate the circular progress bar properties
  const size = 160;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Circle center coordinates
  const center = size / 2;

  return (
    <div className="flex justify-center mb-5">
      <div className="relative">
        {/* SVG circular progress */}
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke="#333"
            strokeWidth={strokeWidth}
          />
          
          {/* Progress circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke={isCompleted ? '#6b46c1' : isInFinalCountdown ? '#f6ad55' : '#6b46c1'}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={isInFinalCountdown ? 'animate-pulse' : ''}
            style={{
              transition: 'stroke-dashoffset 0.3s ease'
            }}
          />
        </svg>
        
        {/* Timer display */}
        <div
          className={`absolute inset-0 flex items-center justify-center ${
            isInFinalCountdown ? 'timer-countdown-flash' : ''
          }`}
        >
          <div className="text-center">
            <div
              className={`text-4xl font-bold ${
                isInFinalCountdown ? 'text-secondary' : isCompleted ? 'text-green-500' : ''
              }`}
            >
              {formattedTime}
            </div>
            
            <div className="text-xs text-gray-400 mt-1">
              {isRunning
                ? 'Running'
                : isPaused
                ? 'Paused'
                : isCompleted
                ? 'Completed'
                : 'Ready'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;