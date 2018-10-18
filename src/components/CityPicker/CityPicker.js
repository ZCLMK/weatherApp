import React, { Component } from 'react';
import AddCity from './AddCity/AddCity';
import City from './City/City';
import Cities from '../../cities.js';




class CityPicker extends Component{

  state = {
    cities: window.localStorage,
    selectedCity: 0
  }

  componentDidMount() {
    console.log(this.findMatches('alam'));
  }
  
  // rerender only if different city selected


  handleAddCity = (city) => {
    //don't add empty string or string that is already present
    if(city.current.value && !Object.values(this.state.cities).includes(city.current.value)){
      localStorage.setItem(`city${window.localStorage.length}`, city.current.value );
      this.updateCities();
    }
    //reset input
    city.current.value = "";
  }

  // implement a typeahead for cities using json file.

  isSelectedCity = (position, cityName) => {
    // if city in at a different index is selected
    if(position !== this.state.selectedCity){
      this.setState({selectedCity: position});
      this.props.getSelectedCity(cityName);
    }
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

  //------------------------------------- AUTOCOMPLETION OF CITIES ------------------------------------------

  findMatches = (currentInput, cities = Cities) => {

       if(currentInput.length >= 4){
      return cities.filter((city) => {
        const regexp = new RegExp(currentInput, 'gi');
        return city.name.match(regexp);
      })  
    }
  }
  
  render(){
    // flag : style city if it is the selected one.
    let isActive = false;
    let cities = Object.values(this.state.cities).map((cityName, index) => {
      
      isActive = ( index === this.state.selectedCity ) ? true : false ;

      return <City 
      cityName={cityName} 
      key={index} 
      position={index} 
      removeCity={this.removeCity}
      isSelectedCity={this.isSelectedCity}
      active={isActive}
       />
   
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