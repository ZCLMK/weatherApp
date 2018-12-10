import React, { Component } from 'react';
import MainPage from './components/MainPage/MainPage';
import Aux from './hoc/Aux';
import AddCityBtn from './components/AddCityBtn';
import detectBrowser from './detectBrowser.js';
import CityPicker from './components/CityPicker/CityPicker';    
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class App extends Component {

  state = {
    apiKey: "a60fc722ff878a98f10dc57fc7badffb",
    geolocation : false,
    weatherData: null,
    choosingCity: false,
    // necessary if geolocation is not authorized
    selectedCity: null
  }
// SHOULD COMPONENT UPDATE WITH SELECTEDCITY

  componentDidMount() {
        this.askForPosition();
    }
  
    callWeatherApi = (url) => {
      
      fetch(url)
      .then((response) => ( response.json()))
      .then((data) => {
        console.log(data)
        this.setState({weatherData: data})
      })
      .catch((e) => console.log(e))
    }

    askForPosition = () => {
  
      function errorCallback(error) {
        //this should be refactored as its own function, and redirect to "choose city"
       console.error(error.message);
      };

      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(this.geolocationAllowed, errorCallback)
      } else {
        console.log('Pas de géolocalisation pour toi connard')
      }
    }

    geolocationAllowed = (position) => {
      this.setState({geolocation: true});

      // make a call using user provided longitude and latitude
      this.getInfoWithCoords(position.coords.latitude, position.coords.longitude)      
      }
    
      handleToggleClick = () => {
        this.setState({choosingCity: !this.state.choosingCity})
      }

    getInfoWithCoords = (latitude, longitude) => {
        // corriger précision geolocalisation manuellement
        // if(detectBrowser() === "Firefox"){
         
        //   latitude -= 0.120988;
        //   longitude += 0.0722;
        // }
        console.log(`lat : ${latitude} long: ${longitude}`)
        let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&APPID=${this.state.apiKey}`
        this.callWeatherApi(url);
     }
/**
 * 1.get selected city's Name
 * 2.calls API for data about city
 */
      getSelectedCity = (cityId) => {
        let idUrl = `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&APPID=${this.state.apiKey}`
        this.setState({selectedCity: cityId}, this.callWeatherApi(idUrl));
        console.log('city is: ' + cityId);
      }


  render(){
     
    let mainPage = this.state.weatherData ? 
     <MainPage weatherData={this.state.weatherData} /> : <h1>Loading</h1> ;
    let toggleDestination = this.state.choosingCity ? "/" : "/choix-ville";
    const fullCityPicker = <CityPicker getSelectedCity={this.getSelectedCity} />

         return (
      
        <Router >
          <Aux>
            <Link to={toggleDestination}>
              <AddCityBtn choosingCity={this.state.choosingCity} handleToggleClick={this.handleToggleClick}/>
            </Link>
            <Route path="/choix-ville" render={() => fullCityPicker} />
            {mainPage}
          </Aux>

        </Router>
    )
  }
}

export default App;
