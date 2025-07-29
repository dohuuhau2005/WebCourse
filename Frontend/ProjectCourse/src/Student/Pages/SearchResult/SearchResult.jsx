import React, { useEffect, useState } from 'react';
import '../BasicCourse/BasicJava.scss';
import Header from '../../../component/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';


// Danh sách giả 40 item (8 item / trang → 5 trang)
const mockData = Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    name: `Name ${i + 1}`
}));


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

function SearchResults() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15; // Số lượng item trên mỗi trang
    const [courses, setCourses] = useState([]);

    const [searchParams] = useSearchParams();
    useEffect(() => {
        const ids = searchParams.get("ids")?.split(',');
        console.log("IDs from search params:", ids);
        if (ids && ids.length) {
            axios.post('https://localhost:8888/api/GetCoursesByIds', { ids })
                .then(res => setCourses(res.data.courses));
        }
    }, []);
    const totalPages = Math.ceil(courses.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = courses.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className='PageBody'>
            <Header />
            <div className="Topic">Result</div>
            <div className='Pages'>
                <div className="container">
                    <div className="row g-5">

                        {currentItems.length === 0 ? (
                            <div className="text-center text-danger fs-4">Cannot find any matching courses.</div>
                        ) : (
                            currentItems.map((course) => (
                                <div className="col-6 col-md-3" key={course.course_id}>
                                    <div className="box">
                                        <div className="Content">
                                            <img
                                                src={course.imageURL}
                                                alt="Course"
                                                className="img-fluid"
                                            />
                                            <div className='NameCourse'>{course.title}</div>
                                            <div className='btnDetail'>
                                                <Link to={`/BuyCourse/${course.course_id}`}>Detail</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )))}
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

export default SearchResults;
