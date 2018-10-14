import React, { Component } from 'react';
import AddCity from './AddCity/AddCity';

class CityPicker extends Component{


  handleAddCity = (city) => {
    console.log(window.localStorage);
    
  }
  render(){
    return(
      <div id="city-picker">
        <span id="city-picker-title">Villes</span>
        <AddCity handleAddCity={this.handleAddCity}/>
      </div>
    )
  }
}

export default CityPicker ;