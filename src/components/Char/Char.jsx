import React from 'react'
import styles from './Chart.module.css'
import {Line, Bar} from 'react-chartjs-2'
import { fetchDailydata } from '../../api'
import { useState } from 'react'
import { useEffect } from 'react'
import Chart from 'chart.js/auto';


const Char = ({data : {recovered, deaths, confirmed}, country}) => {
  const  [dailyData, setDailyData] = useState([])
  useEffect(() => {
    const fetchAPI = async() => {
      setDailyData(await fetchDailydata())
    }
    // console.log(dailyData)
    fetchAPI()
  })
  const barChart = (
    confirmed ? (
      <Bar
        data={{
          labels: ['Infected', 'Recovered', 'Deaths'],
          datasets: [
            {
              label: 'People',
              backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
              data: [confirmed.value, recovered.value, deaths.value],
            },
          ],
        }}
        options={{
          legend: { display: false },
          title: { display: true, text: `Current state in ${country}` },
        }}
      />
    ) : null
  );

  const lineChart = (
    dailyData.length ? (
      <Line data={{
        labels: dailyData.map(({date}) => date),
        datasets: [{
          data: dailyData.map(({confirmed}) => confirmed),
          label: 'Infected',
          borderColor: '#3333ff',
          fill: true,
        }, {
          data: dailyData.map(({deaths}) => deaths),
          label: 'Deaths',
          borderColor: 'red',
          backgroundColor: 'rgba(255, 0,0 0.5)',
          fill: true,
        }]
      }} /> ): null
    )
  return (
    <div className={styles.container}>
    {country ? barChart : lineChart}
    </div>
  )
}

export default Char
