/**
 * WorkoutPlan model
 * Represents a weekly workout plan with exercises for each day
 */
class WorkoutPlan {
  /**
   * Create a new workout plan
   * @param {Object} options - Workout plan data
   * @param {string} options.id - Unique identifier for the workout plan
   * @param {Date} options.startDate - Start date of the workout plan
   * @param {Object} options.days - Exercises for each day of the week
   * @param {Object} options.workoutTypes - Workout type labels for each day
   */
  constructor({
    id = crypto.randomUUID(),
    startDate = new Date(),
    days = {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: []
    },
    workoutTypes = {
      monday: 'Upper Body',
      tuesday: 'Lower Body',
      wednesday: 'Core',
      thursday: 'Upper Body',
      friday: 'Lower Body',
      saturday: 'Full Body',
      sunday: 'Rest Day'
    }
  } = {}) {
    this.id = id;
    this.startDate = startDate instanceof Date ? startDate : new Date(startDate);
    this.days = days;
    this.workoutTypes = workoutTypes;
  }

  /**
   * Get the current week number based on the start date
   * @returns {number} Week number
   */
  getCurrentWeekNumber() {
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const daysDiff = Math.floor((new Date() - this.startDate) / millisecondsPerDay);
    return Math.floor(daysDiff / 7) + 1;
  }

  /**
   * Add exercise to a specific day
   * @param {string} day - Day of the week (monday, tuesday, etc.)
   * @param {string} exerciseId - ID of the exercise to add
   */
  addExerciseToDay(day, exerciseId) {
    if (!this.days[day.toLowerCase()]) {
      throw new Error(`Invalid day: ${day}`);
    }
    this.days[day.toLowerCase()].push(exerciseId);
  }

  /**
   * Remove exercise from a specific day
   * @param {string} day - Day of the week (monday, tuesday, etc.)
   * @param {string} exerciseId - ID of the exercise to remove
   */
  removeExerciseFromDay(day, exerciseId) {
    if (!this.days[day.toLowerCase()]) {
      throw new Error(`Invalid day: ${day}`);
    }
    const dayLower = day.toLowerCase();
    this.days[dayLower] = this.days[dayLower].filter(id => id !== exerciseId);
  }

  /**
   * Replace exercise on a specific day
   * @param {string} day - Day of the week (monday, tuesday, etc.)
   * @param {string} oldExerciseId - ID of the exercise to replace
   * @param {string} newExerciseId - ID of the new exercise
   */
  replaceExercise(day, oldExerciseId, newExerciseId) {
    if (!this.days[day.toLowerCase()]) {
      throw new Error(`Invalid day: ${day}`);
    }
    const dayLower = day.toLowerCase();
    const index = this.days[dayLower].indexOf(oldExerciseId);
    if (index !== -1) {
      this.days[dayLower][index] = newExerciseId;
    }
  }

  /**
   * Get exercises for a specific day
   * @param {string} day - Day of the week (monday, tuesday, etc.)
   * @returns {string[]} Array of exercise IDs
   */
  getExercisesForDay(day) {
    return this.days[day.toLowerCase()] || [];
  }

  /**
   * Update the workout type for a specific day
   * @param {string} day - Day of the week (monday, tuesday, etc.)
   * @param {string} workoutType - The new workout type label
   */
  updateWorkoutType(day, workoutType) {
    const dayLower = day.toLowerCase();
    if (!this.days[dayLower]) {
      throw new Error(`Invalid day: ${day}`);
    }
    this.workoutTypes[dayLower] = workoutType;
  }

  /**
   * Get the workout type for a specific day
   * @param {string} day - Day of the week (monday, tuesday, etc.)
   * @returns {string} Workout type for the specified day
   */
  getWorkoutType(day) {
    const dayLower = day.toLowerCase();
    if (!this.workoutTypes) {
      this.workoutTypes = {};
    }
    return this.workoutTypes[dayLower] || '';
  }

  /**
   * Update workout plan properties
   * @param {Object} updates - Properties to update
   */
  update(updates) {
    if (updates.startDate) {
      updates.startDate = updates.startDate instanceof Date 
        ? updates.startDate 
        : new Date(updates.startDate);
    }
    Object.assign(this, updates);
  }

  /**
   * Convert the workout plan to a plain object for storage
   * @returns {Object} Plain object representation
   */
  toJSON() {
    return {
      id: this.id,
      startDate: this.startDate.toISOString(),
      days: {
        monday: [...this.days.monday],
        tuesday: [...this.days.tuesday],
        wednesday: [...this.days.wednesday],
        thursday: [...this.days.thursday],
        friday: [...this.days.friday],
        saturday: [...this.days.saturday],
        sunday: [...this.days.sunday]
      },
      workoutTypes: {
        ...this.workoutTypes
      }
    };
  }

  /**
   * Create a WorkoutPlan instance from a plain object
   * @param {Object} data - Plain object representation
   * @returns {WorkoutPlan} New WorkoutPlan instance
   */
  static fromJSON(data) {
    return new WorkoutPlan({
      ...data,
      startDate: new Date(data.startDate)
    });
  }

  /**
   * Get the day of the week as string for a date
   * @param {Date} date - Date to get day for
   * @returns {string} Day of the week (lowercase)
   */
  static getDayOfWeek(date) {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[date.getDay()];
  }

  /**
   * Get today's exercises
   * @returns {string[]} Array of today's exercise IDs
   */
  getTodaysExercises() {
    const today = WorkoutPlan.getDayOfWeek(new Date());
    return this.days[today];
  }
}

export default WorkoutPlan;