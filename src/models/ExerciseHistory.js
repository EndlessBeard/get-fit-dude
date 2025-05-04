/**
 * ExerciseHistory model
 * Represents the history of an exercise's performance over time
 */
class ExerciseHistory {
  /**
   * Create a new exercise history
   * @param {Object} options - Exercise history data
   * @param {string} options.exerciseId - ID of the exercise
   * @param {Array} options.entries - History entries
   */
  constructor({
    exerciseId,
    entries = []
  }) {
    if (!exerciseId) {
      throw new Error('exerciseId is required');
    }
    
    this.exerciseId = exerciseId;
    this.entries = entries.map(entry => ({
      date: entry.date instanceof Date ? entry.date : new Date(entry.date),
      sets: entry.sets,
      reps: entry.reps
    }));
    
    // Ensure entries are sorted by date
    this.entries.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  /**
   * Add a new entry to the history
   * @param {Object} entry - The entry to add
   * @param {Date} entry.date - Date of the entry
   * @param {number} entry.sets - Number of sets completed
   * @param {number} entry.reps - Number of reps or time completed
   */
  addEntry(entry) {
    // Check if there's already an entry for the same date (using date without time)
    const entryDate = new Date(entry.date).setHours(0, 0, 0, 0);
    
    const existingEntryIndex = this.entries.findIndex(
      e => new Date(e.date).setHours(0, 0, 0, 0) === entryDate
    );
    
    if (existingEntryIndex >= 0) {
      // Update existing entry
      this.entries[existingEntryIndex] = {
        ...this.entries[existingEntryIndex],
        sets: entry.sets,
        reps: entry.reps
      };
    } else {
      // Add new entry
      this.entries.push({
        date: new Date(entry.date),
        sets: entry.sets,
        reps: entry.reps
      });
    }

    // Sort entries by date
    this.entries.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  /**
   * Get an entry for a specific date
   * @param {Date} date - The date to get entry for
   * @returns {Object|null} The entry or null if not found
   */
  getEntryForDate(date) {
    const targetDate = new Date(date).setHours(0, 0, 0, 0);
    
    return this.entries.find(
      entry => new Date(entry.date).setHours(0, 0, 0, 0) === targetDate
    ) || null;
  }

  /**
   * Get entries for a date range
   * @param {Date} startDate - Start date of the range
   * @param {Date} endDate - End date of the range
   * @returns {Array} Entries within the specified date range
   */
  getEntriesInRange(startDate, endDate) {
    const start = new Date(startDate).setHours(0, 0, 0, 0);
    const end = new Date(endDate).setHours(23, 59, 59, 999);
    
    return this.entries.filter(entry => {
      const entryTime = new Date(entry.date).getTime();
      return entryTime >= start && entryTime <= end;
    });
  }

  /**
   * Calculate progress (percentage change) between first and last entry
   * @returns {Object} Progress data with sets and reps percentage changes
   */
  calculateProgress() {
    if (this.entries.length < 2) {
      return { sets: 0, reps: 0 };
    }

    const first = this.entries[0];
    const last = this.entries[this.entries.length - 1];

    const setsChange = ((last.sets - first.sets) / first.sets) * 100;
    const repsChange = ((last.reps - first.reps) / first.reps) * 100;

    return {
      sets: Math.round(setsChange * 10) / 10, // Round to 1 decimal place
      reps: Math.round(repsChange * 10) / 10
    };
  }

  /**
   * Convert the exercise history to a plain object for storage
   * @returns {Object} Plain object representation
   */
  toJSON() {
    return {
      exerciseId: this.exerciseId,
      entries: this.entries.map(entry => ({
        date: entry.date instanceof Date ? entry.date.toISOString() : entry.date,
        sets: entry.sets,
        reps: entry.reps
      }))
    };
  }

  /**
   * Create an ExerciseHistory instance from a plain object
   * @param {Object} data - Plain object representation
   * @returns {ExerciseHistory} New ExerciseHistory instance
   */
  static fromJSON(data) {
    return new ExerciseHistory({
      exerciseId: data.exerciseId,
      entries: data.entries?.map(entry => ({
        date: new Date(entry.date),
        sets: entry.sets,
        reps: entry.reps
      })) || []
    });
  }
}

export default ExerciseHistory;