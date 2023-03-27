import React, { useState } from 'react';
import Navbar from './components/Navbar';
import TextField from '@mui/material/TextField';
import './Plan.css';
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
  'hiking',
  'night-life',
  'museums',
  'parks',
  'bridges',
  'adventure',
  'kid-friendly'
];

function Plan() {
  const [personName, setPersonName] = useState(4);
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
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

  const handleClick = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3001/itinerary/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ duration: personName, location: location, interests: interests, budget: budget })
    });
    const responseData = await response.text();
    console.log(responseData);
  }
  return (
    <div>
      <Navbar />
      <div>
        <Stack direction={'row'} sx={{ width: 1500 }}>
          <div className='plan__input'>
            <h2 className='plan__title'>Plan a new trip</h2>
            <TextField
              className="plan__location"
              id="plan-location-input"
              label="Where to"
              type="text"
              autoComplete=""
              onChange={(e) => setLocation(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Stack direction="row" spacing={2}>
              {/* <DatePicker label="Basic date picker" /> */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker label="Start Date (optional)" onChange={(e) => setStartDate(e.target.value)} />
                </DemoContainer>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker label="End Date (optional)" onChange={(e) => setEndDate(e.target.value)} />
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
              label="Budget"
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