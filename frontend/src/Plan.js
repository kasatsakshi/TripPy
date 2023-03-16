import React from 'react';
import Navbar from './components/Navbar';
import TextField from '@mui/material/TextField';
import './Plan.css';
import Stack from '@mui/material/Stack';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import plan from './images/plan2.png'

function Plan() {
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
              sx={{ mb: 2 }}
            />
            <Stack direction="row" spacing={2}>
              {/* <DatePicker label="Basic date picker" /> */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker label="Start Date (optional)" sx={800} />
                </DemoContainer>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker label="End Date (optional)" />
                </DemoContainer>
              </LocalizationProvider>
            </Stack>
            <button className='plan__button'>Get Itineraries</button>
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