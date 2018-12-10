import React, { Component } from 'react';

class Dropdown extends Component {
 
        render(){
            return (
                <div className={this.props.display}>
                    {this.props.cities.map(city =>(
                    <span 
                        className="matching-city" 
                        key={city.id}
                        onClick={() =>this.props.handleChooseCity({id: city.id, name: city.name})}
                        >
                        {city.name} ({city.country})
                    </span>))}
                </div>
            )
        }
}
    
export default Dropdown