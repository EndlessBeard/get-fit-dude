// src/models/ExerciseData.js

/**
 * ExerciseData model
 * Represents a single exercise with all its properties and methods
 */
class ExerciseData {
  /**
   * Create a new exercise
   * @param {Object} options - Exercise data
   * @param {string} options.id - Unique identifier for the exercise
   * @param {string} options.name - Name of the exercise
   * @param {number} options.sets - Number of sets
   * @param {string} options.repType - Type of repetitions (count, time)
   * @param {number} options.reps - Number of repetitions or time in seconds
   * @param {string} options.category - Exercise category (Upper Body, Lower Body, Core)
   * @param {string} options.videoUrl - URL for example video
   * @param {string[]} options.variations - List of exercise variations
   * @param {Object[]} options.history - History of exercise performance
   */
  constructor({
    id = crypto.randomUUID(),
    name = 'New Exercise',
    sets = 3,
    repType = 'count',
    reps = 10,
    category = 'Upper Body',
    videoUrl = '',
    variations = [],
    history = []
  } = {}) {
    this.id = id;
    this.name = name;
    this.sets = sets;
    this.repType = repType;
    this.reps = reps;
    this.category = category;
    this.videoUrl = videoUrl;
    this.variations = variations;
    this.history = history;
  }

  /**
   * Add a history entry for the exercise
   * @param {Object} entry - The history entry to add
   * @param {Date} entry.date - Date of the entry
   * @param {number} entry.sets - Number of sets completed
   * @param {number} entry.reps - Number of reps or time completed
   */
  addHistoryEntry(entry) {
    // Check if there's already an entry for the same date (using date without time)
    const entryDate = new Date(entry.date).setHours(0, 0, 0, 0);
    
    const existingEntryIndex = this.history.findIndex(
      h => new Date(h.date).setHours(0, 0, 0, 0) === entryDate
    );
    
    if (existingEntryIndex >= 0) {
      // Update existing entry
      this.history[existingEntryIndex] = {
        ...this.history[existingEntryIndex],
        sets: entry.sets,
        reps: entry.reps
      };
    } else {
      // Add new entry
      this.history.push({
        date: new Date(entry.date),
        sets: entry.sets,
        reps: entry.reps
      });
    }

    // Sort history by date
    this.history.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  /**
   * Update exercise properties
   * @param {Object} updates - The properties to update
   */
  update(updates) {
    Object.assign(this, updates);
  }

  /**
   * Convert the exercise to a plain object for storage
   * @returns {Object} Plain object representation
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      sets: this.sets,
      repType: this.repType,
      reps: this.reps,
      category: this.category,
      videoUrl: this.videoUrl,
      variations: [...this.variations],
      history: this.history.map(entry => ({
        date: entry.date instanceof Date ? entry.date.toISOString() : entry.date,
        sets: entry.sets,
        reps: entry.reps
      }))
    };
  }

  /**
   * Create an ExerciseData instance from a plain object
   * @param {Object} data - Plain object representation
   * @returns {ExerciseData} New ExerciseData instance
   */
  static fromJSON(data) {
    return new ExerciseData({
      ...data,
      history: data.history?.map(entry => ({
        date: new Date(entry.date),
        sets: entry.sets,
        reps: entry.reps
      })) || []
    });
  }
}

export default ExerciseData;