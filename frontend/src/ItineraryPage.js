import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './components/Navbar'
import GoogleMapReact from 'google-map-react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { Modal, Box, FormControlLabel, Stack, InputLabel, Select, OutlinedInput, MenuItem, Checkbox, ListItemText, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
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
import styled from 'styled-components';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs'
import moment from 'moment';

const apikey = process.env.REACT_APP_GOOGLE_API_KEY;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
};

const names = [
  'Hiking',
  'Night-life',
  'Museums',
  'Parks',
  'Bridges',
  'Adventure',
  'Kid Friendly'
];

function ItineraryPage() {
  const { id } = useParams();
  const [itineraryList, setItineraryList] = useState([]);
  const [itineraryStartDate, setItineraryStartDate] = useState("");
  const [itineraryEndDate, setItineraryEndDate] = useState("");
  const [itineraryName, setItineraryName] = useState("");
  const [memberList, setMemberList] = useState([]);
  const [itineraryOwner, setItineraryOwner] = useState("");
  const [center, setMapCenter] = useState();
  const [editItinerary, setEditItinerary] = React.useState(false);
  const handleEditItineraryOpen = () => setEditItinerary(true);
  const handleEditItineraryClose = () => setEditItinerary(false);
  const today = dayjs();
  const [startDate, setStartDate] = useState(itineraryStartDate);
  const [endDate, setEndDate] = useState(itineraryEndDate);
  const [interests, setInterests] = useState([]);
  const [budget, setBudget] = useState('');

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setInterests(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  useEffect(async () => {
    const response = await fetch(`http://localhost:3001/itinerary/${id}`, {
      method: 'GET',
    });
    const responseData = await response.json();
    console.log(responseData)
    setItineraryList(responseData.itineraryList);
    setItineraryName(responseData.itineraryName);
    setItineraryStartDate(responseData.startDate);
    setItineraryEndDate(responseData.endDate);
    const place = responseData.itineraryList[0].Places[0]
    setMapCenter({ lat: place.Latitude, lng: place.Longitude })
  }, []);

  const renderMarkers = (map, maps) => {
    itineraryList.map((day, index) => {
      day.Places.map((place, iter) => {
        let marker = new maps.Marker({
          position: { lat: place.Latitude, lng: place.Longitude },
          map,
          title: place.Name
        });
        return marker;
      })
    })
  };

  // const itineraryList =
  //   [
  //     {
  //       "Day": 1,
  //       "Places": [
  //         {
  //           "Name": "The Metropolitan Museum of Art",
  //           "Latitude": 40.779,
  //           "Longitude": -73.963,
  //           "Travel time": 20,
  //           "Popularity": "High",
  //           "Description": "The Metropolitan Museum of Art is one of the world's largest and most visited art museums, with a collection of over two million works.",
  //           "Category": "Museum",
  //           "Cost": 25
  //         },
  //         {
  //           "Name": "Times Square",
  //           "Latitude": 40.759,
  //           "Longitude": -73.985,
  //           "Travel time": 15,
  //           "Popularity": "High",
  //           "Description": "Times Square is a major commercial intersection, tourist destination, entertainment center and neighborhood in the Midtown Manhattan section of New York City.",
  //           "Category": "Nightlife",
  //           "Cost": 0
  //         }
  //       ]
  //     },
  //     {
  //       "Day": 2,
  //       "Places": [
  //         {
  //           "Name": "Central Park",
  //           "Latitude": 40.7829,
  //           "Longitude": -73.9654,
  //           "Travel time": 25,
  //           "Popularity": "High",
  //           "Description": "Central Park is an urban park in Manhattan, New York City. It is the most visited urban park in the United States, with an estimated 37.5–38 million visitors annually.",
  //           "Category": "Park",
  //           "Cost": 0
  //         },
  //         {
  //           "Name": "Empire State Building",
  //           "Latitude": 40.748,
  //           "Longitude": -73.985,
  //           "Travel time": 20,
  //           "Popularity": "High",
  //           "Description": "The Empire State Building is a 102-story Art Deco skyscraper in Midtown Manhattan, New York City.",
  //           "Category": "Attraction",
  //           "Cost": 37
  //         }
  //       ]
  //     },
  //     {
  //       "Day": 3,
  //       "Places": [
  //         {
  //           "Name": "High Line",
  //           "Latitude": 40.747,
  //           "Longitude": -74.004,
  //           "Travel time": 15,
  //           "Popularity": "Medium",
  //           "Description": "The High Line is a 1.45-mile-long elevated linear park, greenway and rail trail created on a former New York Central Railroad spur on the west side of Manhattan in New York City.",
  //           "Category": "Park",
  //           "Cost": 0
  //         },
  //         {
  //           "Name": "Brooklyn Bridge",
  //           "Latitude": 40.706,
  //           "Longitude": -73.997,
  //           "Travel time": 20,
  //           "Popularity": "High",
  //           "Description": "The Brooklyn Bridge is a hybrid cable-stayed/suspension bridge in New York City and is one of the oldest bridges of either type in the United States.",
  //           "Category": "Attraction",
  //           "Cost": 0
  //         }
  //       ]
  //     }
  //   ]
  return (
    <div>
      <Navbar />
      <div className='itinerary__content'>
        <Card sx={{ width: 500, height: 200 }} className="itinerary__card">
          <CardContent>
            <CardHeader
              action={
                <IconButton onClick={(handleEditItineraryOpen)} aria-label="edit">
                  <EditIcon />
                </IconButton>
              }
              title={itineraryName}
              subheader={itineraryOwner}
            />
          </CardContent>
          <CardActions>
            <CalendarMonthIcon sx={{ fontSize: 30, marginLeft: 2 }} color="gray"></CalendarMonthIcon>
            <Typography sx={{ width: 120, marginLeft: 1 }} color="gray">{moment(itineraryStartDate).format('MM/D')} - {moment(itineraryEndDate).format('MM/D')}</Typography>
            <AvatarGroup max={3} sx={{ marginLeft: 15 }}>
              {memberList.map((member, index) => (
                <Avatar alt={member.username} src="" />
              ))}

            </AvatarGroup>
            <div className='itinerary__addmember'>
              <Button size="small"><PersonAddIcon sx={{ fontSize: 40 }} className="itinerary__icons"></PersonAddIcon></Button>
            </div>


          </CardActions>
        </Card>
        <Modal
          open={editItinerary}
          onClose={handleEditItineraryClose}
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Form>
              <label style={{ alignContent: 'center', paddingBottom: 30 }}>Edit Itinerary: {itineraryName}</label>
              <Stack direction="row" spacing={2}>
                {/* <DatePicker label="Basic date picker" /> */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker disablePast defaultValue={itineraryStartDate} label="Start Date" value={startDate} onChange={(e) => setStartDate(e)} />
                  </DemoContainer>
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker minDate={itineraryStartDate} disablePast defaultValue={itineraryEndDate} value={endDate} label="End Date" onChange={(e) => setEndDate(e)} />
                  </DemoContainer>
                </LocalizationProvider>
              </Stack>
              <div>
                <InputLabel id="demo-multiple-checkbox-label" sx={{ mt: 2 }}>Interests</InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={interests}
                  onChange={handleChange}
                  input={<OutlinedInput label="Interests" />}
                  renderValue={(selected) => selected.join(', ')}
                  sx={{ width: 475 }}
                  MenuProps={MenuProps}
                >
                  {names.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={interests.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <TextField
                className="plan__location"
                id="plan-budget-input"
                label="Budget in USD"
                type="text"
                autoComplete=""
                onChange={(e) => setBudget(e.target.value)}
                sx={{ mt: 2 }}
              />
            </Form>
          </Box>
        </Modal>
        <Grid container rowSpacing={0}>
          <Grid xs={6}>
            <div className='itinerary__outerdiv'>
              {itineraryList.map((day, index) => (
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
          </Grid>
          <Grid xs={6}>
            <div className='itinerary__map' style={{ height: '70vh', width: '90%', marginTop: 50 }}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: apikey }}
                center={center}
                defaultZoom={11}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
              >
              </GoogleMapReact>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default ItineraryPage