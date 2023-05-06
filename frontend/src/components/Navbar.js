import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AccountCircle } from '@mui/icons-material';
import Stack from '@mui/material/Stack';
import './Navbar.css';
import { logout } from '../redux/user';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const Navbar = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const socket = io("http://localhost:5001")
  useEffect(() => {
    socket.emit("requestNotifications", user._id);
    socket.on("getNotifications", (data) => {
      const unreadNotifications = data.filter(notification => notification.isRead === false)
      console.log(unreadNotifications);
      setNotifications(unreadNotifications)
    });
  }, []);

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
                <div className="icon" onClick={() => setOpen(!open)}>
                  <NotificationsIcon className="navbar__accountCircle" sx={{ fontSize: 35 }} ></NotificationsIcon>
                  {
                    notifications.length > 0 &&
                    <div className="counter">{notifications.length}</div>
                  }
                </div>
                <input type="button" className="navbar__button" value="Logout" onClick={() => {
                  logout(dispatch)
                  navigate('/');
                }
                } />
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