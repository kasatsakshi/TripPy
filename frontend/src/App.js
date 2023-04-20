import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';
import Home from './Home';
import Dashboard from './Dashboard';
import Login from './Login';
import SignUp from './SignUp';
import Tour from './Tour';
import GroupDashboard from './GroupDashboard';
import Plan from './Plan';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/plan" element={<Plan />} />
          <Route path="/tour" element={<Tour />} />
          <Route path="/groupboard" element={<GroupDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;