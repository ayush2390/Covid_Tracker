import React, {useEffect, useState} from 'react'
import {CountryPicker, Cards, Char} from './components'
import styles from './App.module.css'
import {fetchdata} from './api'
import image from './image/image.png';

function App () {
  const [data, setdata] = useState({})
  const [country, setCountry] = useState()
  useEffect(() => {
    const fetchingData = async() => {
    const  fetchedData = await fetchdata()
    setdata(fetchedData)
   return data
  }
  fetchingData()
}, [])

const handleChange = async(value) => {
const fetchedData = await fetchdata(value)
setdata(fetchedData)
setCountry(value)
}
  return (
    <div className={styles.container}>
       <img className={styles.image} src={image} alt="COVID-19" />
      <Cards data={data} />
      <CountryPicker handleChange={handleChange} />
      <Char data={data} country = {country} />
    </div>
  );
}

export default App;
