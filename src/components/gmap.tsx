import React from "react";
import GoogleMapReact from 'google-map-react';

const Marker = (props: any) => {
  let {text} = props
  const markerStyle = {
    border: '1px solid white',
    borderRadius: '50%',
    height: 10,
    width: 10,
    backgroundColor: 'red',
    cursor: 'pointer',
    zIndex: 10,
  };

  return (
    <>
      <div style={markerStyle} />
      {<div>{text} </div>}
    </>
  );
};




export default function GMap(){
  const defaultProps = {
    center: {
      lat: 42.3678,
      lng: -72.5301
    },
    zoom: 13 
  };

  return (
    <div style={{ height: '40vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAtYonDEV_WV2X_9oO3rzcpynviJZ1423k" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <Marker
          text={'Kreyser Avrora'} 
        />
      </GoogleMapReact>
    </div>
  );
}