import React, { useState, useEffect} from 'react'
import axios from 'axios'

const Filter = ({submitfunction, newsearchName, changefunction, clearsearch}) =>{
  console.log(newsearchName);
  return(
    <div>
      <form onSubmit={submitfunction}>
      <div>
        search: <input value={newsearchName} onChange={changefunction}/>
      </div>
      <div>
        <button type="submit" onClick={clearsearch}>search</button>
      </div>
    </form>
  </div>
  )
}

const DisplayCountry = ({searched_countries, capital, population, languages, flag, button_function, weather}) =>{
  if(searched_countries.length <= 10 && searched_countries.length > 1){
    return(
      <div>
        {searched_countries.map(entery => 
        <><h2 key={entery}>{entery}</h2>
        <button onClick={() => button_function(entery)}>dispaly</button> </>)}
        </div>
    )
  }
  if(searched_countries.length === 1){
    return (
      <div>
        <h1>{searched_countries}</h1>
        <h3>capital {capital}</h3>
        <h3>population {population}</h3>
        <h1>Languages</h1>
        <ul>{languages.map(entery => <li key={entery}>{entery}</li>)}</ul>
        <img src={flag[0]} alt="BigCo Inc. logo"/>
        <h2><strong>temperature is</strong> {weather - 273.15}</h2>

      </div>
    )
  }
  else{
    return <h2>there are more than 10 matches please be more specific</h2>
  }

}

const App = () => {

  const api_key = "975cdea950fe4ec1e8e80d4ef221a842"
  // process.env.REACT_APP_API_KEY
  

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      setCountries(Countries.concat(response.data))
      })
      // eslint-disable-next-line
  }, [])

  const [Weather, setWeather] = useState([])
  const [searchName, setSearchName] = useState([])
  const [Countries, setCountries] = useState([])
  const [country_info, setCountry_info] = useState([])
  const [country_capital, setCountry_capital] = useState([])
  const [country_population, setCountry_population] = useState([])
  const [country_languages, setCountry_languages] = useState([])
  const [country_flag, setCountry_flag] = useState([])

  useEffect(() => {
      if(country_capital.length !== 0){
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${country_capital}&appid=${api_key}`).then(response => {
          setWeather(Weather.concat(response.data.main.temp))
          })
          // eslint-disable-next-line
      }
    }, [country_capital, Weather])

  console.log(Weather);

  const [newsearchName, setNewsearchName] = useState('')

  const handlesearchName = (event) => {
    setNewsearchName(event.target.value)
  }
 
  const clearsearch = (event) => {
    setWeather([])
    setSearchName([])
    setCountry_info([])
    setCountry_capital([])
    setCountry_population([])
    setCountry_languages([])
    setCountry_flag([])
  }
  
  const search = (event) =>{
    event.preventDefault()
    console.log("is submitted");


    const countrynames = Countries.map(country => country.name.common)

    let re = new RegExp(`${newsearchName}`, 'i')
    const foundname = countrynames.filter(value => re.test(value));

    if(foundname.length === 1){
      let getcountry = Countries.filter(obj => {
        return obj.name.common === foundname[0]
      });
      setCountry_info(country_info.concat(getcountry))
      setCountry_capital(country_capital.concat(getcountry[0].capital))
      setCountry_population(country_population.concat(getcountry[0].population))

      let languages = Object.entries(getcountry[0].languages).map(entry => {
        return entry[1]
    });
      setCountry_languages(country_languages.concat(languages))

      let flags = Object.entries(getcountry[0].flags).map(entry => {
        return entry[1]
    });
      setCountry_flag(country_flag.concat(flags))

    }


    if (foundname.length !== 0){
      setSearchName(searchName.concat(foundname));
    }else{
      alert("name doesn't exist")
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter submitfunction={search} newsearchName={newsearchName} changefunction={handlesearchName} clearsearch={clearsearch}/> 
      <DisplayCountry searched_countries={searchName} capital={country_capital} population={country_population} weather={Weather}
      languages={country_languages} flag={country_flag}/>
    </div>
  )
}

export default App