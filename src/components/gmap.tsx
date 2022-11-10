import React from "react";
import GoogleMapReact from 'google-map-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPerson } from "@fortawesome/free-solid-svg-icons";

const Marker = (props: any) => {

  return (
    <>
      <FontAwesomeIcon icon={faPerson} size="2xl" color={props.color} />
    </>
  );
};


let colors: string[] = ["#A020F0","#FF0000", "#0000FF", "#FFA500", "#964B00", "#808080"]

export default function GMap(){
  const defaultProps = {
    center: {
      lat: 42.3678,
      lng: -72.5301
    },
    zoom: 13 
  };

  return (
    <div style={{ height: '40vh', width: '90%', marginLeft: '5%', marginRight: '5%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBrMaLAkS6oSV4nnG6-U-KrQi4fHKhiKB4" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <Marker
          text={'Skrrrt\'s Apartment'} 
          lat= {42.349460}
          lng= {-72.528430}
          color= {colors[0]}
        />
        <Marker
          text={'Yeet\'s Dorm'} 
          lat= {42.395412}
          lng= {-72.526274}
          color={colors[1]}
        />
      </GoogleMapReact>
    </div>
  );
}