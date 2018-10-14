import React, { Component } from 'react';
import AddCity from './AddCity/AddCity';
import addIcon from '../../img/btn-icons/add.svg';
import removeIcon from '../../img/btn-icons/remove.svg';


class CityPicker extends Component{


  
  render(){
    return(
      <div id="city-picker">
        <span id="city-picker-title">Villes</span>
        <AddCity />
      </div>
    )
  }
}

export default CityPicker ;