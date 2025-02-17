import { useState, useEffect } from "react";
import useSWR from "swr";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const fetcher = async (url) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized");
    const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

export default function Profile() {
    const navigate = useNavigate();
    const { data: user, mutate, error } = useSWR("/api/user", fetcher);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const fillForm = (userData) => {
        Object.keys(userData).forEach((key) => {
            if (key !== "totalReps" && key !== "personalBest") {
                setValue(key, userData[key]);
            }
        });
    };
    useEffect(() => {
        if (error) {
            console.error("Error fetching profile:", error);
            navigate("/login");
        }
        if (user) {
            fillForm(user);
        }
    }, [user, error, navigate]);
    const onSubmit = async (formData) => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            await axios.put("/api/user", formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            mutate();
            setIsEditing(false);
        } 
        catch (err) {
            console.error("Update failed", err);
        }
        setLoading(false);
    };
    const handleCancel = () => {
        if (user) fillForm(user);
        setIsEditing(false);
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-purple-900 flex items-center justify-center">
                <p className="text-white">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-purple-900 text-white p-6">
            <div className="max-w-3xl mx-auto bg-white/10 p-6 rounded-xl shadow-xl">
                <h2 className="text-3xl font-bold text-center mb-6">Profile</h2>
                {!isEditing ? (
                    <div className="flex justify-center mb-6">
                        <button onClick={() => setIsEditing(true)} className="bg-purple-600 hover:bg-purple-700 transition-colors px-6 py-3 rounded-md font-semibold" >
                            Change
                        </button>
                    </div>
                ) : null}
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold" htmlFor="fullName">
                            Full Name
                        </label>
                        <input id="fullName" {...register("fullName", { required: true })} placeholder="John Doe" className="rounded-md p-2 text-black" disabled={!isEditing} />
                        {errors.fullName && (
                            <span className="text-red-400 text-sm mt-1">
                                Full name is required.
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold" htmlFor="age">
                            Age
                        </label>
                        <input id="age" {...register("age", { min: 13, max: 120 })} type="number" placeholder="25" className="rounded-md p-2 text-black" disabled={!isEditing} />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold" htmlFor="gender">
                            Gender
                        </label>
                        <select id="gender" {...register("gender")} className="rounded-md p-2 text-black" disabled={!isEditing} >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold" htmlFor="height">
                            Height (cm)
                        </label>
                        <input id="height" {...register("height", { min: 100, max: 250 })} type="number" placeholder="170" className="rounded-md p-2 text-black" disabled={!isEditing} />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold" htmlFor="weight">
                            Weight (kg)
                        </label>
                        <input id="weight" {...register("weight", { min: 30, max: 300 })} type="number" placeholder="70" className="rounded-md p-2 text-black" disabled={!isEditing} />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold" htmlFor="fitnessGoals">
                            Fitness Goals
                        </label>
                        <select id="fitnessGoals" {...register("fitnessGoals")} className="rounded-md p-2 text-black" disabled={!isEditing} >
                            <option value="Lose Weight">Lose Weight</option>
                            <option value="Build Muscle">Build Muscle</option>
                            <option value="Maintain Fitness">Maintain Fitness</option>
                            <option value="Increase Endurance">Increase Endurance</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold" htmlFor="subscriptionPlan">
                            Subscription Plan
                        </label>
                        <select id="subscriptionPlan" {...register("subscriptionPlan")} className="rounded-md p-2 text-black" disabled={!isEditing} >
                            <option value="Free">Free</option>
                            <option value="Premium">Premium</option>
                        </select>
                    </div>
                    {isEditing && (
                        <div className="md:col-span-2 flex justify-center gap-4 mt-2">
                            <button type="submit" disabled={loading} className="bg-purple-600 hover:bg-purple-700 transition-colors px-6 py-3 rounded-md font-semibold" >
                                {loading ? "Saving..." : "Save Changes"}
                            </button>
                            <button type="button" onClick={handleCancel} className="bg-gray-500 hover:bg-gray-600 transition-colors px-6 py-3 rounded-md font-semibold" >
                                Cancel
                            </button>
                        </div>
                    )}
                </form>
                <div className="mt-8 p-4 bg-white/5 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Stats</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm md:text-base">
                        <p>
                            <span className="font-semibold">Squat Reps:</span>{" "}
                            {user.totalReps?.squat || 0}
                        </p>
                        <p>
                            <span className="font-semibold">Pushups Reps:</span>{" "}
                            {user.totalReps?.pushups || 0}
                        </p>
                        <p>
                            <span className="font-semibold">Lunges Reps:</span>{" "}
                            {user.totalReps?.lunges || 0}
                        </p>
                        <p>
                            <span className="font-semibold">Squat Best:</span>{" "}
                            {user.personalBest?.squat || 0} kg
                        </p>
                        <p>u
                            <span className="font-semibold">Pushups Best:</span>{" "}
                            {user.personalBest?.pushups || 0}
                        </p>
                        <p>
                            <span className="font-semibold">Lunges Best:</span>{" "}
                            {user.personalBest?.lunges || 0}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
