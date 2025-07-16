import React, { useState } from 'react';
import './Math.scss';
import Header from '../../../component/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

// Danh sách giả 40 item (8 item / trang → 5 trang)
const mockData = Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    name: `Name ${i + 1}`
}));

function CourseCard({ name }) {
    return (
        <div className="col-6 col-md-3">
            <div className="box">
                <div className="Content"> <img
                    src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRwTDNsRNa3BV7NIgQnWF1BuGfLVqpEpLocl1jcCSaSF6OJFR2otxhLSTbQEcmMGIDeCpT_JJj8oRvZfEgly-xoCsUNWnFch_PMo6iUAzeV"
                    alt="Course"
                    className="img-fluid"
                />
                    <div className='NameCourse'>{name}</div>

                    <div className='btnDetail'>
                        <Link to="#">Detail</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

function PaginationPage({ currentPage, totalPages, onPageChange }) {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(
            <button
                key={i}
                className={`pagination-btn${i === currentPage ? " active" : ""}`}
                onClick={() => onPageChange(i)}
            >
                {i}
            </button>
        );
    }

    return (
        <div style={{ textAlign: "center", margin: "24px 0" }}>
            {pages}
        </div>
    );
}

function MathPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const totalPages = Math.ceil(mockData.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = mockData.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className='PageBody'>
            <Header />
            <div className="Topic">MATH</div>
            <div className='Pages'>
                <div className="container">
                    <div className="row g-5">
                        {currentItems.map(item => (
                            <CourseCard key={item.id} name={item.name} />
                        ))}
                    </div>
                    <PaginationPage
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>

        </div>
    );
}

export default MathPage;
