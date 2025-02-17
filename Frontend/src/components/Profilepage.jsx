import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser, FiEdit, FiSave, FiX, FiActivity, FiAward, FiTarget, FiChevronRight } from "react-icons/fi";

const statIcons = {
    squat: <FiActivity className="w-6 h-6 text-purple-400" />,
    pushups: <FiTarget className="w-6 h-6 text-blue-400" />,
    lunges: <FiAward className="w-6 h-6 text-green-400" />,
};

// Static User Data
const initialUser = {
    fullName: "Shwetank Dohroo",
    age: 20,
    height: 180,
    weight: 60,
    gender: "Male",
    fitnessGoals: "Build Muscle",
    subscriptionPlan: "Premium",
    totalReps: { squat: 100, pushups: 50, lunges: 200 },
    personalBest: { squat: 120, pushups: 60, lunges: 250 },
};

export default function Profile() {
    const { register, handleSubmit, reset } = useForm({ defaultValues: initialUser });
    const [user, setUser] = useState(initialUser);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSubmit = (formData) => {
        setLoading(true);
        setTimeout(() => {
            setUser(formData);
            setIsEditing(false);
            setLoading(false);
        }, 1000);
    };
    const handleCancel = () => {
        reset(user);
        setIsEditing(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-gray-100 p-6">
            <motion.div initial={{ opacity: 0, y: 40, rotate: -3 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ type: "spring", stiffness: 120, damping: 20 }} className="max-w-6xl mx-auto bg-gray-800/90 backdrop-blur-xl rounded-[2rem] shadow-2xl overflow-hidden">
                <div className="p-8 bg-gradient-to-r from-purple-900/50 to-blue-900/50">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-5">
                            <div className="p-3 bg-white/5 rounded-2xl">
                                <FiUser className="w-10 h-10 text-purple-400" />
                            </div>
                            <div>
                                <motion.h2 initial={{ y: 10 }} animate={{ y: 0 }} className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                                    {user.fullName}
                                </motion.h2>
                                <p className="text-gray-400 mt-1">
                                    <span className="bg-purple-500/20 px-2 py-1 rounded-md text-sm">
                                        {user.fitnessGoals}
                                    </span>
                                </p>
                            </div>
                        </div>
                        {!isEditing && (
                            <motion.button onClick={() => setIsEditing(true)} className="flex items-center space-x-3 bg-white/5 px-6 py-3 rounded-xl border border-white/10 hover:border-white/20">
                                <FiEdit className="w-5 h-5 text-purple-300" />
                                <span className="font-medium">Edit Profile</span>
                                <FiChevronRight className="w-4 h-4 opacity-70" />
                            </motion.button>
                        )}
                    </div>
                </div>

                {/* Profile Content */}
                <div className="p-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        {[
                            { label: "Age", value: user.age, unit: "years" },
                            { label: "Height", value: user.height, unit: "cm" },
                            { label: "Weight", value: user.weight, unit: "kg" },
                            { label: "Subscription", value: user.subscriptionPlan, badge: true },
                        ].map((stat, idx) => (
                            <motion.div key={idx} className="bg-gray-700/30 p-5 rounded-2xl border border-white/5">
                                <p className="text-sm text-gray-400">{stat.label}</p>
                                <div className="flex items-baseline space-x-2">
                                    <span className="text-2xl font-bold">{stat.value}</span>
                                    {stat.unit && <span className="text-sm text-gray-400">{stat.unit}</span>}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Editable Fields */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { id: "fullName", label: "Full Name", type: "text" },
                                { id: "gender", label: "Gender", type: "select", options: ["Male", "Female", "Other"] },
                                {
                                    id: "fitnessGoals",
                                    label: "Fitness Goals",
                                    type: "select",
                                    options: ["Lose Weight", "Build Muscle", "Maintain Fitness", "Increase Endurance"],
                                },
                            ].map((field) => (
                                <div key={field.id} className="space-y-3">
                                    <label className="text-sm font-medium text-gray-400">{field.label}</label>
                                    {isEditing ? (
                                        field.type === "select" ? (
                                            <select
                                                {...register(field.id)}
                                                className="w-full bg-gray-700 border rounded-xl px-4 py-3"
                                            >
                                                {field.options.map((option) => (
                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            <input
                                                {...register(field.id)}
                                                type={field.type}
                                                className="w-full bg-gray-700 border rounded-xl px-4 py-3"
                                            />
                                        )
                                    ) : (
                                        <div className="w-full bg-gray-700 border rounded-xl px-4 py-3">{user[field.id]}</div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <AnimatePresence>
                            {isEditing && (
                                <motion.div className="flex justify-end space-x-4 border-t border-white/10 pt-8">
                                    <button type="button" onClick={handleCancel} className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gray-600" >
                                        <FiX className="w-5 h-5" />
                                        <span>Cancel</span>
                                    </button>
                                    <button type="submit" disabled={loading} className="px-6 py-3 rounded-xl bg-purple-500">
                                        <FiSave className="w-5 h-5" />
                                        <span>{loading ? "Saving..." : "Save"}</span>
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                    <div className="mt-12">
                        <h3 className="text-xl font-bold mb-6 flex items-center space-x-2">
                            <FiActivity className="w-6 h-6 text-purple-400" />
                            <span>Fitness Statistics</span>
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {Object.entries(user.totalReps || { squat: 10, pushups: 10, lunges: 50 }).map(([exercise, reps]) => (
                                <div key={exercise} className="bg-gray-700/50 p-4 rounded-xl">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-400 capitalize">{exercise} Reps</p>
                                            <p className="text-2xl font-bold">{reps}</p>
                                        </div>
                                        {statIcons[exercise]}
                                    </div>
                                </div>
                            ))}
                            {Object.entries(user.personalBest || { squat: 20, pushups: 10, lunges: 50 }).map(([exercise, best]) => (
                                <div key={exercise} className="bg-gray-700/50 p-4 rounded-xl">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-400 capitalize">{exercise} Best</p>
                                            <p className="text-2xl font-bold">{best}{exercise === 'squat' ? 'kg' : ''}</p>
                                        </div>
                                        {statIcons[exercise]}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}