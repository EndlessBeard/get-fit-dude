import ExerciseData from '../models/ExerciseData';
import WorkoutPlan from '../models/WorkoutPlan';

/**
 * Initial exercise data for the app
 */
export const initialExercises = [
  // Upper Body exercises
  new ExerciseData({
    id: 'ex-001',
    name: 'Push-ups',
    sets: 3,
    repType: 'count',
    reps: 12,
    category: 'Upper Body',
    videoUrl: 'https://example.com/videos/pushups.mp4',
    variations: ['Wide grip', 'Diamond', 'Incline', 'Decline'],
    history: [
      { date: new Date(2025, 4, 1), sets: 3, reps: 10 },
      { date: new Date(2025, 4, 3), sets: 3, reps: 12 }
    ]
  }),
  
  new ExerciseData({
    id: 'ex-002',
    name: 'Pull-ups',
    sets: 3,
    repType: 'count',
    reps: 8,
    category: 'Upper Body',
    videoUrl: 'https://example.com/videos/pullups.mp4',
    variations: ['Wide grip', 'Chin-ups', 'Neutral grip'],
    history: [
      { date: new Date(2025, 4, 1), sets: 2, reps: 6 },
      { date: new Date(2025, 4, 3), sets: 3, reps: 8 }
    ]
  }),
  
  new ExerciseData({
    id: 'ex-003',
    name: 'Dumbbell Shoulder Press',
    sets: 3,
    repType: 'count',
    reps: 10,
    category: 'Upper Body',
    videoUrl: 'https://example.com/videos/shoulder-press.mp4',
    variations: ['Seated', 'Standing', 'Arnold press'],
    history: [
      { date: new Date(2025, 4, 1), sets: 3, reps: 8 },
      { date: new Date(2025, 4, 3), sets: 3, reps: 10 }
    ]
  }),
  
  // Lower Body exercises
  new ExerciseData({
    id: 'ex-004',
    name: 'Squats',
    sets: 4,
    repType: 'count',
    reps: 15,
    category: 'Lower Body',
    videoUrl: 'https://example.com/videos/squats.mp4',
    variations: ['Bodyweight', 'Goblet', 'Bulgarian split'],
    history: [
      { date: new Date(2025, 4, 2), sets: 3, reps: 12 },
      { date: new Date(2025, 4, 4), sets: 4, reps: 15 }
    ]
  }),
  
  new ExerciseData({
    id: 'ex-005',
    name: 'Lunges',
    sets: 3,
    repType: 'count',
    reps: 10,
    category: 'Lower Body',
    videoUrl: 'https://example.com/videos/lunges.mp4',
    variations: ['Walking', 'Reverse', 'Lateral'],
    history: [
      { date: new Date(2025, 4, 2), sets: 2, reps: 8 },
      { date: new Date(2025, 4, 4), sets: 3, reps: 10 }
    ]
  }),
  
  new ExerciseData({
    id: 'ex-006',
    name: 'Deadlifts',
    sets: 3,
    repType: 'count',
    reps: 8,
    category: 'Lower Body',
    videoUrl: 'https://example.com/videos/deadlifts.mp4',
    variations: ['Conventional', 'Romanian', 'Sumo'],
    history: [
      { date: new Date(2025, 4, 2), sets: 3, reps: 6 },
      { date: new Date(2025, 4, 4), sets: 3, reps: 8 }
    ]
  }),
  
  // Core exercises
  new ExerciseData({
    id: 'ex-007',
    name: 'Plank',
    sets: 3,
    repType: 'time',
    reps: 30,
    category: 'Core',
    videoUrl: 'https://example.com/videos/plank.mp4',
    variations: ['Forearm', 'Side plank', 'Dynamic plank'],
    history: [
      { date: new Date(2025, 4, 3), sets: 3, reps: 20 },
      { date: new Date(2025, 4, 5), sets: 3, reps: 30 }
    ]
  }),
  
  new ExerciseData({
    id: 'ex-008',
    name: 'Crunches',
    sets: 3,
    repType: 'count',
    reps: 20,
    category: 'Core',
    videoUrl: 'https://example.com/videos/crunches.mp4',
    variations: ['Basic', 'Bicycle', 'Reverse'],
    history: [
      { date: new Date(2025, 4, 3), sets: 2, reps: 15 },
      { date: new Date(2025, 4, 5), sets: 3, reps: 20 }
    ]
  }),
  
  new ExerciseData({
    id: 'ex-009',
    name: 'Russian Twists',
    sets: 3,
    repType: 'count',
    reps: 15,
    category: 'Core',
    videoUrl: 'https://example.com/videos/russian-twists.mp4',
    variations: ['Bodyweight', 'Weighted', 'Medicine ball'],
    history: [
      { date: new Date(2025, 4, 3), sets: 2, reps: 12 },
      { date: new Date(2025, 4, 5), sets: 3, reps: 15 }
    ]
  })
];

/**
 * Initial workout plan data
 */
export const initialWorkoutPlan = new WorkoutPlan({
  id: 'plan-001',
  startDate: new Date(2025, 4, 1), // May 1, 2025
  days: {
    monday: ['ex-001', 'ex-002', 'ex-003'], // Upper Body
    tuesday: ['ex-004', 'ex-005', 'ex-006'], // Lower Body
    wednesday: ['ex-007', 'ex-008', 'ex-009'], // Core
    thursday: ['ex-001', 'ex-002', 'ex-003'], // Upper Body
    friday: ['ex-004', 'ex-005', 'ex-006'], // Lower Body
    saturday: ['ex-007', 'ex-008', 'ex-009'], // Core
    sunday: [] // Rest day
  }
});

/**
 * Initial timer stages
 */
export const initialTimerStages = [
  {
    id: 'stage-001',
    name: 'Warm Up',
    duration: 60 // 1 minute
  },
  {
    id: 'stage-002',
    name: 'Exercise',
    duration: 180 // 3 minutes
  },
  {
    id: 'stage-003',
    name: 'Rest',
    duration: 30 // 30 seconds
  }
];

/**
 * Get all initial data
 * @returns {Object} Object with exercises, workout plan, and timer stages
 */
export const getInitialData = () => ({
  exercises: initialExercises,
  workoutPlan: initialWorkoutPlan,
  timerStages: initialTimerStages
});