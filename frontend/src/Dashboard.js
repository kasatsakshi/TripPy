import React from 'react'
import Navbar from './components/Navbar'
import ContentCard from './components/ContentCard'
import './Dashboard.css'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import LineChart from "./components/LineChart";
import BarChart from './components/BarChart';
import Stack from '@mui/material/Stack';
import image from './images/img6.jpeg'

Chart.register(CategoryScale);

function Dashboard() {
  const cardData = [{ rank: "1", city: "Las Vegas" },
  { rank: "2", city: "New York" },
  { rank: "3", city: "Orlando" }]
  return (
    <div>
      <Navbar />
      <div>
        <img className="dashboard__image" src={image} alt="Trippy" />
      </div>
      <h2 className='dashboard__heading'>Travel Trends in USA</h2>
      <div>
        <p className='dashboard__paragraph'>Where people are going matters now more than ever—and so does making informed decisions.
          Use the drop-downs below to get started on reviewing recent travel search data* and comparing trends.</p>
      </div>
      <div className='dashboard__cards'>
        <Stack
          direction="row"
          spacing={10}
        >
          <ContentCard cardData="#1 Las Vegas"></ContentCard>
          <ContentCard cardData="#2 New York"></ContentCard>
          <ContentCard cardData="#3 Orlando"></ContentCard>
        </Stack>

      </div>
      <div className='dashboard_subheading'>Travel Demand Over Time</div>
      <p className='dashboard__paragraph'>Destination popularity can change in an instant depending on world conditions.
        See how travel demand has changed for USA over time.</p>
      <LineChart />

      <div className='dashboard_subheading'>Top Demand by City</div>
      <p className='dashboard__paragraph'>The popularity of a location can be gauged by the travel demand of those destinations.
      </p>
      <BarChart></BarChart>



    </div>
  )
}

export default Dashboard