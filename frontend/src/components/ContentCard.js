import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function ContentCard({ cardData }) {
  return (
    <Card variant='outlined' sx={{ maxWidth: 250 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Top cities in demand domestically
          </Typography>
          <Typography variant='h5' color={"#1A237E"}>
            {cardData}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default ContentCard