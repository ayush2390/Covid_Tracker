import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { fetchCountries } from '../../api'
import { NativeSelect, FormControl } from '@material-ui/core'
import styles from './CountryPicker.module.css'

const CountryPicker = ({handleChange}) => {
  const [fetchingCountries, setFetchingCountries] = useState([])
  useEffect(() => {
    const fetchedAPI = async() => {
        setFetchingCountries(await fetchCountries())
    }
    fetchedAPI()
  }, [setFetchingCountries])
  // console.log(fetchingCountries)
  return (
    <FormControl className={styles.formControl}>
      <NativeSelect onChange={(e) => handleChange(e.target.value)}>
        <option value=''>Global</option>
          {fetchingCountries.map((country, i) => 
        <option key={i} value={country}>{country}</option>)}
      </NativeSelect>
    </FormControl>
  )
}

export default CountryPicker
