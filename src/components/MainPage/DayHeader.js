import React, { Component } from 'react';

class DayHeader extends Component {

  state = {
    isDay: true,
    isNight: false
  }

  componentDidMount() {
    // console.log(this.getWeatherIcon(this.props.sortedData[0][0]["weather"][0]["description"]));    

  }
  
  //-------------------------------------------------------------------------------
  
  kelvinToCelsius = (temp) => {
  return String(Math.round(Number(temp) - 273.15));
  }
//-------------------------------------------------------------------------------

  getWeatherIcon = (description) => {
    const imgDirectory = '../../../img/icons'
    const weatherIcons = {
      "clear sky": "sunny.svg",
      "few clouds": "few_clouds.svg",
      "scattered clouds": "scattered_clouds.svg",
      "broken clouds": "broken_clouds.svg",
      "shower rain" : "shower_rain.svg",
      "rain": "rain.svg",
      "light rain": "light_rain.svg",
      "thunderstorm" : "thunderstorm.svg",
      "snow": "snow.svg",
      "mist": "mist.svg"
    }
    console.log(`${imgDirectory}/${weatherIcons[description]}`)
  return `${imgDirectory}/${weatherIcons[description]}`;
  }

  //-------------------------------------------------------------------------------
  

  getMinMaxTemp = (dailyData) => {

    // Récupérer les températures des 24 prochaines heures dans un array
    const temperatures = dailyData.map(item => {
      return Number(item.main.temp)
    })
    // Récupérer la temp. min et max en kelvin
    let minTemp = this.kelvinToCelsius(Math.min(...temperatures));
    let maxTemp = this.kelvinToCelsius(Math.max(...temperatures));

    return [minTemp, maxTemp];
  }

  //-------------------------------------------------------------------------------
  
  render(){
    let currentDayTemp = this.kelvinToCelsius(this.props.sortedData[0][0]["main"]["temp"]);
    let currentDayDescription = this.getWeatherIcon(this.props.sortedData[0][0]["weather"][0]["description"]);
    return (
    <div id="day-header">
      <img src={currentDayDescription} alt="" />
      <h1>{currentDayTemp}</h1>
      <span id="minmax">
      {this.getMinMaxTemp(this.props.sortedData[0])[0]}
      /
      {this.getMinMaxTemp(this.props.sortedData[0])[1]}

      </span>
    </div>
    )
  }
}

export default DayHeader ;