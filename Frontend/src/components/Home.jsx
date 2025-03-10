import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Timer, Flame, Heart, Users, Star, Zap, ChevronRight, Crown, Calendar, Award, Facebook, Twitter, Instagram, Linkedin, Dumbbell, Trophy } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Cardio from "../assets/Cardio.webp";
import Yoga from "../assets/Yoga.webp";
import Strength from "../assets/Streng.webp";
import WorkoutComponent from '../components/WorkoutComponent';
import { useTranslation } from 'react-i18next';

const workoutsData = [
  {
    id: 'strength',
    name: 'Strength Foundation',
    type: 'Strength',
    description: 'Transform your fitness with this powerful strength-training workout designed to build muscle and enhance endurance.',
    videoId: 'sinkIlViPG8',
    calories: '350 cal',
    duration: '45 Min',
    intensity: 'High',
    trainer: {
      name: 'Heather Robertson',
      specialty: 'Strength Specialist',
      experience: '4+ years experience',
    },
  },
  {
    id: 'yoga',
    name: 'Yoga Foundation',
    type: 'Yoga',
    description: 'Transform your fitness with this powerful Yoga workout designed to build muscle and enhance endurance.',
    videoId: 'uqJ-jANozcE',
    calories: '250 cal',
    duration: '45 Min',
    intensity: 'High',
    trainer: {
      name: 'Move With Nicole',
      specialty: 'Yoga Specialist',
      experience: '8+ years experience',
    },
  },
  {
    id: 'cardio',
    name: 'HIIT Cardio Blast',
    type: 'HIIT',
    description: 'Transform your fitness with this high-intensity workout designed to maximize calorie burn and improve endurance.',
    videoId: 'kZDvg92tTMc',
    calories: '400 cal',
    duration: '30 min',
    intensity: 'High',
    trainer: {
      name: 'Caroline Girvan',
      specialty: 'HIIT Specialist',
      experience: '8+ years experience',
    },
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('all');
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const { t } = useTranslation();

  const stats = [
    { value: '10K+', label: t('Active Users'), icon: Users, color: 'from-blue-500 to-indigo-500' },
    { value: '500+', label: t('Workouts'), icon: Dumbbell, color: 'from-purple-500 to-pink-500' },
    { value: '98%', label: t('Success Rate'), icon: Trophy, color: 'from-green-500 to-emerald-500' },
    { value: '45min', label: t('Avg. Session'), icon: Timer, color: 'from-orange-500 to-red-500' },
  ];

  const featuredWorkouts = [
    {
      id: 1,
      title: workoutsData.find(w => w.id === 'cardio').name,
      duration: workoutsData.find(w => w.id === 'cardio').duration,
      calories: workoutsData.find(w => w.id === 'cardio').calories,
      difficulty: workoutsData.find(w => w.id === 'cardio').intensity,
      rating: 4.8,
      image: Cardio,
      trainer: workoutsData.find(w => w.id === 'cardio').trainer.name,
      category: "cardio",
      workoutId: 'cardio'
    },
    {
      id: 2,
      title: workoutsData.find(w => w.id === 'yoga').name,
      duration: workoutsData.find(w => w.id === 'yoga').duration,
      calories: workoutsData.find(w => w.id === 'yoga').calories,
      difficulty: workoutsData.find(w => w.id === 'yoga').intensity,
      rating: 4.9,
      image: Yoga,
      trainer: workoutsData.find(w => w.id === 'yoga').trainer.name,
      category: "yoga",
      workoutId: 'yoga'
    },
    {
      id: 3,
      title: workoutsData.find(w => w.id === 'strength').name,
      duration: workoutsData.find(w => w.id === 'strength').duration,
      calories: workoutsData.find(w => w.id === 'strength').calories,
      difficulty: workoutsData.find(w => w.id === 'strength').intensity,
      rating: 4.7,
      image: Strength,
      trainer: workoutsData.find(w => w.id === 'strength').trainer.name,
      category: "strength",
      workoutId: 'strength'
    }
  ];

  const plans = [
    { id: 'all', name: t('All Workouts') },
    { id: 'cardio', name: t('Cardio') },
    { id: 'strength', name: t('Strength') },
    { id: 'yoga', name: t('Yoga') },
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      role: t("Fitness Enthusiast"),
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      quote: t("The AI trainer adapts perfectly to my schedule and energy levels. It's like having a personal trainer who knows exactly what I need each day."),
      rating: 5
    },
    {
      name: "James L.",
      role: t("Software Developer"),
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      quote: t("As someone with a busy schedule, having an AI trainer available 24/7 has been game-changing. The personalized workouts are incredibly effective."),
      rating: 5
    },
    {
      name: "Maria R.",
      role: t("Professional Athlete"),
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      quote: t("The detailed analytics and progress tracking have helped me optimize my training like never before. This is the future of fitness."),
      rating: 5
    }
  ];

  const filteredWorkouts = selectedPlan === 'all'
    ? featuredWorkouts
    : featuredWorkouts.filter(workout => workout.category === selectedPlan);

  const handleStartWorkout = (workoutId) => {
    const workoutData = workoutsData.find(workout => workout.id === workoutId);
    setSelectedWorkout(workoutData);
  };

  const handleBackToHome = () => {
    setSelectedWorkout(null);
  };

  if (selectedWorkout) {
    return (
      <WorkoutComponent
        workoutData={selectedWorkout}
        onBack={handleBackToHome}
      />
    );
  }

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
                  {t('Transform')}
                </span>
                <br />
                {t('Your Fitness Journey')}
              </h1>

              <p className="text-xl text-gray-300">
                {t("Experience personalized AI-powered workouts with real-time form correction and progress tracking")}
              </p>

              <div className="flex flex-wrap gap-4">
                <motion.button
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-semibold flex items-center gap-2 overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/Programs')}
                >
                  <span className="relative z-10">{t("Start Training")}</span>
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
                  onClick={() => navigate('/Workouts')}
                >
                  {t("View Programs")} <ChevronRight className="w-5 h-5" />
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
            <h2 className="text-4xl font-bold">{t("Featured Workouts")}</h2>
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
                  <p className="text-gray-400 mb-4">{t("with")} {workout.trainer}</p>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Timer className="w-5 h-5 text-blue-500" />
                      <span>{workout.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Flame className="w-5 h-5 text-orange-500" />
                      <span>{workout.calories}</span>
                    </div>
                  </div>

                  <motion.button
                    className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-semibold flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleStartWorkout(workout.workoutId)}
                  >
                    {t("Start Workout")}
                    <Play className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">{t("What Our Users Say")}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-zinc-900/50 rounded-2xl p-6 border border-gray-800"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
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
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-zinc-900/50 border-t border-zinc-800 py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{t("About Us")}</h3>
            <p className="text-gray-400">
              {t("We are dedicated to transforming your fitness journey with AI-powered tools and personalized workouts.")}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">{t("Quick Links")}</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white">{t("Home")}</Link></li>
              <li><Link to="/programs" className="text-gray-400 hover:text-white">{t("Programs")}</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">{t("Contact")}</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-white">{t("Privacy Policy")}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">{t("Contact Us")}</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Email: Geetansh@fitnessai.com</li>
              <li className="text-gray-400">Phone: +91 8847222304</li>
              <li className="text-gray-400">Address: Rajpura Punjab</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">{t("Follow Us")}</h3>
            <div className="flex gap-4">
              <a href="https://facebook.com" className="text-gray-400 hover:text-white">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-white">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-white">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-white">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 text-gray-400">
          © {new Date().getFullYear()} Fitness AI. {t("All rights reserved")}.
        </div>
      </footer>
    </div>
  );
};

export default Home;