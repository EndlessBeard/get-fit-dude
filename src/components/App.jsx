import React from 'react';
import { WorkoutProvider } from '../context/WorkoutContext';
import { TimerProvider } from '../context/TimerContext';
import Header from './Header';
import WorkoutCalendar from './WorkoutCalendar';
import DailyWorkout from './DailyWorkout';
import TimerPanel from './TimerPanel';
import ExerciseInfo from './ExerciseInfo';

const App = () => {
    return (
        <WorkoutProvider>
            <TimerProvider>
                <div className="app-container dark bg-dark min-h-screen text-white px-4 py-6 flex flex-col items-center">
                    <div className="w-full max-w-md mx-auto">
                        <Header />
                        
                        <section id="workout-calendar" className="panel mb-6 animate-fadeIn">
                            <WorkoutCalendar />
                        </section>
                        
                        <section id="daily-workout" className="panel mb-6 animate-fadeIn" style={{animationDelay: '0.1s'}}>
                            <DailyWorkout />
                        </section>
                        
                        <section id="timer-panel" className="panel mb-6 animate-fadeIn" style={{animationDelay: '0.2s'}}>
                            <TimerPanel />
                        </section>
                        
                        <section id="exercise-info" className="panel mb-6 animate-fadeIn" style={{animationDelay: '0.3s'}}>
                            <ExerciseInfo />
                        </section>
                        
                        <footer className="mt-4 text-center text-gray-500 text-sm py-4">
                            <span className="glow-effect">Conduction 2025</span>
                        </footer>
                    </div>
                </div>
            </TimerProvider>
        </WorkoutProvider>
    );
};

export default App;