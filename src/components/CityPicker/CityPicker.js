import React, { Component } from 'react';
import AddCity from './AddCity/AddCity';
import City from './City/City';


class CityPicker extends Component{

  state = {
    cities: window.localStorage
  }

  handleAddCity = (city) => {
    //don't add empty string or string that is already present
    if(city.current.value && !Object.values(this.state.cities).includes(city.current.value)){
      localStorage.setItem(`city${window.localStorage.length}`, city.current.value );
      this.updateCities();
    }
    //reset input
    city.current.value = "";
  }

  updateCities = () => {
  // get current cities array from local storage
    this.setState({cities: Object.values(window.localStorage).reverse()})
  }

  removeCity = (text) => {
    //get the current position of city as its key may not reflect it because of earlier removals
    let position = Object.values(window.localStorage).indexOf(text);
    let lsKeys = Object.keys(window.localStorage);
    localStorage.removeItem(lsKeys[position]);
    this.updateCities();
  }

  render(){

    let cities = Object.values(this.state.cities).map((cityName, index) => {
      return <City cityName={cityName} key={index} removeCity={this.removeCity} />
    })
    return(
      <div id="city-picker">
        <span id="city-picker-title">Villes</span>
        <AddCity handleAddCity={this.handleAddCity}/>
        {cities}
      </div>
    )
  }
}

export default CityPicker ;