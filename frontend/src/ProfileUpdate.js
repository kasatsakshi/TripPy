import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Stack, Radio, RadioGroup, FormControlLabel, Link, Box, Modal,
} from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './ProfileUpdate.css';
import './Home.css';

import defaultUser from '../assets/defaultUser.png';
import { updateUserInfo } from '../redux/user';

const Container = styled.div`
 position: relative;
 min-height: 100vh;
`;

const Wrapper = styled.div`
  background-color: white;
  margin-top: 120px;
  display: flex;
  justify-content: center;
  margin-left: 400px;
  margin-right: 400px;
  padding-bottom: 120px;
`;

const Form = styled.form`
  display: block;
  flex-wrap: wrap;
  justify-content: left;
  background-color: white;
  border: 1px solid #dadbd6;
  border-radius: 5px;
  width: 100%;
  padding: 20px;
  `;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Right = styled.div`
 margin-top: 32px;
 position: absolute;
 right: 400px;
`;

const Button = styled.button`
 background-color: white;
 border: 1px solid lightgrey;
 padding-top:5px;
 padding-bottom: 5px;
 padding-left: 12px;
 padding-right: 12px;
 &:hover {
    background-color: #FFEADB;
  }
`;

const Left = styled.div`
 position: absolute;
 left: 0px;
`;

const Title = styled.div`
 margin-top: 30px;
 margin-left: 400px;
 font-size: 30px;
 font-weight: 500;
`;

const Subtitle = styled.div`
 margin-left: 410px;
 font-weight: 500;
 color: grey;
`;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function ProfileUpdate() {
  const reduxUser = useSelector((state) => state.user.currentUser);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const [avatarUrl, setAvatarFile] = useState(user.avatarUrl);

  const navigate = new useNavigate();

  const handleNameChange = async (e) => {
    e.preventDefault();
    setName(name);
    handleClose();
  };

  const profilePicUpdate = (e) => {
    setAvatarFile({ file: e.target.files[0] });
  };

  const saveChanges = async (e) => {
    e.preventDefault();
    await updateUserInfo(dispatch, {
      name, email, avatarUrl, userId: user.id,
    });
    navigate('/user');
  };

  return (
    <Container>
      <Navbar />
      {/* <Left>
        <Title>Your Public Profile</Title>
        <Subtitle>Everything on this page can be seen by anyone</Subtitle>
      </Left>
      <Right><Button>View Profile</Button></Right> */}
      <Wrapper>
        <Form>
          <div className="update__form">
            <Stack>
              <Stack>
                <div className="update__pictureTextSpan">
                  <span>Profile Picture</span>
                  <span className="update__chooseFile"><input type="file" id="myImage" name="myImage" onChange={profilePicUpdate} accept="image/png, image/jpeg" /></span>
                </div>
                <div className="update__picture">
                  {
                    user.avatarUrl ? <img className="image__avatar" src={`${user.avatarUrl}`} alt="userProfile" />
                      : <img src={defaultUser} height="200" width="200" alt="user avatar" />
                  }
                  <p className="update__labeltext">Must be a .jpg, .gif or .png file smaller than 5MB and at least 400px by 400px.</p>
                </div>
              </Stack>
            </Stack>
            <button onClick={saveChanges} className="update__button">Save Changes</button>
          </div>
        </Form>
      </Wrapper>
      <Footer />
    </Container>
  );
}

export default ProfileUpdate;
