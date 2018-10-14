import React from 'react';
import RemoveIcon from '../../../img/btn-icons/remove.svg';

const city = ( props ) => {
  return (
    <div className="city"> 
      <p>{props.cityName}</p>
      <p onClick={() => props.removeCity(props.cityName)}><img 
      src={RemoveIcon} 
      alt="supprimer cette ville"
      className="remove-city-icon" /></p>
    </div>
  )
}

export default city ;