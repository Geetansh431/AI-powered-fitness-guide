import { create } from "zustand";

export const useChallengesStore = create((get,set) => ({
    exercises : [
        {
            id: 1,
            name: 'Pushups',
            description: 'Build upper body strength',
            type: 'strength',
            muscleGroup: 'upper body',
            durations: [
                { minutes: 1, difficulty: 'Beginner', calories: 20 },
                { minutes: 10, difficulty: 'Intermediate', calories: 40 },
                { minutes: 15, difficulty: 'Advanced', calories: 100 }
            ]
        },
        {
            id: 2,
            name: 'Squats',
            description: 'Strengthen your lower body',
            type: 'strength',
            muscleGroup: 'lower body',
            durations: [
                { minutes: 5, difficulty: 'Beginner', calories: 20 },
                { minutes: 10, difficulty: 'Intermediate', calories: 50 },
                { minutes: 15, difficulty: 'Advanced', calories: 120 }
            ]
        },
        {
            id: 3,
            name: 'Plank',
            description: 'Core stability master',
            type: 'core',
            muscleGroup: 'core',
            durations: [
                { minutes: 5, difficulty: 'Beginner', calories: 30 },
                { minutes: 10, difficulty: 'Intermediate', calories: 60 },
                { minutes: 15, difficulty: 'Advanced', calories: 90 }
            ]
        },
        {
            id: 4,
            name: 'Burpees',
            description: 'Full body intensity',
            type: 'cardio',
            muscleGroup: 'full body',
            durations: [
                { minutes: 5, difficulty: 'Beginner', calories: 70 },
                { minutes: 10, difficulty: 'Intermediate', calories: 140 },
                { minutes: 15, difficulty: 'Advanced', calories: 210 }
            ]
        },
        {
            id: 5,
            name: 'Mountain Climbers',
            description: 'Cardio champion',
            type: 'cardio',
            muscleGroup: 'full body',
            durations: [
                { minutes: 5, difficulty: 'Beginner', calories: 45 },
                { minutes: 10, difficulty: 'Intermediate', calories: 90 },
                { minutes: 15, difficulty: 'Advanced', calories: 135 }
            ]
        }
    ],
    
}));
