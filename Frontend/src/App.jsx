import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Challenges from './components/Challenges';
import Exercise from './components/Exercise';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Programs from './components/Programs';
import PersonalizedTraining from './components/PersonalizedTraining';
import Contact from './components/Contact';
import Progress from './components/Progress';
import WorkoutsPage from './components/WorkoutsPage';
import Profile from './components/Profilepage'
import { useAuthStore } from './Store/useAuthStore';
import { useEffect } from 'react';
import ProtectedRoute from './lib/ProtectedRoute';


function App() {

  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
    console.log("called")
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className="size-10 animate-spin" />
      </div>
    )
  }
  return (
    <Router>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Routes */}
        <Route 
          path="/challenges" 
          element={<ProtectedRoute element={<Challenges />} authUser={authUser} />} 
        />
        <Route 
          path="/exercise/:id" 
          element={<ProtectedRoute element={<Exercise />} authUser={authUser} />} 
        />
        <Route 
          path="/programs" 
          element={<ProtectedRoute element={<Programs />} authUser={authUser} />} 
        />
        <Route 
          path="/personalizedTraining" 
          element={<ProtectedRoute element={<PersonalizedTraining />} authUser={authUser} />} 
        />
        <Route 
          path="/contact" 
          element={<ProtectedRoute element={<Contact />} authUser={authUser} />} 
        />
        <Route 
          path="/progress" 
          element={<ProtectedRoute element={<Progress />} authUser={authUser} />} 
        />
        <Route 
          path="/workouts" 
          element={<ProtectedRoute element={<WorkoutsPage />} authUser={authUser} />} 
        />
        <Route 
          path="/profile" 
          element={<ProtectedRoute element={<Profile />} authUser={authUser} />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
