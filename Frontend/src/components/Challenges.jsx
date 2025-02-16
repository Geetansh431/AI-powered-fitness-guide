import { Link } from 'react-router-dom';

const exercises = [
    { id: 1, name: 'Push-ups', duration: '5 mins' },
    { id: 2, name: 'Squats', duration: '10 mins' },
    { id: 3, name: 'Plank', duration: '3 mins' },
];

const Challenges = () => {
    return (
        <div className="max-w-6xl mx-auto p-8">
            <h2 className="text-3xl font-bold mb-8">Daily Challenges</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {exercises.map((exercise) => (
                    <Link to={`/exercise/${exercise.id}`} key={exercise.id} className="bg-gray-100 p-6 rounded-xl hover:-translate-y-1 transition-transform duration-300" >
                        <h3 className="text-xl font-bold mb-2">{exercise.name}</h3>
                        <p className="text-green-600 font-medium">{exercise.duration}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Challenges;