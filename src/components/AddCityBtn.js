import React from 'react';

const addCityBtn = (props) => {
  const pathToIcon = "../../../img/btn-icons" + props.iconName; 
  const altForIcon = props.iconName === "/add.svg" ? "add a city" : "exit to main page";

  return ( 
  <span id="add-city-btn" onClick={props.handleToggleClick}>
    <img src={pathToIcon} alt={altForIcon}/>
  </span>
  )
}

export default addCityBtn;