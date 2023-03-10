import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import dataFilePath from './../utils/GeographicDemand.csv'
import Papa from 'papaparse'

function BarChart() {
  //State to store table Column name
  const [xvalues, setXarray] = useState([]);

  //State to store the values
  const [currentValues, setCurrentValues] = useState([]);

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

          // Iterating data to get column name and their values
          results.data.map((d) => {
            xArray.push((d.location));
            yCurrent.push(d.rank);
          });

          setXarray(xArray);
          setCurrentValues(yCurrent);
          // setPreviousValues(yPrev);

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
      label: 'Demand',
      data: currentValues,
      backgroundColor: 'rgb(63, 81, 181)'
    }]
  }
  const options = {}

  return (
    <div>
      <Bar className="chart__container" data={data} options={options}></Bar>
    </div>
  )
}

export default BarChart