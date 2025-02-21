import { create } from "zustand";
import axiosInstance from "../lib/Axios.jsx";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useAuthStore = create((set) => ({
    authUser: null,
    isCheckingAuth: true,
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check", { withCredentials: true });
            set({ authUser: res.data, isCheckingAuth: false });
        } catch (error) {
            console.log("Error in CheckAuth:", error);
            set({ authUser: null, isCheckingAuth: false });
        }
    },
    signup: async (data, navigate) => {
        try {
            const res = await axiosInstance.post("/auth/signup", data, { withCredentials: true });
            localStorage.setItem("activationToken", res.data.activationToken);
            set({ authUser: res.data });
            toast.success("OTP sent to your mail");
            navigate("/otpsignup");
        } catch (error) {
            toast.error("Error while Creating Account");
            console.log("SignUp Error", error.response?.data?.message);
        }
    },
    login: async (data) => {
        try {
            const res = await axiosInstance.post("/auth/login", data, { withCredentials: true });
            if (res.data) {
                set({ authUser: res.data });
                toast.success("Logged in Successfully");
                return true;
            } 
            else {
                throw new Error("Invalid login response from server");
            }
        } 
        catch (error) {
            console.error("Login Error:", error.response?.data?.message || "Unknown error");
            console.log(error);
            toast.error(error.response?.data?.message || "Error while logging in");
            return false;
        }
    },
    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout", {}, { withCredentials: true });
            set({ authUser: null });
            toast.success("Logged Out Successfully");
            // You can use a navigate function here if you prefer programmatic redirection
            window.location.href = "/login";
        } catch (error) {
            toast.error("Error Logging out");
            console.log("Logout Error", error.response?.data?.message);
        }
    },
    updateProfile: async (data) => {
        try {
            const res = await axiosInstance.put("/auth/updateProfile", data, { withCredentials: true });
            set({ authUser: res.data });
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log("Error updating profile:", error);
        }
    },
    getLeaderboard: async () => {
        try {
            const res = await axiosInstance.get("/auth/leaderboard", { withCredentials: true });
            set({ leaderboard: res.data.leaderboard || { personalBest: [], totalReps: [] } });
        } catch (error) {
            console.error("Error fetching leaderboard:", error);
            set({ leaderboard: { personalBest: [], totalReps: [] } });
        }
    },
}));
