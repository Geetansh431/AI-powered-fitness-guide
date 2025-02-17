import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "../lib/Axios.jsx";

export const useAuthStore = create((set) => ({
    authUser: null,
    
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });
        } catch (error) {
            console.log("Error in CheckAuth: ", error);
            set({ authUser: null });
        }
    },
    signup: async (data, navigate) => {
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });
            toast.success("Account Created Successfully");
            console.log("Account Created Successfully");
            navigate("/login");
        } catch (error) {
            toast.error("Error while Creating Account");
            console.log("SignUp Error", error.response.data.message);
        }
    },
    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout")
            set({ authUser: null });
            toast.success("Logged Out Successfully");
            const navigate = useNavigate();
            navigate("/");
        } catch (error) {
            toast.success("Error Logging out");
            console.log("Logout Error", error.response.data.message);
        }
    },
    login: async (data, navigate) => {
        try {
            const res = await axiosInstance.post("/auth/login", data);

            if (res.data) {
                set({ authUser: res.data });
                toast.success("Logged in Successfully");
                console.log("Logged in Successfully");
                navigate("/profile");
            } 
            else {
                throw new Error("Invalid login response from server");
            }
        } catch (error) {
            console.error("Login Error:", error.response?.data?.message || "Unknown error");

            toast.error(error.response?.data?.message || "Error while logging in");
        }
    },
    updateProfile: async (data) => {
        try {
            const res = await axiosInstance.put("/auth/updateProfile", data);
            set({ authUser: res.data });
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log("Error in updating profile pic");
        }
    },
}));
