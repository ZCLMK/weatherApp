import React from 'react';

const dayPicker = (props) => {

    let dates = (

        <div id="day-picker">
           <p id="day-date">
           {props.formatDate(props.dayData[0]).split(' ')[0]}
           </p> 
           <p id="day-date">
           {props.formatDate(props.dayData[0]).split(' ')[1]}
           </p> 
           <p id="day-date">
           {props.formatDate(props.dayData[0]).split(' ')[2]}
           </p> 
        </div>
      )  

  return dates;
}

  

export default dayPicker ;
// for(let i; i < Object.values(this.state.sortedData).length; i++){

// }

