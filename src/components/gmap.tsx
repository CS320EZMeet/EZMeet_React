import React from "react";
import GoogleMapReact from 'google-map-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlag, faPerson } from "@fortawesome/free-solid-svg-icons";
const PeopleMarker = (props: any) => {

  return (
    <>
      <FontAwesomeIcon icon={faPerson} size="2xl" color={props.color} />
    </>
  );
};

const PlaceMarker = (props: any) => {

  return (
    <>
      <FontAwesomeIcon icon={faFlag} size="2xl" color={props.color} />
    </>
  );
};


let colors: string[] = ["#A020F0","#FF0000", "#0000FF", "#FFA500", "#964B00", "#808080", "#86A29E", "#3AE779", "#F2BFC1", "#76AEB4"]

interface location {
  lat: number
  lng: number
}
interface place { 
  name: string,
  lat: number,
  lng: number,
  address: string
}

interface GMapProps {
  peopleLocations: location[] 
  placeLocations: place[]
}

function calcCenter(props: GMapProps) {
  let placeLocations = props.placeLocations
  let peopleLocations = props.peopleLocations
  console.log(props.peopleLocations)
  console.log(Object.values(placeLocations))
  //Prob a fancy reduce which way cleaner to do this
  let peopleLat = Object.values(peopleLocations).map((elem) => {
    return elem.lat
  }).reduce((prev, value) => {
    return prev + value
  })
  let peopleLng = Object.values(peopleLocations).map((elem) => {
    return elem.lng
  }).reduce((prev, value) => {
    return prev + value
  })
  if(placeLocations.length !== 0){
    console.log("in here")
    let placeLat = Object.values(placeLocations).map((elem) => {
      return elem.lat
    }).reduce((prev, value) => {
      return prev + value
    })
    
    let placeLng = Object.values(placeLocations).map((elem) => {
      return elem.lng
    }).reduce((prev, value) => {
      return prev + value
    })
    let total = peopleLocations.length + placeLocations.length
    return {lat: (peopleLat+placeLat)/total, lng: (peopleLng+placeLng)/total }
  }
  let total = peopleLocations.length
  return {lat: (peopleLat)/total, lng: (peopleLng)/total }
  
  
}

export default function GMap(props: GMapProps){
  let center = calcCenter(props)
  return (
    <div style={{ height: '40vh', width: '90%', marginLeft: '5%', marginRight: '5%', borderColor: "black"}}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBrMaLAkS6oSV4nnG6-U-KrQi4fHKhiKB4" }}
        defaultCenter={center}
        defaultZoom={13}
      >
        {props.peopleLocations.map((elem, index) => {
          return (
            <PeopleMarker color={colors[index]} lat={elem.lat} lng = {elem.lng} />
          )
        })}
        {props.placeLocations.map((elem, index) => {
          return (
            <PlaceMarker color={colors[index]} lat={elem.lat} lng = {elem.lng} />
          )
        })}
      </GoogleMapReact>
    </div>
  );
}