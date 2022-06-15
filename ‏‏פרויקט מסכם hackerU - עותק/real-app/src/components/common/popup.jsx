import React from 'react';


function popup(props) {
  return (props.trigger)?(
    <div className='popup'>
        <div className='popup-inner'>
          {props.closePopup?
          (
            <button className='close-btn btn btn-outline-dark' onClick={()=>{props.closePopup(false)}}>&times;</button>
          ):(
            ""
          )} 
            {props.children}
        {props.text?(<h6>{props.text}</h6>):("")}
        </div>
        
    </div>
  ):"";
}

export default popup;