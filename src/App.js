import React, { Component } from 'react';
import MainPage from './components/MainPage/MainPage';

class App extends Component {

  state = {
    apiKey: "a60fc722ff878a98f10dc57fc7badffb",
    geolocation : false,
    weatherData: null
  }

  componentDidMount() {

    // fetch(`https://api.openweathermap.org/data/2.5/weatherData?lat=35&lon=139&APPID=${this.state.apiKey}`)
    //     .then((response) => ( response.json()))
    //     .then((data) => console.log(data))
    //     .catch((e) => console.log(e))
    
        this.askForPosition();
    }
  
    getInfoWithCoords = (latitude, longitude) => {
      console.log('getInfoWithLatlong used!!')
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
      console.log(position);
      this.setState({geolocation: true});
      // make a call using user provided longitude and latitude
      this.getInfoWithCoords(position.coords.latitude, position.coords.longitude)      
      }
    

  render(){
    return (
      < MainPage weatherData={this.state.weatherData}/>
    )
  }
}

export default App;