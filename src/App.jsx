import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Challenges from './components/Challenges';
import Exercise from './components/Exercise';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/exercise/:id" element={<Exercise />} />
      </Routes>
    </Router>
  );
}

export default App;