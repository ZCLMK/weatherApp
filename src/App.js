import React, { Component } from 'react';
import MainPage from './components/MainPage/MainPage';
import Aux from './hoc/Aux';
import detectBrowser from './detectBrowser.js';


class App extends Component {

  state = {
    apiKey: "a60fc722ff878a98f10dc57fc7badffb",
    geolocation : false,
    weatherData: null
  }

  componentDidMount() {
        this.askForPosition();
    }
  
    getInfoWithCoords = (latitude, longitude) => {
      // corriger précision geolocalisation manuellement
      if(detectBrowser() === "Firefox"){
        latitude -= 0.120988;
        longitude += 0.0722;
      }


      let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&APPID=${this.state.apiKey}`
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
    

  render(){
     let mainPage = this.state.weatherData ? 
     <MainPage weatherData={this.state.weatherData} /> : <h1>Loading</h1> ;
    
    
     return (
       <Aux>
        {mainPage}
      </Aux>
    )
  }
}

export default App;