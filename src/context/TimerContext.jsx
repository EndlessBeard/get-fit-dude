import React, { createContext, useContext, useReducer, useEffect, useRef } from 'react';
import { localStorageUtils } from '../hooks/useLocalStorage';
import { createTimerStage, formatTime, getTotalDuration } from '../utils/timerUtils';
import { initialTimerStages } from '../data/initialWorkoutPlan';

// Action types
const actions = {
  SET_STAGES: 'SET_STAGES',
  ADD_STAGE: 'ADD_STAGE',
  UPDATE_STAGE: 'UPDATE_STAGE',
  REMOVE_STAGE: 'REMOVE_STAGE',
  REORDER_STAGES: 'REORDER_STAGES',
  SET_CURRENT_STAGE_INDEX: 'SET_CURRENT_STAGE_INDEX',
  SET_REMAINING_TIME: 'SET_REMAINING_TIME',
  SET_TIMER_STATUS: 'SET_TIMER_STATUS',
  RESET_TIMER: 'RESET_TIMER',
  RESET_ALL_STAGES: 'RESET_ALL_STAGES',
};

// Timer status constants
const TIMER_STATUS = {
  IDLE: 'idle',
  RUNNING: 'running',
  PAUSED: 'paused',
  COMPLETED: 'completed',
};

// Storage keys
const STORAGE_KEYS = {
  TIMER_STAGES: 'get-fit-dude-timer-stages',
};

// Initial state
const initialState = {
  stages: [],
  currentStageIndex: 0,
  remainingTime: 0,
  status: TIMER_STATUS.IDLE,
};

// Reducer function
function timerReducer(state, action) {
  switch (action.type) {
    case actions.SET_STAGES:
      return {
        ...state,
        stages: action.payload,
        remainingTime: action.payload.length > 0 ? action.payload[0].duration : 0,
        currentStageIndex: 0,
        status: TIMER_STATUS.IDLE,
      };

    case actions.ADD_STAGE: {
      const newStages = [...state.stages, action.payload];
      return {
        ...state,
        stages: newStages,
        remainingTime: state.status === TIMER_STATUS.IDLE && state.currentStageIndex === 0
          ? newStages[0].duration
          : state.remainingTime,
      };
    }

    case actions.UPDATE_STAGE: {
      const { id, updates } = action.payload;
      const newStages = state.stages.map(stage => 
        stage.id === id ? { ...stage, ...updates } : stage
      );
      
      // If we're updating the current stage's duration and the timer is idle,
      // update the remaining time as well
      const currentStage = state.stages[state.currentStageIndex];
      const isUpdatingCurrentStageDuration = 
        currentStage && 
        currentStage.id === id && 
        updates.duration !== undefined && 
        state.status === TIMER_STATUS.IDLE;
      
      return {
        ...state,
        stages: newStages,
        remainingTime: isUpdatingCurrentStageDuration 
          ? updates.duration 
          : state.remainingTime,
      };
    }

    case actions.REMOVE_STAGE: {
      const newStages = state.stages.filter(stage => stage.id !== action.payload);
      const newIndex = Math.min(state.currentStageIndex, newStages.length - 1);
      
      return {
        ...state,
        stages: newStages,
        currentStageIndex: newIndex >= 0 ? newIndex : 0,
        remainingTime: newStages.length > 0 && newIndex >= 0 
          ? (state.status === TIMER_STATUS.IDLE ? newStages[newIndex].duration : state.remainingTime) 
          : 0,
        status: newStages.length === 0 ? TIMER_STATUS.IDLE : state.status,
      };
    }

    case actions.REORDER_STAGES: {
      const { fromIndex, toIndex } = action.payload;
      const newStages = [...state.stages];
      const [movedStage] = newStages.splice(fromIndex, 1);
      newStages.splice(toIndex, 0, movedStage);
      
      // Adjust current stage index if necessary
      let newCurrentIndex = state.currentStageIndex;
      if (state.currentStageIndex === fromIndex) {
        newCurrentIndex = toIndex;
      } else if (
        fromIndex < state.currentStageIndex && 
        toIndex >= state.currentStageIndex
      ) {
        newCurrentIndex--;
      } else if (
        fromIndex > state.currentStageIndex && 
        toIndex <= state.currentStageIndex
      ) {
        newCurrentIndex++;
      }
      
      return {
        ...state,
        stages: newStages,
        currentStageIndex: newCurrentIndex,
      };
    }

    case actions.SET_CURRENT_STAGE_INDEX: {
      const newIndex = Math.max(0, Math.min(action.payload, state.stages.length - 1));
      return {
        ...state,
        currentStageIndex: newIndex,
        remainingTime: state.status === TIMER_STATUS.IDLE 
          ? state.stages[newIndex].duration 
          : state.remainingTime,
      };
    }

    case actions.SET_REMAINING_TIME:
      return {
        ...state,
        remainingTime: action.payload,
      };

    case actions.SET_TIMER_STATUS:
      return {
        ...state,
        status: action.payload,
      };

    case actions.RESET_TIMER:
      return {
        ...state,
        remainingTime: state.stages.length > 0 
          ? state.stages[state.currentStageIndex].duration 
          : 0,
        status: TIMER_STATUS.IDLE,
      };

    case actions.RESET_ALL_STAGES:
      return {
        ...initialState,
        stages: initialTimerStages,
        remainingTime: initialTimerStages.length > 0 ? initialTimerStages[0].duration : 0,
      };

    default:
      return state;
  }
}

