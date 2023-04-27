import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import logo from '../images/Trippy-1.png';
import { ShoppingCart, AccountCircle } from '@mui/icons-material';
import Stack from '@mui/material/Stack';
import './Navbar.css';
import Grid from '@mui/material/Grid';
import { logout } from '../redux/user';

const Navbar = () => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  return (
    <div>
      <Stack>
        <nav className="navbar">
          {/* Logo */}
          <Link className='navbar__logo' to="/">
            {/* <img className="navbar__logo" src={logo} alt="Trippy" /> */}
            Trippy
          </Link>

          <div className="navbar__searchBox">
            <Link to="/plan" className='navbar__links'>Plan a trip</Link>
            <Link to="/dashboard" className='navbar__links'>Dashboard</Link>

          </div>

          {/* User section */}
          <div className="navbar__userSection">
            <>

              {user ? (<>
                <Link to="/user"><AccountCircle className="navbar__accountCircle" sx={{ fontSize: 40 }} /></Link>
                <input type="button" className="navbar__button" value="Logout" onClick={() => logout(dispatch)} />
              </>)
                : (
                  <>
                    <Link to="/login"><button className="navbar__button">Login</button></Link>
                    <Link to="/signup"><button className="navbar__button">Signup</button></Link>
                  </>)}

            </>
          </div>

        </nav>
      </Stack>
      <hr />
    </div>
    
  );
};

export default Navbar;