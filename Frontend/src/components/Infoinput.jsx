import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Axios from "../lib/Axios";

export default function Info() {
    const [formData, setFormData] = useState({
        profilePic: null,
        age: "",
        height: "",
        weight: "",
        gender: "",
        fitnessGoals: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        if (e.target.name === "profilePic") {
            setFormData({ ...formData, profilePic: e.target.files[0] });
        } 
        else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await Axios.put("auth/updateProfile",
                {
                    age: formData.age,
                    height: formData.height,
                    weight: formData.weight,
                    gender: formData.gender,
                    fitnessGoals: formData.fitnessGoals,
                },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            alert("Profile updated successfully!");
            navigate("/profile");
        }
        catch(error){
            console.error("Error updating profile", error);
            alert("Failed to update profile");
        }
    };

    const handleSkip = () => {
        navigate("/profile");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-black text-white">
            <motion.div
                className="p-8 max-w-lg w-full bg-gray-950 text-white rounded-lg shadow-xl border border-gray-800"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-3xl font-bold mb-6 text-center">Update Profile</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="file" name="profilePic" accept="image/png" onChange={handleChange} className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded focus:ring-2 focus:ring-purple-400" />
                    <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded focus:ring-2 focus:ring-purple-400" required />
                    <input type="number" name="height" placeholder="Height (cm)" value={formData.height} onChange={handleChange} className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded focus:ring-2 focus:ring-purple-400" required />
                    <input type="number" name="weight" placeholder="Weight (kg)" value={formData.weight} onChange={handleChange} className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded focus:ring-2 focus:ring-purple-400" required />
                    <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded focus:ring-2 focus:ring-purple-400" required >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <select name="fitnessGoals" value={formData.fitnessGoals} onChange={handleChange} className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded focus:ring-2 focus:ring-purple-400" required >
                        <option value="">Select Fitness Goal</option>
                        <option value="Lose Weight">Lose Weight</option>
                        <option value="Build Muscle">Build Muscle</option>
                        <option value="Maintain Fitness">Maintain Fitness</option>
                        <option value="Increase Endurance">Increase Endurance</option>
                    </select>
                    <motion.button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg shadow-md transition duration-300" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} >
                        Update
                    </motion.button>
                </form>
                <motion.button onClick={handleSkip} className="w-full mt-4 bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-lg shadow-md transition duration-300" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} >
                    Skip
                </motion.button>
            </motion.div>
        </div>
    );
}
