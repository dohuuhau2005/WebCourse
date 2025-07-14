import React from 'react';
import './Header.scss';
import menuIcon from '../assets/menu_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
function Header() {
    const [isActive, setIsActive] = useState(false);
    return (
        <nav>
            <ul className={`sidebar ${isActive ? "active" : ""}`}>

                <li><a href="#">Coding</a></li>
                <li><a href="">Explore</a></li>
                <li><a href="">Place</a></li>
                <li><a href="">search</a></li>
                <li><a href="">login</a></li>
                <li><a href="">signup</a></li>
            </ul>
            <ul>
                <li className='hide'><a href="#">Home</a></li>
                <li className='hide'><a href="">Explore</a></li>
                <li className='searchbar hide'><div className='search-container'><input type="text" placeholder='search' />
                    <a href=""><FontAwesomeIcon icon={faMagnifyingGlass} /></a></div></li>
                <li className='hide'><a href="">search</a></li>
                <li className='hide'><a href="">login</a></li>
                <li className='hide'><a href="">signup</a></li>
                <li className='hidemenu' onClick={(e) => { e.preventDefault(); setIsActive(true); }}>
                    <a href="">
                        <img src={menuIcon} alt="Menu" />
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default Header;