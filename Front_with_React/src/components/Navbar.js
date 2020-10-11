import React from 'react';
import "../App.css"
import Nav from 'react-bootstrap/Nav'
import {
    BrowserRouter as Router,
    Link
} from 'react-router-dom';



const NavBar = () => {
    return(
          
        <Nav className="justify-content-start" variant="tabs"> 
            <Nav.Item>
                <Link to="/Stats">
                    <Nav.Link href="/Stats">Stats &nbsp;&nbsp;</Nav.Link>
                </Link>
            </Nav.Item>

            <Nav.Item>
                <Link to="/Models">
                    <Nav.Link href="#/Models">Models</Nav.Link>
                </Link>
            </Nav.Item>

            <Nav.Item>
                <Link to="/About">
                    <Nav.Link href="#/About">About</Nav.Link>
                </Link>
            </Nav.Item>

            <Nav.Item>
                <Link to="/OurTeam">
                    <Nav.Link href="#/OurTeam">Our Team</Nav.Link>
                </Link>
            </Nav.Item>
        </Nav>
           
    )
}

export default NavBar;