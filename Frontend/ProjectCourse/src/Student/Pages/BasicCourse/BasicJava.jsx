import React, { useEffect, useState } from 'react';
import './BasicJava.scss';
import Header from '../../../component/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import axios from 'axios';


// Danh sách giả 40 item (8 item / trang → 5 trang)
const mockData = Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    name: `Name ${i + 1}`
}));

// test mockData
// function CourseCard({ name }) {
//     return (
//         <div className="col-6 col-md-3">
//             <div className="box">
//                 <div className="Content"> <img
//                     src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRwTDNsRNa3BV7NIgQnWF1BuGfLVqpEpLocl1jcCSaSF6OJFR2otxhLSTbQEcmMGIDeCpT_JJj8oRvZfEgly-xoCsUNWnFch_PMo6iUAzeV"
//                     alt="Course"
//                     className="img-fluid"
//                 />
//                     <div className='NameCourse'>{name}</div>

//                     <div className='btnDetail'>
//                         <Link to={`/BuyCourse/${course.course_id}`}>Detail</Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

//lỗi không nên để riêng ra
// function CourseCard() {
//     const [courses, setCourses] = useState([]);
//     const title = "CNTT";
//     useEffect(() => {
//         axios.get(`https://localhost:8888/api/SpecificialCourses?Type=${encodeURIComponent(title)}`)
//             .then(response => {
//                 if (response.data.success === true) {


//                     setCourses(response.data.courses);
//                     console.log('Courses fetched successfully:', response.data);
//                 }

//                 else {
//                     console.error('Canot find or Failed to fetch courses:', response.data.message);
//                 }
//             })
//             .catch(error => {
//                 console.error('Error fetching courses:', error);
//             });
//     }, []);
//     
// }
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
    const itemsPerPage = 15; // Số lượng item trên mỗi trang
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get(`https://localhost:8888/api/SpecificialCourses?Type=CNTT`)
            .then(response => {
                if (response.data.success) {
                    setCourses(response.data.courses);
                }
            })
            .catch(err => console.error(err));
    }, []);

    const totalPages = Math.ceil(courses.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = courses.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className='PageBody'>
            <Header />
            <div className="Topic">Lý thuyết Cơ Bản</div>
            <div className='Pages'>
                <div className="container">
                    <div className="row g-5">
                        {currentItems.map((course) => (
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
