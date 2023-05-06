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

import Menu from '@mui/material/Menu';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Badge from '@mui/material/Badge';

const Navbar = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [anchorNotification, setAnchorNotification] = React.useState(null);

  const handleOpenNotificationMenu = (event) => {
    setAnchorNotification(event.currentTarget);
  };

  const handleCloseNotificationMenu = () => {
    setAnchorNotification(null);
  };

  const socket = io("http://localhost:5001")
  useEffect(() => {
    if (user && user._id) {
      socket.emit("requestNotifications", user._id);
      socket.on("getNotifications", (data) => {
        const unreadNotifications = data.filter(notification => notification.isRead === false)
        setNotifications(data)
        setUnreadNotifications(unreadNotifications)
      });
    }
  }, []);

  const handleNotification = async (notificationId) => {
    await fetch('http://localhost:3001/notification', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ notificationId })
    });
  }

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
                  <NotificationsIcon onClick={handleOpenNotificationMenu} className="navbar__accountCircle" sx={{ fontSize: 35 }} ></NotificationsIcon>
                  {
                    unreadNotifications.length > 0 &&
                    <div className="counter">{unreadNotifications.length}</div>
                  }
                  <Menu
                    sx={{ mt: '45px', maxHeight: '40%' }}
                    id="menu-appbar"
                    anchorEl={anchorNotification}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorNotification)}
                    onClose={handleCloseNotificationMenu}
                  >
                    {notifications.map((notification) => (
                      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        <ListItem alignItems="flex-start">
                          <ListItemText
                            primary={
                              <React.Fragment>
                                {notification.message}
                                {notification.isRead ? <div></div> : <Badge onClick={() => handleNotification(notification._id)} sx={{ paddingLeft: "10px" }} color="secondary" badgeContent=" " variant="dot" />}
                              </React.Fragment>
                            }
                          />
                        </ListItem>
                        <Divider />
                      </List>
                    ))}
                  </Menu>
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