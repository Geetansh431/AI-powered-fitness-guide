import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const validatePassword = (password) => {
        return {
            hasLowercase: /[a-z]/.test(password),
            hasUppercase: /[A-Z]/.test(password),
            hasNumber: /[0-9]/.test(password),
            isLongEnough: password.length >= 6
        };
    };

    const { hasLowercase, hasUppercase, hasNumber, isLongEnough } = validatePassword(newPassword);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        if (!hasLowercase || !hasUppercase || !hasNumber || !isLongEnough) {
            setError("Password does not meet the required criteria");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`http://localhost:5001/api/auth/reset?token=${token}`, { password: newPassword });
            setSuccess(response.data.message);
            setTimeout(() => navigate("/login"), 2000);
        } 
        catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
        setLoading(false);
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4" >
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.3 }} className="bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-md" >
                <h2 className="text-2xl font-semibold text-center mb-4">Reset Password</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">New Password:</label>
                        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="p-2 border rounded-md bg-gray-700 text-white focus:ring focus:ring-blue-400" required />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">Confirm Password:</label>
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="p-2 border rounded-md bg-gray-700 text-white focus:ring focus:ring-blue-400" required />
                    </div>
                    <div className="text-sm">
                        <p className={hasLowercase ? "text-green-400" : "text-red-400"}>✔ At least one lowercase letter</p>
                        <p className={hasUppercase ? "text-green-400" : "text-red-400"}>✔ At least one uppercase letter</p>
                        <p className={hasNumber ? "text-green-400" : "text-red-400"}>✔ At least one number</p>
                        <p className={isLongEnough ? "text-green-400" : "text-red-400"}>✔ Minimum 8 characters</p>
                    </div>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit" className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200" disabled={loading} >
                        {loading ? "Updating..." : "Update Password"}
                    </motion.button>
                    {error && <p className="text-red-400 text-center">{error}</p>}
                    {success && <p className="text-green-400 text-center">{success}</p>}
                </form>
            </motion.div>
        </motion.div>
    );
};

export default ResetPassword;
