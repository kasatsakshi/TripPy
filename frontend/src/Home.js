import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './Home.css'
import background from './images/group.jpg'
import img3 from './images/img3.jpeg'
import img6 from './images/img8.webp'
import userImage from './images/defaultUser.jpeg'
import mem3 from './images/SK.JPG'
import mem4 from './images/ratika.jpeg'
import mem5 from './images/Chetan.jpeg'
import mem1 from './images/wYu.jpeg'
import mem2 from './images/Ayush.jpg'
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { margin } from '@mui/system'

function Home() {
  return (
    <div>
      <Navbar />
      <Stack style={{ paddingTop: 25, paddingBottom: 20 }}>
        <Grid className='home__content' container spacing={1}>
          <Grid item xs={7}>
            <div className='home_maintext'>Plan your itinerary with Trippy</div>
            <div className='home_subtext'>The ultimate destination for personalized travel itineraries! We believe that every trip is unique, and that's why we've created a platform that allows you to plan your dream vacation based on your interests and preferences.<br /><br />
              Our website uses advanced algorithms to suggest travel itineraries that are tailored to your specific tastes. Whether you're into food, culture, adventure, or relaxation, we've got you covered.
              Simply tell us what you're looking for, and we'll suggest a range of itineraries that match your interests.</div>
          </Grid>
          <Grid item xs={5}>
            <img style={{ width: 500, height: 500, borderRadius: 1000, marginTop: 25, marginLeft: 50 }} src={img3} />
          </Grid>
        </Grid>
      </Stack>
      <Stack>
        <Grid className='home__content' container spacing={1}>
          <Grid item xs={5}>
            <img style={{ width: 500, height: 500, borderRadius: 1000, paddingLeft: 100 }} src={img6} />
          </Grid>
          <Grid item xs={7}>
            {/* <div className='home_'>Plan your trip with Trippy</div> */}
            <div className='home_groupmain'>Collaborate with Friends and Family</div>
            <div className='home__groupinfo'>We also understand that travel is more fun when you do it with friends! <br />That's why we've built in a collaboration feature that allows you to invite your friends to contribute to your itinerary.
              You can all work together to create a custom travel plan that's perfect for your group.</div>
          </Grid>
        </Grid>
      </Stack>
      <Stack sx={{ marginBottom: 10 }}>
        <div className='home__teamtitle'>Meet the team</div>
        <Stack
          direction="row"
          spacing={5}
          className='home__team__members'
        >
          <Card sx={{ width: 200 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="200"
                image={mem1}
                alt="Weider Yu"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Weider Yu
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Advisor
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card sx={{ maxWidth: 250 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="200"
                image={mem4}
                alt="Ratika Bhuwalka"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Ratika Bhuwalka
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Student
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card sx={{ width: 200 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="200"
                image={mem2}
                alt="Ayush Gupta"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Ayush Gupta
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Student
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card sx={{ width: 200 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="200"
                image={mem3}
                alt="Sakshi Kasat"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Sakshi Kasat
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Student
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                height="200"
                width="200"
                image={mem5}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Chetan Nain
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Student
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Stack>
      </Stack>
      <Footer />
    </div>
  )
}

export default Home