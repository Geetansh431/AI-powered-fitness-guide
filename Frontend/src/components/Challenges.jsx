import { Link } from 'react-router-dom';

const exercises = [
    {
        id: 1,
        name: 'Push-ups',
        durations: [
            { minutes: 5, difficulty: 'Beginner', calories: 50 },
            { minutes: 10, difficulty: 'Intermediate', calories: 100 },
            { minutes: 15, difficulty: 'Advanced', calories: 150 }
        ]
    },
    {
        id: 2,
        name: 'Squats',
        durations: [
            { minutes: 5, difficulty: 'Beginner', calories: 40 },
            { minutes: 10, difficulty: 'Intermediate', calories: 80 },
            { minutes: 15, difficulty: 'Advanced', calories: 120 }
        ]
    },
    {
        id: 3,
        name: 'Plank',
        durations: [
            { minutes: 5, difficulty: 'Beginner', calories: 30 },
            { minutes: 10, difficulty: 'Intermediate', calories: 60 },
            { minutes: 15, difficulty: 'Advanced', calories: 90 }
        ]
    },
    {
        id: 4,
        name: 'Burpees',
        durations: [
            { minutes: 5, difficulty: 'Beginner', calories: 70 },
            { minutes: 10, difficulty: 'Intermediate', calories: 140 },
            { minutes: 15, difficulty: 'Advanced', calories: 210 }
        ]
    },
    {
        id: 5,
        name: 'Mountain Climbers',
        durations: [
            { minutes: 5, difficulty: 'Beginner', calories: 45 },
            { minutes: 10, difficulty: 'Intermediate', calories: 90 },
            { minutes: 15, difficulty: 'Advanced', calories: 135 }
        ]
    }
];

const Challenges = () => {
    return (
        <div className="max-w-6xl mx-auto p-8">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Daily Challenges</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {exercises.map((exercise) => (
                    <div
                        key={exercise.id}
                        className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                        <h3 className="text-xl font-bold mb-4 text-gray-800">{exercise.name}</h3>
                        <div className="space-y-4">
                            {exercise.durations.map((duration) => (
                                <Link
                                    to={`/exercise/${exercise.id}?duration=${duration.minutes}`}
                                    key={`${exercise.id}-${duration.minutes}`}
                                    className="block group"
                                >
                                    <div className="p-4 rounded-lg bg-gray-50 hover:bg-purple-50 transition-colors duration-200">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-lg font-semibold text-purple-600">
                                                {duration.minutes} mins
                                            </span>
                                            <span className={`px-2 py-1 text-xs rounded-full ${duration.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                                                    duration.difficulty === 'Intermediate' ? 'bg-orange-100 text-orange-800' :
                                                        'bg-red-100 text-red-800'
                                                }`}>
                                                {duration.difficulty}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span>🔥 {duration.calories} kcal</span>
                                            <span className="group-hover:text-purple-600 transition-colors">
                                                Start →
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Challenges;