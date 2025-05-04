import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { localStorageUtils } from '../hooks/useLocalStorage';
import { getInitialData } from '../data/initialWorkoutPlan';
import ExerciseData from '../models/ExerciseData';
import WorkoutPlan from '../models/WorkoutPlan';

// Action types
const actions = {
  SET_SELECTED_DAY: 'SET_SELECTED_DAY',
  SET_EXERCISES: 'SET_EXERCISES',
  SET_WORKOUT_PLAN: 'SET_WORKOUT_PLAN',
  UPDATE_EXERCISE: 'UPDATE_EXERCISE',
  ADD_EXERCISE: 'ADD_EXERCISE',
  ADD_EXERCISE_TO_DAY: 'ADD_EXERCISE_TO_DAY',
  REMOVE_EXERCISE_FROM_DAY: 'REMOVE_EXERCISE_FROM_DAY',
  REPLACE_EXERCISE_IN_DAY: 'REPLACE_EXERCISE_IN_DAY',
  SET_START_DATE: 'SET_START_DATE',
  SET_SELECTED_EXERCISE: 'SET_SELECTED_EXERCISE',
  ADD_HISTORY_ENTRY: 'ADD_HISTORY_ENTRY',
  RESET_TO_INITIAL_DATA: 'RESET_TO_INITIAL_DATA',
};

// Storage keys
const STORAGE_KEYS = {
  EXERCISES: 'get-fit-dude-exercises',
  WORKOUT_PLAN: 'get-fit-dude-workout-plan',
  SELECTED_DAY: 'get-fit-dude-selected-day',
};

// Initial state
const initialState = {
  selectedDay: new Date(),
  exercises: [],
  workoutPlan: null,
  selectedExercise: null,
};

// Reducer function
function workoutReducer(state, action) {
  switch (action.type) {
    case actions.SET_SELECTED_DAY:
      return {
        ...state,
        selectedDay: action.payload,
      };

    case actions.SET_EXERCISES:
      return {
        ...state,
        exercises: action.payload,
      };

    case actions.SET_WORKOUT_PLAN:
      return {
        ...state,
        workoutPlan: action.payload,
      };

    case actions.UPDATE_EXERCISE: {
      const updatedExercises = state.exercises.map((exercise) =>
        exercise.id === action.payload.id
          ? { ...exercise, ...action.payload }
          : exercise
      );
      return {
        ...state,
        exercises: updatedExercises,
        selectedExercise: 
          state.selectedExercise && state.selectedExercise.id === action.payload.id
            ? { ...state.selectedExercise, ...action.payload }
            : state.selectedExercise,
      };
    }

    case actions.ADD_EXERCISE: {
      const newExercise = action.payload;
      return {
        ...state,
        exercises: [...state.exercises, newExercise],
        selectedExercise: newExercise,
      };
    }

    case actions.ADD_EXERCISE_TO_DAY: {
      const { day, exerciseId } = action.payload;
      
      // Create new workout plan with the exercise added to the specified day
      const updatedWorkoutPlan = WorkoutPlan.fromJSON(state.workoutPlan.toJSON());
      updatedWorkoutPlan.addExerciseToDay(day, exerciseId);
      
      return {
        ...state,
        workoutPlan: updatedWorkoutPlan,
      };
    }

    case actions.REMOVE_EXERCISE_FROM_DAY: {
      const { day, exerciseId } = action.payload;
      
      // Create new workout plan with the exercise removed from the specified day
      const updatedWorkoutPlan = WorkoutPlan.fromJSON(state.workoutPlan.toJSON());
      updatedWorkoutPlan.removeExerciseFromDay(day, exerciseId);
      
      return {
        ...state,
        workoutPlan: updatedWorkoutPlan,
      };
    }

    case actions.REPLACE_EXERCISE_IN_DAY: {
      const { day, oldExerciseId, newExerciseId } = action.payload;
      
      // Create new workout plan with the exercise replaced in the specified day
      const updatedWorkoutPlan = WorkoutPlan.fromJSON(state.workoutPlan.toJSON());
      updatedWorkoutPlan.replaceExercise(day, oldExerciseId, newExerciseId);
      
      return {
        ...state,
        workoutPlan: updatedWorkoutPlan,
      };
    }

    case actions.SET_START_DATE: {
      const updatedWorkoutPlan = WorkoutPlan.fromJSON(state.workoutPlan.toJSON());
      updatedWorkoutPlan.startDate = action.payload;
      
      return {
        ...state,
        workoutPlan: updatedWorkoutPlan,
      };
    }

    case actions.SET_SELECTED_EXERCISE: {
      return {
        ...state,
        selectedExercise: action.payload,
      };
    }

    case actions.ADD_HISTORY_ENTRY: {
      const { exerciseId, entry } = action.payload;
      
      const updatedExercises = state.exercises.map((exercise) => {
        if (exercise.id === exerciseId) {
          const updatedExercise = ExerciseData.fromJSON(exercise.toJSON());
          updatedExercise.addHistoryEntry(entry);
          return updatedExercise;
        }
        return exercise;
      });
      
      return {
        ...state,
        exercises: updatedExercises,
        selectedExercise: 
          state.selectedExercise && state.selectedExercise.id === exerciseId
            ? updatedExercises.find(ex => ex.id === exerciseId)
            : state.selectedExercise,
      };
    }

    case actions.RESET_TO_INITIAL_DATA: {
      const { exercises, workoutPlan } = getInitialData();
      return {
        ...state,
        exercises,
        workoutPlan,
        selectedExercise: null,
      };
    }

    default:
      return state;
  }
}

