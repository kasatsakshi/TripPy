import logo from './logo.svg';
import './App.css';
import { useSelector } from 'react-redux';
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
import UserProfile from './UserProfile'
import ItineraryPage from './ItineraryPage';
import ItineraryCard from './ItineraryCard';
import PublicItineraries from './PublicItineraries';

function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/signup" element={user ? <Navigate to="/" /> : <SignUp />} />
          <Route path="/plan" element={<Plan />} />
          <Route path="/tour" element={<Tour />} />
          <Route path="/groupboard" element={<GroupDashboard />} />
          <Route path="/user" element={<UserProfile />} />
          <Route path="/itinerary/:id" element={<ItineraryPage />} />
          <Route path="/itinerary" element={<ItineraryCard />} />
          <Route path = "/publicItineraries" element ={<PublicItineraries/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;