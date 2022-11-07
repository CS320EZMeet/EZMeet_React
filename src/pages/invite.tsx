import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

const Invite = () => {
    //send post request
    let {group_id} = useParams()
    //TODO: Add Username here
    let username = "Yeet"
    let {data, isLoading} = useQuery(['add-user', group_id], () => addUserToGroup(group_id, username))
    if (isLoading) {
        return (<h2>Loading</h2>)
    } else {
        return (
        <div>
            <h1>{data}</h1>
        </div>
        )
    }
}

const addUserToGroup = async (groupId: any, username: string) => {
  
  let url;
  if (window.location.href === "localhost:3000"){
      url = "https://localhost:3000/"
  } else {
      url = "https://ezmeet2022.herokuapp.com/"
  }
  let res = await axios.post(url+"group/invite/" + groupId + "/", {userName: username}).then(response => response.data)
 
  return res

}

export default Invite;