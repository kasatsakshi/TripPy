import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavbarElements';
import { Link } from 'react-router-dom';
import logo from '../images/Trippy-1.png';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className='navbar'>

      <Link to="/">
        <img className="navbar__logo" src={logo} alt="Trippy" />
      </Link>


      <div className='navbar__emptyspace'></div>

      <div className='navbar__options'>
        <Link to='/'>
          <button className="navbar__button">Plan A Tour</button>
        </Link>
        <Link to='/'>
          <button className="navbar__button">Dashboard</button>
        </Link>
        <Link to="/">
          <button className="signin__button">Sign in</button>
        </Link>
      </div>

    </nav>
  );
};

export default Navbar;