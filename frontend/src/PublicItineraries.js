import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { publicRequest } from "./api/http";
import Navbar from "./components/Navbar";
import "./UserProfile.css";
import Grid from '@mui/material/Grid';
import ItineraryCard from "./ItineraryCard";



export default function PublicItineraries(props) {

  const user = useSelector((state) => state.user.currentUser);
  const [itineraries, setItineraries] = useState([])
  const {itineraryId, city} = props

  useEffect(() => {
    const getUser = async () => {
      try {
        console.log(props)
        const res =  await publicRequest.get('/itinerary/similar', { params: { itineraryId: props.itineraryId} });
        setItineraries(res.data);
        console.log(res)
      } catch (e) {
        console.log(e)
      }
    }
    getUser();
  }, [])

  return (<>
    <div className="itinerary__grid">
      <Grid container spacing={5}>
        {itineraries &&itineraries.map((itinerary) => (

          <Grid item xs="auto">
            <ItineraryCard itinerary={itinerary} viewer={true}/>
          </Grid>
        ))}
      </Grid>
    </div>

  </>)
};
