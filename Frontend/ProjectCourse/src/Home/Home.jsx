import React, { useEffect, useRef } from 'react';
import './Home.scss';
import Header from "../component/Header";
import Footer from "../component/Footer";
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


function Home() {
    const recommendedRef = useRef();
    const continueRef = useRef();

    const [recommendedCourses, setRecommendedCourses] = React.useState([]);
    const [continueCourses, setContinueCourses] = React.useState([]);

    const scroll = (ref, direction) => {
        if (direction === 'left') {
            ref.current.scrollLeft -= 300;
        } else {
            ref.current.scrollLeft += 300;
        }
    };
    useEffect(() => {
        axios.get('https://localhost:8888/api/GetAllCourses')
            .then(response => {
                if (response.data.success === true) {
                    const allCourses = response.data.courses;
                    // Shuffle function
                    const shuffle = (array) => {
                        const copy = [...array];
                        for (let i = copy.length - 1; i > 0; i--) {
                            const j = Math.floor(Math.random() * (i + 1));
                            [copy[i], copy[j]] = [copy[j], copy[i]];
                        }
                        return copy;
                    };
                    const shuffled = shuffle(allCourses);
                    const half = Math.ceil(shuffled.length / 2);

                    setContinueCourses(shuffled.slice(0, half));
                    setRecommendedCourses(shuffled.slice(half));



                }
                console.log('Courses fetched successfully:', response.data);
            })
            .catch(error => {
                console.error('Error fetching courses:', error);
            });
        // Fetch courses from the backend

    }, []);
    const renderCourseCards = (courses) => {
        // return Array(20).fill(0).map((_, index) => (
        //     <div className="course-card" key={index}>
        //         <div className="course-image" />
        //         <div className="course-name">Name</div>
        //         <Button variant="primary" size="sm">Detail</Button>
        //     </div>
        // ));
        return courses.map((course, index) => (
            <div className="course-card" key={index}>
                <div className="course-image" style={{ backgroundImage: `url(${course.imageURL})` }} />
                <div className="course-name">{course.title}</div>
                <Link to={`/BuyCourse/${encodeURIComponent(course.course_id)}`}>
                    <Button variant="primary" size="sm">Detail</Button>
                </Link>
            </div>
        ));
    };

    return (
        <>
            <Header />
            <div className="HomeBody">
                <div className="home-container">
                    {/* Banner */}
                    <div className="banner">
                        <h1>Welcome to Course Platform</h1>
                    </div>

                    {/* Recommended Courses */}
                    <div className="carousel-container">
                        <h3>Recommended Courses</h3>
                        <div className="carousel-wrapper">
                            <button className="scroll-btn left" onClick={() => scroll(recommendedRef, 'left')}>❮</button>
                            <div className="carousel-items" ref={recommendedRef}>
                                {renderCourseCards(continueCourses)}
                            </div>
                            <button className="scroll-btn right" onClick={() => scroll(recommendedRef, 'right')}>❯</button>
                        </div>
                    </div>

                    {/* Continue Courses */}
                    <div className="carousel-container">
                        <h3>New Course</h3>
                        <div className="carousel-wrapper">
                            <button className="scroll-btn left" onClick={() => scroll(continueRef, 'left')}>❮</button>
                            <div className="carousel-items" ref={continueRef}>
                                {renderCourseCards(recommendedCourses)}
                            </div>
                            <button className="scroll-btn right" onClick={() => scroll(continueRef, 'right')}>❯</button>
                        </div>
                    </div>
                </div></div>
            <Footer />
        </>
    );
}

export default Home;
