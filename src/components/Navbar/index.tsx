import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css"
import {useQuery} from 'react-query'
import axios from 'axios';
import AuthService from '../../services/authenticator'


const Navbar = () => {
    //TODO: Fix this working with signout
    if(AuthService.getCurrentUser()){
        return (
            <nav className="nav-bar">
            <NavLink to="/" className="site-name">EzMeet</NavLink>
            <ul>
                <li><NavLink to="/help" className="active">Help</NavLink></li>
                <li><NavLink to={"/user/" + AuthService.getCurrentUsername()} className="active">User</NavLink></li>
                <li><NavLink to="/group" className="active">Group</NavLink></li>
                <li><NavLink to="/" onClick={AuthService.logout} className="active">Sign out</NavLink></li>
            </ul>
        </nav>
        )
    }
    return (
        <nav className="nav-bar">
            <NavLink to="/" className="site-name">EzMeet</NavLink>
            <ul>
                <li><NavLink to="/help" className="active">Help</NavLink></li>
                <li><NavLink to="/login" className="active">Login</NavLink></li>
                <li><NavLink to="/signup" className="active">Sign up</NavLink></li>
            </ul>
        </nav>
    )
}

export default Navbar;

//<li><NavLink to={"/user/" + data} className="active">User</NavLink></li>