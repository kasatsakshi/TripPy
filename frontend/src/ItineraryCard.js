import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red, blueGrey, blue } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import moment from 'moment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DownloadIcon from '@mui/icons-material/Download';
import Tooltip from '@mui/material/Tooltip';
import AvatarGroup from '@mui/material/AvatarGroup';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link } from 'react-router-dom'
import { publicRequest } from "./api/http";



export default function ItineraryCard(props) {
  console.log(props.itinerary)
  const [itinerary, setItinerary] = React.useState(props.itinerary)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [visibilityMenu, setVisibilityMenu] = React.useState(null);
  const viewer = props.viewer ? props.viewer : false
  const visibitlityOpen = Boolean(visibilityMenu);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleVisibilityMenuClick = (event) => {
    setVisibilityMenu(event.currentTarget);
  };
  const handleVisibilityMenuClose = () => {
    setVisibilityMenu(null);
  };
  const user = useSelector((state) => state.user.currentUser);
  const [isFavorite, setIsFavorite] = useState(props.itinerary.isFavorite)
  const [isPublic, setIsPublic] = useState(props.itinerary.isPublic)
  const [image, setImage] = useState("https://media.timeout.com/images/105770969/1372/772/image.jpg")


  useEffect(() => {
    getImage()
  }, [isFavorite, isPublic]);


  async function getImage() {
    const url = `https://pixabay.com/api/?key=35714305-8294bdfc234a78b237b91a723&q=${itinerary.destination}&image_type=photo&per_page=10&safesearch=True&category=places&editors_choice=True`
    const res = await publicRequest.get(
      url
    )
    const ind = Math.floor(Math.random() * 10);
    setImage(res.data.hits[ind].webformatURL)


  }
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
        bgcolor: stringToColor(name)[500],
      },
      children: `${name.toUpperCase().split(' ')[0][0]}`,
    };
  }

  const deleteItinerary = async () => {
    try {
      console.log(itinerary._id);
      await fetch(`http://localhost:3001/itinerary/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ itineraryId: itinerary._id, userId: user._id })
      });
      window.location.reload();
      // const res = await publicRequest.delete("/itinerary/delete", { itineraryId: itinerary._id, userId: user._id })
    } catch (e) {
      console.log(e)
    }
  }

  const leaveItinerary = async (e) => {
    console.log("in leave itinerary")
    try {
      await fetch(`http://localhost:3001/itinerary/leaveItinerary`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ itineraryId: itinerary._id, userId: user._id })
      });
      window.location.reload();

    } catch (e) {
      console.log(e);
    }
  }

  const members = (
    <>
      <AvatarGroup max={3} sx={{ marginLeft: 2, marginRight: 5, width: 100 }}>
        {itinerary.members.map((member, index) => (
          <Tooltip title={member.username}>
            <Avatar alt={member.username}  {...stringAvatar(member.username)} />
          </Tooltip>
        ))}

      </AvatarGroup>
    </>
  )

  async function handleFavClick(isFav) {
    setIsFavorite(isFav)
    await publicRequest.put('/itinerary/favorite', { itineraryId: itinerary._id, userId: user._id, isFavorite: isFav });
  }

  async function handleVisibilityClick(isPublic) {
    setIsPublic(isPublic)
    setVisibilityMenu(null)
    await publicRequest.put('/itinerary/public', { itineraryId: itinerary._id, userId: user._id, isPublic: isPublic });

  }
  return (
    <Card sx={{ width: 330, Height: 300 }} raised="true" variant="outlined">
      <CardActionArea>

        <CardHeader
          sx={{ height: 30 }}
          avatar={
            <Tooltip title={itinerary.createdBy.username}>
              <Avatar alt={itinerary.createdBy.username} sx={{ bgcolor: '#44444C', height: '45px', width: '45px' }} aria-label="itinerary">
                {itinerary.createdBy.username.toUpperCase().split(' ')[0][0]}
              </Avatar>
            </Tooltip>

          }
          action={!viewer && <>
            <IconButton
              aria-label="3-dots"
              id="itinerary-button"//"long-button"
              aria-controls={open ? 'itinerary-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="itinerary-menu"
              MenuListProps={{
                'aria-labelledby': 'itinerary-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >

              {
                itinerary.createdBy._id == user._id ? <MenuItem >
                  <IconButton onClick={deleteItinerary}>  <DeleteOutlinedIcon sx={{ fontSize: 30 }} className="itinerary__icons" onClick={() => deleteItinerary()} /> </IconButton>  Delete Trip
                </MenuItem>
                  : <MenuItem title="Leave Itinerary">
                    <IconButton onClick={leaveItinerary}>
                      <ExitToAppIcon sx={{ fontSize: 30 }} className="itinerary__icons" />
                    </IconButton>
                    Leave Trip
                  </MenuItem>
              }
              <MenuItem >   <DownloadIcon sx={{ fontSize: 30 }} className="itinerary__icons" /> Download </MenuItem>
            </Menu>
          </>
          }
          title={
            <Typography gutterBottom variant="h7" component="div" >
              {viewer ? itinerary.createdBy.username + "'s " + itinerary.itineraryName : itinerary.itineraryName}
            </Typography>}
          subheader={`${moment(itinerary.startDate).format('MMMM Do')} - ${moment(itinerary.endDate).format('MMMM Do')}`}
        />
        <Link to={`/itinerary/${itinerary._id}`} style={{ textDecoration: 'none' }} state={{ viewer: viewer }}>

          <CardMedia
            component="img"
            height="190"
            image={image}
            alt={itinerary.destination}
          />
        </Link>
        <CardActions disableSpacing>
          <div style={{ left: '5px' }}>{members}</div>

          {!viewer && <div style={{ position: 'absolute', right: '16px', width: '100px' }}>

            {isPublic ? <>
              <IconButton
                aria-label="visibility"
                id="visibility-button"
                aria-controls={visibitlityOpen ? 'visibility-menu' : undefined}
                aria-expanded={visibitlityOpen ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleVisibilityMenuClick}
              >
                <PublicOutlinedIcon aria-label="Visible publicly" style={{ height: "30px", width: "30px", margin: '2px' }} />
              </IconButton>
              <Menu
                id="itinerary-menu"
                MenuListProps={{
                  'aria-labelledby': 'itinerary-button',
                }}
                anchorEl={visibilityMenu}
                open={visibitlityOpen}
                onClose={handleVisibilityMenuClose}
              >
                <MenuItem onClick={() => handleVisibilityClick(false)}> <PeopleOutlineOutlinedIcon sx={{ fontSize: 30 }} className="itinerary__icons" /> Make it Private </MenuItem>
              </Menu>
            </> :
              <>
                <IconButton
                  aria-label="visibility"
                  id="visibility-button"
                  aria-controls={visibitlityOpen ? 'visibility-menu' : undefined}
                  aria-expanded={visibitlityOpen ? 'true' : undefined}
                  aria-haspopup="true"
                  onClick={handleVisibilityMenuClick}
                >
                  <PeopleOutlineOutlinedIcon style={{ height: "30px", width: "30px", margin: '2px' }} />
                </IconButton>
                <Menu
                  id="visibility-menu"
                  MenuListProps={{
                    'aria-labelledby': 'visibility-button',
                  }}
                  anchorEl={visibilityMenu}
                  open={visibitlityOpen}
                  onClose={handleVisibilityMenuClose}
                >
                  <MenuItem onClick={() => handleVisibilityClick(true)} > <PublicOutlinedIcon sx={{ fontSize: 30 }} className="itinerary__icons" /> Make it Public </MenuItem>
                </Menu>
              </>}
            {isFavorite ?
              <Tooltip title="Remove from Favorites" onClick={() => handleFavClick(false)}>
                <IconButton>
                  <FavoriteIcon aria-label="Favorite" sstyle={{ height: "30px", width: "30px" }} />
                </IconButton>
              </Tooltip>
              :
              <Tooltip title="Add to Favorites">
                <IconButton>
                  <FavoriteBorderIcon aria-label="Unfavorite" onClick={() => handleFavClick(true)} style={{ height: "30px", width: "30px" }} />
                </IconButton>
              </Tooltip>}
          </div>
          }
        </CardActions>
      </CardActionArea>
    </Card>
  );
}