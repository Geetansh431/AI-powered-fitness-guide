import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

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
                return setIsLoading(false);
            }
            const response = await axios.post(
                "http://localhost:5001/api/auth/verify",
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
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 text-center">
                <h2 className="text-white text-2xl font-bold mb-4">Enter OTP</h2>
                <p className="text-gray-400 mb-6">We have sent a 6-digit code to your email.</p>
                <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={6} className="w-full px-4 py-2 rounded-md border bg-gray-700 text-white text-center" placeholder="Enter OTP" />
                <button onClick={handleVerifyOtp} disabled={isLoading} className="mt-4 w-full py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition" >
                    {isLoading ? "Verifying..." : "Verify OTP"}
                </button>
            </div>
        </div>
    );
};

export default Otp;