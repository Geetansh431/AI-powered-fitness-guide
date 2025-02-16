import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Cardio from "../assets/Cardio.webp";
import Yoga from "../assets/Yoga.webp";
import Strength from "../assets/Streng.webp";
import {
  Dumbbell,
  Flame,
  Trophy,
  ChevronRight,
  Play,
  Users,
  Timer,
  Star,
} from 'lucide-react';

const Home = () => {
  const [selectedPlan, setSelectedPlan] = useState('all'); // State to track the selected plan
  const navigate = useNavigate(); // Hook for navigation

  const stats = [
    { value: '10K+', label: 'Active Users', icon: Users, color: 'from-blue-500 to-indigo-500' },
    { value: '500+', label: 'Workouts', icon: Dumbbell, color: 'from-purple-500 to-pink-500' },
    { value: '98%', label: 'Success Rate', icon: Trophy, color: 'from-green-500 to-emerald-500' },
    { value: '45min', label: 'Avg. Session', icon: Timer, color: 'from-orange-500 to-red-500' },
  ];

  const featuredWorkouts = [
    {
      id: 1,
      title: "HIIT Cardio Blast",
      duration: "30 min",
      calories: "400",
      difficulty: "Intermediate",
      rating: 4.8,
      image: Cardio,
      trainer: "Caroline Girvan",
      category: "cardio",
      route: "/workout/cardio" // Add a route for each workout
    },
    {
      id: 2,
      title: "Power Yoga Flow",
      duration: "45 min",
      calories: "250",
      difficulty: "All Levels",
      rating: 4.9,
      image: Yoga,
      trainer: "Move With Nicole",
      category: "yoga",
      route: "/workout/yoga" // Add a route for each workout
    },
    {
      id: 3,
      title: "Strength Foundation",
      duration: "50 min",
      calories: "350",
      difficulty: "Beginner",
      rating: 4.7,
      image: Strength,
      trainer: "Heather Robertson",
      category: "strength",
      route: "/workout/strength" // Add a route for each workout
    }
  ];

  const plans = [
    { id: 'all', name: 'All Workouts' },
    { id: 'cardio', name: 'Cardio' },
    { id: 'strength', name: 'Strength' },
    { id: 'yoga', name: 'Yoga' },
  ];

  // Filter workouts based on the selected plan
  const filteredWorkouts = selectedPlan === 'all'
    ? featuredWorkouts
    : featuredWorkouts.filter(workout => workout.category === selectedPlan);

  // Function to handle workout button click
  const handleStartWorkout = (route) => {
    navigate(route); // Navigate to the corresponding workout page
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Hero Section */}
      <motion.div
        className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-gradient" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h1 className="text-6xl md:text-7xl font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                  Transform
                </span>
                <br />
                Your Fitness Journey
              </h1>

              <p className="text-xl text-gray-300">
                Experience personalized AI-powered workouts with real-time form correction and progress tracking
              </p>

              <div className="flex flex-wrap gap-4">
                <motion.button
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-semibold flex items-center gap-2 overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">Start Training</span>
                  <Play className="w-5 h-5 relative z-10" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500"
                    initial={{ x: "100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>

                <motion.button
                  className="px-8 py-4 border border-gray-700 rounded-xl font-semibold flex items-center gap-2"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Programs <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-zinc-900/50 backdrop-blur-xl p-6 rounded-2xl border border-gray-800"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`bg-gradient-to-r ${stat.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Featured Workouts Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold">Featured Workouts</h2>
            <div className="flex gap-4">
              {plans.map((plan) => (
                <motion.button
                  key={plan.id}
                  className={`px-6 py-2 rounded-xl text-sm font-medium transition-colors ${selectedPlan === plan.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'bg-zinc-900 text-gray-400 hover:text-white'
                    }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.name}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWorkouts.map((workout) => (
              <motion.div
                key={workout.id}
                className="bg-zinc-900/50 rounded-2xl overflow-hidden border border-gray-800"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="relative">
                  <img
                    src={workout.image}
                    alt={workout.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <div className="bg-yellow-500 text-black px-2 py-1 rounded-lg text-sm font-medium flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      {workout.rating}
                    </div>
                    <div className="bg-blue-500 text-white px-2 py-1 rounded-lg text-sm font-medium">
                      {workout.difficulty}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{workout.title}</h3>
                  <p className="text-gray-400 mb-4">with {workout.trainer}</p>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Timer className="w-5 h-5 text-blue-500" />
                      <span>{workout.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Flame className="w-5 h-5 text-orange-500" />
                      <span>{workout.calories} cal</span>
                    </div>
                  </div>

                  <motion.button
                    className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-semibold flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleStartWorkout(workout.route)} // Pass the workout route
                  >
                    Start Workout
                    <Play className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;