import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/Trippy-1.png';
import { ShoppingCart, AccountCircle } from '@mui/icons-material';
import Stack from '@mui/material/Stack';
import './Navbar.css';
import Grid from '@mui/material/Grid';

const Navbar = () => {
  return (
    <div>
      <Stack>
        <nav className="navbar">
          {/* Logo */}
          <Link to="/">
            <img className="navbar__logo" src={logo} alt="Trippy" />
          </Link>

          <div className="navbar__searchBox">
            <Link to="/login"><button className="navbar__button">Plan a trip</button></Link>
            <Link to="/dashboard"><button className="navbar__button">Dashboard</button></Link>
          </div>

          {/* User section */}
          <div className="navbar__userSection">
            <>
              <Link to="/login"><button className="navbar__button">Login</button></Link>
              <Link to="/signup"><button className="navbar__button">Signup</button></Link>
            </>
          </div>

        </nav>
      </Stack>
      <hr className="navbar__line" />
    </div>
    // <nav className='navbar'>

    //   <Link to="/">
    //     <img className="navbar__logo" src={logo} alt="Trippy" />
    //   </Link>

    //   <div className='navbar__emptyspace'></div>

    //   <div className='navbar__options'>
    //     <Link to='/'>
    //       <button className="navbar__button">Plan A Tour</button>
    //     </Link>
    //     <Link to='/'>
    //       <button className="navbar__button">Dashboard</button>
    //     </Link>
    //     <Link to="/">
    //       <button className="signin__button">Sign in</button>
    //     </Link>
    //   </div>

    // </nav>
  );
};

export default Navbar;