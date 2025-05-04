import React from 'react';
import { useTimer } from '../context/TimerContext';
import CountdownTimer from './TimerPanel/CountdownTimer';
import MultiStageControls from './TimerPanel/MultiStageControls';

const TimerPanel = () => {
  const {
    formattedTime,
    isRunning,
    isPaused,
    isCompleted,
    currentStage,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    setCurrentStage,
    currentStageIndex,
    stages
  } = useTimer();

  // Button click handlers with animation
  const handleButtonClick = (element, callback) => {
    element.classList.add('btn-glow-click');
    setTimeout(() => {
      element.classList.remove('btn-glow-click');
    }, 800);
    callback();
  };

  // Handle start/pause/resume
  const handleTimerControl = (e) => {
    if (isRunning) {
      handleButtonClick(e.currentTarget, pauseTimer);
    } else if (isPaused) {
      handleButtonClick(e.currentTarget, resumeTimer);
    } else {
      handleButtonClick(e.currentTarget, startTimer);
    }
  };

  // Handle reset
  const handleReset = (e) => {
    handleButtonClick(e.currentTarget, resetTimer);
  };

  // Handle previous stage
  const handlePrevStage = (e) => {
    if (currentStageIndex > 0) {
      handleButtonClick(e.currentTarget, () => setCurrentStage(currentStageIndex - 1));
    }
  };

  // Handle next stage
  const handleNextStage = (e) => {
    if (currentStageIndex < stages.length - 1) {
      handleButtonClick(e.currentTarget, () => setCurrentStage(currentStageIndex + 1));
    }
  };

  return (
    <div className="timer-panel">
      <h2 className="text-lg font-display font-bold mb-3 text-secondary">
        Workout Timer
      </h2>

      <div className="bg-darkgray rounded-lg p-4">
        {/* Circular timer display */}
        <CountdownTimer />

        {/* Current stage name */}
        <div className="text-center mb-4">
          <div className="text-sm text-gray-400">Current Stage</div>
          <div className="font-medium text-lg">
            {currentStage ? currentStage.name : 'No stages set'}
          </div>
        </div>

        {/* Timer control buttons */}
        <div className="flex justify-center space-x-3 mb-5">
          <button
            className={`timer-control-btn ${isCompleted ? 'bg-primary' : isRunning ? 'bg-red-500' : 'bg-green-500'}`}
            onClick={handleTimerControl}
            aria-label={isRunning ? "Pause" : isPaused ? "Resume" : "Start"}
          >
            {isRunning ? '⏸' : isPaused ? '▶️' : '▶'}
          </button>
          
          <button
            className="timer-control-btn bg-gray-600"
            onClick={handleReset}
            aria-label="Reset Timer"
          >
            ↺
          </button>
        </div>

        {/* Multi-stage controls */}
        <div className="border-t border-gray-700 pt-4">
          {/* Stage navigation buttons */}
          <div className="flex justify-between mb-3">
            <button
              className="btn bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed py-1 px-3"
              onClick={handlePrevStage}
              disabled={currentStageIndex <= 0 || isRunning}
              aria-label="Previous Stage"
            >
              ← Prev Stage
            </button>
            
            <div className="text-center text-sm">
              {currentStageIndex + 1}/{stages.length}
            </div>
            
            <button
              className="btn bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed py-1 px-3"
              onClick={handleNextStage}
              disabled={currentStageIndex >= stages.length - 1 || isRunning}
              aria-label="Next Stage"
            >
              Next Stage →
            </button>
          </div>

          {/* Multi-stage controls component */}
          <MultiStageControls />
        </div>
      </div>
    </div>
  );
};

export default TimerPanel;