import React from 'react';
import RemoveIcon from '../../../img/btn-icons/remove.svg';

const city = ( props ) => {
  // space before active is important as there are two CSS classes if active.
  let activeClass = props.active ? " active" : "" ;
  let className = `city${activeClass}`
  return (

    <div className={className}> 
            <p onClick={() => props.isSelectedCity(props.cityId)}>{props.cityName} </p>
            <p onClick={() => props.removeCity(props.cityIndex)}><img
            src={RemoveIcon} 
            alt="supprimer cette ville"
            className="remove-city-icon" /></p>
    </div>
       
  )
}

export default city ;