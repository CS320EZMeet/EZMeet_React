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

interface location {
  lat: number
  lng: number
}

interface GMapProps {
  locations: location[] 
}

export default function GMap(props: GMapProps){
  const defaultProps = {
    center: {
      lat: 42.3678,
      lng: -72.5301
    },
    zoom: 13 
  };

  return (
    <div style={{ height: '40vh', width: '90%', marginLeft: '5%', marginRight: '5%', borderColor: "black"}}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBrMaLAkS6oSV4nnG6-U-KrQi4fHKhiKB4" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {props.locations.map((elem, index) => {
          console.log(elem.lat)
          return (
            <Marker color={colors[index]} lat={elem.lat} lng = {elem.lng} />
          )
        })}
      </GoogleMapReact>
    </div>
  );
}