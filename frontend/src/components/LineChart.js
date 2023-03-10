import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js'
import './LineChart.css'
import dataFilePath from './../utils/TravelTrends.csv'
import Papa from 'papaparse'

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement)

function LineChart() {
  //State to store table Column name
  const [xvalues, setXarray] = useState([]);

  //State to store the values
  const [currentValues, setCurrentValues] = useState([]);

  const [previousValues, setPreviousValues] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      Papa.parse(dataFilePath, {
        header: true,
        download: true,
        quotes: false, //or array of booleans
        skipEmptyLines: true,
        delimiter: ",",
        complete: function (results) {
          const xArray = [];
          const yCurrent = [];
          const yPrev = [];

          // Iterating data to get column name and their values
          results.data.map((d) => {
            xArray.push((d.date));
            yCurrent.push(d.current_market_queries);
            yPrev.push(d.last_year_market_queries);
          });

          setXarray(xArray);
          setCurrentValues(yCurrent);
          setPreviousValues(yPrev);

        },
        error: function (err, file, inputElem, reason) {
          console.log("Oops! Something went wrong while fetching the csv.")
        },
      });
    }
    fetchData()
  }, []);


  const data = {
    labels: xvalues,
    datasets: [{
      label: 'Current Period',
      data: currentValues,
      backgroundColor: 'rgb(63, 81, 181)',
      borderColor: 'rgb(63, 81, 181)',
      borderWidth: 1
    },
    {
      label: 'Previous Period',
      data: previousValues,
      backgroundColor: 'rgb(159, 168, 218)',
      borderColor: 'rgb(159, 168, 218)',
      borderWidth: 1
    }]
  }
  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

  // reader.readAsArrayBuffer(e.target.files[0])
  return (
    <div>
      <Line className="chart__container" data={data} options={options}></Line>
    </div>
  );
}
export default LineChart;