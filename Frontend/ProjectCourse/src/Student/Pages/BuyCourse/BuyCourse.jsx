import React, { useState, useRef, useEffect, use } from 'react';
import './BuyCourse.scss';
import Header from "../../../component/Header";
import { Button } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function BuyCourse() {
    const [voucher, setVoucher] = useState('');
    const [price, setPrice] = useState(10000);
    const [finalPrice, setFinalPrice] = useState(price);
    const [recommendedCourses, setRecommendedCourses] = useState([]);
    const [discount, setDiscount] = useState(0);

    const recommendedRef = useRef();
    const [voucherList, setVoucherList] = useState([]);
    const [name, setName] = useState('');
    const [descriptions, setDescriptions] = useState('');
    const [img, setImg] = useState('');
    const { id } = useParams();
    useEffect(() => {
        axios.get(`https://localhost:8888/api/GetCourseById/${id}`)
            .then(response => {
                if (response.data.success) {
                    setPrice(response.data.course.NewPrice);
                    setFinalPrice(response.data.course.NewPrice);
                    setName(response.data.course.title);
                    setDescriptions(response.data.course.description);
                    setImg(response.data.course.imageURL);

                } else {
                    console.error("Failed to fetch course details");
                }
            })
            .catch(error => {
                console.error("Error fetching course details:", error);
            });
    }, [id]);

    useEffect(() => {
        axios.get(`https://localhost:8888/api/GetVoucher/${id}`)
            .then(response => {
                if (response.data.success) {
                    setVoucherList(response.data.vouchers);
                } else {
                    console.error("Failed to fetch course details");
                }
            })
            .catch(error => {
                console.error("Error fetching course details:", error);
            });

    }, []);
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
                    console.log("course", allCourses.length);
                    console.log("shuffled", shuffled.length);
                    // setContinueCourses(shuffled.slice(0, half));
                    setRecommendedCourses(shuffled.slice(half));



                }
                console.log('Courses fetched successfully:', response.data);
            })
            .catch(error => {
                console.error('Error fetching courses:', error);
            });
        // Fetch courses from the backend

    }, []);
    const handleApplyVoucher = () => {

        if (voucher === "DISCOUNT10") {
            setFinalPrice(price * 0.9);
        } else {
            setFinalPrice(price);
            alert("Voucher không hợp lệ");
        }
    };

    const handleBuy = () => {
        alert("Mua khóa học với giá " + finalPrice + " VND");
    };

    const scroll = (ref, direction) => {
        if (direction === 'left') {
            ref.current.scrollLeft -= 300;
        } else {
            ref.current.scrollLeft += 300;
        }
    };

    const renderRecommendedCourses = (Courses) => {
        // return [...Array(10)].map((_, idx) => (
        //     <div key={idx} className="course-card">
        //         <div className="course-image bg-light mb-2"></div>
        //         <p className="mb-1">Name</p>
        //         <Button className="btn-sm" variant="primary">Detail</Button>
        //         {/* <Link to={`/BuyCourse/${course.course_id}`}>
        //             <Button variant="primary" size="sm">Detail</Button>
        //         </Link> */}
        //     </div>
        // ));
        return Courses.map((course, index) => (
            <div className="course-card" key={index}>
                <div className="course-image" style={{ backgroundImage: `url(${course.imageURL})` }} />
                <div className="course-name">{course.title}</div>
                <Link to={`/BuyCourse/${decodeURIComponent(course.course_id)}`}>
                    <Button variant="primary" size="sm">Detail</Button>
                </Link>
            </div>
        ));
    };

    return (
        <>
            <Header />
            <div className="bodyBuyCourse">
                <div className="container mt-4 BuyCourseContainer">
                    <div className="row g-2">
                        <div className="col-md-6">
                            <div className="course-image bg-secondary" style={{ height: '200px', backgroundImage: `url(${img})` }}></div>
                        </div>
                        <div className="col-md-6 textDetail">
                            <h5><strong>Name:</strong>{' '} {name}</h5>
                            <p><strong>Descriptions:</strong>{' '} {descriptions}</p>
                            <p><strong>Price:</strong> {finalPrice.toLocaleString()} VND</p>
                            <div className="d-flex">
                                <input
                                    type="text"
                                    className="form-control me-2"
                                    placeholder="Enter voucher"
                                    value={voucher}
                                    onChange={(e) => setVoucher(e.target.value)}
                                />
                                <button className="btn btn-primary btn-Apply" onClick={handleApplyVoucher}>Apply</button>
                            </div>
                            <button className="btn btn-success mt-3 btn-buy" onClick={handleBuy}>Buy</button>
                        </div>
                    </div>

                    <div className="mt-5">
                        <h5>Recommended Courses</h5>
                        <div className="carousel-wrapper">
                            <button className="scroll-btn left" onClick={() => scroll(recommendedRef, 'left')}>❮</button>
                            <div className="carousel-items" ref={recommendedRef}>
                                {renderRecommendedCourses(recommendedCourses)}
                            </div>
                            <button className="scroll-btn right" onClick={() => scroll(recommendedRef, 'right')}>❯</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BuyCourse;
