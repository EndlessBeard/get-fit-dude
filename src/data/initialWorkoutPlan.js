import ExerciseData from '../models/ExerciseData';
import WorkoutPlan from '../models/WorkoutPlan';

/**
 * Initial exercise data for the app
 * Adapted from workout_data.js
 */
export const initialExercises = [
  // Lower Body exercises
  new ExerciseData({
    id: 'ex-001',
    name: 'Squats',
    sets: 3,
    repType: 'count',
    reps: 10,
    category: 'Lower Body',
    videoUrl: 'https://www.youtube.com/watch?v=aclHkVaku9U',
    variations: ['Chair-assisted squats', 'Box squats', 'Jump squats'],
    history: [
      { date: new Date(2025, 4, 1), sets: 2, reps: 8 },
      { date: new Date(2025, 4, 3), sets: 3, reps: 10 }
    ]
  }),
  
  new ExerciseData({
    id: 'ex-002',
    name: 'Lunges',
    sets: 3,
    repType: 'count',
    reps: 12,
    category: 'Lower Body',
    videoUrl: 'https://www.youtube.com/watch?v=QOVaHwm-Q6U',
    variations: ['Static lunges', 'Walking lunges', 'Reverse lunges'],
    history: [
      { date: new Date(2025, 4, 1), sets: 2, reps: 10 },
      { date: new Date(2025, 4, 3), sets: 3, reps: 12 }
    ]
  }),
  
  new ExerciseData({
    id: 'ex-003',
    name: 'Lying Glute Bridges',
    sets: 3,
    repType: 'count',
    reps: 10,
    category: 'Lower Body',
    videoUrl: 'https://www.youtube.com/watch?v=8bbE64NuDTU',
    variations: ['Feet elevated on a chair/bench', 'Single-leg glute bridge (advanced)'],
    history: [
      { date: new Date(2025, 4, 1), sets: 2, reps: 8 },
      { date: new Date(2025, 4, 3), sets: 3, reps: 10 }
    ]
  }),
  
  new ExerciseData({
    id: 'ex-004',
    name: 'Good Mornings',
    sets: 3,
    repType: 'count',
    reps: 8,
    category: 'Lower Body',
    videoUrl: 'https://www.youtube.com/watch?v=vKPGe8zb2S4',
    variations: ['Bodyweight good mornings', 'Banded good mornings'],
    history: [
      { date: new Date(2025, 4, 1), sets: 2, reps: 6 },
      { date: new Date(2025, 4, 3), sets: 3, reps: 8 }
    ]
  }),
  
  new ExerciseData({
    id: 'ex-005',
    name: 'Standing Calf Raises',
    sets: 3,
    repType: 'count',
    reps: 15,
    category: 'Lower Body',
    videoUrl: 'https://www.youtube.com/watch?v=-M4-G8p8fmc',
    variations: ['Single-leg calf raises', 'Toe-elevated calf raises'],
    history: [
      { date: new Date(2025, 4, 1), sets: 2, reps: 12 },
      { date: new Date(2025, 4, 3), sets: 3, reps: 15 }
    ]
  }),
  
  // Upper Body exercises
  new ExerciseData({
    id: 'ex-006',
    name: 'Push-Ups',
    sets: 3,
    repType: 'count',
    reps: 8,
    category: 'Upper Body',
    videoUrl: 'https://www.youtube.com/watch?v=IODxDxX7oi4',
    variations: ['Knee push-ups', 'Incline push-ups', 'Diamond push-ups'],
    history: [
      { date: new Date(2025, 4, 2), sets: 2, reps: 6 },
      { date: new Date(2025, 4, 4), sets: 3, reps: 8 }
    ]
  }),
  
  new ExerciseData({
    id: 'ex-007',
    name: 'Chair Dips',
    sets: 3,
    repType: 'count',
    reps: 10,
    category: 'Upper Body',
    videoUrl: 'https://www.youtube.com/watch?v=0326dy_-CzM',
    variations: ['Bench dips', 'Legs elevated dips'],
    history: [
      { date: new Date(2025, 4, 2), sets: 2, reps: 8 },
      { date: new Date(2025, 4, 4), sets: 3, reps: 10 }
    ]
  }),
  
  // Core exercises
  new ExerciseData({
    id: 'ex-008',
    name: 'Plank Hold',
    sets: 3,
    repType: 'time',
    reps: 20,
    category: 'Core',
    videoUrl: 'https://www.youtube.com/watch?v=pSHjTRCQxIw',
    variations: ['Forearm plank', 'Inclined plank (hands on bench)'],
    history: [
      { date: new Date(2025, 4, 2), sets: 2, reps: 15 },
      { date: new Date(2025, 4, 4), sets: 3, reps: 20 }
    ]
  }),
  
  new ExerciseData({
    id: 'ex-009',
    name: 'Side Plank',
    sets: 3,
    repType: 'time',
    reps: 15,
    category: 'Core',
    videoUrl: 'https://www.youtube.com/watch?v=K1JYl9T4l2A',
    variations: ['Modified side plank (bottom knee bent)', 'Forearm on a bench/chair'],
    history: [
      { date: new Date(2025, 4, 2), sets: 2, reps: 10 },
      { date: new Date(2025, 4, 4), sets: 3, reps: 15 }
    ]
  }),
  
  new ExerciseData({
    id: 'ex-010',
    name: 'Russian Twists',
    sets: 3,
    repType: 'count',
    reps: 12,
    category: 'Core',
    videoUrl: 'https://www.youtube.com/watch?v=JyUqwkVpsi8',
    variations: ['Feet on the floor', 'Feet elevated', 'Weighted twists'],
    history: [
      { date: new Date(2025, 4, 2), sets: 2, reps: 10 },
      { date: new Date(2025, 4, 4), sets: 3, reps: 12 }
    ]
  }),
  
  new ExerciseData({
    id: 'ex-011',
    name: 'Supermans',
    sets: 3,
    repType: 'count',
    reps: 10,
    category: 'Core',
    videoUrl: 'https://www.youtube.com/watch?v=cc6UVRS7PW4',
    variations: ['Lift only arms, then only legs, alternate', 'Quadruped bird-dog (related movement)'],
    history: [
      { date: new Date(2025, 4, 2), sets: 2, reps: 8 },
      { date: new Date(2025, 4, 4), sets: 3, reps: 10 }
    ]
  })
];

/**
 * Initial workout plan data
 * Based on workout_data.js weekly schedule
 */
export const initialWorkoutPlan = new WorkoutPlan({
  id: 'plan-001',
  startDate: new Date(2025, 4, 1), // May 1, 2025
  days: {
    monday: ['ex-001', 'ex-008', 'ex-003'], // Squats, Plank Hold, Lying Glute Bridges
    tuesday: ['ex-006', 'ex-008', 'ex-007'], // Push-Ups, Plank Hold, Chair Dips
    wednesday: [], // Rest day
    thursday: ['ex-001', 'ex-002', 'ex-004'], // Squats, Lunges, Good Mornings
    friday: ['ex-006', 'ex-008', 'ex-010', 'ex-005'], // Push-Ups, Plank Hold, Russian Twists, Standing Calf Raises
    saturday: [], // Optional activity
    sunday: [] // Rest day
  },
  workoutTypes: {
    monday: 'Lower Body + Core',
    tuesday: 'Upper Body + Core',
    wednesday: 'Rest Day',
    thursday: 'Lower Body + Core',
    friday: 'Upper Body + Core',
    saturday: 'Optional Activity',
    sunday: 'Rest Day'
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