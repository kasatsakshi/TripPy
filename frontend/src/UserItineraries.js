import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { FaEnvelope, FaCamera } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { publicRequest } from "./api/http";
import Navbar from "./components/Navbar";
import "./UserProfile.css";
import defaultUser from "./images/defaultUser.jpeg";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ItineraryCard from "./ItineraryCard";
import { Link } from "react-router-dom";



export default function UserItineraries() {

  const user = useSelector((state) => state.user.currentUser);
  const [itineraries, setItineraries] = React.useState([]);


  useEffect(() => {
    const getUser = async () => {
      try {
          console.log(user._id)
        const res = await publicRequest.get('/itinerary/user', { params: { userId: user._id}});
        setItineraries(res.data);
        console.log(res.data)
      } catch (e) {
        console.log(e)
      }
    }
    getUser();
  }, [])

  return (<>
      <Grid container spacing={2}>
      {itineraries.map((itinerary) => (

    <Link to={`/itinerary/${itinerary._id}`} style={{ textDecoration: 'none' }}> 
      <Grid item xs={16} style={{padding:"15px"}}>
        <ItineraryCard itinerary={itinerary} />
      </Grid>
    </Link>
      ))}
      </Grid>
  </>)};
