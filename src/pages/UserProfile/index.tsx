import React, {useState, useMemo, useCallback, useContext} from "react";
import {useParams} from "react-router-dom";
import "./user.css";
import Form from "./Form";
import Header from "./Header";

const User = () => {
    const {user_id} = useParams();
    return (
        <div className="account">
            <Header title="User Profile" subtitle="User details are displayed below"/>
            <Form />
        </div>
    )
}

export default User;