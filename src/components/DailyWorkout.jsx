import React, { useState } from 'react';
import { useWorkout } from '../context/WorkoutContext';
import useGestureDetection, { createSwipeFeedback } from '../hooks/useGestureDetection';
import { getDayOfWeek } from '../utils/dateUtils';

const DailyWorkout = () => {
  const { 
    selectedDay, 
    exercisesForSelectedDay, 
    setSelectedExercise, 
    workoutPlan,
    exercises,
    addExercise, 
    addExerciseToDay,
    removeExerciseFromDay,
    replaceExerciseInDay,
    addHistoryEntry
  } = useWorkout();

  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [editingExerciseRow, setEditingExerciseRow] = useState(null);

  // Generate a day string for the selected day (e.g., "monday")
  const dayString = getDayOfWeek(selectedDay).toLowerCase();
  
  // Handle clicking on an exercise name
  const handleExerciseClick = (exercise) => {
    setSelectedExercise(exercise);
  };
  
  // Handle clicking the edit button
  const handleEditClick = (exerciseId) => {
    setEditingExerciseRow(exerciseId);
    setShowExerciseModal(true);
  };
  
  // Handle closing the exercise selection modal
  const handleCloseModal = () => {
    setShowExerciseModal(false);
    setEditingExerciseRow(null);
  };
  
  // Handle selecting an exercise from the modal
  const handleSelectExercise = (exercise) => {
    if (editingExerciseRow) {
      // Replace the existing exercise with the new one
      replaceExerciseInDay(dayString, editingExerciseRow, exercise.id);
    }
    setShowExerciseModal(false);
    setEditingExerciseRow(null);
  };
  
  // Handle adding a new exercise to the day
  const handleAddExercise = () => {
    // Create a new exercise with default values
    const newExercise = addExercise({
      name: 'New Exercise',
      sets: 3,
      repType: 'count',
      reps: 10,
      category: 'Upper Body'
    });
    
    // Add the new exercise to the current day
    if (newExercise && dayString) {
      addExerciseToDay(dayString, newExercise.id);
    }
    
    // Select the new exercise for editing
    setSelectedExercise(newExercise);
  };
  
  // Handle removing an exercise from the day
  const handleRemoveExercise = (exerciseId) => {
    if (confirm('Remove this exercise from today\'s workout?')) {
      removeExerciseFromDay(dayString, exerciseId);
    }
  };

  // Function to update sets/reps with swipe gestures
  const handleSwipe = (exercise, field, direction) => {
    let value = exercise[field];
    const change = direction === 'up' ? 1 : -1;
    value = Math.max(1, value + change);
    
    // Update the history for this exercise
    addHistoryEntry(exercise.id, {
      date: new Date(),
      sets: field === 'sets' ? value : exercise.sets,
      reps: field === 'reps' ? value : exercise.reps
    });
  };
  
  // Custom hook for swipe detection
  const setsRefs = {};
  const repsRefs = {};
  
  exercisesForSelectedDay.forEach(exercise => {
    // Sets gesture refs
    setsRefs[exercise.id] = useGestureDetection({
      onSwipeUp: () => {
        handleSwipe(exercise, 'sets', 'up');
        const el = document.getElementById(`sets-${exercise.id}`);
        createSwipeFeedback(el, 'up');
      },
      onSwipeDown: () => {
        handleSwipe(exercise, 'sets', 'down');
        const el = document.getElementById(`sets-${exercise.id}`);
        createSwipeFeedback(el, 'down');
      }
    });
    
    // Reps gesture refs
    repsRefs[exercise.id] = useGestureDetection({
      onSwipeUp: () => {
        handleSwipe(exercise, 'reps', 'up');
        const el = document.getElementById(`reps-${exercise.id}`);
        createSwipeFeedback(el, 'up');
      },
      onSwipeDown: () => {
        handleSwipe(exercise, 'reps', 'down');
        const el = document.getElementById(`reps-${exercise.id}`);
        createSwipeFeedback(el, 'down');
      }
    });
  });

  return (
    <div className="daily-workout">
      <h2 className="text-lg font-display font-bold mb-3 text-secondary flex justify-between items-center">
        <span>{getDayOfWeek(selectedDay)}'s Workout</span>
      </h2>
      
      {exercisesForSelectedDay.length > 0 ? (
        <div className="overflow-hidden rounded-lg bg-darkgray">
          {/* Table Header */}
          <div className="grid grid-cols-6 bg-lightgray p-2 text-center font-bold text-sm">
            <div className="col-span-4">Exercise</div>
            <div className="col-span-1">Sets</div>
            <div className="col-span-1">Reps</div>
          </div>
          
          {/* Exercise Rows */}
          <div className="exercise-list">
            {exercisesForSelectedDay.map((exercise) => (
              <div key={exercise.id} className="exercise-row grid grid-cols-6 p-2">
                <div className="col-span-3 flex items-center">
                  <span 
                    className="cursor-pointer hover:text-secondary transition-colors truncate"
                    onClick={() => handleExerciseClick(exercise)}
                  >
                    {exercise.name}
                  </span>
                </div>
                
                <div className="col-span-1 flex justify-end pr-2">
                  <button 
                    className="text-xs bg-gray-700 hover:bg-gray-600 p-1 rounded"
                    onClick={() => handleEditClick(exercise.id)}
                    title="Edit Exercise"
                  >
                    ✏️
                  </button>
                  <button 
                    className="text-xs bg-gray-700 hover:bg-red-700 p-1 rounded ml-1"
                    onClick={() => handleRemoveExercise(exercise.id)}
                    title="Remove Exercise"
                  >
                    ✖️
                  </button>
                </div>
                
                <div 
                  id={`sets-${exercise.id}`}
                  ref={setsRefs[exercise.id]} 
                  className="col-span-1 text-center bg-gray-800 rounded-md py-1 cursor-pointer"
                  title="Swipe up/down to change"
                >
                  {exercise.sets}
                </div>
                
                <div 
                  id={`reps-${exercise.id}`}
                  ref={repsRefs[exercise.id]}
                  className="col-span-1 text-center bg-gray-800 rounded-md py-1 cursor-pointer"
                  title="Swipe up/down to change"
                >
                  {exercise.reps}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-6 bg-darkgray rounded-lg">
          <p className="text-gray-400">No exercises planned for this day.</p>
          <p className="text-sm text-gray-500">Add an exercise to get started.</p>
        </div>
      )}
      
      {/* Add Exercise Button */}
      <div className="mt-4 text-center">
        <button 
          className="btn-secondary add-button-attention flex items-center justify-center mx-auto"
          onClick={handleAddExercise}
        >
          <span className="mr-1">+</span> Add Exercise
        </button>
      </div>
      
      {/* Exercise Selection Modal */}
      {showExerciseModal && (
        <div className="popup">
          <div className="popup-content">
            <h3 className="text-lg font-bold mb-3">Select Exercise</h3>
            <div className="max-h-60 overflow-y-auto">
              {exercises.map(exercise => (
                <div 
                  key={exercise.id}
                  className="exercise-option p-3 border-b border-gray-700 cursor-pointer hover:bg-gray-700"
                  onClick={() => handleSelectExercise(exercise)}
                >
                  <div className="font-medium">{exercise.name}</div>
                  <div className="text-xs text-gray-400">{exercise.category} • {exercise.sets} sets • {exercise.reps} {exercise.repType}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <button 
                className="btn bg-gray-700 hover:bg-gray-600"
                onClick={handleCloseModal}
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