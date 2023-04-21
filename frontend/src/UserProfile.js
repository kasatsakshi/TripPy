import React, { useEffect } from "react";
import { FaEnvelope, FaCamera } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { publicRequest } from "./api/http";
import Navbar from "./components/Navbar";
import "./UserProfile.css";

const UserProfile = () => {

  const [userDetail, setuserDetail] = React.useState([]);


useEffect(async()=>{
  const res = await publicRequest.post('/user/email', {email: localStorage.getItem('email')});
  setuserDetail(res.data);
}, [])


  return (
    <React.Fragment>
    <Navbar />
    <div className="user-profile">
      <div className="user-profile-header">
        <div className="profile-picture">
          <img src="https://i.imgur.com/tH0b9uB.jpg" alt="Profile" />
        </div>
        <div className="user-info">
          <h2>{userDetail.username}</h2>
          <p>
            <FaEnvelope /> {userDetail.email}
          </p>
          <button>Follow</button>
        </div>
        <div className="user-actions">
          <button>
            <FaCamera /> Add Photo
          </button>
          <button>
            <FiEdit /> Edit Profile
          </button>
        </div>
      </div>
      <div className="user-profile-body">
        <div className="post-grid">
          <div className="post-item">
            <div className="post-image">
              <img src="https://i.imgur.com/xUhB9O3.jpg" alt="Post" />
            </div>
            <h3>Exploring the countryside</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              gravida odio eget ligula condimentum, ac molestie turpis dictum.
            </p>
          </div>
          <div className="post-item">
            <div className="post-image">
              <img src="https://i.imgur.com/KlEJ0Vb.jpg" alt="Post" />
            </div>
            <h3>At the beach with friends</h3>
            <p>
              Ut euismod tincidunt massa, vitae rhoncus ex eleifend nec. Nunc
              dictum ullamcorper ante, at pretium nisi mollis vel.
            </p>
          </div>
          <div className="post-item">
            <div className="post-image">
              <img src="https://i.imgur.com/LZTtLsm.jpg" alt="Post" />
            </div>
            <h3>Exploring the city at night</h3>
            <p>
              Vestibulum vel libero aliquet, ullamcorper libero eu, tempor elit.
              Maecenas sit amet neque eget magna maximus dictum.
            </p>
          </div>
          <div className="post-item">
            <div className="post-image">
              <img src="https://i.imgur.com/9lAYnpv.jpg" alt="Post" />
            </div>
            <h3>Hiking in the mountains</h3>
            <p>
              Suspendisse vel magna vitae justo consectetur sodales a at magna.
              Praesent pellentesque lacus sed augue ullamcorper, vel molestie
              velit eleifend.
            </p>
          </div>
          <div className="post-item">
            <div className="post-image">
              <img src="https://i.imgur.com/28y0gDs.jpg" alt="Post" />
            </div>
            <h3>Visiting the national park</h3>
            <p>
              Donec euismod dolor id tellus malesuada, vitae consequat eros
              luctus. Fusce quis interdum tellus.
            </p>
          </div>
          <div className="post-item">
<div className="post-image">
<img src="https://i.imgur.com/SAFChK8.jpg" alt="Post" />
</div>
<h3>On a road trip with friends</h3>
<p>
Nullam ut libero facilisis, congue turpis id, cursus ipsum. Sed
vestibulum mi vitae libero tristique bibendum.
</p>
</div>
</div>
</div>
</div>
</React.Fragment>
);
};

export default UserProfile;
