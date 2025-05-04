import React, { useState } from 'react';
import { useWorkout } from '../context/WorkoutContext';
import { getDayOfWeek } from '../utils/dateUtils';
import { useGestureDetection } from '../hooks/useGestureDetection';
import '../styles/animations.css';

const DailyWorkout = () => {
  const { 
    selectedDay, 
    getExercisesForDay, 
    workoutPlan, 
    setSelectedExercise,
    addExerciseToDay,
    updateExercise,
    removeExerciseFromDay,
    replaceExerciseInDay,
    getWorkoutTypeForDay,
  } = useWorkout();
  
  const [showExerciseSelector, setShowExerciseSelector] = useState(false);
  const [editingExerciseIndex, setEditingExerciseIndex] = useState(null);
  const [availableExercises, setAvailableExercises] = useState([]);
  
  // Get day name for the selected day
  const selectedDayName = getDayOfWeek(selectedDay).toLowerCase();
  
  // Get the workoutType for the selected day
  const workoutType = getWorkoutTypeForDay(selectedDayName);
  
  // Get exercises for the selected day
  const exercisesForDay = getExercisesForDay(selectedDay);
  
  // Initialize gesture detection for swipe controls
  const { 
    handleSwipeStart, 
    handleSwipeMove, 
    handleSwipeEnd, 
    isGesturing 
  } = useGestureDetection({
    onValueChange: (fieldName, exerciseId, value) => {
      const exercise = exercisesForDay.find(ex => ex.id === exerciseId);
      if (exercise) {
        const updatedExercise = { ...exercise };
        updatedExercise[fieldName] = Math.max(1, value);
        updateExercise(updatedExercise);
      }
    }
  });
  
  // Add exercise handlers
  const handleAddExercise = () => {
    // Get all available exercises and filter out those already in today's workout
    const currentExerciseIds = new Set(exercisesForDay.map(ex => ex.id));
    
    // Simulate fetching all exercises (would come from context in a real app)
    const allExercises = Object.values(workoutPlan.exercises || {});
    
    // Filter exercises that match current workout type if specified
    let filteredExercises = allExercises;
    if (workoutType) {
      filteredExercises = allExercises.filter(ex => 
        !ex.category || ex.category.toLowerCase().includes(workoutType.toLowerCase())
      );
    }
    
    // Filter out exercises already in today's workout
    const availableToAdd = filteredExercises.filter(ex => !currentExerciseIds.has(ex.id));
    
    setAvailableExercises(availableToAdd);
    setShowExerciseSelector(true);
  };
  
  const handleSelectExercise = (exercise) => {
    if (editingExerciseIndex !== null) {
      // Replace existing exercise
      replaceExerciseInDay(selectedDayName, editingExerciseIndex, exercise.id);
      setEditingExerciseIndex(null);
    } else {
      // Add new exercise
      addExerciseToDay(selectedDayName, exercise.id);
    }
    setShowExerciseSelector(false);
  };
  
  // Handle exercise edit/view
  const handleExerciseClick = (exercise) => {
    setSelectedExercise(exercise);
  };
  
  const handleEditExerciseClick = (index) => {
    setEditingExerciseIndex(index);
    
    // Get all available exercises for replacing this one
    const allExercises = Object.values(workoutPlan.exercises || {});
    
    // Filter exercises that match current workout type if specified
    let filteredExercises = allExercises;
    if (workoutType) {
      filteredExercises = allExercises.filter(ex => 
        !ex.category || ex.category.toLowerCase().includes(workoutType.toLowerCase())
      );
    }
    
    setAvailableExercises(filteredExercises);
    setShowExerciseSelector(true);
  };
  
  const handleRemoveExercise = (index) => {
    removeExerciseFromDay(selectedDayName, index);
  };
  
  const handleCloseSelector = () => {
    setShowExerciseSelector(false);
    setEditingExerciseIndex(null);
  };

  return (
    <div className="daily-workout-container mb-6">
      <div className="bg-gradient-to-r from-primary/30 to-secondary/20 rounded-xl p-4 shadow-lg border border-gray-700">
        {/* Day title with workout type */}
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">
            {getDayOfWeek(selectedDay)}'s Workout 
            {workoutType && (
              <span className="ml-2 text-sm font-normal text-secondary">({workoutType})</span>
            )}
          </h2>
          <span className="text-gray-400 text-sm">{selectedDay.toLocaleDateString()}</span>
        </div>
        
        {/* Exercise list */}
        {exercisesForDay.length > 0 ? (
          <div className="exercise-list space-y-3">
            {exercisesForDay.map((exercise, index) => (
              <div 
                key={`${exercise.id}-${index}`} 
                className="exercise-row bg-gray-800 rounded-lg p-3 shadow-md border border-gray-700 hover:border-gray-500 transition-all animate-fadeIn"
              >
                <div className="flex justify-between items-center mb-2">
                  {/* Exercise name with click action */}
                  <div 
                    className="exercise-name flex-grow cursor-pointer hover:text-secondary transition-colors"
                    onClick={() => handleExerciseClick(exercise)}
                  >
                    <h3 className="font-bold text-white">{exercise.name}</h3>
                    {exercise.category && (
                      <span className="text-xs text-gray-400">{exercise.category}</span>
                    )}
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex space-x-2">
                    <button 
                      className="edit-button bg-gray-700 hover:bg-gray-600 p-2 rounded-full transition-colors"
                      onClick={() => handleEditExerciseClick(index)}
                      title="Replace exercise"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button 
                      className="delete-button bg-red-900 hover:bg-red-700 p-2 rounded-full transition-colors"
                      onClick={() => handleRemoveExercise(index)}
                      title="Remove exercise"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Sets and reps with swipe interaction */}
                <div className="sets-reps-container flex justify-around mt-3">
                  <div className="sets-container text-center"
                    onTouchStart={(e) => handleSwipeStart(e, 'sets', exercise.id, exercise.sets)}
                    onTouchMove={handleSwipeMove}
                    onTouchEnd={handleSwipeEnd}
                    onMouseDown={(e) => handleSwipeStart(e, 'sets', exercise.id, exercise.sets)}
                    onMouseMove={handleSwipeMove}
                    onMouseUp={handleSwipeEnd}
                    onMouseLeave={handleSwipeEnd}
                  >
                    <div className="text-xs text-gray-400 mb-1">Sets</div>
                    <div className={`text-xl font-bold ${isGesturing ? 'text-secondary' : 'text-white'} transition-colors`}>
                      {exercise.sets}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Swipe to adjust</div>
                  </div>
                  
                  <div className="reps-container text-center"
                    onTouchStart={(e) => handleSwipeStart(e, 'reps', exercise.id, exercise.reps)}
                    onTouchMove={handleSwipeMove}
                    onTouchEnd={handleSwipeEnd}
                    onMouseDown={(e) => handleSwipeStart(e, 'reps', exercise.id, exercise.reps)}
                    onMouseMove={handleSwipeMove}
                    onMouseUp={handleSwipeEnd}
                    onMouseLeave={handleSwipeEnd}
                  >
                    <div className="text-xs text-gray-400 mb-1">{exercise.repsType === 'time' ? 'Time (s)' : 'Reps'}</div>
                    <div className={`text-xl font-bold ${isGesturing ? 'text-secondary' : 'text-white'} transition-colors`}>
                      {exercise.reps}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Swipe to adjust</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-workout bg-gray-800 bg-opacity-50 rounded-lg p-6 text-center">
            <p className="text-gray-400 mb-4">No exercises planned for this day.</p>
            <p className="text-sm text-gray-500">Tap the button below to add exercises to your workout.</p>
          </div>
        )}
        
        {/* Add exercise button */}
        <div className="add-exercise-container mt-4 flex justify-center">
          <button 
            className="add-exercise-button bg-gradient-to-r from-primary to-secondary px-4 py-2 rounded-full text-white font-bold shadow-lg hover:shadow-xl hover:from-secondary hover:to-primary transition-all transform hover:scale-105"
            onClick={handleAddExercise}
          >
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Exercise
            </div>
          </button>
        </div>
      </div>
      
      {/* Exercise selector modal */}
      {showExerciseSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-gray-900 p-6 rounded-lg shadow-xl border border-gray-700 w-11/12 max-w-md max-h-[80vh] flex flex-col animate-scaleIn">
            <h3 className="text-lg font-bold mb-4 text-secondary">
              {editingExerciseIndex !== null ? 'Replace Exercise' : 'Add Exercise'}
            </h3>
            
            {availableExercises.length > 0 ? (
              <div className="exercise-list overflow-y-auto flex-grow">
                {availableExercises.map((exercise) => (
                  <div 
                    key={exercise.id} 
                    className="exercise-option p-3 mb-2 bg-gray-800 hover:bg-gray-700 rounded-lg cursor-pointer transition-colors"
                    onClick={() => handleSelectExercise(exercise)}
                  >
                    <h4 className="font-bold text-white">{exercise.name}</h4>
                    {exercise.category && (
                      <span className="text-xs text-gray-400">{exercise.category}</span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-list flex-grow flex items-center justify-center text-gray-400 text-center p-8">
                <p>No more exercises available. Create new exercises in the Exercise Info panel.</p>
              </div>
            )}
            
            <div className="flex justify-end mt-4">
              <button 
                className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                onClick={handleCloseSelector}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyWorkout;