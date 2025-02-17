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

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/exercise/:id" element={<Exercise />} />
        <Route path="/login" element={<Login />} />
        <Route path='/Signup' element={<SignUp />} />
        <Route path='/programs' element={<Programs />} />
        <Route path='/personalizedTraining' element={<PersonalizedTraining />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/progress' element={<Progress />} />
        <Route path='/workouts' element={<WorkoutsPage />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;