import React from 'react';

const dayPicker = (props) => {

  let sortedValues = Object.values(props.sortedData);
  let dates = sortedValues.map((item, index) => {
    if(item.length >= 1){
      return (
        <div id="day-tab" key={index} onClick={() => props.handleDaySelection(index)}>
           <p id="day-date">
           {props.formatDate(item[0]).split(' ')[0]}
           </p> 
           <p id="day-date">
           {props.formatDate(item[0]).split(' ')[1]}
           </p> 
           <p id="day-date">
           {props.formatDate(item[0]).split(' ')[2]}
           </p> 
        </div>
      )  
    }else{
      console.log("array is empty!");
      return null;
    }
  })
  return  <div id="day-picker"> {dates} </div>
}

  

export default dayPicker ;
// for(let i; i < Object.values(this.state.sortedData).length; i++){

// }

