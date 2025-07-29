import React, { useEffect } from 'react';
import './Header.scss';
import menuIcon from '../assets/menu_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg';
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faAngleRight, faAngleDown, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

function Header() {
    const [allCourses, setAllCourses] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [searchText, setSearchText] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        axios.get('https://localhost:8888/api/GetAllCourses')
            .then(response => {
                if (response.data.success === true) {
                    setAllCourses(response.data.courses);
                } else {
                    console.error('Failed to fetch courses:', response.data.message);
                }
            })
            .catch(error => {
                console.error('Error fetching courses:', error);
            });

    }, []);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                setUserEmail(JSON.parse(atob(token.split('.')[1])).email);
            }
            catch (error) {
                console.error("Error parsing token:", error);
            }

        }

    }, []);




    const handleSearchInput = (value) => {
        setSearchText(value);
        const filteredSuggestions = allCourses.filter(course =>
            course.title.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filteredSuggestions.slice(0, 5)); // Limit to 5 suggestions
    };
    const handleSearchSubmit = () => {
        const ids = suggestions.map(course => course.course_id).join(',');
        navigate(`/SearchResults?ids=${encodeURIComponent(ids)}`);


    };
    const handleSuggestionClick = (course) => {
        navigate(`/BuyCourse/${encodeURIComponent(course.course_id)}`);
        setSearchText(course.title);
        setSuggestions([]);
    };
    return (
        <nav>
            <ul className={`sidebar ${isActive ? "active" : ""}`}>
                <li><Link to="/Home">Home</Link></li>
                <li className='dropdownMenu'><Link to="">Explore</Link>
                    <ul>
                        <li><Link to="/BasicCourseJava">Lý Thuyết cơ bản</Link></li>
                        <li><Link to="">num 2</Link></li>
                        <li><Link to="">num 3</Link></li>
                        <li><Link to="">num 4</Link></li>
                        <li><Link to="">num 5</Link></li>
                    </ul>
                </li>
                <li><Link to="">Place</Link></li>

                {userEmail ? (
                    <>
                        <li ><Link to="/ProfileStudent"><FontAwesomeIcon icon={faUser} /> {userEmail}</Link></li>
                        <li ><Link to="/Logout">logout</Link></li>
                    </>
                ) : (
                    <>
                        <li ><Link to="/Login">login</Link></li>
                        <li ><Link to="/Register">signup</Link></li>
                    </>
                )


                }

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
                        <li><Link to="/BasicCourseJava">Lý thuyết cơ bản</Link></li>
                        <li><Link to="">num 2</Link></li>
                        <li><Link to="">num 3</Link></li>
                        <li><Link to="">num 4</Link></li>
                        <li><Link to="">num 5</Link></li>
                    </ul>
                </li>
                <li className='searchbar '>
                    <div className='search-container'>
                        <input type="text" placeholder='search courses ....'
                            value={searchText}
                            onChange={(e) => {
                                handleSearchInput(e.target.value);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSearchSubmit();
                            }}
                        />
                        <Link to=""><FontAwesomeIcon icon={faMagnifyingGlass} /></Link>
                        <ul className="suggestions">
                            {suggestions.map((course, idx) => (
                                <li key={idx} onClick={() => handleSuggestionClick(course)}>
                                    {course.title}
                                </li>
                            ))}
                        </ul>
                    </div>

                </li>
                <li ><Link to=""><FontAwesomeIcon icon={faCartShopping} /></Link></li>

                {userEmail ? (
                    <>
                        <li className='hide'><Link to="/ProfileStudent"><FontAwesomeIcon icon={faUser} /> {userEmail}</Link></li>
                        <li className='hide'><Link to="/Logout">logout</Link></li>
                    </>
                ) : (
                    <>
                        <li className='hide'><Link to="/Login">login</Link></li>
                        <li className='hide'><Link to="/Register">signup</Link></li>
                    </>
                )


                }



                <li className='hidemenu' onClick={(e) => { e.preventDefault(); setIsActive(true); }}>
                    <Link to="">
                        <img src={menuIcon} alt="Menu" />
                    </Link>
                </li>
            </ul >
        </nav >
    );
}

export default Header;
