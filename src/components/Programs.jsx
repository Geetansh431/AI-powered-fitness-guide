import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // For navigation
import { Play, ChevronRight, Dumbbell, Flame, Trophy, Users, Timer, Star } from 'lucide-react'; // Icons

const Programs = () => {
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle navigation to personalized training
  const handlePersonalizedTraining = () => {
    navigate('/personalizedTraining'); // Redirect to the personalized training route
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Hero Section */}
      <motion.div
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-gradient" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            className="text-6xl md:text-7xl font-bold"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              Explore Our Programs
            </span>
          </motion.h1>

          <motion.p
            className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Discover a wide range of fitness programs tailored to your goals. Whether you're looking to build strength, improve flexibility, or boost endurance, we've got you covered.
          </motion.p>

          <motion.button
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-semibold flex items-center gap-2 overflow-hidden mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePersonalizedTraining} // Redirect to personalized training
          >
            <span className="relative z-10">Get AI Personal Training</span>
            <Play className="w-5 h-5 relative z-10" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500"
              initial={{ x: "100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>
      </motion.div>

      {/* Programs Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Our Programs</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Cardio Program */}
            <motion.div
              className="bg-zinc-900/50 rounded-2xl overflow-hidden border border-gray-800"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="p-6">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <Flame className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Cardio Blast</h3>
                <p className="text-gray-400 mb-4">
                  High-intensity cardio workouts to boost your endurance and burn calories.
                </p>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Timer className="w-5 h-5 text-blue-500" />
                    <span>30-45 min</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span>4.8/5</span>
                  </div>
                </div>
                <button
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-semibold flex items-center justify-center gap-2"
                  onClick={() => navigate('/programs/cardio')} // Example navigation
                >
                  Explore Program <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>

            {/* Strength Program */}
            <motion.div
              className="bg-zinc-900/50 rounded-2xl overflow-hidden border border-gray-800"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="p-6">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <Dumbbell className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Strength Training</h3>
                <p className="text-gray-400 mb-4">
                  Build muscle and increase strength with our expert-led strength training programs.
                </p>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Timer className="w-5 h-5 text-purple-500" />
                    <span>45-60 min</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span>4.7/5</span>
                  </div>
                </div>
                <button
                  className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold flex items-center justify-center gap-2"
                  onClick={() => navigate('/programs/strength')} // Example navigation
                >
                  Explore Program <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>

            {/* Yoga Program */}
            <motion.div
              className="bg-zinc-900/50 rounded-2xl overflow-hidden border border-gray-800"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="p-6">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Yoga & Flexibility</h3>
                <p className="text-gray-400 mb-4">
                  Improve flexibility, balance, and mindfulness with our yoga programs.
                </p>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Timer className="w-5 h-5 text-green-500" />
                    <span>30-60 min</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span>4.9/5</span>
                  </div>
                </div>
                <button
                  className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl font-semibold flex items-center justify-center gap-2"
                  onClick={() => navigate('/programs/yoga')} // Example navigation
                >
                  Explore Program <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Programs;