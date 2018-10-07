import React from 'react';

const pageHeader = (props) => {
  return(
    <div id="page-header">
      <h1>{props.currentCity}</h1>
    </div>
  )
}

export default pageHeader ;