import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiUser,
    FiEdit,
    FiSave,
    FiX,
    FiActivity,
    FiAward,
    FiTarget,
    FiChevronRight,
    FiLogOut,
} from "react-icons/fi";
import { useAuthStore } from "../Store/useAuthStore";
import Axios from "../lib/Axios";

const statIcons = {
    squat: <FiActivity className="w-6 h-6 text-purple-400" />,
    pushups: <FiTarget className="w-6 h-6 text-blue-400" />,
    lunges: <FiAward className="w-6 h-6 text-green-400" />,
};

export default function Profile() {
    const { register, handleSubmit, reset } = useForm();
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const { updateProfile } = useAuthStore();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await Axios.get("auth/profile", { withCredentials: true });
                setUser(data);
                reset(data);
            } 
            catch (error) {
                console.error("Error fetching profile:", error);
            } 
            finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [reset]);

    const onSubmit = async (formData) => {
        setLoading(true);
        try {
            const { data } = await Axios.put("auth/updateProfile", formData, { withCredentials: true });
            setUser(data.user);
            updateProfile(data.user);
            setIsEditing(false);
        } 
        catch (error) {
            console.error("Error updating profile:", error);
        } 
        finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        reset(user);
        setIsEditing(false);
    };

    const handleLogout = async () => {
        try {
            await Axios.post("auth/logout", {}, { withCredentials: true });
            window.location.href = "/";
        } 
        catch (error) {
            console.error("Error logging out:", error);
        }
    };

    if (loading && !user) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-100">
                Loading...
            </div>
        );
    }
    const editableFields = [
        { id: "fullName", label: "Full Name", type: "text" },
        { id: "age", label: "Age", type: "number" },
        { id: "height", label: "Height (cm)", type: "number" },
        { id: "weight", label: "Weight (kg)", type: "number" },
        { id: "gender", label: "Gender", type: "select", options: ["Male", "Female", "Other"] },
        {
            id: "fitnessGoals",
            label: "Fitness Goals",
            type: "select",
            options: ["Lose Weight", "Build Muscle", "Maintain Fitness", "Increase Endurance"],
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-gray-100 p-6">
            <motion.div initial={{ opacity: 0, y: 40, rotate: -3 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ type: "spring", stiffness: 120, damping: 20 }} className="max-w-6xl mx-auto bg-gray-800/90 backdrop-blur-xl rounded-[2rem] shadow-2xl overflow-hidden" >
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
                                    <span className="bg-purple-500/20 px-2 py-1 rounded-md text-sm">{user.fitnessGoals}</span>
                                </p>
                            </div>
                        </div>
                        {!isEditing && (
                            <div className="flex items-center space-x-4">
                                <motion.button onClick={() => setIsEditing(true)} className="flex items-center space-x-3 bg-white/5 px-6 py-3 rounded-xl border border-white/10 hover:border-white/20" >
                                    <FiEdit className="w-5 h-5 text-purple-300" />
                                    <span className="font-medium">Edit Profile</span>
                                    <FiChevronRight className="w-4 h-4 opacity-70" />
                                </motion.button>
                                <motion.button onClick={handleLogout} className="flex items-center space-x-3 bg-white/5 px-6 py-3 rounded-xl border border-white/10 hover:border-white/20" >
                                    <FiLogOut className="w-5 h-5 text-purple-300" />
                                    <span className="font-medium">Logout</span>
                                </motion.button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="p-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        {[
                            { label: "Age", value: user.age, unit: "years" },
                            { label: "Height", value: user.height, unit: "cm" },
                            { label: "Weight", value: user.weight, unit: "kg" },
                            { label: "Subscription", value: user.subscriptionPlan },
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

                    {/*editable*/}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {editableFields.map((field) => (
                                <div key={field.id} className="space-y-3">
                                    <label className="text-sm font-medium text-gray-400">{field.label}</label>
                                    {isEditing ? (
                                        field.type === "select" ? (
                                            <select {...register(field.id)} className="w-full bg-gray-700 border rounded-xl px-4 py-3">
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
                                        <div className="w-full bg-gray-700 border rounded-xl px-4 py-3">
                                            {user[field.id]}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <AnimatePresence>
                            {isEditing && (
                                <motion.div className="flex justify-end space-x-4 border-t border-white/10 pt-8">
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gray-600"
                                    >
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

                    {/*fitness */}
                    <div className="mt-12">
                        <h3 className="text-xl font-bold mb-6 flex items-center space-x-2">
                            <FiActivity className="w-6 h-6 text-purple-400" />
                            <span>Fitness Statistics</span>
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {user.totalReps &&
                                Object.entries(user.totalReps).map(([exercise, reps]) => (
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
                            {user.personalBest &&
                                Object.entries(user.personalBest).map(([exercise, best]) => (
                                    <div key={exercise} className="bg-gray-700/50 p-4 rounded-xl">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-400 capitalize">{exercise} Best</p>
                                                <p className="text-2xl font-bold">
                                                    {best}
                                                    {exercise === "squat" ? "kg" : ""}
                                                </p>
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
