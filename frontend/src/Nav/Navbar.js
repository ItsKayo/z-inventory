import { Link } from 'react-router-dom'
import React, { useContext } from 'react';
import { ParentContext } from "../App/App";
import './Navbar.css'

function Navbar() { 
    const {loggedInUser, auth, setAuth, setLoggedInUser} = useContext(ParentContext)

    const handleLogout = () => {
        setAuth(false)
        setLoggedInUser('')
    }

    if (auth === true) {
        return (
            <ul className="nav">
                <li><Link id="home" to="/">Home</Link></li>
                <li><Link id="inventory" to="/inventory">Inventory</Link></li>
                <li id="welcome">Welcome {`${loggedInUser.first_name} ${loggedInUser.last_name}`}!</li>
                <li><Link id="logout" to="/" onClick={() => handleLogout()}>Logout</Link></li>
            </ul>
        )
    }
    else {
        return (
            <ul className="nav">
                <li><Link id="home" to="/">Home</Link></li>
                <li><Link id="login" to="/login">Login</Link></li>
            </ul>
        )
    }
    
}

export default Navbar;