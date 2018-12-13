import React, { Component } from 'react';
import sunny from '../../img/icons/sunny.svg'
import fewClouds from '../../img/icons/few_clouds.svg'
import scatteredClouds from '../../img/icons/scattered_clouds.svg'
import brokenClouds from '../../img/icons/broken_clouds.svg'
import showerRain from '../../img/icons/shower_rain.svg'
import rain from '../../img/icons/rain.svg'
import lightRain from '../../img/icons/light_rain.svg'
import flash from '../../img/icons/flash.svg'
import snow from '../../img/icons/snow.svg'
import mist from '../../img/icons/mist.svg'
import moderateRain from '../../img/icons/rain.svg'


class DayHeader extends Component {

  getWeatherIcon = (description) => {
  
    const weatherIcons = {
      "clear sky": sunny,
      "few clouds": fewClouds,
      "scattered clouds": scatteredClouds,
      "broken clouds": brokenClouds,
      "shower rain" : showerRain,
      "rain": rain,
      "light rain": lightRain,
      "moderate rain":moderateRain,
      "flash" :flash,
      "snow": snow,
      "mist": mist
    }

  return `${weatherIcons[description]}`;
  }

  //-------------------------------------------------------------------------------
  

  getMinMaxTemp = (dailyData) => {

    // Récupérer les températures des 24 prochaines heures dans un array
    const temperatures = dailyData.map(item => {
      return Number(item.main.temp)
    })
    // Récupérer la temp. min et max en kelvin
    let minTemp = this.props.kelvinToCelsius(Math.min(...temperatures));
    let maxTemp = this.props.kelvinToCelsius(Math.max(...temperatures));

    return [minTemp, maxTemp];
  }

  //-------------------------------------------------------------------------------
  
  render(){
    let currentDayTemp = this.props.kelvinToCelsius(this.props.sortedData[0]["main"]["temp"]);
    let currentDayDescription = this.getWeatherIcon(this.props.sortedData[0]["weather"][0]["description"]);
    return (
    <div id="day-header">
      <img src={currentDayDescription} alt="" />

      <h1>{currentDayTemp}</h1>
      <span id="minmax">
      {this.getMinMaxTemp(this.props.sortedData)[0]}
      /
      {this.getMinMaxTemp(this.props.sortedData)[1]}

      </span>
    </div>
    )
  }
}

export default DayHeader ;