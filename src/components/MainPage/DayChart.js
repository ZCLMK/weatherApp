import { Line } from 'react-chartjs-2';
import React, { Component } from 'react';
import { defaults } from 'react-chartjs-2';
// Disable animating charts by default.
defaults.global.animation = false;


 class DayChart extends Component {

  componentDidMount() {
    // console.log(this.props.dayData)
    this.getTemperatures();
    this.getCurrentHours();
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevProps !== this.props){
      this.getCurrentHours();
      this.getTemperatures();
    }

    
  }
  formatHour = (hourString) => {
    return hourString.substring(11, 16).replace(":", "h");
  }
  
  getCurrentHours = () => {
    const hours = this.props.dayData.map((dataset) => this.formatHour(dataset.dt_txt)); 
    return hours;
  }

  getTemperatures = () => {
    const temperatures = this.props.dayData.map(dataset => {
      return Number(this.props.kelvinToCelsius(dataset.main.temp)) ;
  })
  console.log('RECALCULATING TEMPERATURES')
  return temperatures;
}

  render() {

// const hours = dayData.map((dataset) => dataset.dt_txt); 

const data = {
  labels: this.getCurrentHours(),
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(0, 15, 100, 1)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: this.getTemperatures()
    }
  ]
};
    return (
      <div>
        <h2>Bar Example (custom size)</h2>
        <Line
          data={data}
          width={60}
          height={20}
          options={{
            maintainAspectRatio: true
          }}
        />
      </div>
    );
  }
};

export default DayChart;

// class dayChart extends Component {


// }
// export default dayChart ;