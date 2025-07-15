import React from 'react';
import './Header.scss';
import menuIcon from '../assets/menu_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faAngleRight, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Header() {
    const [isActive, setIsActive] = useState(false);
    return (
        <nav>
            <ul className={`sidebar ${isActive ? "active" : ""}`}>
                <li><Link to="/Home">Home</Link></li>
                <li className='dropdownMenu'><Link to="">Explore</Link>
                    <ul>
                        <li><Link to="">num1</Link></li>
                        <li><Link to="">num 2</Link></li>
                        <li><Link to="">num 3</Link></li>
                        <li><Link to="">num 4</Link></li>
                        <li><Link to="">num 5</Link></li>
                    </ul>
                </li>
                <li><Link to="">Place</Link></li>
                <li><Link to="">search</Link></li>
                <li><Link to="/Login">login</Link></li>
                <li><Link to="">signup</Link></li>
            </ul>
            <ul>
                <li className='hide'><Link to="/Home">Home</Link></li>
                <li className='hide dropdownMenu'>
                    <div className='ExploreArrow'>
                        <Link to="">Explore</Link>
                        <Link to="">
                            <FontAwesomeIcon className='aggleRight' icon={faAngleRight} />
                            <FontAwesomeIcon className='aggleDown' icon={faAngleDown} />
                        </Link>
                    </div>
                    <ul>
                        <li><Link to="">num1</Link></li>
                        <li><Link to="">num 2</Link></li>
                        <li><Link to="">num 3</Link></li>
                        <li><Link to="">num 4</Link></li>
                        <li><Link to="">num 5</Link></li>
                    </ul>
                </li>
                <li className='searchbar hide'>
                    <div className='search-container'>
                        <input type="text" placeholder='search' />
                        <Link to=""><FontAwesomeIcon icon={faMagnifyingGlass} /></Link>
                    </div>
                </li>
                <li className='hide'><Link to="">search</Link></li>
                <li className='hide'><Link to="/Login">login</Link></li>
                <li className='hide'><Link to="">signup</Link></li>
                <li className='hidemenu' onClick={(e) => { e.preventDefault(); setIsActive(true); }}>
                    <Link to="">
                        <img src={menuIcon} alt="Menu" />
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Header;
