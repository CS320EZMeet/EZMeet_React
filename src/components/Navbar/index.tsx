import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css"

const Navbar = () => {
    return (
    <nav className="nav-bar">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/help">Help</NavLink>
        <NavLink to="/user">User</NavLink>
        <NavLink to="/group">Group</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
    </nav>
    )
}

export default Navbar;
