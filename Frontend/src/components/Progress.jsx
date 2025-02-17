import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Activity, Zap, Star, Award, Users, Clock, Dumbbell } from 'lucide-react';

const Progress = () => {
  const [view, setView] = useState('leaderboard'); // State to toggle between views

  // Mock data for leaderboard
  const leaderboardData = [
    { rank: 1, name: 'Alice', points: 1200 },
    { rank: 2, name: 'Bob', points: 1100 },
    { rank: 3, name: 'Charlie', points: 1000 },
    { rank: 4, name: 'Diana', points: 950 },
    { rank: 5, name: 'Eve', points: 900 },
  ];

  // Mock data for personal best
  const personalBestData = [
    {
      exercise: 'Push-ups',
      totalReps: 500,
      totalMinutes: 25,
      activities: ['Morning Workout', 'Evening Routine'],
    },
    {
      exercise: 'Squats',
      totalReps: 300,
      totalMinutes: 20,
      activities: ['Leg Day', 'Full Body Workout'],
    },
    {
      exercise: 'Plank',
      totalReps: 10, // Reps for plank can be considered as holds
      totalMinutes: 15,
      activities: ['Core Workout', 'Stability Training'],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-purple-400 mb-4">Progress Tracker</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mt-6">
            Track your personal bests, total reps, and challenge points. Compete with
            others on the leaderboard!
          </p>
        </motion.div>

        {/* Buttons Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setView('personalBest')}
            className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800/50 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-lg">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-200">Personal Best</h3>
                <p className="text-gray-400">View your best records for each exercise.</p>
              </div>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setView('totalReps')}
            className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800/50 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-lg">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-200">Total Reps</h3>
                <p className="text-gray-400">See your all-time total repetitions.</p>
              </div>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setView('leaderboard')}
            className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800/50 backdrop-blur-sm hover:border-pink-500/50 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-pink-500 to-red-500 p-3 rounded-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-200">Challenge Points</h3>
                <p className="text-gray-400">Track your points from daily challenges.</p>
              </div>
            </div>
          </motion.button>
        </div>

        {/* Content Section */}
        {view === 'leaderboard' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800/50 backdrop-blur-sm shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-6">Leaderboard</h3>
            <div className="space-y-4">
              {leaderboardData.map((user, index) => (
                <motion.div
                  key={user.rank}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg border border-zinc-700/50 hover:border-purple-500/50 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-lg">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-200">{user.name}</h4>
                      <p className="text-gray-400">Rank: {user.rank}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <p className="text-lg font-bold text-purple-500">{user.points} Points</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {view === 'personalBest' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800/50 backdrop-blur-sm shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-6">Your Personal Best</h3>
            <div className="space-y-4">
              {personalBestData.map((exercise, index) => (
                <motion.div
                  key={exercise.exercise}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-4 bg-zinc-800/50 rounded-lg border border-zinc-700/50 hover:border-purple-500/50 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-lg">
                      <Dumbbell className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-200">{exercise.exercise}</h4>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-400 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-purple-500" />
                      Total Reps: {exercise.totalReps}
                    </p>
                    <p className="text-gray-400 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-purple-500" />
                      Total Minutes: {exercise.totalMinutes}
                    </p>
                    <p className="text-gray-400 flex items-center gap-2">
                      <Star className="w-5 h-5 text-purple-500" />
                      Activities: {exercise.activities.join(', ')}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {view === 'totalReps' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800/50 backdrop-blur-sm shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-6">Total Reps</h3>
            <div className="space-y-4">
              <p className="text-gray-400">Total Reps: 1200</p>
              <p className="text-gray-400">Total Minutes: 150</p>
              <p className="text-gray-400">Total Activities: 25</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Progress;