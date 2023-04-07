import * as React from 'react'
import Navbar from './components/Navbar'
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import './ItineraryPage.css'
import { CardHeader } from '@mui/material';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';


function ItineraryPage() {
  const res =
    [
      {
        "Day": 1,
        "Places": [
          {
            "Name": "The Metropolitan Museum of Art",
            "Latitude": 40.779,
            "Longitude": -73.963,
            "Travel time": 20,
            "Popularity": "High",
            "Description": "The Metropolitan Museum of Art is one of the world's largest and most visited art museums, with a collection of over two million works.",
            "Category": "Museum",
            "Cost": 25
          },
          {
            "Name": "Times Square",
            "Latitude": 40.759,
            "Longitude": -73.985,
            "Travel time": 15,
            "Popularity": "High",
            "Description": "Times Square is a major commercial intersection, tourist destination, entertainment center and neighborhood in the Midtown Manhattan section of New York City.",
            "Category": "Nightlife",
            "Cost": 0
          }
        ]
      },
      {
        "Day": 2,
        "Places": [
          {
            "Name": "Central Park",
            "Latitude": 40.7829,
            "Longitude": -73.9654,
            "Travel time": 25,
            "Popularity": "High",
            "Description": "Central Park is an urban park in Manhattan, New York City. It is the most visited urban park in the United States, with an estimated 37.5–38 million visitors annually.",
            "Category": "Park",
            "Cost": 0
          },
          {
            "Name": "Empire State Building",
            "Latitude": 40.748,
            "Longitude": -73.985,
            "Travel time": 20,
            "Popularity": "High",
            "Description": "The Empire State Building is a 102-story Art Deco skyscraper in Midtown Manhattan, New York City.",
            "Category": "Attraction",
            "Cost": 37
          }
        ]
      },
      {
        "Day": 3,
        "Places": [
          {
            "Name": "High Line",
            "Latitude": 40.747,
            "Longitude": -74.004,
            "Travel time": 15,
            "Popularity": "Medium",
            "Description": "The High Line is a 1.45-mile-long elevated linear park, greenway and rail trail created on a former New York Central Railroad spur on the west side of Manhattan in New York City.",
            "Category": "Park",
            "Cost": 0
          },
          {
            "Name": "Brooklyn Bridge",
            "Latitude": 40.706,
            "Longitude": -73.997,
            "Travel time": 20,
            "Popularity": "High",
            "Description": "The Brooklyn Bridge is a hybrid cable-stayed/suspension bridge in New York City and is one of the oldest bridges of either type in the United States.",
            "Category": "Attraction",
            "Cost": 0
          }
        ]
      }
    ]
  return (
    <div>
      <Navbar />
      <div className='itinerary__content'>
        <Card sx={{ width: 500, height: 200 }}>
          <CardContent>
            <CardHeader
              action={
                <IconButton aria-label="edit">
                  <EditIcon />
                </IconButton>
              }
              title="Trip to New York City"
            />


          </CardContent>
          <CardActions>
            <CalendarMonthIcon sx={{ fontSize: 30, marginLeft: 2 }} color="gray"></CalendarMonthIcon>
            <Typography sx={{ width: 120, marginLeft: 1 }} color="gray">4/14 - 4/17</Typography>
            <AvatarGroup max={4} sx={{ marginLeft: 15 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
              <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
              <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
            </AvatarGroup>
            <Button size="small"><PersonAddIcon sx={{ fontSize: 40 }} className="itinerary__icons"></PersonAddIcon></Button>

          </CardActions>
        </Card>
        <div className='itinerary__outerdiv'>
          {res.map((day, index) => (
            <div key={index}>
              <h3 className='itinerary__day'>Day {day.Day}</h3>
              {day.Places.map((place, iter) => (
                <Timeline position='alternate' sx={{ marginTop: 2 }}>
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineConnector />
                      <TimelineDot>

                      </TimelineDot>
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: '12px', px: 2 }}>
                      <Typography variant="h6" component="span">
                        {place.Name}
                      </Typography>
                      <Typography color="text.secondary">{place.Description}</Typography>
                    </TimelineContent>
                  </TimelineItem>
                </Timeline>

              ))}
            </div>
          ))}
        </div>
      </div>


    </div>
  )
}

export default ItineraryPage