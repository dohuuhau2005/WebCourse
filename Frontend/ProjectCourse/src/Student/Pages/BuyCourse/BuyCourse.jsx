import React, { useState, useRef } from 'react';
import './BuyCourse.scss';
import Header from "../../../component/Header";
import { Button } from 'react-bootstrap';

function BuyCourse() {
    const [voucher, setVoucher] = useState('');
    const [price, setPrice] = useState(10000);
    const [finalPrice, setFinalPrice] = useState(price);

    const recommendedRef = useRef();

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

    const renderRecommendedCourses = () => {
        return [...Array(10)].map((_, idx) => (
            <div key={idx} className="course-card">
                <div className="course-image bg-light mb-2"></div>
                <p className="mb-1">Name</p>
                <Button className="btn-sm" variant="primary">Detail</Button>
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
                            <div className="course-image bg-secondary" style={{ height: '200px' }}></div>
                        </div>
                        <div className="col-md-6 textDetail">
                            <h5><strong>Name:</strong> ......................</h5>
                            <p><strong>Descriptions:</strong> ......................</p>
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
                                {renderRecommendedCourses()}
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
