import React from 'react';
import PageHeader from "./PageHeader";
import DayPicker from "./DayPicker";
import DayHeader from './DayHeader';
import DayChart from "./DayChart";


const mainPage = (props) => {
   
        let mainPageVisuals = props.dayData ? 
                <div>
                        <PageHeader currentCity={props.weatherData.city.name}/> 
                        <DayPicker  
                        dayData={props.dayData}
                        formatDate={props.formatDate} 
                        /> 
                        <DayHeader 
                        sortedData={props.dayData} 
                        kelvinToCelsius={props.kelvinToCelsius} 
                        />
                        <DayChart 
                        dayData={props.dayData}
                        kelvinToCelsius={props.kelvinToCelsius}
                        />
                </div> 
                 :
             <h1> NOTE THERE YET </h1>;
        // render all three only when this.state.sortedData is available 
        return  mainPageVisuals
      }

      export default mainPage;

