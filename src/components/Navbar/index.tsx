import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css"
import {useQuery} from 'react-query'
import axios from 'axios'

/*
const fetchUserName = async () => {
    //Not a fan of this but fine for now
    let url;
    console.log(window.location.href)
    if (window.location.href === "localhost:3000"){
        url = "https://localhost:8000/"
    } else {
        url = "https://ezmeet2022.herokuapp.com/"
    }
    const res = await axios.get(url+"user/Top%20G").then(response => response.data.data.name)
    console.log(res)
    return res
}
*/    


const Navbar = () => {
<<<<<<< Updated upstream
    /*const {data, isLoading} = useQuery('get-user', fetchUserName)
    if (isLoading) {
        return (<div></div>)
    }*/
=======
    // const {data, isLoading} = useQuery('get-user', fetchUserName)
    // if (isLoading) {
    //     return (<div></div>)
    // }
>>>>>>> Stashed changes
    return (
    <nav className="nav-bar">
        <NavLink to="/" className="site-name">EzMeet</NavLink>
        <ul>
            <li><NavLink to="/help" className="active">Help</NavLink></li>
<<<<<<< Updated upstream
            <li><NavLink to={"/user/Jake"} className="active">User</NavLink></li>
=======
            <li><NavLink to={"/user/Top_G"} className="active">User</NavLink></li>
>>>>>>> Stashed changes
            <li><NavLink to="/group" className="active">Group</NavLink></li>
            <li><NavLink to="/login" className="active">Login</NavLink></li>
            <li><NavLink to="/signup" className="active">Sign Up</NavLink></li>
        </ul>
    </nav>
    )
}

export default Navbar;

//<li><NavLink to={"/user/" + data} className="active">User</NavLink></li>