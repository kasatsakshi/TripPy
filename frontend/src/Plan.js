import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import TextField from '@mui/material/TextField';
import './Plan.css';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs'
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import plan from './images/plan2.png'
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from 'react-loading-screen'
import loading from './images/loading.gif';
import styled from 'styled-components';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Error = styled.span`
  color: red;
`;

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
  'Amusement Park',
  'Restaurant'
];
const apikey = process.env.REACT_APP_GOOGLE_API_KEY;


let autoComplete;

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function() {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

function handleScriptLoad(updateQuery, autoCompleteRef) {
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    { types: ["(cities)"]}
  );
  autoComplete.setFields(["address_components", "formatted_address"]);
  autoComplete.addListener("place_changed", () =>
    handlePlaceSelect(updateQuery)
  );
}

async function handlePlaceSelect(updateQuery) {
  const addressObject = autoComplete.getPlace();
  const query = addressObject.formatted_address;
  updateQuery(query);
  console.log(addressObject);
}



function Plan() {
  const today = dayjs();
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState('');
  const [interests, setInterests] = useState([]);
  const [budget, setBudget] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [errorLocation, setLocationError] = useState(false);
  const [errorDate, setDateError] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const user = useSelector((state) => state.user.currentUser);
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`,
      () => handleScriptLoad( setLocation, autoCompleteRef)
    );
  }, []);

  
  // useEffect(() => {
  //   if (location.length < 2) {
  //     setError("Enter correct location")
  //   }
  // }, [location]);

  // useEffect(() => {
  //   if (location.length > 2 && errorMsg) {
  //     setError("");
  //   }
  // }, [location, errorMsg]);

  const navigate = new useNavigate();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setInterests(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };


  const handleClick = async (e) => {
    e.preventDefault();
    try {
      console.log(location.length)
      if (location.length < 2) {
        setLocationError(true);
      }
      if (!endDate) {
        setDateError(true);
      }
      else {
        setLocationError(false);
        setLoading(true)
        const response = await fetch('http://localhost:3001/itinerary/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ startDate: startDate, endDate: endDate, location: location.split(",")[0], interests: interests, budget: budget, userId: user._id })
        });
        const responseData = await response.json();
        setLoading(false)
        navigate(`/itinerary/${responseData._id}`)
      }
    } catch (e) {
      console.log(e);
    }
  }

  


  return (
    <div>
      <Navbar />
      <LoadingScreen
        loading={isLoading}
        bgColor='#f1f1f1'
        textColor='#676767'
        logoSrc={loading}
        text='Fetching your itinerary... Are you excited to travel?'
      />
      <div>
        <Stack direction={'row'} sx={{ width: 1500 }}>
          <div className='plan__input'>
            <h2 className='plan__title'>Plan a new trip</h2>
            <TextField
              className="plan__location"
              name="location"
              id="plan-location-input"
              label="Where to?"
              type="text"
              required
              // autoComplete=""
              inputRef={autoCompleteRef}
              error={errorLocation}
              value={location}
              // helperText={errorMsg}
              onChange={(e) => setLocation(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Stack direction="row" spacing={2}>
              {/* <DatePicker label="Basic date picker" /> */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker required disablePast defaultValue={today} label="Start Date" onChange={(e) => setStartDate(e)} />
                </DemoContainer>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker required minDate={startDate} disablePast label="End Date" onChange={(e) => setEndDate(e)} error={errorDate} />
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
              type="text"
              autoComplete=""
              label="Budget"
              onChange={(e) => setBudget(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>
              }}
              sx={{ mt: 2 }}
            />
            {errorLocation || errorDate ? <Error>Make sure you enter location, start date and end date </Error> : <p />}
            <button onClick={handleClick} className='plan__button' disabled={false}>Get me a plan</button>
          </div>
          <div>
            <img style={{ width: 500, height: 500, paddingTop: 250 }} src={plan} />
          </div>
        </Stack>

      </div>
    </div>
  )
}

export default Plan