import React, { useState, useEffect } from 'react';
import { Play, Timer, Flame, Heart, Search, Filter, ChevronRight, Star, Trophy, Dumbbell, Zap, Users } from 'lucide-react';
import WorkoutComponent from './WorkoutComponent';

const WorkoutsPage = () => {
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [likedWorkouts, setLikedWorkouts] = useState([]);

    const categories = ['All', 'Cardio', 'Strength', 'Yoga', 'HIIT', 'Recovery'];

    // Simulated function for backend call
    const handleLikeWorkout = async (workoutId, isCurrentlyLiked) => {
        try {
            setLikedWorkouts(prev => {
                if (isCurrentlyLiked) {
                    return prev.filter(id => id !== workoutId);
                } else {
                    return [...prev, workoutId];
                }
            });
            console.log('Sending to backend:', {
                workoutId,
                action: isCurrentlyLiked ? 'unlike' : 'like',
                timestamp: new Date().toISOString()
            });
        } catch (error) {
            console.error('Error updating like status:', error);
        }
    };

    const workouts = [
        {
            id: 1,
            name: "HIIT Cardio Blast",
            type: "HIIT",
            difficulty: "Advanced",
            description: "High-intensity interval training combining cardio bursts with recovery periods for maximum calorie burn.",
            duration: "45 mins",
            calories: "400-500",
            intensity: "High",
            rating: 4.9,
            participants: "2.5k",
            videoId: "example1",
            trainer: {
                name: "Sarah Johnson",
                specialty: "HIIT Training",
                experience: "8 years"
            }
        },
        {
            id: 2,
            name: "Power Flow Yoga",
            type: "Yoga",
            description: "Dynamic yoga flow focusing on core strength and flexibility.",
            duration: "60 mins",
            calories: "200-300",
            intensity: "Medium",
            videoId: "example2",
            trainer: {
                name: "Mike Chen",
                specialty: "Power Yoga",
                experience: "10 years"
            }
        },
        {
            id: 3,
            name: "Strength & Conditioning",
            type: "Strength",
            description: "Full-body strength workout combining compound movements with conditioning exercises.",
            duration: "50 mins",
            calories: "350-450",
            intensity: "High",
            videoId: "example3",
            trainer: {
                name: "Alex Rodriguez",
                specialty: "Strength Training",
                experience: "12 years"
            }
        },
        {
            id: 4,
            name: "Recovery & Stretch",
            type: "Recovery",
            description: "Gentle stretching and mobility work to improve flexibility and reduce muscle tension.",
            duration: "30 mins",
            calories: "100-150",
            intensity: "Low",
            videoId: "example4",
            trainer: {
                name: "Emma Wilson",
                specialty: "Mobility & Recovery",
                experience: "6 years"
            }
        },
        {
            id: 5,
            name: "CrossFit Elite",
            type: "CrossFit",
            difficulty: "Advanced",
            description: "High-intensity functional training combining Olympic lifting, gymnastics, and metabolic conditioning for elite fitness.",
            duration: "55 mins",
            calories: "500-600",
            intensity: "Very High",
            rating: 4.9,
            participants: "1.9k",
            videoId: "example7",
            trainer: {
                name: "David Brooks",
                specialty: "CrossFit Level 3",
                experience: "11 years"
            }
        },
        {
            id: 6,
            name: "Dynamic Pilates Flow",
            type: "Pilates",
            difficulty: "Intermediate",
            description: "Modern Pilates workout focusing on core strength, posture, and fluid movement patterns using dynamic sequences.",
            duration: "45 mins",
            calories: "250-300",
            intensity: "Medium",
            rating: 4.8,
            participants: "2.2k",
            videoId: "example8",
            trainer: {
                name: "Sophie Martinez",
                specialty: "Contemporary Pilates",
                experience: "9 years"
            }
        },
        {
            id: 7,
            name: "Power Lifting Fundamentals",
            type: "Strength",
            difficulty: "Advanced",
            description: "Master the three big lifts: squat, bench press, and deadlift with proper form and progressive overload techniques.",
            duration: "70 mins",
            calories: "400-500",
            intensity: "High",
            rating: 4.7,
            participants: "1.5k",
            videoId: "example9",
            trainer: {
                name: "Marcus Strong",
                specialty: "Power Lifting",
                experience: "15 years"
            }
        },
        {
            id: 8,
            name: "Meditative Yin Yoga",
            type: "Yoga",
            difficulty: "Beginner",
            description: "Deep stretching and meditation practice holding gentle poses for extended periods to improve flexibility and mindfulness.",
            duration: "75 mins",
            calories: "150-200",
            intensity: "Low",
            rating: 4.9,
            participants: "3.7k",
            videoId: "example10",
            trainer: {
                name: "Luna Chang",
                specialty: "Yin Yoga",
                experience: "12 years"
            }
        },
        {
            id: 9,
            name: "Endurance Runner's Circuit",
            type: "Cardio",
            difficulty: "Intermediate",
            description: "Specialized training combining running intervals with strength exercises to boost endurance and prevent injuries.",
            duration: "65 mins",
            calories: "600-700",
            intensity: "High",
            rating: 4.8,
            participants: "2.1k",
            videoId: "example11",
            trainer: {
                name: "Tom Reynolds",
                specialty: "Endurance Training",
                experience: "10 years"
            }
        },
        {
            id: 10,
            name: "Athletic Recovery & Mobility",
            type: "Recovery",
            difficulty: "All Levels",
            description: "Comprehensive recovery session using foam rolling, dynamic stretching, and mobility drills for optimal performance.",
            duration: "40 mins",
            calories: "150-200",
            intensity: "Low",
            rating: 4.9,
            participants: "5.2k",
            videoId: "example12",
            trainer: {
                name: "Maya Patel",
                specialty: "Sports Recovery",
                experience: "8 years"
            }
        }
    ].map(workout => ({
        ...workout,
        likeCount: workout.likeCount || `${Math.floor(Math.random() *  10)}` 
    }));

    const filteredWorkouts = workouts.filter(workout => {
        const matchesSearch = workout.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            workout.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || workout.type === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    if (selectedWorkout) {
        return (
            <WorkoutComponent
                workoutData={selectedWorkout}
                onBack={() => setSelectedWorkout(null)}
            />
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-950 text-white p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="relative space-y-4">
                    <div className="absolute -top-20 -right-20 w-96 h-96 bg-purple-800 rounded-full filter blur-[128px] opacity-10" />
                    <div className="relative">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                                Discover Your Perfect Workout
                            </span>
                        </h1>
                        <p className="text-zinc-400 text-xl max-w-2xl leading-relaxed">
                            Transform your fitness journey with our premium collection of expert-led workouts.
                        </p>
                    </div>
                </div>

                {/* Search and Filter Section */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-500 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search workouts..."
                            className="w-full bg-zinc-900/90 backdrop-blur-xl rounded-xl px-12 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-600 border border-zinc-800"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-3 rounded-xl font-medium whitespace-nowrap transition-all duration-300 border ${selectedCategory === category
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg border-transparent'
                                    : 'bg-zinc-900/90 backdrop-blur-xl text-zinc-400 border-zinc-800 hover:text-white hover:border-purple-500'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Workouts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredWorkouts.map((workout) => {
                        const isLiked = likedWorkouts.includes(workout.id);

                        return (
                            <div
                                key={workout.id}
                                className="group relative overflow-hidden rounded-2xl cursor-pointer transform hover:scale-[1.02] transition-all duration-300 bg-zinc-900/50 border border-zinc-800/50 hover:border-purple-500/50"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/90 to-black/90 backdrop-blur-xl" />
                                <div className="relative p-6 space-y-4">
                                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                                        <span className="px-4 py-1.5 rounded-full text-sm bg-blue-500/10 border border-blue-400/20 text-blue-400 flex items-center gap-2">
                                            <Dumbbell className="w-4 h-4" />
                                            {workout.type}
                                        </span>
                                        <div className="flex items-center gap-3">
                                            <span className="text-zinc-400 text-sm flex items-center gap-1">
                                                <Users className="w-4 h-4" />
                                                {workout.likeCount}
                                            </span>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleLikeWorkout(workout.id, isLiked);
                                                }}
                                                className="p-2 rounded-full hover:bg-zinc-800/50 transition-colors"
                                            >
                                                <Heart
                                                    className={`w-5 h-5 transition-colors ${isLiked ? 'text-red-500 fill-red-500' : 'text-zinc-400'
                                                        }`}
                                                />
                                            </button>
                                        </div>
                                    </div>

                                    <div onClick={() => setSelectedWorkout(workout)}>
                                        <h3 className="text-2xl font-bold group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:via-purple-400 group-hover:to-pink-400 transition-all duration-300">
                                            {workout.name}
                                        </h3>

                                        <p className="text-zinc-400 line-clamp-2 mt-2">
                                            {workout.description}
                                        </p>

                                        <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400 mt-4">
                                            <span className="flex items-center gap-1">
                                                <Timer className="w-4 h-4" />
                                                {workout.duration}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Flame className="w-4 h-4 text-orange-400" />
                                                {workout.calories}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Zap className="w-4 h-4 text-yellow-400" />
                                                {workout.intensity}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between text-sm mt-4">
                                            <span className="flex items-center gap-1 text-purple-400">
                                                <Trophy className="w-4 h-4" />
                                                {workout.participants} completed
                                            </span>
                                        </div>

                                        <button className="mt-4 w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-medium flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg shadow-purple-600/20">
                                            <Play className="w-5 h-5" />
                                            Start Workout
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default WorkoutsPage;