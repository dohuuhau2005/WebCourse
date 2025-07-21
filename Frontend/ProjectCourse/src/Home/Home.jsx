import React, { useRef } from 'react';
import './Home.scss';
import Header from "../component/Header";
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
    const recommendedRef = useRef();
    const continueRef = useRef();

    const scroll = (ref, direction) => {
        if (direction === 'left') {
            ref.current.scrollLeft -= 300;
        } else {
            ref.current.scrollLeft += 300;
        }
    };

    const renderCourseCards = () => {
        return Array(10).fill(0).map((_, index) => (
            <div className="course-card" key={index}>
                <div className="course-image" />
                <div className="course-name">Name</div>
                <Button variant="primary" size="sm">Detail</Button>
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
                                {renderCourseCards()}
                            </div>
                            <button className="scroll-btn right" onClick={() => scroll(recommendedRef, 'right')}>❯</button>
                        </div>
                    </div>

                    {/* Continue Courses */}
                    <div className="carousel-container">
                        <h3>Continue</h3>
                        <div className="carousel-wrapper">
                            <button className="scroll-btn left" onClick={() => scroll(continueRef, 'left')}>❮</button>
                            <div className="carousel-items" ref={continueRef}>
                                {renderCourseCards()}
                            </div>
                            <button className="scroll-btn right" onClick={() => scroll(continueRef, 'right')}>❯</button>
                        </div>
                    </div>
                </div></div>
        </>
    );
}

export default Home;
