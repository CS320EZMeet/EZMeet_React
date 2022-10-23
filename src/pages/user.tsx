import React from "react";
import {useParams} from "react-router-dom";
import { Card } from "react-bootstrap";

const User = () => {
    const {user_id} = useParams();
    return (<Card className="groupCard">This is {user_id}'s page</Card>)
}

export default User;