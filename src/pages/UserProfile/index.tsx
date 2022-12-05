import React, {useState, useMemo, useCallback, useContext} from "react";
import {useParams} from "react-router-dom";
import "./user.css";
import Form from "./Form";
import Header from "./Header";
import LocationForm from "./LocationForm";

const User = () => {
    return (
        <div className="account">
            <Header title="User Profile" subtitle="User details are displayed below"/>
            <Form />
            <Header title="User Location" subtitle="Update your new location below" />
            <LocationForm />
        </div>
    )
}

export default User;