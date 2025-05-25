import React from 'react';
import { useWorkout } from '../context/WorkoutContext';

const DebugPanel = () => {
  const { 
    exercises, 
    workoutPlan,
    selectedDay,
    selectedExercise,
    getWorkoutTypeForDay,
    resetToInitialData
  } = useWorkout();
  
  const selectedDayName = selectedDay.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const workoutType = getWorkoutTypeForDay(selectedDayName);

  const handleReset = () => {
    // Clear localStorage and reset to initial data
    localStorage.clear();
    resetToInitialData();
    window.location.reload();
  };

  return (
    <div className="bg-black border border-red-500 rounded-md p-4 my-4 text-xs text-white overflow-auto max-h-60">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-red-500 font-bold">Debug Panel</h3>
        <button 
          onClick={handleReset}
          className="bg-red-800 text-white px-2 py-1 rounded text-xs hover:bg-red-700"
        >
          Reset Data
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <div>
          <h4 className="text-red-400">Exercises ({exercises?.length || 0})</h4>
          <pre>{JSON.stringify(exercises?.map(e => ({ id: e.id, name: e.name, category: e.category })), null, 2)}</pre>
        </div>
        <div>
          <h4 className="text-red-400">Selected Day</h4>
          <p>{selectedDay?.toLocaleDateString()} ({selectedDayName})</p>
          <p>Workout Type: {workoutType || 'None'}</p>
        </div>
      </div>
    </div>
  );
};

export default DebugPanel;
