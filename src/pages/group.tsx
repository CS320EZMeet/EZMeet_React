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

interface place { 
    name: string,
    lat: number,
    lng: number,
    address: string
}

let colors: string[] = ["#A020F0","#FF0000", "#0000FF", "#FFA500", "#964B00", "#808080", "#86A29E", "#3AE779", "#F2BFC1", "#76AEB4"]

const fetchGroup = async () => {
    //Not a fan of this but fine for now
    let url;
    url = "https://ezmeet2022.herokuapp.com/"
    // let username = AuthService.getCurrentUsername();
    let username = "Yeet"
    const res = await axios.get(url+"group/" + username + "/").then(response => response.data.data)
    return res
}

const fetchLocations = (groupId: string, setPlaceLocation: any) =>() => {
    let url;
    url = "https://ezmeet2022.herokuapp.com/"
   
    axios.get(url+"midpoint/" + groupId + "/").then((data) => {
        let tempLoc = data["data"]["data"]
        console.log("TEMP LOC:" + tempLoc)
        if(tempLoc.length !== 0) {
            let newPlaceLocations: place[] = []
            tempLoc.slice(0,10).map((elem: any) => {
                newPlaceLocations.push({name: elem[0], lat: elem[1], lng: elem[2], address: elem[3]})
            })
            setPlaceLocation(newPlaceLocations);
        }
    }).catch(() => {
        alert("You can't meet up with just yourself!") 
    })
    
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


const Group = () => {
    let init: place[] = [];
    // do something that gets me data
    const [inGroup, setGroup] = useState(false);
    const {data, isLoading} = useQuery('get-group', fetchGroup)
    const [placeLocations, setPlaceLocation] = useState(init)
    
    useEffect(() => {
        if (data) {
            setGroup(true)
        }
    }, [data,setGroup])
    if (isLoading) {
        return (<h2>Loading</h2>)
    }
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
        let locations: any = []
        let i = 0
        data.users.forEach((element: user) => {
            cards.push(<GroupCard group_id = {data.groupId}user_id={element.username} color={colors[i]}/>)
            locations.push({lat: element.latitude, lng: element.longitude})
            i+=1;
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
            <Button className="mt-4 mb-4" type="submit" onClick={fetchLocations(data.groupId, setPlaceLocation)}>
                Find Places
            </Button>

            <div>
                <GMap placeLocations={placeLocations} peopleLocations={locations}/>
            </div>
            <div>
                {placeLocations.map((elem:place, index:number) => {
                    return (
                        <PlaceCard color={colors[index]} name={elem.name} address={elem.address}/>
                    )
                })}
            </div>
            
        </div>
        )
    }
}

export default Group;