import React, { Component } from 'react';
import MainPage from './MainPage';
import ReactSwipe from 'react-swipe';
import Aux from '../../hoc/Aux';

class MainPages extends Component {

      state = {
        sortedData: null,
        mainPagesReady: false
      }

    //   feed new data to be sorted when a new city is selected by the user
     componentDidUpdate(prevProps, prevState) {
         if(prevProps.weatherData.city.name !== this.props.weatherData.city.name){
             this.sortDataByDate();
         }
     }
     
     componentDidMount() {
         this.sortDataByDate();
     }
     
  sortDataByDate = () => {
    
    console.log("SORT BY DATE in [sortdatabydate]");
    // console.log(this.props.weatherData);
    
    const data = this.props.weatherData.list;
    let counter = 0;
    // console.log(data)
    let sortedData = {0:[], 1:[], 2:[], 3:[], 4:[], 5:[]};
     // put first day's data in day1, to be used as a reference
    sortedData[0].push(data[0]);

    // We exclude the first day's data, already put away in sortedData
    let dataExceptFirst = data.slice(1);

    dataExceptFirst.forEach(item => {
        // if data is from the same day 
      if(item['dt_txt'].slice(0,10) === sortedData[counter][0]["dt_txt"].slice(0,10)){
        sortedData[counter].push(item);
      }else{
        counter ++;
        sortedData[counter].push(item);
      }
  })
  //  remplacer les 8 prochaines valeurs (sortedData[0]) par les 8 premiers objets (8 x 3 pour 24h)
  sortedData[0] = data.slice(0, 7);
  // update state
  this.setState({sortedData : sortedData}, () => {
    // let App component know how many days we have data for
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

  
    render(){
        let reactSwipeEl;
        let mainPages = this.state.sortedData ?  Object.values(this.state.sortedData).map((dayData, i) => {
            return (
                // "float:left" and "width: 100%"" are important for the swipe functionality
                <div key={i} className="pane"> 
                    <MainPage 
                        dayData={dayData} 
                        weatherData={this.props.weatherData}
                        formatDate={this.formatDate}
                        kelvinToCelsius={this.kelvinToCelsius}    
                        />
                </div>
            ) 
        })
        : 
        null;
        if(mainPages){ 
            
// we check for mainPages because they must be rendered at the same time as the reactswipe comp. to inherit the right properties
            
            return(
            <Aux>    
                <ReactSwipe
                className="carousel"
                swipeOptions={swipeOptions}
                ref={el => (reactSwipeEl = el)}
                >
                    {mainPages}
                </ReactSwipe>
                <button onClick={() => reactSwipeEl.prev()}>Previous</button>
                <button onClick={() => reactSwipeEl.next()}>Next</button>
            </Aux>
            )    
        }else{
            return null;
        }
    }
    
}
const swipeOptions = {
    speed: 150,
    continuous: false,
    disableScroll: true
}


export default MainPages ;