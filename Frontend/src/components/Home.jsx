import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Zap, Heart, Flame, Medal, Trophy, Weight } from 'lucide-react';

const Home = () => {
    const floatingIcons = [Dumbbell, Zap, Heart, Flame, Medal, Trophy, Weight];

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-zinc-950 via-zinc-900 to-black relative overflow-hidden">
            {/* Floating Icons */}
            {floatingIcons.map((Icon, index) => (
                [...Array(4)].map((_, i) => (
                    <motion.div
                        key={`icon-${index}-${i}`}
                        className="absolute text-green-500/10"
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

            {/* Hero Section */}
            <div className="max-w-6xl mx-auto p-8 relative z-10">
                <motion.div
                    className="text-center bg-gradient-to-br from-green-500 to-green-600 text-white py-16 rounded-2xl mb-8 relative overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Animated Background */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-green-600/20 to-green-700/20 animate-gradient-x"
                        animate={{
                            backgroundPosition: ['0%', '100%'],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                    <motion.h1
                        className="text-4xl font-bold mb-4"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Transform Your Fitness Journey with AI
                    </motion.h1>
                    <motion.p
                        className="text-xl mb-8"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        Get real-time exercise feedback and personalized challenges
                    </motion.p>
                    <motion.button
                        className="bg-white text-green-600 px-8 py-3 rounded-full text-lg font-semibold hover:scale-105 transition-transform"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        Get Started
                    </motion.button>
                </motion.div>

                {/* Feature Grid */}
                <motion.div
                    className="grid md:grid-cols-3 gap-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    {[
                        {
                            title: "Real-time Feedback",
                            description: "AI-powered form correction",
                            icon: <Zap size={32} className="text-green-500 mx-auto mb-4" />,
                        },
                        {
                            title: "100+ Challenges",
                            description: "Daily workout challenges",
                            icon: <Trophy size={32} className="text-green-500 mx-auto mb-4" />,
                        },
                        {
                            title: "Progress Tracking",
                            description: "Monitor your fitness journey",
                            icon: <Medal size={32} className="text-green-500 mx-auto mb-4" />,
                        },
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            className="bg-zinc-900/40 backdrop-blur-xl p-8 rounded-xl text-center border border-green-500/20"
                            whileHover={{ scale: 1.05, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            {feature.icon}
                            <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                            <p className="text-gray-400">{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Home;