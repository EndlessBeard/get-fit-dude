import React, { useState } from 'react';
import { useWorkout } from '../context/WorkoutContext';
import { 
  getWeekDates, 
  getShortDayName, 
  isSameDay, 
  formatDate,
  getWeekNumber 
} from '../utils/dateUtils';

const WorkoutCalendar = () => {
  const { 
    selectedDay, 
    setSelectedDay, 
    workoutPlan,
    setWorkoutStartDate
  } = useWorkout();
  
  const [isEditingStartDate, setIsEditingStartDate] = useState(false);
  const [dateInput, setDateInput] = useState({
    day: '',
    month: '',
    year: ''
  });
  
  // Get dates for the current week based on the selected day
  const weekDates = getWeekDates(selectedDay);
  
  // Calculate the current week number
  const weekNumber = workoutPlan ? getWeekNumber(selectedDay, workoutPlan.startDate) : 1;
  
  // Toggle date editing mode
  const handleWeekNumberClick = () => {
    if (isEditingStartDate) return;
    
    setIsEditingStartDate(true);
    
    // Initialize input with current start date
    if (workoutPlan && workoutPlan.startDate) {
      const date = new Date(workoutPlan.startDate);
      setDateInput({
        day: date.getDate().toString().padStart(2, '0'),
        month: (date.getMonth() + 1).toString().padStart(2, '0'),
        year: date.getFullYear().toString()
      });
    }
  };
  
  // Handle date input changes
  const handleDateInputChange = (field, value) => {
    setDateInput(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Save the new start date
  const handleSaveDate = () => {
    const { day, month, year } = dateInput;
    
    if (day && month && year) {
      try {
        const newDate = new Date(`${year}-${month}-${day}`);
        
        if (isNaN(newDate.getTime())) {
          throw new Error('Invalid date');
        }
        
        setWorkoutStartDate(newDate);
        setIsEditingStartDate(false);
      } catch (error) {
        console.error('Invalid date:', error);
        // Simple error handling - reset form
        setIsEditingStartDate(false);
      }
    }
  };
  
  // Cancel date editing
  const handleCancelEdit = () => {
    setIsEditingStartDate(false);
  };
  
  // Select a day in the calendar
  const handleDaySelect = (date) => {
    setSelectedDay(date);
  };

  return (
    <div className="workout-calendar">
      <h2 className="text-lg font-display font-bold mb-3 text-secondary">
        Workout Calendar
      </h2>
      
      <div className="grid grid-cols-8 gap-1 text-center">
        {/* Header row */}
        <div 
          className={`calendar-cell p-2 font-bold flex items-center justify-center cursor-pointer ${
            isEditingStartDate ? 'bg-primary bg-opacity-30' : 'bg-darkgray hover:bg-gray-700'
          } rounded-md transition-colors`}
          onClick={handleWeekNumberClick}
        >
          Week {weekNumber}
        </div>
        
        {weekDates.map((date) => (
          <div 
            key={date.toISOString()} 
            className={`calendar-cell p-2 font-bold ${
              isSameDay(date, new Date()) 
                ? 'text-secondary border-b border-secondary' 
                : ''
            }`}
          >
            {getShortDayName(date)}
          </div>
        ))}
        
        {/* Date row */}
        {isEditingStartDate ? (
          <div className="col-span-8 p-3 bg-darkgray rounded-md mt-1 animate-fadeIn">
            <div className="text-sm mb-2 text-secondary">Set Workout Start Date:</div>
            <div className="flex space-x-2 mb-3">
              <input
                type="text"
                placeholder="DD"
                className="input w-16 text-center"
                value={dateInput.day}
                onChange={(e) => handleDateInputChange('day', e.target.value)}
                maxLength={2}
              />
              <span className="text-xl">/</span>
              <input
                type="text"
                placeholder="MM"
                className="input w-16 text-center"
                value={dateInput.month}
                onChange={(e) => handleDateInputChange('month', e.target.value)}
                maxLength={2}
              />
              <span className="text-xl">/</span>
              <input
                type="text"
                placeholder="YYYY"
                className="input w-24 text-center"
                value={dateInput.year}
                onChange={(e) => handleDateInputChange('year', e.target.value)}
                maxLength={4}
              />
            </div>
            <div className="flex space-x-2 justify-end">
              <button 
                className="btn bg-gray-600 hover:bg-gray-700 text-sm px-3 py-1"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
              <button 
                className="btn-primary text-sm px-3 py-1"
                onClick={handleSaveDate}
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <>
            <div 
              className="calendar-cell p-2 bg-darkgray rounded-md flex items-center justify-center"
              title="Click Week number to change start date"
            >
              <span className="text-xs text-gray-400">
                {workoutPlan ? formatDate(workoutPlan.startDate) : 'No date'}
              </span>
            </div>
            
            {weekDates.map((date) => (
              <div 
                key={date.toISOString() + "-date"} 
                className={`calendar-day ${
                  isSameDay(date, selectedDay) ? 'calendar-day-selected' : ''
                }`}
                onClick={() => handleDaySelect(date)}
              >
                {date.getDate()}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default WorkoutCalendar;