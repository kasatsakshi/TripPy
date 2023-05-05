import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { FaEnvelope, FaCamera } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { publicRequest } from "./api/http";
import Navbar from "./components/Navbar";
import "./UserProfile.css";
import defaultUser from "./images/defaultUser.jpeg";
import UserItineraries from "./UserItineraries";
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';



const UserProfile = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [userDetail, setuserDetail] = React.useState([]);


  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await publicRequest.post('/user/email', { email: localStorage.getItem('email') });
        setuserDetail(res.data);
      } catch (e) {
        console.log(e)
      }
    }
    getUser();
  }, [])


  return (
    <React.Fragment>
      <Navbar />
      <div className="user-profile">
        <div className="user-profile-header">
          <div className="profile-picture">
            {/* <img src="https://i.imgur.com/tH0b9uB.jpg" alt="Profile" /> */}
            {
              user.avatarUrl ? <img className="image__avatar" src={`${user.avatarUrl}`} alt="userProfile" />
                : <img src={defaultUser} height="200" width="200" alt="user avatar" />
            }
          </div>
          <div className="user-info">
            <h2>{userDetail.username}</h2>
            <p>
              <FaEnvelope /> {userDetail.email}
            </p>
          </div>
          {/* <div className="user-actions">
            <button>
              <FaCamera /> Add Photo
            </button>
            <button>
              <FiEdit /> Edit Profile
            </button>
          </div> */}
        </div>

        <div className="user-profile-body">
          <Typography variant="h6" component="div" > Upcoming Trips </Typography>
          <Divider style={{ padding: "5px" }} />
          <br />
          <br />
          <UserItineraries />
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserProfile;
