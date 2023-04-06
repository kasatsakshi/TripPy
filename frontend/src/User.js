import React from 'react'
import Navbar from './components/Navbar'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
import './User.css'


function User() {
  return (
    <div>
      <Navbar />
      <div className='user__content'>
        <h2 className='user__title'>Trip Itineraries</h2>
      </div>

    </div>
  )
}

export default User