import React, { useState } from 'react';
import './BuyCourse.scss'; // nếu bạn có file css riêng
import Header from "../../../component/Header";

function BuyCourse() {
    const [voucher, setVoucher] = useState('');
    const [price, setPrice] = useState(10000);
    const [finalPrice, setFinalPrice] = useState(price);

    const handleApplyVoucher = () => {
        // Giả sử mã "DISCOUNT10" giảm 10%
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

    return (
        <>
            <Header />
            <div className="container mt-4 bodyBuyCourse">
                <div className="row">
                    <div className="col-md-6">
                        <div className="course-image bg-secondary" style={{ height: '200px' }}></div>
                    </div>
                    <div className="col-md-6">
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
                            <button className="btn btn-primary" onClick={handleApplyVoucher}>Apply</button>
                        </div>
                        <button className="btn btn-success mt-3" onClick={handleBuy}>Buy</button>
                    </div>
                </div>

                <div className="mt-5">
                    <h5>Recommended Courses</h5>
                    <div className="d-flex align-items-center">
                        <button className="btn btn-link fs-3">&#x276E;</button>
                        <div className="d-flex overflow-auto w-100">
                            {[...Array(5)].map((_, idx) => (
                                <div key={idx} className="card mx-2 text-center" style={{ width: '150px' }}>
                                    <div className="card-body">
                                        <div className="bg-light mb-2" style={{ height: '70px' }}></div>
                                        <p className="mb-1">Name</p>
                                        <button className="btn btn-sm btn-primary">Detail</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="btn btn-link fs-3">&#x276F;</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BuyCourse;
