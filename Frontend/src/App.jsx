import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import Home from "./components/Home";
import Challenges from "./components/Challenges";
import Exercise from "./components/Exercise";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Programs from "./components/Programs";
import PersonalizedTraining from "./components/PersonalizedTraining";
import Contact from "./components/Contact";
import Progress from "./components/Progress";
import WorkoutsPage from "./components/WorkoutsPage";
import Profile from "./components/Profilepage";
import OTPReset from "./components/otpPage";
import Otp from "./components/OTP";
import Info from "./components/Infoinput";
import { useAuthStore } from "./Store/useAuthStore";
import { useEffect } from "react";
import ProtectedRoute from "./lib/ProtectedRoute";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl font-bold">Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      <Header />
      <Toaster reverseOrder={false} />
      <Routes>
        {/* no loging */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/otpreset" element={<OTPReset />} />

        {/* login needed */}
        <Route path="/challenges" element={<ProtectedRoute element={<Challenges />} authUser={authUser} />} />
        <Route path="/exercise/:id/:difficulty" element={<ProtectedRoute element={<Exercise />} authUser={authUser} />} />
        <Route path="/programs" element={<ProtectedRoute element={<Programs />} authUser={authUser} />} />
        <Route path="/personalizedTraining" element={<ProtectedRoute element={<PersonalizedTraining />} authUser={authUser} />} />
        <Route path="/contact" element={<ProtectedRoute element={<Contact />} authUser={authUser} />} />
        <Route path="/progress" element={<ProtectedRoute element={<Progress />} authUser={authUser} />} />
        <Route path="/workouts" element={<ProtectedRoute element={<WorkoutsPage />} authUser={authUser} />} />
        <Route path="/profile" element={<ProtectedRoute element={<Profile />} authUser={authUser} />} />
        <Route path="/infoInput" element={<ProtectedRoute element={<Info />} authUser={authUser} />} />
        <Route path="/otpsignup" element={<ProtectedRoute element={<Otp />} authUser={authUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
