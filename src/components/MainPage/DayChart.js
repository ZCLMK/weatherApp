import { Bar } from 'react-chartjs-2';
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
  // console.log('RECALCULATING TEMPERATURES')
  // console.log(temperatures, this.props.dayData)
  return temperatures;
}

  render() {

// const hours = dayData.map((dataset) => dataset.dt_txt); 

const data = {
  labels: this.getCurrentHours(),
  datasets: [
    {
      label: 'Températures prévues',
      backgroundColor: 'rgba(0, 15, 100, 1)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      responsive: true,	
      data: this.getTemperatures()
    }
  ]
};
    return (
      <div id="chart-wrapper">
        <Bar
          data={data}
          width={100}
          options={{
            maintainAspectRatio: false,
            barPercentage: 1,
            
            scales: {
                    xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Heure'
                            }
                        }],
                    yAxes: [{
                            display: true,
                            ticks: {
                                beginAtZero: false,
                                steps: 10,
                                stepValue: 5,
                                //minimum and maximum temperature rounded to 5 with a + or - 5 degrees margin
                                min: (Math.floor(Math.min(...this.getTemperatures())/ 5) * 5) - 5,
                                max: (Math.ceil(Math.max(...this.getTemperatures()) / 5) * 5)  + 5
                            }
                        }],
                    layout: {
                    padding: {
                        left: 5,
                        right: 5,
                        top: 0,
                        bottom: 0
                    }
                  }
                }
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