// Create context
export const WorkoutContext = createContext();

// Context provider
export const WorkoutProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutReducer, initialState);

  // Initialize data from localStorage or use default data
  useEffect(() => {
    const storedExercises = localStorageUtils.getItem(STORAGE_KEYS.EXERCISES);
    const storedWorkoutPlan = localStorageUtils.getItem(STORAGE_KEYS.WORKOUT_PLAN);
    const storedSelectedDay = localStorageUtils.getItem(STORAGE_KEYS.SELECTED_DAY);
    
    if (storedExercises && storedWorkoutPlan) {
      // Parse stored data into proper objects
      const exercises = storedExercises.map(ex => ExerciseData.fromJSON(ex));
      const workoutPlan = WorkoutPlan.fromJSON(storedWorkoutPlan);
      
      dispatch({ type: actions.SET_EXERCISES, payload: exercises });
      dispatch({ type: actions.SET_WORKOUT_PLAN, payload: workoutPlan });
      
      if (storedSelectedDay) {
        dispatch({ type: actions.SET_SELECTED_DAY, payload: new Date(storedSelectedDay) });
      }
    } else {
      // Use default data if nothing is stored
      const { exercises, workoutPlan } = getInitialData();
      dispatch({ type: actions.SET_EXERCISES, payload: exercises });
      dispatch({ type: actions.SET_WORKOUT_PLAN, payload: workoutPlan });
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (state.exercises.length > 0) {
      localStorageUtils.setItem(STORAGE_KEYS.EXERCISES, state.exercises.map(ex => ex.toJSON()));
    }
    
    if (state.workoutPlan) {
      localStorageUtils.setItem(STORAGE_KEYS.WORKOUT_PLAN, state.workoutPlan.toJSON());
    }
    
    if (state.selectedDay) {
      localStorageUtils.setItem(STORAGE_KEYS.SELECTED_DAY, state.selectedDay.toISOString());
    }
  }, [state.exercises, state.workoutPlan, state.selectedDay]);

  // Action creators
  const setSelectedDay = (date) => {
    dispatch({ type: actions.SET_SELECTED_DAY, payload: date });
  };

  const updateExercise = (exerciseData) => {
    dispatch({ type: actions.UPDATE_EXERCISE, payload: exerciseData });
  };

  const addExercise = (exerciseData) => {
    const newExercise = new ExerciseData(exerciseData);
    dispatch({ type: actions.ADD_EXERCISE, payload: newExercise });
    return newExercise;
  };

  const addExerciseToDay = (day, exerciseId) => {
    dispatch({ 
      type: actions.ADD_EXERCISE_TO_DAY, 
      payload: { day, exerciseId } 
    });
  };

  const removeExerciseFromDay = (day, exerciseId) => {
    dispatch({ 
      type: actions.REMOVE_EXERCISE_FROM_DAY, 
      payload: { day, exerciseId } 
    });
  };

  const replaceExerciseInDay = (day, oldExerciseId, newExerciseId) => {
    dispatch({
      type: actions.REPLACE_EXERCISE_IN_DAY,
      payload: { day, oldExerciseId, newExerciseId }
    });
  };

  const setWorkoutStartDate = (date) => {
    dispatch({ type: actions.SET_START_DATE, payload: date });
  };

  const setSelectedExercise = (exercise) => {
    dispatch({ type: actions.SET_SELECTED_EXERCISE, payload: exercise });
  };

  const addHistoryEntry = (exerciseId, entry) => {
    dispatch({
      type: actions.ADD_HISTORY_ENTRY,
      payload: { exerciseId, entry }
    });
  };

  const resetToInitialData = () => {
    dispatch({ type: actions.RESET_TO_INITIAL_DATA });
  };

  // Get exercises for the selected day
  const getExercisesForSelectedDay = () => {
    if (!state.workoutPlan || !state.selectedDay) return [];
    
    const day = state.selectedDay.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const exerciseIds = state.workoutPlan.getExercisesForDay(day);
    
    return exerciseIds.map(id => 
      state.exercises.find(ex => ex.id === id)
    ).filter(Boolean);
  };

  // Value to be provided to consumers
  const value = {
    selectedDay: state.selectedDay,
    exercises: state.exercises,
    workoutPlan: state.workoutPlan,
    selectedExercise: state.selectedExercise,
    
    // Computed values
    exercisesForSelectedDay: getExercisesForSelectedDay(),
    
    // Action creators
    setSelectedDay,
    updateExercise,
    addExercise,
    addExerciseToDay,
    removeExerciseFromDay,
    replaceExerciseInDay,
    setWorkoutStartDate,
    setSelectedExercise,
    addHistoryEntry,
    resetToInitialData,
  };

  return (
    <WorkoutContext.Provider value={value}>
      {children}
    </WorkoutContext.Provider>
  );
};

// Custom hook for using the workout context
export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error('useWorkout must be used within a WorkoutProvider');
  }
  return context;
};