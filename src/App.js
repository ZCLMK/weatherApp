import React, { Component } from 'react';

class App extends Component {

  state = {
    apiKey: "a60fc722ff878a98f10dc57fc7badffb",
    geolocation : false
  }

  componentDidMount() {

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Minsk&APPID=${this.state.apiKey}`)
        .then((response) => ( response.json()))
        .then((data) => console.log(data))
        .catch((e) => console.log(e))
    
        this.askForPosition();
    }
  

    askForPosition = () => {
  
      function errorCallback(error) {
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
    }



  render(){
    return <h1>hello</h1>
  }
}

export default App;