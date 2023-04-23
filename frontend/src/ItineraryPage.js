import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar'
import GoogleMapReact from 'google-map-react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { Modal, Box, Stack, InputLabel, Select, OutlinedInput, MenuItem, Checkbox, ListItemText, TextField } from '@mui/material';
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
import Tooltip from '@mui/material/Tooltip';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import styled from 'styled-components';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs'
import moment from 'moment';
import LoadingScreen from 'react-loading-screen'
import loading from './images/loading.gif';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

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
  'Nightlife',
  'Museum',
  'Park',
  'Bridge',
  'Neighborhood',
  'Landmark',
  'Kid-friendly',
  'Beach',
  'Amusement Park'
];

function ItineraryPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const color = ["red", "green", "orange", "purple", "white", "yellow", "black", "blue", "brown"]
  const [itineraryList, setItineraryList] = useState([]);
  const [itineraryStartDate, setItineraryStartDate] = useState("");
  const [itineraryEndDate, setItineraryEndDate] = useState("");
  const [itineraryName, setItineraryName] = useState("");
  const [itineraryBudget, setItineraryBudget] = useState('');
  const [itineraryinterests, setItineraryInterests] = useState([]);
  const [itineraryLocation, setItineraryLocation] = useState('');
  const [memberList, setMemberList] = useState([]);
  const [itineraryOwner, setItineraryOwner] = useState("");
  const [center, setMapCenter] = useState();
  const [editItinerary, setEditItinerary] = React.useState(false);
  const handleEditItineraryOpen = () => setEditItinerary(true);
  const handleEditItineraryClose = () => setEditItinerary(false);
  const [addMember, setAddMember] = React.useState(false);
  const handleAddMemberOpen = () => setAddMember(true);
  const handleAddMemberClose = () => setAddMember(false);
  const [isLoading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.currentUser);
  const [members, setMembers] = React.useState([])
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setItineraryInterests(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const modifyItineraryHandle = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const response = await fetch('http://localhost:3001/itinerary/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ startDate: itineraryStartDate, endDate: itineraryEndDate, location: itineraryLocation, interests: itineraryinterests, budget: itineraryBudget, member: memberList, userId: user._id, itineraryId: id })
      });
      const responseData = await response.json();
      setItineraryList(responseData.itineraryList);
      setItineraryName(responseData.itineraryName);
      setItineraryStartDate(responseData.startDate);
      setItineraryEndDate(responseData.endDate);
      setItineraryBudget(responseData.budget)
      setItineraryInterests(responseData.interests)
      const place = responseData.itineraryList[0].Places[0]
      setMapCenter({ lat: place.Latitude, lng: place.Longitude })
      handleEditItineraryClose()
      window.location.reload();
      setLoading(false)
    } catch (e) {
      console.log(e);
    }
  }

  const leaveItinerary = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      await fetch(`http://localhost:3001/itinerary/leaveItinerary`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ itineraryId: id, userId: user._id })
      });
      setLoading(false)
      navigate("/")
    } catch (e) {
      console.log(e);
    }
  }

  const handleMember = async (e) => {
    e.preventDefault()
    try {
      await fetch(`http://localhost:3001/group/editmember`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ itineraryId: id, userId: user._id, members })
      });
      handleAddMemberClose();
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    let responseData;
    const getItinerary = async () => {
      try {
        const response = await fetch(`http://localhost:3001/itinerary/${id}`, {
          method: 'GET',
        });
        responseData = await response.json();
        console.log(responseData);
        setItineraryList(responseData.itineraryList);
        setItineraryName(responseData.itineraryName);
        setItineraryStartDate(responseData.startDate);
        setItineraryEndDate(responseData.endDate);
        setItineraryBudget(responseData.budget)
        setItineraryInterests(responseData.interests)
        setItineraryLocation(responseData.destination)
        setItineraryOwner(responseData.createdBy.email)
        setMemberList(responseData.members)
        setMembers(responseData.members.map(member => member._id))
        const place = responseData.itineraryList[0].Places[0]
        setMapCenter({ lat: place.Latitude, lng: place.Longitude })
      } catch (err) {
        console.log(err);
      }
    };
    getItinerary();
  }, []);

  const renderMarkers = (map, maps) => {
    itineraryList.map((day, index) => {
      let url = "http://maps.google.com/mapfiles/ms/icons/";
      url += color[index] + "-dot.png";
      day.Places.map((place, iter) => {
        let marker = new maps.Marker({
          position: { lat: place.Latitude, lng: place.Longitude },
          map,
          title: place.Name,
          icon: {
            url: url
          }
        });
        return marker;
      })
    })
  };

  function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.toUpperCase().split(' ')[0][0]}`,
    };
  }

  return (
    <div>
      <Navbar />
      <LoadingScreen
        loading={isLoading}
        bgColor='#f1f1f1'
        textColor='#676767'
        logoSrc={loading}
        text='Updating your itinerary...'
      />
      <div className='itinerary__content'>
        <Card sx={{ width: 500, height: 200 }} className="itinerary__card" raised={true}>
          <CardContent>
            <CardHeader
              action={
                <IconButton onClick={(handleEditItineraryOpen)} aria-label="edit">
                  <EditIcon />
                </IconButton>
              }
              title={itineraryName}
            />
          </CardContent>
          <CardActions>
            <CalendarMonthIcon sx={{ fontSize: 30, marginLeft: 2 }} color="gray"></CalendarMonthIcon>
            <Typography sx={{ width: 120, marginLeft: 1 }} color="gray">{moment(itineraryStartDate).format('MM/D')} - {moment(itineraryEndDate).format('MM/D')}</Typography>
            <AvatarGroup max={3} sx={{ marginLeft: 15, width: 100 }}>
              {memberList.map((member, index) => (
                <Tooltip title={member.username}>
                  <Avatar alt={member.username}  {...stringAvatar(member.username)} />
                </Tooltip>
              ))}

            </AvatarGroup>
            <div className='itinerary__addmember'>
              {
                itineraryOwner === user.email 
                ? <Button size="small" title="Add/Remove Members" onClick={(handleAddMemberOpen)}><PersonAddIcon sx={{ fontSize: 30 }} className="itinerary__icons"></PersonAddIcon></Button>
                : <Button size="small" title="Leave Itinerary" onClick={leaveItinerary}><ExitToAppIcon sx={{ fontSize: 30 }} className="itinerary__icons"></ExitToAppIcon></Button>
              }
            </div>
            <Modal
              open={addMember}
              onClose={handleAddMemberClose}
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Form>
                  <label className='edit__label'>Manage Members</label>
                  <Autocomplete
                    multiple
                    id="tags-filled"
                    options={[]}
                    freeSolo
                    defaultValue={memberList.map(member => member.email)}
                    onChange={async (event, newValue, reason, details) => {
                      const response = await fetch(`http://localhost:3001/user/email`, {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ email: details.option })
                      });
                      const responseData = await response.json();
                      let finalMemberList;
                      if (reason === "createOption") {
                        finalMemberList = [...members, responseData._id]
                      } else if (reason === "removeOption") {
                        finalMemberList = [...members]
                        members.map(mem => {
                          if (mem === responseData._id) {
                            finalMemberList.splice(finalMemberList.indexOf(mem), 1)
                          }
                        });
                      }
                      setMembers(finalMemberList);
                    }}
                    renderTags={(mems, getTagProps) =>
                      mems.map((option, index) => (
                        <Chip
                          label={option}
                          {...getTagProps({ index })}
                          disabled={option === itineraryOwner ? true : false}
                        // onDelete={handleDelete(option)}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="filled"
                        label=""
                        placeholder="Enter email address"
                      />
                    )}
                  />
                  <Typography sx={{ marginTop: 2 }} color="text.secondary">Enter a valid email address and press Enter to add a member.</Typography>
                  <button onClick={handleMember} className='plan__button'>Update</button>
                </Form>
              </Box>
            </Modal>
          </CardActions>
        </Card>
        <Modal
          open={editItinerary}
          onClose={handleEditItineraryClose}
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Form>
              <label style={{ alignContent: 'center', paddingBottom: 30 }}>Edit Itinerary {itineraryName}</label>
              <Stack direction="row" spacing={2}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker disablePast value={dayjs(itineraryStartDate)} label="Start Date" onChange={(e) => setItineraryStartDate(e)} />
                  </DemoContainer>
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker minDate={dayjs(itineraryStartDate)} disablePast defaultValue={dayjs(itineraryEndDate)} label="End Date" onChange={(e) => setItineraryEndDate(e)} />
                  </DemoContainer>
                </LocalizationProvider>
              </Stack>
              <div>
                <InputLabel id="demo-multiple-checkbox-label" sx={{ mt: 2 }}>Interests</InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={itineraryinterests}
                  onChange={handleChange}
                  input={<OutlinedInput label="Interests" />}
                  renderValue={(selected) => selected.join(', ')}
                  sx={{ width: 475 }}
                  MenuProps={MenuProps}
                >
                  {names.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={itineraryinterests.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <TextField
                className="plan__location"
                id="plan-budget-input"
                label="Budget"
                type="text"
                autoComplete=""
                defaultValue={itineraryBudget}
                onChange={(e) => setItineraryBudget(e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>
                }}
                sx={{ mt: 2 }}
              />
              <button onClick={modifyItineraryHandle} className='plan__button'>Modify</button>
            </Form>
          </Box>
        </Modal>
        <Grid container rowSpacing={0}>
          <Grid xs={5}>
            <div className='itinerary__outerdiv'>
              {
              itineraryList.map((day, index) => (
                <div key={index}>
                  <h3 style={{color:color[index]}} className='itinerary__day'>Day {day.Day}</h3>
                  {day.Places.map((place, iter) => (
                    <Timeline position='alternate' sx={{ marginTop: 2 }}>
                      <TimelineItem>
                        <TimelineSeparator>
                          <TimelineConnector />
                          <TimelineDot
                            sx={{ bgcolor: color[index] }}
                          >

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
          <Grid xs={7}>
            <div className='itinerary__map' style={{ height: '100vh', width: '90%', marginTop: 100 }}>
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