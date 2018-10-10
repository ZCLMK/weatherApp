import { Line } from 'react-chartjs-2';
import React, { Component } from 'react';
import { defaults } from 'react-chartjs-2';
// Disable animating charts by default.
defaults.global.animation = false;

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(0, 15, 100, 1)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

 class DayChart extends Component {

  componentDidMount() {
    console.log(this.props.data)
  }
  

  render() {
    return (
      <div>
        <h2>Bar Example (custom size)</h2>
        <Line
          data={data}
          width={60}
          height={40}
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