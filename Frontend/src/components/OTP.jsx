import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import Axios from "../lib/Axios";

const Otp = () => {
    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleVerifyOtp = async () => {
        if (otp.length !== 6) {
            return toast.error("Please enter a valid 6-digit OTP");
        }
        const otpNumber = parseInt(otp, 10);
        if (isNaN(otpNumber)) {
            return toast.error("OTP must be a number");
        }
        setIsLoading(true);
        try {
            const activationToken = localStorage.getItem("activationToken");
            if (!activationToken) {
                toast.error("No activation token found. Please sign up again.");
                setIsLoading(false);
                return;
            }
            const response = await Axios.post("auth/verify",
                { otp: otpNumber, activationToken },
                { headers: { "Content-Type": "application/json" } }
            );
            if (response.data.success) {
                toast.success("OTP Verified Successfully!");
                localStorage.removeItem("activationToken");
                navigate("/login");
            } 
            else {
                toast.error(response.data.message || "OTP verification failed");
            }
        } 
        catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-800 via-indigo-800 to-blue-800 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-sm"
            >
                <h2 className="text-white text-3xl font-bold mb-4 text-center">
                    Verify Your OTP
                </h2>
                <p className="text-gray-400 mb-6 text-center">
                    Enter the 6-digit code sent to your email
                </p>
                <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    className="w-full px-4 py-3 rounded-md border border-gray-700 bg-gray-800 text-white text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    placeholder="Enter OTP"
                />
                <button
                    onClick={handleVerifyOtp}
                    disabled={isLoading}
                    className="mt-6 w-full py-3 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-md transition duration-200"
                >
                    {isLoading ? "Verifying..." : "Verify OTP"}
                </button>
            </motion.div>
        </div>
    );
};

export default Otp;
