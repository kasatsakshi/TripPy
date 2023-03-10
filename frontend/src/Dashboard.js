import React from 'react'
import Navbar from './components/Navbar'
import ContentCard from './components/ContentCard'
import './Dashboard.css'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState } from "react";
import LineChart from "./components/LineChart";
import { Data } from './Data'
import BarChart from './components/BarChart';

Chart.register(CategoryScale);

function Dashboard() {
  return (
    <div>
      <Navbar />
      <h2 className='dashboard__heading'>Travel Trends in USA</h2>
      <div>
        <p className='dashboard__paragraph'>Where people are going matters now more than ever—and so does making informed decisions.
          Use the drop-downs below to get started on reviewing recent travel search data* and comparing trends.</p>
      </div>
      <div>
        <ContentCard></ContentCard>
      </div>
      <div className='dashboard_subheading'>Travel Demand Over Time</div>
      <p className='dashboard__paragraph'>Destination popularity can change in an instant depending on world conditions.
        See how travel demand has changed for USA over time.</p>
      <LineChart />

      <div className='dashboard_subheading'>Top Demand by City</div>
      <p className='dashboard__paragraph'>The travel demand for various cities in the USA are plotted based on popularity of a destination.
      </p>
      <BarChart></BarChart>



    </div>
  )
}

export default Dashboard