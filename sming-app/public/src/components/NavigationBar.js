import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = (props) => {

    return (
        <nav className="navbar navbar-toggleable-md fixed-top navbar-inverse bg-primary mb-3">
            <h1 className="navbar-brand mb-0">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Sming Sming</Link>
                    </li>
                </ul>
            </h1>

            <div className="collapse navbar-collapse" id="collapsingNavbar">
                <ul className="navbar-nav">
                </ul>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="#">About</a>
                    </li>
                </ul>
            </div>

        </nav>
    );

};


export default NavigationBar;