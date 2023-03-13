import { Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import React from 'react'
import Navbar from './components/Navbar'
import './GroupDashboard.css'
// import { makeStyles } from '@mui/styles';

const groupMembers = [{
    id: 1,
    fname: "James",
    lname: "Cameron",
	username: "J C",
    // password: { type : String },
    email: "JC@gmail.com",
},
{
    id: 2,
    fname: "James",
    lname: "Cameron",
	username: "J C",
    // password: { type : String },
    email: "JC@gmail.com",
},
{
    id: 3,
    fname: "James",
    lname: "Cameron",
	username: "J C",
    // password: { type : String },
    email: "JC@gmail.com",
}
]

// const useStyles = makeStyles((theme)=> {
//     // mainContainer: {
//     //     backgroundColor
//     // }
// })


function GroupDashboard() {
    return (
        <div>
            <Navbar />
            <Grid container component="main" sx={{
                backgroundColor: "pink"
                }}>
                <Grid item xs={12} sm={6} md={5} sx={{
                    backgroundColor: 'yellow'
                }}>
                    <Typography component="h1" variant="h5">
                        Group Name
                    </Typography>
                    <List component='ul'>
                        {groupMembers.map((user) => (
                            // button onClick={() => onSelect(id)}
                        <ListItem >
                            <ListItemText primary={`${user.fname} ${user.lname}` } key={user.id} />
                            </ListItem>
                            ))}
                    </List>
                </Grid>
            </Grid>
        </div>
    )
}

export default GroupDashboard;