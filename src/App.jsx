import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Challenges from './components/Challenges';
import Exercise from './components/Exercise';
import Login from './components/Login';
import SignUp from './components/SignUp';
import CardioWorkout from './components/CardioWorkout';
import YogaWorkout from './components/YogaWorkout';
import StrengthWorkout from './components/StrengthWorkout';
import Programs from './components/Programs';
import PersonalizedTraining from './components/PersonalizedTraining';
import Contact from './components/Contact';

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
        <Route path="/workout/cardio" element={<CardioWorkout />} />
        <Route path="/workout/yoga" element={<YogaWorkout />} />
        <Route path="/workout/strength" element={<StrengthWorkout />} />
        <Route path='/programs' element={<Programs />} />
        <Route path='/personalizedTraining' element={<PersonalizedTraining />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;