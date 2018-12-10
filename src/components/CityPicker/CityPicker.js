import React, { Component } from 'react';
import AddCity from './AddCity/AddCity';
import City from './City/City';
import Cities from '../../other/cities.json';
import Dropdown from '../../hoc/Dropdown';
import { BrowserRouter as Router, withRouter } from 'react-router-dom';



class CityPicker extends Component{

  state = {
    cities: {},
    selectedCity: 0, // receives the key for the last selected city
    matchingCities: [],
    pickingRightCity: false, // triggers the dropdown menu when multiple cities match even when only one match
    cityNotFound: false
}

  componentDidMount() {
    this.updateCities();
}
  
  // rerender only if different city selected


  handleAddCity = (city) => {

   let matchingCities = this.findMatches(city.current.value.trim().replace(/ /gi,"-"));
    
    if(matchingCities.length >= 1){
        this.setState({
            pickingRightCity: true,
            matchingCities:matchingCities
        });
    }else{
        this.setState({
            cityNotFound: true,
            matchingCities: []
        });
    }
    city.current.value = "";
    this.setState({matchingCities});

  }

  handleChooseCity = (cityInfo) =>{
    const  lsLength = String(Object.keys(window.localStorage).length + 1);
    // eviter d'ajouter une ville en double
    let cityIsPresent = false;
    for(let key in this.state.cities){
        if(this.state.cities[key]["id"] === cityInfo.id) cityIsPresent = true;
    }
    if(!cityIsPresent) window.localStorage.setItem(lsLength, JSON.stringify(cityInfo));
    this.updateCities();
  }
  
  isSelectedCity = (id) => {
    
    // if city is at a different index is selected
    
    if(id !== this.state.selectedCity){

    /* 1 . selected city is sent to state 
        2. API call with the selected city's id */

        this.setState({selectedCity: id}, ()=>{
          this.props.getSelectedCity(this.state.selectedCity);
            this.props.history.push("/");
      })
    }
  }

  updateCities = () => {
  // get current cities array from local storage
    let lsObject = JSON.parse(JSON.stringify(window.localStorage));
    // convert values in this.state.cities from JSON to object 
    Object.keys(lsObject).forEach(cityKey =>{
        lsObject[cityKey] = JSON.parse(lsObject[cityKey]);
    })
  
    this.setState({
        pickingRightCity: false,
        cities: lsObject
    });
  }


  removeCity = (id) => {
    //get the current position of city as its key may not reflect it because of earlier removals
    localStorage.removeItem(id);
    this.updateCities();
  }

  //------------------------------------- AUTOCOMPLETION OF CITIES ------------------------------------------

  findMatches = (currentInput, cities = Cities) => {
    // first letter of input city capitalized
    const firstLetter = currentInput[0].toUpperCase();
    let matchingCountries = [];
    let matchingCities = cities[firstLetter].filter(city => {
     // récupérer les villes dont le nom est précisément celui saisi

        // exclure les doublons situés dans un même pays
            if(currentInput && city.name.toUpperCase() === currentInput.toUpperCase() && !matchingCountries.includes(city.country)){
                matchingCountries.push(city.country)
                return true;
            }else{
                return false;
            }
    })
    //  an array of all the cities that have the name typed by the user
    return matchingCities
  }

  
  render(){
    // flag : style city if it is the selected one.
   
    let display = this.state.pickingRightCity ? "dropdown" : "drop-hidden";
    let isActive = false;
    let cities = Object.keys(this.state.cities).reverse().map(cityIndex => {
    
      isActive = ( cityIndex === this.state.selectedCity ) ? true : false ;
      
      return <City 
      cityName={this.state.cities[cityIndex]["name"]} 
      key={this.state.cities[cityIndex]["id"]} 
      cityId={this.state.cities[cityIndex]["id"]}
      cityIndex={cityIndex}
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

        <Dropdown 
            display={display}
            cities={this.state.matchingCities}
            handleChooseCity={this.handleChooseCity}
        >
        </Dropdown>

      </div>

    )
  }
}

export default withRouter(CityPicker) ;