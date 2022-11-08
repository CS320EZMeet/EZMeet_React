import React, { ReactElement } from "react";
import {AddCard, GroupCard} from "../components/Cards";
import { Button } from "react-bootstrap";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import GMap from "../components/gmap";
import axios from "axios";
import { useQuery } from "react-query";
import AuthService from "../services/authenticator";

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


const fetchGroup = async () => {
    //Not a fan of this but fine for now
    let url;
    url = "https://ezmeet2022.herokuapp.com/"
    let username = AuthService.getCurrentUsername();
    const res = await axios.get(url+"group/" + username + "/").then(response => response.data.data)
    return res
}
   

const Group = () => {

    // do something that gets me data
    const {data, isLoading} = useQuery('get-group', fetchGroup)
    if (isLoading) {
        return (<h2>Loading</h2>)
    }
    //once have data lets process it
    let cards: ReactElement[] = [];

    // let data = sample_response.data;
    var markers: google.maps.LatLng[] = [];//some array
    
    data.users.forEach((element: user) => {
        cards.push(<GroupCard user_id={element.username}/>)
        // markers.push(new google.maps.LatLng({lat: element.latitude, lng: element.longitude}))
    });
    cards.push(<AddCard groupId={data.groupId}/>)
    
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
        <Button className="mt-4 mb-4" type="submit" onClick={() => alert("42.391155, -72.526711")}>
            Find Midpoint
        </Button>

        <div>
            <GMap/>
        </div>
    </div>
    )
}

/*
Callback function for the map call which inserts user cards
Goes 2 steps at a time due to the fact we have to have a closing div
*/
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

//Function that is run on click for the findMidpoint button
const findMidpoint =  async (groupId: number) => {
    let url;
    url = "https://ezmeet2022.herokuapp.com/"
    const res = await axios.get(url+"midpoint/" + {groupId})
    return res
}

export default Group;