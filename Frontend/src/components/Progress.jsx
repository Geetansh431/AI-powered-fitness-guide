import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Activity, Zap, Star, Award, Users, Clock, Dumbbell } from "lucide-react";
import { useAuthStore } from "../Store/useAuthStore";

const Progress = () => {
  const [view, setView] = useState("leaderboard"); // Toggle views
  const { getLeaderboard, leaderboard } = useAuthStore(); // Get leaderboard from store

  // Fetch leaderboard on component mount
  useEffect(() => {
    getLeaderboard();
  }, [getLeaderboard]);

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
            Track your personal bests, total reps, and challenge points. Compete with others on the leaderboard!
          </p>
        </motion.div>

        {/* Buttons Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setView("personalBest")}
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
            onClick={() => setView("totalReps")}
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
            onClick={() => setView("leaderboard")}
            className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800/50 backdrop-blur-sm hover:border-pink-500/50 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-pink-500 to-red-500 p-3 rounded-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-200">Leaderboard</h3>
                <p className="text-gray-400">See the top performers.</p>
              </div>
            </div>
          </motion.button>
        </div>

        {/* Leaderboard Section */}
        {view === "leaderboard" && leaderboard && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800/50 backdrop-blur-sm shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-6">Leaderboard</h3>
            <div className="space-y-4">
              {leaderboard.personalBest.map((user, index) => (
                <motion.div
                  key={user._id}
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
                      <h4 className="text-lg font-bold text-gray-200">{user.fullName}</h4>
                      <p className="text-gray-400">Squat: {user.personalBest.squat}, Push-ups: {user.personalBest.pushups}, Lunges: {user.personalBest.lunges}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Total Reps Section */}
        {view === "totalReps" && leaderboard && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800/50 backdrop-blur-sm shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-6">Total Reps Leaderboard</h3>
            <div className="space-y-4">
              {leaderboard.totalReps.map((user, index) => (
                <motion.div
                  key={user._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-4 bg-zinc-800/50 rounded-lg border border-zinc-700/50 hover:border-purple-500/50 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    <h4 className="text-lg font-bold text-gray-200">{user.fullName}</h4>
                    <p className="text-gray-400">Squat: {user.totalReps.squat}, Push-ups: {user.totalReps.pushups}, Lunges: {user.totalReps.lunges}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Progress;
