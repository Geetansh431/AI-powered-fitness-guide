import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Timer, Activity, Target, Dumbbell, AlertCircle, X, Play, Pause, RotateCcw, ChevronRight, Award, Flame, Heart, Images } from 'lucide-react';
import { useChallengesStore } from "../Store/useChallengesStore";

const Exercise = () => {


    const { id, difficulty } = useParams();
    const navigate = useNavigate();
    const { exercises } = useChallengesStore();
    const exercise = exercises.find(ex => ex.id === parseInt(id));
    const durationData = exercise?.durations?.find(d => d.difficulty === difficulty);
    const duration = durationData?.minutes || 15;

    // Determine port based on exercise name
    const getBaseURL = () => {
        const exerciseName = exercise?.name?.toLowerCase();
        if (exerciseName === "pushup") return import.meta.env.VITE_PUSHUP_URL ;
        if (exerciseName === "squats") return import.meta.env.VITE_SQUAT_URL ;
        return import.meta.env.VITE_DEFAULT_URL ;
    };
    
    const baseURL = getBaseURL();
    const videoStreamURL = `${baseURL}`;
    const exerciseDataURL = `${baseURL}/exercise-data`;
    

    const [timeLeft, setTimeLeft] = useState(duration * 60);
    const [isStreaming, setIsStreaming] = useState(true);
    const [isWorkoutStarted, setIsWorkoutStarted] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [caloriesBurned, setCaloriesBurned] = useState(0);
    const [heartRate, setHeartRate] = useState(70);
    const [workoutStats, setWorkoutStats] = useState({
        bestStreak: 0,
        totalReps: 0,
        avgSpeed: 0
    });

    const [exerciseData, setExerciseData] = useState({
        count: 0,
        feedback: ""
    });

    useEffect(() => {
        if (!exercise || !isWorkoutStarted || isPaused) return;
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(timer);
                        handleEnd();
                        return 0;
                    }
                    return prevTime - 1;
                });
                setCaloriesBurned(prev => prev + 0.15);
                setHeartRate(prev => Math.min(180, prev + Math.random() * 2 - 1));
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [timeLeft, exercise, isWorkoutStarted, isPaused]);


    useEffect(() => {
        if (!exercise || !isWorkoutStarted) return;

        const fetchExerciseData = async () => {
            try {
                const response = await fetch(exerciseDataURL);
                const data = await response.json();
                setExerciseData(data);

                // Update workout stats based on Python data
                setWorkoutStats(prev => ({
                    ...prev,
                    totalReps: data.count,
                    avgSpeed: Math.round((data.count / ((duration * 60 - timeLeft) / 60)) * 10) / 10
                }));
            } catch (error) {
                console.error("Error fetching exercise data:", error);
            }
        };

        const interval = setInterval(fetchExerciseData, 1000);
        return () => clearInterval(interval);
    }, [exercise, isWorkoutStarted, timeLeft]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const handleStart = () => {
        setIsWorkoutStarted(true);
        setIsPaused(false);
        setExerciseData({
            count: 0,
            feedback: ""
        });
        setCaloriesBurned(0);
        setHeartRate(70);
        setWorkoutStats({
            bestStreak: 0,
            totalReps: 0,
            avgSpeed: 0
        });
    };

    const handlePause = () => {
        setIsPaused(!isPaused);
    };

    const handleReset = () => {
        setTimeLeft(duration * 60);
        setIsWorkoutStarted(false);
        setIsPaused(false);
        // Reset all exercise data
        setExerciseData({
            pushup_count: 0,
            squat_count: 0,
            crunch_count: 0
        });
        setCaloriesBurned(0);
        setHeartRate(70);
        setWorkoutStats({
            bestStreak: 0,
            totalReps: 0,
            avgSpeed: 0
        });
    };

    const handleEnd = () => {
        if (!exercise) return;
        const totalTime = duration * 60 - timeLeft;
        localStorage.setItem("exerciseTime", totalTime);
        localStorage.setItem("lastWorkoutStats", JSON.stringify({
            totalReps: workoutStats.totalReps,
            caloriesBurned: Math.round(caloriesBurned),
            duration: totalTime
        }));
        navigate("/challenges");
    };

    if (!exercise) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 flex items-center justify-center p-8">
                <div className="bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 max-w-lg w-full text-center">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-white mb-2">
                        Exercise not found
                    </h2>
                    <p className="text-gray-400 mb-6">
                        The exercise you're looking for doesn't exist in our database
                    </p>
                    <button
                        onClick={() => navigate("/challenges")}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                    >
                        Return to Challenges
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 text-white py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Side - Exercise Information */}
                    <div className="space-y-6">
                        <div className="bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                                        {exercise.name}
                                    </h1>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium
                                            ${difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                                                difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                                                    'bg-red-500/20 text-red-400'}`}>
                                            {difficulty}
                                        </span>
                                        <span className="bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full text-sm">
                                            {exercise.type}
                                        </span>
                                    </div>
                                </div>
                                <div className="bg-purple-600/20 backdrop-blur-sm rounded-2xl p-4 text-center">
                                    <Timer className="w-6 h-6 text-purple-400 mb-2 mx-auto" />
                                    <span className="text-2xl font-bold text-white block">{formatTime(timeLeft)}</span>
                                    <span className="text-sm text-gray-400">remaining</span>
                                </div>
                            </div>

                            {/* Workout Controls */}
                            <div className="flex gap-4 mb-6">
                                {!isWorkoutStarted ? (
                                    <button
                                        onClick={handleStart}
                                        className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-4 rounded-xl text-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                                    >
                                        <Play className="w-5 h-5" />
                                        Start Workout
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            onClick={handlePause}
                                            className="flex-1 bg-purple-600/20 hover:bg-purple-600/30 text-white px-6 py-4 rounded-xl text-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                                        >
                                            {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                                            {isPaused ? 'Resume' : 'Pause'}
                                        </button>
                                        <button
                                            onClick={handleReset}
                                            className="flex-1 bg-gray-700/50 hover:bg-gray-700/70 text-white px-6 py-4 rounded-xl text-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                                        >
                                            <RotateCcw className="w-5 h-5" />
                                            Reset
                                        </button>
                                    </>
                                )}
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-300 mb-2">About this Exercise</h2>
                                    <p className="text-gray-400">{exercise.description}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-gray-700/50 rounded-2xl p-4">
                                        <Target className="w-5 h-5 text-purple-400 mb-2" />
                                        <p className="text-sm text-gray-400">Target Area</p>
                                        <p className="font-semibold text-white">{exercise.muscleGroup}</p>
                                    </div>
                                    <div className="bg-gray-700/50 rounded-2xl p-4">
                                        <Activity className="w-5 h-5 text-purple-400 mb-2" />
                                        <p className="text-sm text-gray-400">Duration</p>
                                        <p className="font-semibold text-white">{duration} minutes</p>
                                    </div>
                                </div>

                                <div className="bg-gray-700/50 rounded-2xl p-6">
                                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center justify-between">
                                        <span className="flex items-center gap-2">
                                            <Dumbbell className="w-6 h-6 text-purple-400" />
                                            Exercise Progress
                                        </span>
                                        <span className="text-sm text-gray-400">
                                            {workoutStats.avgSpeed} reps/min
                                        </span>
                                    </h2>
                                    <div className="space-y-4">
                                        {Object.entries(exerciseData).map(([key, value]) => (
                                            <div key={key} className="relative">
                                                <div className="flex justify-between items-center mb-2">
                                                    <p className="text-gray-400 capitalize">{key.replace('_', ' ')}</p>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-2xl font-bold text-purple-400">{value}</span>
                                                        <span className="text-gray-500">reps</span>
                                                    </div>
                                                </div>
                                                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                                                        style={{ width: `${(value / (durationData?.calories || 100)) * 100}%` }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-gray-700/50 rounded-2xl p-6">
                                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center justify-between">
                                        <span className="flex items-center gap-2">
                                            <Dumbbell className="w-6 h-6 text-purple-400" />
                                            Exercise Progress
                                        </span>
                                        <span className="text-sm text-gray-400">
                                            {workoutStats.avgSpeed} reps/min
                                        </span>
                                    </h2>
                                    <div className="space-y-4">
                                        <div className="relative">
                                            <div className="flex justify-between items-center mb-2">
                                                <p className="text-gray-400">Push-ups</p>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-2xl font-bold text-purple-400">
                                                        {exerciseData.count}
                                                    </span>
                                                    <span className="text-gray-500">reps</span>
                                                </div>
                                            </div>
                                            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                                                    style={{ width: `${(exerciseData.count / (durationData?.target || 30)) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Add feedback message from Python */}
                                    {exerciseData.feedback && (
                                        <div className="mt-4 p-4 bg-purple-600/20 rounded-xl">
                                            <p className="text-white">{exerciseData.feedback}</p>
                                        </div>
                                    )}
                                </div>
                                <button
                                    onClick={handleEnd}
                                    className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-4 rounded-xl text-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    <X className="w-5 h-5" />
                                    End Session
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Video Stream and Stats */}
                    <div className="space-y-6">
                        {/* Video Stream Container */}
                        <div className="relative rounded-3xl overflow-hidden bg-gray-800/80 backdrop-blur-sm h-[500px]">
                            {isStreaming ? (
                                <>
                                    <img
                                        src={videoStreamURL}
                                        alt="Exercise Stream"
                                        className="w-full h-full object-cover"
                                        onError={() => setIsStreaming(false)}
                                    />
                                    {/* Overlay with real-time feedback */}
                                </>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <div className="text-center p-8">
                                        <AlertCircle className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                                        <p className="text-2xl font-semibold text-white mb-2">Unable to load video stream</p>
                                        <p className="text-gray-400">Please check your connection and try again</p>
                                        <button
                                            onClick={() => setIsStreaming(true)}
                                            className="mt-4 bg-purple-600/20 hover:bg-purple-600/30 text-white px-4 py-2 rounded-xl transition-all duration-300"
                                        >
                                            Retry Connection
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Workout Tips and Form Guide */}
                        <div className="bg-gray-800/80 backdrop-blur-sm rounded-3xl p-6">
                            <h3 className="text-xl font-semibold text-white mb-4">Form Guide & Tips</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="bg-purple-600/20 rounded-xl p-2">
                                        <ChevronRight className="w-5 h-5 text-purple-400" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-white">Maintain Proper Form</p>
                                        <p className="text-gray-400">Keep your back straight and maintain controlled movements</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-purple-600/20 rounded-xl p-2">
                                        <ChevronRight className="w-5 h-5 text-purple-400" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-white">Breathing Technique</p>
                                        <p className="text-gray-400">Exhale during exertion, inhale during the easier phase</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-purple-600/20 rounded-xl p-2">
                                        <ChevronRight className="w-5 h-5 text-purple-400" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-white">Rest Intervals</p>
                                        <p className="text-gray-400">Take short breaks between sets to maintain energy</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Exercise;