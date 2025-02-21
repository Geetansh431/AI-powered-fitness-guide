import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Play, ChevronRight, Bot, Sparkles, Brain, Trophy,
  Users, Timer, Star, LineChart, ShieldCheck,
  Activity, Zap, Target, CheckCircle, Clock,
  ArrowRight, MessageSquare, BarChart, Heart
} from 'lucide-react';
import man from "../assets/man.jpg";
import women from "../assets/women.jpg";
import { useTranslation } from 'react-i18next'; // Import useTranslation

const Programs = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('beginners');
  const { t } = useTranslation(); // Initialize useTranslation

  const handlePersonalizedTraining = () => {
    navigate('/personalizedTraining');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
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
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-6 h-6 text-purple-400" />
            <span className="text-purple-400 font-semibold">{t("AI-Powered Fitness Revolution")}</span>
          </motion.div>

          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-8"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              {t("Your Future Self")}
            </span>
            <br />
            <span className="text-white">{t("Starts Today")}</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {t("Experience the power of AI-driven personal training that adapts to your needs, tracks your progress, and guides you every step of the way.")}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.button
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-semibold flex items-center gap-2 overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePersonalizedTraining}
            >
              <span className="relative z-10">{t("Your Assistant")}</span>
              <Play className="w-5 h-5 relative z-10" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* AI-Powered Features Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-zinc-950 to-zinc-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{t("AI-Powered Features")}</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {t("Our cutting-edge AI technology transforms your fitness journey with personalized guidance and real-time adaptations.")}
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Feature Cards */}
            <motion.div
              className="bg-zinc-900/50 rounded-2xl overflow-hidden border border-gray-800 backdrop-blur-sm"
              variants={itemVariants}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <div className="p-6">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{t("Smart Workout Planning")}</h3>
                <p className="text-gray-400 mb-4">
                  {t("Our AI analyzes your fitness level, goals, and preferences to create perfectly tailored workout plans that evolve with you.")}
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Bot className="w-4 h-4 text-blue-400" />
                    <span>{t("Dynamic exercise selection")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Timer className="w-4 h-4 text-blue-400" />
                    <span>{t("Optimal workout timing")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Activity className="w-4 h-4 text-blue-400" />
                    <span>{t("Real-time intensity adjustment")}</span>
                  </div>
                </div>
                <button
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-semibold flex items-center justify-center gap-2 group"
                  onClick={handlePersonalizedTraining}
                >
                  {t("Explore Features")}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
            <motion.div
              className="bg-zinc-900/50 rounded-2xl overflow-hidden border border-gray-800 backdrop-blur-sm"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <div className="p-6">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <BarChart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{t("Advanced Analytics")}</h3>
                <p className="text-gray-400 mb-4">
                  {t("Get detailed insights into your performance with AI-powered analytics that track every aspect of your fitness journey.")}
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-gray-300">
                    <LineChart className="w-4 h-4 text-purple-400" />
                    <span>{t("Progress visualization")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Target className="w-4 h-4 text-purple-400" />
                    <span>{t("Goal tracking & predictions")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Heart className="w-4 h-4 text-purple-400" />
                    <span>{t("Health metrics monitoring")}</span>
                  </div>
                </div>
                <button
                  className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold flex items-center justify-center gap-2 group"
                  onClick={handlePersonalizedTraining}
                >
                  {t("View Analytics")}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>

            <motion.div
              className="bg-zinc-900/50 rounded-2xl overflow-hidden border border-gray-800 backdrop-blur-sm"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <div className="p-6">
                <div className="bg-gradient-to-r from-indigo-500 to-violet-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{t("24/7 AI Coach")}</h3>
                <p className="text-gray-400 mb-4">
                  {t("Your personal AI coach is always available to provide guidance, answer questions, and keep you motivated.")}
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-indigo-400" />
                    <span>{t("Form correction & tips")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Zap className="w-4 h-4 text-indigo-400" />
                    <span>{t("Motivation & reminders")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Clock className="w-4 h-4 text-indigo-400" />
                    <span>{t("24/7 instant responses")}</span>
                  </div>
                </div>
                <button
                  className="w-full py-3 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-xl font-semibold flex items-center justify-center gap-2 group"
                  onClick={handlePersonalizedTraining}
                >
                  {t("Meet Your Coach")}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{t("Success Stories")}</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {t("See how our AI trainer has transformed the lives of users worldwide.")}
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                name: "Sarah M.",
                role: t("Fitness Enthusiast"),
                image: women,
                quote: t("The AI trainer adapts perfectly to my schedule and energy levels. It's like having a personal trainer who knows exactly what I need each day."),
                rating: 5
              },
              {
                name: "James L.",
                role: t("Software Developer"),
                image: man,
                quote: t("As someone with a busy schedule, having an AI trainer available 24/7 has been game-changing. The personalized workouts are incredibly effective."),
                rating: 5
              },
              {
                name: "Maria R.",
                role: t("Professional Athlete"),
                image: women,
                quote: t("The detailed analytics and progress tracking have helped me optimize my training like never before. This is the future of fitness."),
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                variants={itemVariants}
                className="bg-zinc-900/50 rounded-2xl p-6 border border-gray-800"
              >
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">{testimonial.quote}</p>
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose AI Training Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-zinc-900 to-zinc-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{t("Why Choose AI Training?")}</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {t("See how our AI-powered solution compares to traditional training methods.")}
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8 mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Comparison Cards */}
            <motion.div
              variants={itemVariants}
              className="rounded-2xl p-6 bg-zinc-900/50 border border-gray-800"
            >
              <h3 className="text-xl font-bold mb-4">{t("Traditional Gym")}</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-2 text-gray-400">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <span>{t("Fixed schedules")}</span>
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <Users className="w-5 h-5 text-gray-500" />
                  <span>{t("Limited personal attention")}</span>
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <Target className="w-5 h-5 text-gray-500" />
                  <span>{t("Generic workout plans")}</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="rounded-2xl p-6 bg-gradient-to-b from-purple-500/10 to-pink-500/10 border border-purple-500/20"
            >
              <h3 className="text-xl font-bold mb-4">{t("AI Personal Trainer")}</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-2 text-gray-200">
                  <Clock className="w-5 h-5 text-purple-400" />
                  <span>{t("Available 24/7")}</span>
                </li>
                <li className="flex items-center gap-2 text-gray-200">
                  <Bot className="w-5 h-5 text-purple-400" />
                  <span>{t("Constant personalized attention")}</span>
                </li>
                <li className="flex items-center gap-2 text-gray-200">
                  <Brain className="w-5 h-5 text-purple-400" />
                  <span>{t("Adaptive intelligent planning")}</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="rounded-2xl p-6 bg-zinc-900/50 border border-gray-800"
            >
              <h3 className="text-xl font-bold mb-4">{t("Personal Trainer")}</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-2 text-gray-400">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <span>{t("Limited availability")}</span>
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <Users className="w-5 h-5 text-gray-500" />
                  <span>{t("High cost per session")}</span>
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <Target className="w-5 h-5 text-gray-500" />
                  <span>{t("Manual progress tracking")}</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t("Start Your AI Fitness Journey Today")}
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            {t("Join thousands of users who have transformed their fitness journey with our AI personal trainer. Try it free for 14 days.")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-semibold flex items-center gap-2 overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePersonalizedTraining}
            >
              <span className="relative z-10">{t("Start Free Trial")}</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <button
              className="px-8 py-4 border border-gray-700 rounded-xl font-semibold flex items-center gap-2 hover:bg-white/5 transition-colors"
              onClick={() => navigate('/contact')}
            >
              {t("Contact Support")} <MessageSquare className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Programs;