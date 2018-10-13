import React, { Component } from 'react';
import PageHeader from "./PageHeader";
import DayPicker from "./DayPicker";
import DayHeader from './DayHeader';
import DayChart from "./DayChart";

class MainPage extends Component {

      state = {
        sortedData: null,
        selectedDay: 0
      }

  componentWillMount() {
   this.sortDataByDate();
  }
  //-------------------------------------------------------------------------------
  
  sortDataByDate = () => {
    const data = this.props.weatherData.list;
    let counter = 0;
    // console.log(data)
    let sortedData = {0: [], 1:[], 2:[], 3:[], 4:[], 5:[]};
     // put first day's data in day1, to be used as a reference
    sortedData[0].push(data[0]);

    // We exclude the first day's data, already put away in sortedData
    let dataExceptFirst = data.slice(1);

    dataExceptFirst.forEach(item => {
      if(item['dt_txt'].slice(0,10) === sortedData[counter][0]["dt_txt"].slice(0,10)){
        sortedData[counter].push(item);
      }else{
        counter ++;
        sortedData[counter].push(item);
      }
  })
  //  remplacer les 8 prochaines valeurs (sortedData[0]) par les 8 premiers objest (8 x 3 pour 24h)
  sortedData[0] = data.slice(0, 7);
  // update state
  this.setState({sortedData}, () => {
    this.formatDate(this.state.sortedData[0][0])
  });
}

//-------------------------------------------------------------------------------


formatDate = (dataItem) => {
  let asDate = new Date(dataItem.dt_txt);
  const dateOptions = {weekday: "long", year: "numeric", month: "long", day: "numeric"};
  let dateFr = asDate.toLocaleDateString('fr-FR', dateOptions);
  let formattedDate = dateFr.split(' ');
  return formattedDate = `${formattedDate[0].slice(0,3)} ${formattedDate[1]} ${formattedDate[2].slice(0,3)} `;
}

//-------------------------------------------------------------------------------
  kelvinToCelsius = (temp) => {
    return String(Math.round(Number(temp) - 273.15));
    }
//-------------------------------------------------------------------------------

  handleDaySelection = (index) => {
    this.setState({selectedDay: index});
  }

  //-------------------------------------------------------------------------------
  

  render(){
    // let selectDayData = ;
    return (  
    <div id="main-page">
       <PageHeader currentCity={this.props.weatherData.city.name}/> 
       <DayPicker 
       sortedData={this.state.sortedData}
       formatDate={this.formatDate}
       handleDaySelection={this.handleDaySelection} 
      /> 
       <DayHeader 
       sortedData={this.state.sortedData} 
       kelvinToCelsius={this.kelvinToCelsius} 
       />
       <DayChart 
       dayData={this.state.sortedData[this.state.selectedDay]}
       kelvinToCelsius={this.kelvinToCelsius}
       selectedDay={this.state.selectedDay}
      />
    </div>
    )
  }
}

export default MainPage ;