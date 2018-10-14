import React, { Component } from 'react';
import addIcon from '../../../img/btn-icons/add.svg';

class AddCity extends Component  {
 
  constructor(props){
   super(props);
   this.newCity = React.createRef();
 }
  
    render(){
      return(
        <div id="add-city">
          
          <input id="add-city-input" placeholder="Ajoutez une ville ici..." ref={this.newCity}/>
          <span className="add-icon-wrapper" onClick={() => this.props.handleAddCity(this.newCity) }>
            <img src={addIcon} alt="ajouter cette ville" id="add-city-icon" />
          </span>     
        
        </div>
      )
  }
}

export default AddCity ;