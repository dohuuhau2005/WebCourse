import React from 'react';
import './HomeCourses.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faChalkboardTeacher, faComments, faChartBar, faBookOpen, faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const initialCourses = [
  { name: 'Course 1', desc: 'Description 1', date: '2024-06-01' },
  { name: 'Course 2', desc: 'Description 2', date: '2024-06-02' },
  { name: 'Course 3', desc: 'Description 3', date: '2024-06-03' },
];

const HomeCourses = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = React.useState(false);
  const [newCourse, setNewCourse] = React.useState({ name: '', desc: '', date: '' });
  const [courses, setCourses] = React.useState(initialCourses);
  const [editIndex, setEditIndex] = React.useState(null);
  const [editCourse, setEditCourse] = React.useState({ name: '', desc: '', date: '' });
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleInputChange = (e) => {
    setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      // await axios.post('/api/courses', newCourse);
      setCourses([...courses, newCourse]);
      setShowForm(false);
      setNewCourse({ name: '', desc: '', date: '' });
    } catch (err) {
      alert('Lỗi khi thêm course!');
    }
  };

  // Edit logic
  const handleEditClick = (idx) => {
    setEditIndex(idx);
    setEditCourse(courses[idx]);
  };

  const handleEditChange = (e) => {
    setEditCourse({ ...editCourse, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedCourses = [...courses];
    updatedCourses[editIndex] = editCourse;
    setCourses(updatedCourses);
    setEditIndex(null);
  };

  const handleDelete = (idx) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      const updatedCourses = courses.filter((_, i) => i !== idx);
      setCourses(updatedCourses);
    }
  };

  const handleChatClick = () => {
    navigate('/instructor/qna');
  };

  const handleStatisticClick = () => {
    navigate('/instructor/statistic');
  };

  return (
    <div className="homecourses-container">
      <aside className="sidebar">
        <div className="logo-section">
          <div className="logo-icon">
            <FontAwesomeIcon icon={faChalkboardTeacher} size="2x" />
          </div>
          <div className="logo-text">1A3H</div>
        </div>
        <nav className="sidebar-menu">
          <ul>
            <li><FontAwesomeIcon icon={faChalkboardTeacher} /> <span>Courses</span></li>
            <li onClick={handleChatClick} style={{ cursor: 'pointer' }}><FontAwesomeIcon icon={faComments} /> <span>Chat</span></li>
            <li onClick={handleStatisticClick} style={{ cursor: 'pointer' }}><FontAwesomeIcon icon={faChartBar} /> <span>Statistic</span></li>
            <li><FontAwesomeIcon icon={faBookOpen} /> <span>Resources</span></li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <header className="main-header">
          <div className="header-left">
            <h2>Courses</h2>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search your courses"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <button className="search-btn"><FontAwesomeIcon icon={faSearch} /></button>
            </div>
            <select className="sort-select">
              <option>Newest</option>
              <option>Oldest</option>
            </select>
          </div>
          <div className="header-right">
            <button className="btn btn-test">New Test</button>
            <button className="btn btn-course" onClick={() => setShowForm(true)}>New Courses</button>
            <span className="lecturer-label">lecturer</span>
            <span className="user-icon"><FontAwesomeIcon icon={faUser} /></span>
          </div>
        </header>
        <section className="courses-list">
          {courses
            .filter(course =>
              course.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((course, idx) => (
            <div className="course-card" key={idx}>
              <div className="course-info">
                <div>
                  <span className="course-label">Course name :</span> <span>{course.name}</span><br />
                  <span className="course-label">Describe :</span> <span>{course.desc}</span>
                </div>
                <div className="course-date">
                  <span className="course-label">Date update :</span> <span>{course.date}</span>
                </div>
              </div>
              <div className="course-actions">
                <button className="btn btn-edit" onClick={() => handleEditClick(idx)}>Edit</button>
                <button className="btn btn-delete" onClick={() => handleDelete(idx)}>Delete</button>
              </div>
            </div>
          ))}
        </section>
      </main>
      {/* Modal thêm mới */}
      {showForm && (
        <div className="modal" style={{position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000}}>
          <form onSubmit={handleAddCourse} style={{background: '#fff', padding: 32, borderRadius: 12, minWidth: 320, boxShadow: '0 2px 16px rgba(0,0,0,0.15)'}}>
            <h3 style={{marginBottom: 16}}>Add New Course</h3>
            <div style={{marginBottom: 12}}>
              <input name="name" placeholder="Name" value={newCourse.name} onChange={handleInputChange} required style={{width: '100%', padding: 8, marginBottom: 8}} />
              <input name="desc" placeholder="Description" value={newCourse.desc} onChange={handleInputChange} required style={{width: '100%', padding: 8, marginBottom: 8}} />
              <input name="date" type="date" value={newCourse.date} onChange={handleInputChange} required style={{width: '100%', padding: 8}} />
            </div>
            <div style={{display: 'flex', gap: 12, justifyContent: 'flex-end'}}>
              <button type="submit" style={{padding: '8px 18px', background: '#3399FF', color: '#fff', border: 'none', borderRadius: 6}}>Add</button>
              <button type="button" onClick={() => setShowForm(false)} style={{padding: '8px 18px', background: '#eee', color: '#333', border: 'none', borderRadius: 6}}>Cancel</button>
            </div>
          </form>
        </div>
      )}
      {/* Modal sửa course */}
      {editIndex !== null && (
        <div className="modal" style={{position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000}}>
          <form onSubmit={handleEditSubmit} style={{background: '#fff', padding: 32, borderRadius: 12, minWidth: 320, boxShadow: '0 2px 16px rgba(0,0,0,0.15)'}}>
            <h3 style={{marginBottom: 16}}>Edit Course</h3>
            <div style={{marginBottom: 12}}>
              <input name="name" placeholder="Name" value={editCourse.name} onChange={handleEditChange} required style={{width: '100%', padding: 8, marginBottom: 8}} />
              <input name="desc" placeholder="Description" value={editCourse.desc} onChange={handleEditChange} required style={{width: '100%', padding: 8, marginBottom: 8}} />
              <input name="date" type="date" value={editCourse.date} onChange={handleEditChange} required style={{width: '100%', padding: 8}} />
            </div>
            <div style={{display: 'flex', gap: 12, justifyContent: 'flex-end'}}>
              <button type="submit" style={{padding: '8px 18px', background: '#3399FF', color: '#fff', border: 'none', borderRadius: 6}}>Save</button>
              <button type="button" onClick={() => setEditIndex(null)} style={{padding: '8px 18px', background: '#eee', color: '#333', border: 'none', borderRadius: 6}}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default HomeCourses;
