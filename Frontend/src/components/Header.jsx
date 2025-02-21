import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Dumbbell, Trophy, BarChart, BrainCircuit, Globe } from 'lucide-react';
import { useAuthStore } from '../Store/useAuthStore';
import LanguageSwitcher from './LanguageSwitcher'; // Import the LanguageSwitcher component

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { title: 'Personal Assistant', to: '/programs', icon: BrainCircuit },
    { title: 'Challenges', to: '/challenges', icon: Trophy },
    { title: 'Progress', to: '/progress', icon: BarChart },
    { title: 'Workouts', to: '/workouts', icon: Dumbbell },
  ];

  const { authUser, checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <div className="h-20 w-full"></div>

      <header className="fixed w-full top-0 z-50 bg-gradient-to-r from-zinc-950/95 to-zinc-900/95 backdrop-blur-xl border-b border-zinc-800/50">
        <nav className="max-w-7xl mx-auto px-6 h-20">
          <div className="flex items-center justify-between h-full">
            <Link to="/">
              <motion.div
                className="flex items-center gap-3"
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className="w-12 h-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20"
                  whileHover={{ rotate: 180, scale: 1.1 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <Dumbbell className="w-7 h-7 text-white" />
                </motion.div>
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                  FitAI Pro
                </span>
              </motion.div>
            </Link>

            <div className="hidden md:flex items-center gap-10">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.to}
                    className="flex items-center gap-2 text-gray-300 hover:text-white group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 15 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="p-2 rounded-lg bg-zinc-800/50 group-hover:bg-gradient-to-br group-hover:from-indigo-500/20 group-hover:to-purple-500/20"
                    >
                      <item.icon className="w-5 h-5 group-hover:text-purple-400 transition-colors" />
                    </motion.div>
                    <span className="font-medium tracking-wide">{item.title}</span>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center gap-6">
              {/* Language Switcher */}
              <LanguageSwitcher />

              {authUser ? (
                <Link to="/profile">
                  <motion.button
                    className="px-6 py-2.5 text-gray-300 hover:text-white font-medium rounded-lg hover:bg-zinc-800/50 transition-all duration-300"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Profile
                  </motion.button>
                </Link>
              ) : (
                <>
                  <Link to="/login">
                    <motion.button
                      className="px-6 py-2.5 text-gray-300 hover:text-white font-medium rounded-lg hover:bg-zinc-800/50 transition-all duration-300"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Sign In
                    </motion.button>
                  </Link>
                  <Link to="/signup">
                    <motion.button
                      className="px-8 py-2.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg font-medium text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all duration-300"
                      whileHover={{ scale: 1.03, boxShadow: "0 20px 25px -5px rgb(168 85 247 / 0.4)" }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Get Started
                    </motion.button>
                  </Link>
                </>
              )}

              <motion.button
                className="p-3 md:hidden text-gray-300 hover:text-white bg-zinc-800/50 rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                className="absolute top-20 left-0 right-0 bg-gradient-to-b from-zinc-950/98 to-zinc-900/98 backdrop-blur-xl border-b border-zinc-800/50 md:hidden"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-6 space-y-6">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={item.to}
                        className="flex items-center gap-4 text-gray-300 hover:text-white py-3 px-4 rounded-lg hover:bg-zinc-800/50 transition-all duration-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500/10 to-purple-500/10">
                          <item.icon className="w-5 h-5" />
                        </div>
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    </motion.div>
                  ))}
                  <div className="pt-6 border-t border-zinc-800/50 space-y-4">
                    {authUser ? (
                      <Link
                        to="/profile"
                        className="block text-gray-300 hover:text-white font-medium py-3 px-4 rounded-lg hover:bg-zinc-800/50 transition-all duration-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Profile
                      </Link>
                    ) : (
                      <div className="flex gap-3">
                        <Link
                          to="/login"
                          className="block text-gray-300 hover:text-white font-medium py-3 px-4 rounded-lg hover:bg-zinc-800/50 transition-all duration-300"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Sign In
                        </Link>
                        <Link
                          to="/signup"
                          className="block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-3 px-4 rounded-lg text-center font-medium shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all duration-300"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Get Started
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>
    </>
  );
};

export default Header;
