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
  }),

  new ExerciseData({
    id: 'ex-012',
    name: 'Deadbugs',
    sets: 3,
    repType: 'count',
    reps: 20,
    category: 'Core',
    videoUrl: 'https://www.youtube.com/watch?v=5jDEulwWs04',
    variations: ['Caludron style'],
    history: [
      { date: new Date(2025, 4, 2), sets: 3, reps: 10 },
      { date: new Date(2025, 4, 4), sets: 3, reps: 20 }
    ]
  }),

  new ExerciseData({
    id: 'ex-013',
    name: 'Leg-Raises',
    sets: 3,
    repType: 'count',
    reps: 10,
    category: 'Core',
    videoUrl: 'https://www.youtube.com/watch?v=5jDEulwWs04',
    variations: ['Resistance Bands'],
    history: [
      { date: new Date(2025, 4, 2), sets: 3, reps: 10 },
      { date: new Date(2025, 4, 4), sets: 3, reps: 20 }
    ]
  }),
  new ExerciseData({
    id: 'ex-014',
    name: 'Ab-Roller',
    sets: 3,
    repType: 'count',
    reps: 10,
    category: 'Core',
    videoUrl: 'https://www.youtube.com/shorts/kISuoI7QCYk',
    variations: ['Resistance Bands'],
    history: [
      { date: new Date(2025, 4, 2), sets: 3, reps: 10 },
      { date: new Date(2025, 4, 4), sets: 3, reps: 20 }
    ]
  }),
  new ExerciseData({
    id: 'ex-015',
    name: 'Bicep Curls',
    sets: 3,
    repType: 'count',
    reps: 10,
    category: 'Upper Body',
    videoUrl: 'https://www.youtube.com/shorts/RfGESet5bJg',
    variations: ['Hammer Curls'],
    history: [
      { date: new Date(2025, 4, 2), sets: 3, reps: 10 },
      { date: new Date(2025, 4, 4), sets: 3, reps: 20 }
    ]
  }),

  new ExerciseData({
    id: 'ex-016',
    name: 'Dumbbell Bench Press',
    sets: 3,
    repType: 'count',
    reps: 8,
    category: 'Upper Body',
    videoUrl: 'https://www.youtube.com/watch?v=VmB1vGsuj44',
    variations: ['Incline dumbbell press', 'Decline dumbbell press'],
    history: [
      { date: new Date(2025, 4, 5), sets: 2, reps: 6 },
      { date: new Date(2025, 4, 7), sets: 3, reps: 8 }
    ]
  }),

  new ExerciseData({
    id: 'ex-017',
    name: 'Dumbbell Rows',
    sets: 3,
    repType: 'count',
    reps: 10,
    category: 'Upper Body',
    videoUrl: 'https://www.youtube.com/watch?v=RMr_aqvn_m8',
    variations: ['Renegade rows', 'Chest supported dumbbell rows'],
    history: [
      { date: new Date(2025, 4, 5), sets: 2, reps: 8 },
      { date: new Date(2025, 4, 7), sets: 3, reps: 10 }
    ]
  }),

  new ExerciseData({
    id: 'ex-018',
    name: 'Dumbbell Shoulder Press',
    sets: 3,
    repType: 'count',
    reps: 8,
    category: 'Upper Body',
    videoUrl: 'https://www.youtube.com/watch?v=9M648mwKkCY',
    variations: ['Arnold press', 'Lateral raises'],
    history: [
      { date: new Date(2025, 4, 5), sets: 2, reps: 6 },
      { date: new Date(2025, 4, 7), sets: 3, reps: 8 }
    ]
  }),

  new ExerciseData({
    id: 'ex-019',
    name: 'Dumbbell Bicep Curls',
    sets: 3,
    repType: 'count',
    reps: 12,
    category: 'Upper Body',
    videoUrl: 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo',
    variations: ['Hammer curls', 'Concentration curls'],
    history: [
      { date: new Date(2025, 4, 5), sets: 2, reps: 10 },
      { date: new Date(2025, 4, 7), sets: 3, reps: 12 }
    ]
  }),

  new ExerciseData({
    id: 'ex-020',
    name: 'Dumbbell Tricep Extensions',
    sets: 3,
    repType: 'count',
    reps: 10,
    category: 'Upper Body',
    videoUrl: 'https://www.youtube.com/watch?v=ZnnF-H0Wq3g',
    variations: ['Overhead tricep extensions', 'Lying tricep extensions'],
    history: [
      { date: new Date(2025, 4, 5), sets: 2, reps: 8 },
      { date: new Date(2025, 4, 7), sets: 3, reps: 10 }
    ]
  }),

  new ExerciseData({
    id: 'ex-021',
    name: 'Dumbbell Flyes',
    sets: 3,
    repType: 'count',
    reps: 10,
    category: 'Upper Body',
    videoUrl: 'https://www.youtube.com/watch?v=rFZ-Uc8_K4c',
    variations: ['Incline dumbbell flyes', 'Decline dumbbell flyes'],
    history: [
      { date: new Date(2025, 4, 5), sets: 2, reps: 8 },
      { date: new Date(2025, 4, 7), sets: 3, reps: 10 }
    ]
  }),

  new ExerciseData({
    id: 'ex-022',
    name: 'Dumbbell Shrugs',
    sets: 3,
    repType: 'count',
    reps: 15,
    category: 'Upper Body',
    videoUrl: 'https://www.youtube.com/watch?v=cJRVNpCftCE',
    variations: ['Behind the back dumbbell shrugs'],
    history: [
      { date: new Date(2025, 4, 5), sets: 2, reps: 12 },
      { date: new Date(2025, 4, 7), sets: 3, reps: 15 }
    ]
  }),

  new ExerciseData({
    id: 'ex-023',
    name: 'Dumbbell Front Raises',
    sets: 3,
    repType: 'count',
    reps: 12,
    category: 'Upper Body',
    videoUrl: 'https://www.youtube.com/watch?v=aqRlJgJGC0Q',
    variations: ['Alternating front raises', 'Plate front raises'],
    history: [
      { date: new Date(2025, 4, 5), sets: 2, reps: 10 },
      { date: new Date(2025, 4, 7), sets: 3, reps: 12 }
    ]
  }),

  new ExerciseData({
    id: 'ex-024',
    name: 'Dumbbell Lateral Raises',
    sets: 3,
    repType: 'count',
    reps: 12,
    category: 'Upper Body',
    videoUrl: 'https://www.youtube.com/watch?v=3VcKaXpzqRo',
    variations: ['Cable lateral raises', 'Seated lateral raises'],
    history: [
      { date: new Date(2025, 4, 5), sets: 2, reps: 10 },
      { date: new Date(2025, 4, 7), sets: 3, reps: 12 }
    ]
  }),

  new ExerciseData({
    id: 'ex-025',
    name: 'Dumbbell Pullovers',
    sets: 3,
    repType: 'count',
    reps: 10,
    category: 'Upper Body',
    videoUrl: 'https://www.youtube.com/watch?v=vthMCWPy-cE',
    variations: ['Dumbbell Floor Pullover', 'Bent Arm Dumbbell Pullover'],
    history: [
      { date: new Date(2025, 4, 5), sets: 2, reps: 8 },
      { date: new Date(2025, 4, 7), sets: 3, reps: 10 }
    ]
  }),

  new ExerciseData({
    id: 'ex-026',
    name: 'Banded Squats',
    sets: 3,
    repType: 'count',
    reps: 15,
    category: 'Lower Body',
    videoUrl: 'https://www.youtube.com/watch?v=C3eO_V0q6wY',
    variations: ['Banded bodyweight squats', 'Banded goblet squats'],
    history: [
      { date: new Date(2025, 4, 8), sets: 2, reps: 12 },
      { date: new Date(2025, 4, 10), sets: 3, reps: 15 }
    ]
  }),

  new ExerciseData({
    id: 'ex-027',
    name: 'Banded Glute Bridges',
    sets: 3,
    repType: 'count',
    reps: 15,
    category: 'Lower Body',
    videoUrl: 'https://www.youtube.com/watch?v=f4W2u-b7H5k',
    variations: ['Banded single-leg glute bridge', 'Banded hip thrusts'],
    history: [
      { date: new Date(2025, 4, 8), sets: 2, reps: 12 },
      { date: new Date(2025, 4, 10), sets: 3, reps: 15 }
    ]
  }),

  new ExerciseData({
    id: 'ex-028',
    name: 'Banded Lateral Walks',
    sets: 3,
    repType: 'count',
    reps: 20, // (10 steps each direction)
    category: 'Lower Body',
    videoUrl: 'https://www.youtube.com/watch?v=sD_y54T_8pU',
    variations: ['Banded monster walks', 'Banded crab walks'],
    history: [
      { date: new Date(2025, 4, 8), sets: 2, reps: 16 },
      { date: new Date(2025, 4, 10), sets: 3, reps: 20 }
    ]
  }),

  new ExerciseData({
    id: 'ex-029',
    name: 'Banded Clamshells',
    sets: 3,
    repType: 'count',
    reps: 15,
    category: 'Lower Body',
    videoUrl: 'https://www.youtube.com/watch?v=eL-6W2i9rM4',
    variations: ['Clamshells with hip abduction', 'Banded side lying leg lift'],
    history: [
      { date: new Date(2025, 4, 8), sets: 2, reps: 12 },
      { date: new Date(2025, 4, 10), sets: 3, reps: 15 }
    ]
  }),

  new ExerciseData({
    id: 'ex-030',
    name: 'Banded Donkey Kicks',
    sets: 3,
    repType: 'count',
    reps: 15,
    category: 'Lower Body',
    videoUrl: 'https://www.youtube.com/watch?v=fX_Rk67vV60',
    variations: ['Fire hydrants with band', 'Donkey kick pulses'],
    history: [
      { date: new Date(2025, 4, 8), sets: 2, reps: 12 },
      { date: new Date(2025, 4, 10), sets: 3, reps: 15 }
    ]
  }),

  new ExerciseData({
    id: 'ex-031',
    name: 'Banded Hip Abductions (standing)',
    sets: 3,
    repType: 'count',
    reps: 15,
    category: 'Lower Body',
    videoUrl: 'https://www.youtube.com/watch?v=54H6V0W3v-s',
    variations: ['Standing hip abduction with kickback', 'Banded lateral leg swings'],
    history: [
      { date: new Date(2025, 4, 8), sets: 2, reps: 12 },
      { date: new Date(2025, 4, 10), sets: 3, reps: 15 }
    ]
  }),

  new ExerciseData({
    id: 'ex-032',
    name: 'Banded Hamstring Curls',
    sets: 3,
    repType: 'count',
    reps: 12,
    category: 'Lower Body',
    videoUrl: 'https://www.youtube.com/watch?v=tO_P9k27W00',
    variations: ['Banded lying hamstring curls', 'Seated hamstring curls'],
    history: [
      { date: new Date(2025, 4, 8), sets: 2, reps: 10 },
      { date: new Date(2025, 4, 10), sets: 3, reps: 12 }
    ]
  }),

  new ExerciseData({
    id: 'ex-033',
    name: 'Banded Calf Raises',
    sets: 3,
    repType: 'count',
    reps: 20,
    category: 'Lower Body',
    videoUrl: 'https://www.youtube.com/watch?v=q2y-wG44-4c',
    variations: ['Single-leg banded calf raises', 'Banded seated calf raises'],
    history: [
      { date: new Date(2025, 4, 8), sets: 2, reps: 16 },
      { date: new Date(2025, 4, 10), sets: 3, reps: 20 }
    ]
  }),

  new ExerciseData({
    id: 'ex-034',
    name: 'Banded Good Mornings',
    sets: 3,
    repType: 'count',
    reps: 10,
    category: 'Lower Body',
    videoUrl: 'https://www.youtube.com/watch?v=V-85b12933Q',
    variations: ['Banded good mornings with a slight knee bend'],
    history: [
      { date: new Date(2025, 4, 8), sets: 2, reps: 8 },
      { date: new Date(2025, 4, 10), sets: 3, reps: 10 }
    ]
  }),

  new ExerciseData({
    id: 'ex-035',
    name: 'Banded Romanian Deadlifts (RDLs)',
    sets: 3,
    repType: 'count',
    reps: 10,
    category: 'Lower Body',
    videoUrl: 'https://www.youtube.com/watch?v=8Kj-R90J7Q0',
    variations: ['Banded single-leg RDLs'],
    history: [
      { date: new Date(2025, 4, 8), sets: 2, reps: 8 },
      { date: new Date(2025, 4, 10), sets: 3, reps: 10 }
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
    friday: ['ex-006', 'ex-008', 'ex-010', 'ex-005', 'ex-012'], // Push-Ups, Plank Hold, Russian Twists, Standing Calf Raises
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