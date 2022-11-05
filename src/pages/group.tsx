import React, { ReactElement } from "react";
import {AddCard, GroupCard} from "../components/Cards";
import { Button } from "react-bootstrap";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import GMap from "../components/gmap";
import ReactDOM from "react-dom";

const render = (status: Status) => {
    return <h1>{status}</h1>;
};
let sample_response: groupResponse = 
{
    "status": "200",
    "data":
    {
        "groupId": 101,
        "users": [
            {
                "username": "Seb",
                "latitude": 14.1,
                "longitude": 13
            },
            {
                "username": "Noa",
                "latitude": 13.9,
                "longitude": 13
            },
            {
                "username": "Manay",
                "latitude": 14,
                "longitude": 13.00005
            }
        ]
    }
}
interface groupResponse {
    status: string;
    data: groupData;
}

interface groupData{
    groupId: number;
    users: user[];
}

interface user {
    username: string;
    longitude: number;
    latitude: number;
}


const Group = () => {

    // do something that gets me data

    //once have data lets process it
    let cards: ReactElement[] = [];
    
    let data:groupData = sample_response.data

    var markers: google.maps.LatLng[] = [];//some array
    
    data.users.forEach((element: user) => {
        cards.push(<GroupCard user_id={element.username}/>)
        // markers.push(new google.maps.LatLng({lat: element.latitude, lng: element.longitude}))
    });
    cards.push(<AddCard/>)
    
    // cards.map((elem,index) => {
    //     if (index == )
    // });

   
    // var bounds = new google.maps.LatLngBounds();
    // for (var i = 0; i < markers.length; i++) {
    //     bounds.extend(markers[i]);
    // }
    
    
    return (
    <div style={{height: "100%"}}>
        {cards.map(populateCards)}
        <Button className="mt-4 mb-4" type="submit" onClick={() => alert("Finding Midpoint")}>Find Midpoint</Button>

        <div>
            <GMap/>
        </div>
    </div>
    )
}

const populateCards = (element: ReactElement, index: number, array: ReactElement[]) => {
    if(array.length < index+1) {
        return (
            <div className="d-flex">
                <div className="item_card">{element}</div>
            </div>
        )
    }
    if (index%2 === 0) {
        return (
            <div className="d-flex">
                <div className="item_card">{element}</div>
                <div className="item_card">{array[index+1]}</div>
            </div>
        )
    }
};

export default Group;