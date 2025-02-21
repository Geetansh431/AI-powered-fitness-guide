import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Axios from "../lib/Axios";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setMessage("");

        try {
            const response = await Axios.post("auth/forgot", { email });
            setMessage(response.data.message);
            console.log("Received token:", response.data.token);
        } 
        catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
        setLoading(false);
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4" >
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.3 }} className="bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-md" >
                <h2 className="text-2xl font-semibold text-center mb-4">Forgot Password</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <label htmlFor="email" className="text-sm font-medium mb-1">Email:</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 border rounded-md bg-gray-700 text-white focus:ring focus:ring-blue-400" required />
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit" className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200" disabled={loading} >
                        {loading ? "Sending..." : "Send Reset Link"}
                    </motion.button>
                    {message && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-400 text-center">{message}</motion.p>}
                    {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-center">{error}</motion.p>}
                </form>
            </motion.div>
        </motion.div>
    );
}

export default ForgotPassword;
