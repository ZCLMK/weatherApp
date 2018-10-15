import React from 'react';
import RemoveIcon from '../../../img/btn-icons/remove.svg';

const city = ( props ) => {
  // space before active is important as there are two CSS classes if active.
  let activeClass = props.active ? " active" : "" ;
  let className = `city${activeClass}`
  return (
    <div className={className} onClick={() => props.isSelectedCity(props.position, props.cityName)}> 
      <p>{props.cityName}</p>
      <p onClick={() => props.removeCity(props.cityName)}><img 
      src={RemoveIcon} 
      alt="supprimer cette ville"
      className="remove-city-icon" /></p>
    </div>
  )
}

export default city ;