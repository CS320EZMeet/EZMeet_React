import React from "react";
import {useParams} from "react-router-dom";

const User = () => {
    const {user_id} = useParams();
    return (<h1>This is {user_id}'s page</h1>)
}

export default User;