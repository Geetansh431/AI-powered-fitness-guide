import React, { useState, useEffect } from 'react';
import { Play, Timer, Flame, Heart, Search, Filter, ChevronRight, Star, Trophy, Dumbbell, Zap, Users } from 'lucide-react';
import WorkoutComponent from './WorkoutComponent';
import axiosInstance from "../lib/Axios.jsx"
import { useAuthStore } from '../Store/useAuthStore.jsx';


const WorkoutsPage = () => {
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [likedWorkouts, setLikedWorkouts] = useState([]);
    const [workouts, setWorkouts] = useState([]);  // State to store workouts

    const {authUser} = useAuthStore();

    const categories = ['All', 'Cardio', 'Strength', 'Yoga', 'HIIT', 'Recovery'];

    // Fetch workouts from backend
    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const res = await axiosInstance.get('/tutorial/fetch'); // Replace with your actual API endpoint
                setWorkouts(res.data.tutorials); 
            } catch (error) {
                console.error('Error fetching workouts:', error);
            }
        };

        fetchWorkouts();
    }, []);  // Empty dependency array to fetch data only once on component mount

    // Handle workout like/unlike

        const handleLikeWorkout = async (workoutId, isCurrentlyLiked) => {
            try {
                // Update the likedWorkouts state first for immediate UI feedback
                setLikedWorkouts(prev => {
                    if (isCurrentlyLiked) {
                        return prev.filter(id => id !== workoutId);
                    } else {
                        return [...prev, workoutId];
                    }
                });
                const response = await axiosInstance.patch(`/tutorial/like/${workoutId}`, {
                    userid  : authUser._id,
                });
        
                // Log the response from the backend (optional)
                console.log('Backend response:', response.data);
            } catch (error) {
                console.error('Error updating like status:', error);
            }
        };
        
    // Filter workouts based on search and category
    const filteredWorkouts = workouts?.filter(workout => {
        const matchesSearch = workout.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            workout.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || workout.type === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Display selected workout details
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
                        {categories?.map((category) => (
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
                    {filteredWorkouts?.map((workout) => {
                        const isLiked = likedWorkouts.includes(workout._id);

                        return (
                            <div
                                key={workout._id}
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
                                                    handleLikeWorkout(workout._id, isLiked);
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