// Create context
export const TimerContext = createContext();

// Context provider
export const TimerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(timerReducer, initialState);
  const timerRef = useRef(null);
  const beepSoundRef = useRef(null);

  // Initialize stages from localStorage or default
  useEffect(() => {
    const storedStages = localStorageUtils.getItem(STORAGE_KEYS.TIMER_STAGES);
    
    if (storedStages && storedStages.length > 0) {
      dispatch({ type: actions.SET_STAGES, payload: storedStages });
    } else {
      dispatch({ type: actions.SET_STAGES, payload: initialTimerStages });
    }

    // Create a beep sound for the final countdown
    const beepSound = new Audio();
    beepSound.src = 'data:audio/mp3;base64,//uQxAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAAFAAAGhgCFhYWFhYWFhYWFhYWFhYXl5eXl5eXl5eXl5eXl5eX19fX19fX19fX19fX19fX///////////////////8AAAA8TEFNRTMuOTlyAc0AAAAAAAAAABSAJAOkQgAAgAAABobXqlfbAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sQxAADwAABpAAAACAAADSAAAAETEFNRTMuOTkuNVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=';
    beepSoundRef.current = beepSound;

    return () => {
      // Clean up
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Save stages to localStorage whenever they change
  useEffect(() => {
    if (state.stages.length > 0) {
      localStorageUtils.setItem(STORAGE_KEYS.TIMER_STAGES, state.stages);
    }
  }, [state.stages]);

  // Timer logic
  useEffect(() => {
    if (state.status === TIMER_STATUS.RUNNING) {
      timerRef.current = setInterval(() => {
        if (state.remainingTime > 1) {
          dispatch({ type: actions.SET_REMAINING_TIME, payload: state.remainingTime - 1 });
          
          // Play beep sound during final countdown (last 3 seconds of each stage)
          if (state.remainingTime <= 4 && beepSoundRef.current) {
            beepSoundRef.current.currentTime = 0;
            beepSoundRef.current.play().catch(e => console.log('Beep sound error:', e));
          }
        } else {
          // Current stage is complete
          if (state.currentStageIndex < state.stages.length - 1) {
            // Move to next stage
            const nextIndex = state.currentStageIndex + 1;
            dispatch({ type: actions.SET_CURRENT_STAGE_INDEX, payload: nextIndex });
            dispatch({ 
              type: actions.SET_REMAINING_TIME, 
              payload: state.stages[nextIndex].duration 
            });
          } else {
            // All stages complete
            clearInterval(timerRef.current);
            dispatch({ type: actions.SET_TIMER_STATUS, payload: TIMER_STATUS.COMPLETED });
            dispatch({ type: actions.SET_REMAINING_TIME, payload: 0 });
          }
        }
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [state.status, state.remainingTime, state.currentStageIndex, state.stages]);

  // Action creators
  const addStage = (stageName = 'New Stage', duration = 60) => {
    const newStage = createTimerStage(stageName, duration);
    dispatch({ type: actions.ADD_STAGE, payload: newStage });
    return newStage;
  };

  const updateStage = (id, updates) => {
    dispatch({ type: actions.UPDATE_STAGE, payload: { id, updates } });
  };

  const removeStage = (id) => {
    dispatch({ type: actions.REMOVE_STAGE, payload: id });
  };

  const reorderStages = (fromIndex, toIndex) => {
    dispatch({ type: actions.REORDER_STAGES, payload: { fromIndex, toIndex } });
  };

  const setCurrentStage = (index) => {
    dispatch({ type: actions.SET_CURRENT_STAGE_INDEX, payload: index });
    
    // If timer is idle, update remaining time to the new stage's duration
    if (state.status === TIMER_STATUS.IDLE) {
      dispatch({ 
        type: actions.SET_REMAINING_TIME, 
        payload: state.stages[index].duration 
      });
    }
  };

  const startTimer = () => {
    if (state.stages.length === 0) return;
    
    // If timer was completed, reset to first stage before starting
    if (state.status === TIMER_STATUS.COMPLETED) {
      dispatch({ type: actions.SET_CURRENT_STAGE_INDEX, payload: 0 });
      dispatch({ 
        type: actions.SET_REMAINING_TIME, 
        payload: state.stages[0].duration 
      });
    }
    
    dispatch({ type: actions.SET_TIMER_STATUS, payload: TIMER_STATUS.RUNNING });
  };

  const pauseTimer = () => {
    if (state.status === TIMER_STATUS.RUNNING) {
      dispatch({ type: actions.SET_TIMER_STATUS, payload: TIMER_STATUS.PAUSED });
    }
  };

  const resumeTimer = () => {
    if (state.status === TIMER_STATUS.PAUSED) {
      dispatch({ type: actions.SET_TIMER_STATUS, payload: TIMER_STATUS.RUNNING });
    }
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    dispatch({ type: actions.RESET_TIMER });
  };

  const resetAllStages = () => {
    clearInterval(timerRef.current);
    dispatch({ type: actions.RESET_ALL_STAGES });
  };

  const setRemainingTime = (seconds) => {
    dispatch({ type: actions.SET_REMAINING_TIME, payload: seconds });
  };

  // Computed values
  const currentStage = state.stages[state.currentStageIndex] || null;
  const formattedTime = formatTime(state.remainingTime);
  const totalDuration = getTotalDuration(state.stages);
  const progress = totalDuration > 0 
    ? ((totalDuration - state.remainingTime) / totalDuration) * 100 
    : 0;

  // Value to be provided to consumers
  const value = {
    // State
    stages: state.stages,
    currentStageIndex: state.currentStageIndex,
    remainingTime: state.remainingTime,
    status: state.status,
    
    // Computed values
    currentStage,
    formattedTime,
    totalDuration,
    progress,
    isRunning: state.status === TIMER_STATUS.RUNNING,
    isPaused: state.status === TIMER_STATUS.PAUSED,
    isCompleted: state.status === TIMER_STATUS.COMPLETED,
    isInFinalCountdown: state.remainingTime <= 3 && state.remainingTime > 0,
    
    // Action creators
    addStage,
    updateStage,
    removeStage,
    reorderStages,
    setCurrentStage,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    resetAllStages,
    setRemainingTime,
    
    // Constants
    TIMER_STATUS,
  };

  return (
    <TimerContext.Provider value={value}>
      {children}
    </TimerContext.Provider>
  );
};

// Custom hook for using the timer context
export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};