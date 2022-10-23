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
        <NavLink to="/" className="site-name">EzMeet</NavLink>
        <ul>
            <li><NavLink to="/help" className="active">Help</NavLink></li>
            <li><NavLink to={"/user/" + user_id} className="active">User</NavLink></li>
            <li><NavLink to="/group" className="active">Group</NavLink></li>
            <li><NavLink to="/login" className="active">Login</NavLink></li>
            <li><NavLink to="/signup" className="active">Sign Up</NavLink></li>
        </ul>
    </nav>
    )
}

export default Navbar;





/*
const Navbar = () => {
    const user_id = 1
    return (
    <nav className="nav-bar">
        <a className="site-name"> <NavLink to="/">Home</NavLink> </a>
        <ul>
            <li><a><NavLink to="/help">Help</NavLink></a></li>
            <li><a><NavLink to={"/user/" + user_id}>User</NavLink></a></li>
            <li><a><NavLink to="/group">Group</NavLink></a></li>
            <li><a><NavLink to="/login">Login</NavLink></a></li>
            <li><a><NavLink to="/signup">Sign Up</NavLink></a></li>
        </ul>
    </nav>
    )
}
*/