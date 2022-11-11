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

const Navbar = () => {
  return (
    <>
      <Nav>
        {/* <Bars /> */}
        <NavMenu>
          <NavLink to='/' activeStyle>
            Home
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;