import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';
import Home from './Home';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
