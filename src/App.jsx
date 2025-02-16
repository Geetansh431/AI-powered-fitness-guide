import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Challenges from './components/Challenges';
import Exercise from './components/Exercise';
import Login from './components/Login';
import SignUp from './components/SignUp';

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
      </Routes>
    </Router>
  );
}

export default App;