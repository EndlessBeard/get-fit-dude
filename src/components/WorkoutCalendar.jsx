import React, { useState } from 'react';
import { useWorkout } from '../context/WorkoutContext';
import { 
  getWeekDates, 
  getShortDayName, 
  isSameDay, 
  formatDate,
  getWeekNumber,
  getDayOfWeek
} from '../utils/dateUtils';
import '../styles/animations.css';

const WorkoutCalendar = () => {
  const { 
    selectedDay, 
    setSelectedDay, 
    workoutPlan,
    setWorkoutStartDate,
    getWorkoutTypeForDay,
    updateWorkoutTypeForDay
  } = useWorkout();
  
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [editingWorkoutType, setEditingWorkoutType] = useState(null);
  const [workoutTypeValue, setWorkoutTypeValue] = useState('');
  
  // Get the current week starting from Monday
  const weekDates = getWeekDates(selectedDay);
  const weekNumber = getWeekNumber(selectedDay);
  
  // Calculate weeks passed since workoutPlan start date
  let weeksPassed = 0;
  if (workoutPlan && workoutPlan.startDate) {
    const startDate = new Date(workoutPlan.startDate);
    const diffTime = Math.abs(selectedDay - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    weeksPassed = Math.floor(diffDays / 7) + 1;
  }
  
  // Handle date selection
  const handleDayClick = (date) => {
    setSelectedDay(date);
  };

  // Handle start date editing
  const handleStartDateEdit = () => {
    setShowDatePicker(true);
  };
  
  const handleDatePickerClose = () => {
    setShowDatePicker(false);
  };
  
  const handleDateChange = (event) => {
    const dateString = event.target.value;
    if (dateString) {
      const newDate = new Date(dateString);
      setWorkoutStartDate(newDate);
      setShowDatePicker(false);
    }
  };

  // Handle workout type editing
  const handleWorkoutTypeClick = (day) => {
    const workoutType = getWorkoutTypeForDay(day);
    setEditingWorkoutType(day);
    setWorkoutTypeValue(workoutType || '');
  };
  
  const handleWorkoutTypeChange = (event) => {
    setWorkoutTypeValue(event.target.value);
  };
  
  const handleWorkoutTypeSave = () => {
    if (editingWorkoutType) {
      updateWorkoutTypeForDay(editingWorkoutType, workoutTypeValue);
      setEditingWorkoutType(null);
    }
  };
  
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleWorkoutTypeSave();
    } else if (event.key === 'Escape') {
      setEditingWorkoutType(null);
    }
  };

  return (
    <div className="workout-calendar-container mb-6">
      {/* Week display with gradient background */}
      <div className="bg-gradient-to-r from-primary/30 to-secondary/20 rounded-xl p-4 shadow-lg border border-gray-700">
        {/* Week number display with pulsing animation */}
        <div className="flex justify-between items-center mb-3">
          <div 
            className="week-number flex items-center space-x-2 cursor-pointer bg-gray-800 rounded-lg px-3 py-2 hover:bg-gray-700 transition-colors"
            onClick={handleStartDateEdit}
          >
            <span className="text-md font-bold text-secondary">Week</span>
            <div className="flex items-center bg-gradient-to-r from-primary to-secondary rounded-full w-8 h-8">
              <span className="text-center w-full text-white font-bold">{weeksPassed}</span>
            </div>
          </div>
          
          {/* Week start date */}
          <div className="text-sm text-gray-400">
            {workoutPlan && workoutPlan.startDate && (
              <span className="cursor-pointer hover:text-secondary transition-colors" onClick={handleStartDateEdit}>
                Started: {new Date(workoutPlan.startDate).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
        
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDates.map((date, index) => (
            <div 
              key={`header-${index}`} 
              className="text-center py-1 text-xs font-bold text-gray-400"
            >
              {getShortDayName(date)}
            </div>
          ))}
        </div>
        
        {/* Days of the week with date numbers */}
        <div className="grid grid-cols-7 gap-1 mb-3">
          {weekDates.map((date, index) => {
            const isToday = isSameDay(date, new Date());
            const isSelected = isSameDay(date, selectedDay);
            
            return (
              <button
                key={`day-${index}`}
                className={`
                  day-button flex items-center justify-center
                  w-full aspect-square rounded-full 
                  transition-all transform
                  ${isSelected ? 'bg-secondary text-white scale-110 font-bold shadow-lg shadow-secondary/30' : 
                    isToday ? 'bg-gray-700 text-white' : 'bg-gray-800 text-gray-300'}
                  hover:bg-opacity-90 hover:scale-105
                `}
                onClick={() => handleDayClick(date)}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
        
        {/* Workout types for each day */}
        <div className="grid grid-cols-7 gap-1">
          {weekDates.map((date, index) => {
            const day = getDayOfWeek(date).toLowerCase();
            const workoutType = getWorkoutTypeForDay(day);
            const isEditing = editingWorkoutType === day;
            
            return (
              <div key={`type-${index}`} className="text-center">
                {isEditing ? (
                  <div className="flex flex-col space-y-1">
                    <input
                      type="text"
                      value={workoutTypeValue}
                      onChange={handleWorkoutTypeChange}
                      onKeyDown={handleKeyDown}
                      onBlur={handleWorkoutTypeSave}
                      className="bg-gray-900 border border-gray-600 rounded px-2 py-1 text-xs w-full focus:outline-none focus:border-secondary"
                      autoFocus
                      placeholder="Workout type"
                    />
                    <button 
                      onClick={handleWorkoutTypeSave}
                      className="bg-secondary text-white text-xs rounded px-2 py-1 hover:bg-opacity-80"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div 
                    className={`
                      workout-type text-xs py-1 px-2 rounded-md cursor-pointer
                      transition-transform hover:scale-105
                      ${workoutType ? 'bg-primary bg-opacity-40' : 'bg-gray-800'}
                      ${isSameDay(date, selectedDay) ? 'border border-secondary' : ''}
                    `}
                    onClick={() => handleWorkoutTypeClick(day)}
                  >
                    {workoutType || 'Rest Day'}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Date picker modal */}
      {showDatePicker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-gray-900 p-6 rounded-lg shadow-xl border border-gray-700 w-10/12 max-w-md animate-scaleIn">
            <h3 className="text-lg font-bold mb-4 text-secondary">Set Workout Start Date</h3>
            <p className="text-sm text-gray-300 mb-4">
              This date determines the start of your workout plan and how weeks are calculated.
            </p>
            
            <input 
              type="date"
              className="w-full bg-gray-800 border border-gray-600 rounded p-3 text-white mb-4 focus:outline-none focus:border-secondary"
              defaultValue={workoutPlan && workoutPlan.startDate ? new Date(workoutPlan.startDate).toISOString().split('T')[0] : ''}
              onChange={handleDateChange}
            />
            
            <div className="flex justify-end">
              <button 
                className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                onClick={handleDatePickerClose}
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

export default WorkoutCalendar;