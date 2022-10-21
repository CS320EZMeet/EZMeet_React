import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css"
import {useQuery} from 'react-query'
import axios from 'axios'

// const fetchUserName = async () => {
//     const {data} = await axios.get('')
//     return data
// }
    


const Navbar = () => {
    const user_id = 1
    return (
    <nav className="nav-bar">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/help">Help</NavLink>
        <NavLink to={"/user/" + user_id}>User</NavLink>
        <NavLink to="/group">Group</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
    </nav>
    )
}

export default Navbar;
