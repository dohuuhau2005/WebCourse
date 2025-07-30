import React, { useState, useRef, useEffect, useNavigate, useLocation } from 'react';
import './ListBuyedCourse.scss';
import Header from "../../../component/Header";
import { Button } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function ListBuyedCourses() {

    const [allBuyedCourses, setAllBuyedCourses] = useState([]);


    const recommendedRef = useRef();

    const [name, setName] = useState('');
    const [descriptions, setDescriptions] = useState('');
    const [img, setImg] = useState('');
    const { id } = useParams();
    const navigate = useNavigate;
    const location = useLocation;


    useEffect(() => {
        const token = localStorage.getItem("token");
        const id = JSON.parse(atob(token.split('.')[1])).id;
        console.log("User ID:", id);
        axios.get(`https://localhost:8888/api/GetAllBuyedCourses/${encodeURIComponent(id)}`)
            .then(response => {
                if (response.data.success === true) {

                    setAllBuyedCourses(response.data.courses);
                    console.log('All Buyed Courses:', response.data.courses);



                }
                console.log('Courses fetched successfully:', response.data);
            })
            .catch(error => {
                console.error('Error fetching courses:', error);
            });
        // Fetch courses from the backend

    }, []);


    const renderBuyedCourses = (Courses) => {



        return Courses.map((course, index) => (<div className="row g-2">
            <div className="col-md-6" key={index}>
                <img src={course.imageURL} className="course-image" alt={course.title} />
            </div>
            <div className="col-md-6 textDetail">
                <h5><strong>Name:</strong>{' '} {course.title}</h5>
                <p><strong>Descriptions:</strong>{' '} {course.description}</p>
                <div className="linkdiv">
                    <Link to={`/DetailCourse/${encodeURIComponent(course.course_id)}`}>Detail</Link>
                </div>

            </div>
        </div>))
    };
    return (
        <>
            <Header />
            <div className="bodyListBuyedCourse">
                <div className="container mt-4 ListBuyedCourseContainer">
                    {allBuyedCourses.length === 0 ? (
                        <p>Bạn chưa mua khóa học nào.</p>
                    ) : (
                        renderBuyedCourses(allBuyedCourses)
                    )}



                </div>
            </div>
        </>
    );
};




export default ListBuyedCourses;
