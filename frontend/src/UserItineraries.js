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
import moment from 'moment';
import { Divider, Typography } from "@mui/material";



export default function UserItineraries() {

  const user = useSelector((state) => state.user.currentUser);
  const [itineraries, setItineraries] = React.useState([]);
  const pastItineraries = [];
  const upcomingItineraries = [];

  itineraries.map((itinerary) => {
    if (moment(itinerary.endDate).isAfter(moment.now())) {
      upcomingItineraries.push(itinerary);
    } else {
      pastItineraries.push(itinerary);
    }
  })




  useEffect(() => {
    const getUser = async () => {
      try {
        console.log(user._id)
        const res = await publicRequest.get('/itinerary/user', { params: { userId: user._id } });
        setItineraries(res.data);
        console.log(res.data)
      } catch (e) {
        console.log(e)
      }
    }
    getUser();
  }, []);

  const renderItineraryCardList = (heading, list) => {
    return (
      <>
      <Typography variant="h6" component="div" > {heading} </Typography>
      <Divider style={{ padding: "5px" }} />
      <br />
      <br />
      <div className="itinerary__grid">
        <Grid container spacing={5}>
          {list.map((itinerary) => {
            return (
            <Grid item xs="auto">
              <ItineraryCard itinerary={itinerary} />
            </Grid>)
          })}
        </Grid>
      </div>
      <br />
      <br />
      </>
    )

  }

  return (
    <>
    {upcomingItineraries && renderItineraryCardList('Upcoming Trips', upcomingItineraries)}
    {pastItineraries && renderItineraryCardList('Past Trips', pastItineraries)}
    </>
  )
};
