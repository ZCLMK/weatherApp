import React from 'react';
import addIcon from '../img/btn-icons/add.svg';
import exitIcon from '../img/btn-icons/exit.svg';


const addCityBtn = (props) => {

  let icon = <img
   src={props.choosingCity ? exitIcon : addIcon }
  alt={props.choosingCity ? "ajouter une ville" : "revenir au prévisions météo" }  />

  return ( 
  <span id="add-city-btn" onClick={props.handleToggleClick}>
    {icon}
  </span>
  )
}

export default addCityBtn;