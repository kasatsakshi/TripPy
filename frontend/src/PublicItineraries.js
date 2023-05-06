import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { publicRequest } from "./api/http";
import Navbar from "./components/Navbar";
import "./UserProfile.css";
import Grid from '@mui/material/Grid';
import ItineraryCard from "./ItineraryCard";
import Carousel from 'react-material-ui-carousel'




export default function PublicItineraries(props) {

  const [itineraries, setItineraries] = useState([])

  
  // return (
  //   <Carousel animation="slide" autoPlay={false} cycleNavigation timeout={300}>
  //     {items}
  //   </Carousel>
  // );
// };

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

  const sliderItems = itineraries.length > 2 ? 2 : itineraries.length;
  const items = [];

  for (let i = 0; i < itineraries.length; i += sliderItems) {
    if (i % sliderItems === 0) {
      items.push(
          <Grid container spacing={1} className="BannerGrid">
            {itineraries.slice(i, i + sliderItems).map((itinerary, index) => {
              return  <ItineraryCard key={index.toString()} itinerary={itinerary} viewer={true}/>;
            })}
          </Grid>
      );
    }
  }
  return (<>
    <div className="itinerary__grid">

    <Carousel animation="slide" autoPlay={false} cycleNavigation timeout={300}>
      {items}
    </Carousel>
      {/* <Grid container spacing={5}> */}
        {/* <Carousel show={3}>
        {itineraries &&itineraries.map((itinerary) => (

          <Grid item xs="auto">
            <ItineraryCard itinerary={itinerary} viewer={true}/>
          </Grid>
        ))}
    </Carousel> */}
    </div>

  </>)
};
