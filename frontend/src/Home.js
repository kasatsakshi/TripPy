import React from 'react'
import Navbar from './components/Navbar'
import './Home.css'
import background from './images/group.jpg'
import img1 from './images/img2.jpeg'
import img3 from './images/img3.jpeg'
import img6 from './images/img8.webp'
import userImage from './images/user.jpeg'
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
      <Stack>
        <Grid className='home__content' container spacing={1}>
          <Grid item xs={7}>
            <div className='home_maintext'>Plan your trip with Trippy</div>
            <div className='home_subtext'>Build, organize, and map your itineraries with your travel buddies.
              Designed to ease and reduce your travel planning efforts.</div>
          </Grid>
          <Grid item xs={5}>
            <img style={{ width: 500, height: 500, borderRadius: 1000 }} src={img3} />
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
            <div className='home__groupinfo'>A travel itinerary that you can curate along with your travel group into consideration your interests</div>
          </Grid>
        </Grid>
      </Stack>
      <Stack>
        <div className='home__teamtitle'>Meet the team</div>
        <Stack
          direction="row"
          spacing={5}
          className='home__team__members'
        >
          <Card sx={{ maxWidth: 200 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="200"
                image={userImage}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Name
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Work done
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card sx={{ maxWidth: 200 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="200"
                image={userImage}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Name
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Work done
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card sx={{ width: 200 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="200"
                image={userImage}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Name
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Work done
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card sx={{ width: 200 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="200"
                image={userImage}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Name
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Work done
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
                image={userImage}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Name
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Work done
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Stack>
      </Stack>

    </div>
  )
}

export default Home