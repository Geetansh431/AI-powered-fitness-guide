import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Dumbbell,
  Zap,
  Heart,
  Flame,
  Medal,
  Trophy,
  Weight
} from 'lucide-react';
import { useAuthStore } from '../Store/useAuthStore.jsx';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [motivationalPhrase, setMotivationalPhrase] = useState('');

  const motivationalPhrases = [
    "START YOUR JOURNEY 💪",
    "BUILD YOUR LEGACY 🏆",
    "PUSH YOUR LIMITS 🚀",
    "ACHIEVE GREATNESS ⚡",
    "ELEVATE YOUR GAME 💫"
  ];

  const { signup } = useAuthStore();
  const validateForm = async() => {
    if (!username.trim()) return toast.error("Full Name required")
    if (!email.trim()) return toast.error("Email required")
    if (!/\S+@\S+|.|S+/.test(email)) return toast.error("Invalid Email");
    if (!password.trim()) return toast.error("Password required")
    if (password.length < 6) return toast.error("Password must be at least 6 characters")

    return true;

  }


  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsLoading(true);
    const success = await validateForm();

    if (success === true) {
      await signup({ fullName: username, email, password }, navigate);
    }
    setIsLoading(false);
  }

  const pulseVariants = {
    initial: { scale: 1, opacity: 0.5 },
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const floatingIcons = [Dumbbell, Zap, Heart, Flame, Medal, Trophy, Weight];

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black relative overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-violet-500/10 to-cyan-500/10 animate-gradient-x" />
        <div className="absolute inset-0 backdrop-blur-3xl" />
      </motion.div>


      {floatingIcons.map((Icon, index) => (
        [...Array(4)].map((_, i) => (
          <motion.div
            key={`icon-${index}-${i}`}
            className="absolute text-indigo-500/10"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              rotate: 0,
              scale: 1 + Math.random(),
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              rotate: 360,
              scale: [1, 1.5, 1],
              filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Icon size={30 + Math.random() * 50} />
          </motion.div>
        ))
      ))}


      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`pulse-${i}`}
          className="absolute rounded-full bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-cyan-500/10 blur-xl"
          style={{
            width: '400px',
            height: '400px',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          variants={pulseVariants}
          initial="initial"
          animate="animate"
          transition={{
            delay: i * 0.3,
          }}
        />
      ))}

      <motion.div
        className="relative w-full max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="bg-zinc-900/40 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-indigo-500/20 relative">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 via-violet-500/30 to-cyan-500/30"
            animate={{
              background: [
                "linear-gradient(to right, rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.3), rgba(34, 211, 238, 0.3))",
                "linear-gradient(to right, rgba(34, 211, 238, 0.3), rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.3))",
                "linear-gradient(to right, rgba(139, 92, 246, 0.3), rgba(34, 211, 238, 0.3), rgba(99, 102, 241, 0.3))",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ opacity: 0.5 }}
          />

          <div className="p-8 relative">

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-8"
            >

              <motion.div
                className="flex justify-center mb-4"
                animate={{
                  scale: [1, 1.1, 1],
                  rotateZ: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="relative">
                  <Dumbbell className="text-indigo-500" size={48} />
                  <motion.div
                    className="absolute inset-0 bg-indigo-500"
                    animate={{
                      opacity: [0, 0.5, 0],
                      scale: [1, 1.5, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{ filter: "blur(8px)" }}
                  />
                </div>
              </motion.div>


              <motion.h1
                className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 mb-2"
                animate={{
                  backgroundPosition: ['0%', '100%'],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                JOIN THE MOVEMENT
              </motion.h1>

              <AnimatePresence mode="wait">
                <motion.p
                  key={motivationalPhrase}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-indigo-400 font-bold"
                >
                  {motivationalPhrases[Math.floor(Math.random() * motivationalPhrases.length)]}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <motion.div
                className="space-y-4"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >

                <div className="relative group">
                  <motion.div
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500/50 group-focus-within:text-indigo-500"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <User size={20} />
                  </motion.div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    placeholder="Username"
                    className="w-full px-12 py-4 bg-white/5 text-white rounded-xl border border-indigo-500/20 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all placeholder:text-white/30"
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500"
                    initial={{ width: "0%" }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </div>


                <div className="relative group">
                  <motion.div
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500/50 group-focus-within:text-indigo-500"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Mail size={20} />
                  </motion.div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Email address"
                    className="w-full px-12 py-4 bg-white/5 text-white rounded-xl border border-indigo-500/20 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all placeholder:text-white/30"
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500"
                    initial={{ width: "0%" }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </div>


                <div className="relative group">
                  <motion.div
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500/50 group-focus-within:text-indigo-500"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Lock size={20} />
                  </motion.div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Password"
                    className="w-full px-12 py-4 bg-white/5 text-white rounded-xl border border-indigo-500/20 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all placeholder:text-white/30"
                  />
                  <motion.button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-500/50 hover:text-indigo-500"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </motion.button>
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500"
                    initial={{ width: "0%" }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>


              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 text-white rounded-xl relative overflow-hidden group font-bold tracking-wider"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center"
                    >
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      LOADING...
                    </motion.div>
                  ) : (
                    <motion.span
                      key="sign-up"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center"
                    >
                      CREATE ACCOUNT
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="ml-2"
                      >
                        <Trophy size={20} />
                      </motion.div>
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-center"
              >
                <motion.div
                  className="text-white/60"
                  whileHover={{ scale: 1.02 }}
                >
                  Already have an account?{' '}
                  <motion.a
                    href="/login"
                    className="text-indigo-500 hover:text-indigo-400 font-bold inline-flex items-center"
                    whileHover={{ scale: 1.05, x: 3 }}
                  >
                    Sign In
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="ml-2"
                    >
                      <Zap size={16} />
                    </motion.div>
                  </motion.a>
                </motion.div>
              </motion.div>
            </motion.form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;