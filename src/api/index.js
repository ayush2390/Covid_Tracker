import axios from "axios"

const url = 'https://covid19.mathdro.id/api'

export const fetchdata = async(country) => {
    let changeUrl = url
    if(country)
    {
        changeUrl = `${url}/countries/${country}`
    }
    try {
        const {data : {confirmed, recovered, deaths, lastUpdate}} = await axios.get(changeUrl)
        return {confirmed, recovered, deaths, lastUpdate}
    }
    catch (error){

    }
}
export const fetchDailydata = async() => {
    try {
        const {data } = await axios.get(`${url}/daily`)
        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }))
        return modifiedData
    }
    catch (error){
console.log(error)
    }
}
export const fetchCountries = async() => {
    try {
        const {data: {countries}} = await axios.get(`${url}/countries`)
            return countries.map((country) => country.name)
    }
    catch (error){
console.log(error)
    }
}