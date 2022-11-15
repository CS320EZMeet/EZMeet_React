import React, { ReactElement, useEffect } from "react";
import {AddCard, GroupCard, PlaceCard} from "../components/Cards";
import { Button } from "react-bootstrap";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import GMap from "../components/gmap";
import axios from "axios";
import { useQuery } from "react-query";
import AuthService from "../services/authenticator";
import { useState } from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

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

let colors: string[] = ["#A020F0","#FF0000", "#0000FF", "#FFA500", "#964B00", "#808080"]

const fetchGroup = async () => {
    //Not a fan of this but fine for now
    let url;
    url = "https://ezmeet2022.herokuapp.com/"
    let username = AuthService.getCurrentUsername();
    const res = await axios.get(url+"group/" + username + "/").then(response => response.data.data)
    return res
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

const createGroup = () => {
    
}

const Group = () => {

    // do something that gets me data
    const [inGroup, setGroup] = useState(false);
    const {data, isLoading} = useQuery('get-group', fetchGroup)
    
    useEffect(() => {
        if (data) {
            setGroup(true)
        }
    }, [data,setGroup])
    if (isLoading) {
        return (<h2>Loading</h2>)
    }
    console.log(data)
    if (!data) {
        return (
            <div>
                <div className="row">
                    <h1>You are not in a group</h1>
                </div>
                <div className="row">
                    <Button onClick={() => {
                        let url = "https://ezmeet2022.herokuapp.com/";
                        let username = AuthService.getCurrentUsername();
                        axios.post(url + "group/" + username + "/");
                        setGroup(true);
                    }} className="col btn-lg">Create a group</Button>
                </div>
                <div className="row">
                    <p className="col">OR</p>
                </div>
                <div className="col">
                    <h1>Join a group with a friend's link!</h1>
                </div>
            </div>
        )
    } else {

        //once have data lets process it
        let cards: ReactElement[] = [];

        // let data = sample_response.data;
        var markers: google.maps.LatLng[] = [];//some array
        let i = 0
        data.users.forEach((element: user) => {
            cards.push(<GroupCard user_id={element.username} color={colors[i]}/>)
            i+=1;
            // markers.push(new google.maps.LatLng({lat: element.latitude, lng: element.longitude}))
        });
        //need to extract this out
        cards.push(
        <Popup modal trigger={<button style={{all: "unset"}}><AddCard groupId={data.groupId}/></button>} position="center center">
            {(close:any) => (
            <div className="model">
                <button className="close" onClick={close}>
                    &times;
                </button>
                <div className="title">Group Invite</div>
                <div className="justify-content-center d-flex pt-2">
                    <p style = {{fontSize: "18px"}}>Use this link to add friends to the group</p>
                </div>
                <div className="justify-content-center d-flex pb-3">
                    <input type="text" className="linkField" readOnly value={"https://ezmeet320.herokuapp.com/group/invite/" + data.groupId}></input>
                </div>
            </div>
            )}
        </Popup>
        )
    
        // var bounds = new google.maps.LatLngBounds();
        // for (var i = 0; i < markers.length; i++) {
        //     bounds.extend(markers[i]);
        // }    
        
        return (
        <div style={{height: "100%"}}>
            <div className="title" >
                <h1>My Group</h1>
            </div>
            {cards.map(populateCards)}
            <Button className="mt-4 mb-4" type="submit" onClick={() => alert("42.391155, -72.526711")}>
                Find Midpoint
            </Button>

            <div>
                <GMap/>
            </div>
            <div>
                <PlaceCard color={colors[0]}/>
            </div>
        </div>
        )
    }
}


export default Group;