import React, { useState } from 'react';
import Navbar from './components/Navbar';
import TextField from '@mui/material/TextField';
import './Plan.css';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs'
import Stack from '@mui/material/Stack';
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

function Plan() {
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [interests, setInterests] = useState([]);
  const [budget, setBudget] = useState('');
  const [isLoading, setLoading] = useState(false);
  const today = dayjs();
  const user = useSelector((state) => state.user.currentUser);

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
      setLoading(true)
      const response = await fetch('http://localhost:3001/itinerary/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ startDate: startDate, endDate: endDate, location: location, interests: interests, budget: budget, userId: user._id })
      });
      const responseData = await response.json();
      setLoading(false)
      navigate(`/itinerary/${responseData._id}`)
      // navigate(`/itinerary/6435e26526d7598cd4462187`)
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
              id="plan-location-input"
              label="Where to?"
              type="text"
              autoComplete=""
              onChange={(e) => setLocation(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Stack direction="row" spacing={2}>
              {/* <DatePicker label="Basic date picker" /> */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker disablePast defaultValue={today} label="Start Date" onChange={(e) => setStartDate(e)} />
                </DemoContainer>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker minDate={startDate} disablePast defaultValue={startDate} label="End Date" onChange={(e) => setEndDate(e)} />
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
            <button onClick={handleClick} className='plan__button'>Get me a plan</button>
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