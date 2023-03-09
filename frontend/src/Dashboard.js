import React from 'react'
import Navbar from './components/Navbar'
import ContentCard from './components/ContentCard'
import './Dashboard.css'

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
      <div className='dashboard_subheading'>Travel Demand Across Time</div>

    </div>
  )
}

export default Dashboard