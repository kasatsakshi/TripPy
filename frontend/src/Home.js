import React from 'react'
import Navbar from './components/Navbar'
import './Home.css'
import background from './images/group.jpg'
import Grid from '@mui/material/Grid';

function Home() {
  return (
    <div>
      <Navbar />
      <div>
        <img className='home__image' src={background} />
      </div>
      {/* <Grid container spacing={2}>
        <Grid item xs={2}>
          1
        </Grid>
        <Grid item xs={8}>
          <img className='home__image' src={background} />
        </Grid>
        <Grid item xs={2}>
          3
        </Grid>
      </Grid> */}
    </div>
  )
}

export default Home