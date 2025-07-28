import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardTeacher, faComments, faChartBar, faBookOpen, faUser, faCaretUp, faDownload } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './Statistic.scss';

const Statistic = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState("Last 12 months");

  const handleCoursesClick = () => {
    navigate('/instructor/courses');
  };

  const handleChatClick = () => {
    navigate('/instructor/qna');
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
            <li onClick={handleCoursesClick} style={{ cursor: 'pointer' }}><FontAwesomeIcon icon={faChalkboardTeacher} /> <span>Courses</span></li>
            <li onClick={handleChatClick} style={{ cursor: 'pointer' }}><FontAwesomeIcon icon={faComments} /> <span>Chat</span></li>
            <li style={{ cursor: 'pointer', background: '#f0f0f0', color: '#3399FF' }}><FontAwesomeIcon icon={faChartBar} /> <span>Statistic</span></li>
            <li><FontAwesomeIcon icon={faBookOpen} /> <span>Resources</span></li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <header className="main-header">
          <div className="header-left">
            <h2>Overview</h2>
            <div className="filter-dropdown">
              <button className="btn-filter">
                All courses <FontAwesomeIcon icon={faCaretUp} />
              </button>
            </div>
          </div>
          <div className="header-right">
            <span className="lecturer-label">Lecturer</span>
            <span className="user-icon"><FontAwesomeIcon icon={faUser} /></span>
          </div>
        </header>
        
        <section className="statistics-panel">
          <div className="lecturer-info">
            <div className="info-row">
              <span className="info-label">Lecturer :</span>
              <span className="info-value">cô tú</span>
            </div>
            <div className="info-row">
              <span className="info-label">Course :</span>
              <span className="info-value">CNTT</span>
            </div>
            <div className="info-row">
              <span className="info-label">Code Lt :</span>
              <span className="info-value">tu1111</span>
            </div>
            <div className="info-row">
              <span className="info-label">Code Cr :</span>
              <span className="info-value"></span>
            </div>
          </div>

          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-title">Total number of students</div>
              <div className="metric-value">0</div>
            </div>
            <div className="metric-card">
              <div className="metric-title">Refund</div>
              <div className="metric-value">0</div>
            </div>
            <div className="metric-card">
              <div className="metric-title">Total enrollments</div>
              <div className="metric-value">0</div>
            </div>
            <div className="metric-card">
              <div className="metric-title">Total</div>
              <div className="metric-value">$0.00</div>
              <div className="metric-subtitle">$0.00 this month</div>
            </div>
            <div className="metric-card">
              <div className="metric-title">Rating</div>
              <div className="metric-value">0.00</div>
              <div className="metric-subtitle">0 ratings this month</div>
            </div>
          </div>

          <div className="panel-actions">
            <button className="btn-period">
              {selectedPeriod} <FontAwesomeIcon icon={faCaretUp} />
            </button>
            <button className="btn-export">
              Export <FontAwesomeIcon icon={faDownload} />
            </button>
          </div>
        </section>

        <div className="revenue-link">
          <a href="#" className="revenue-reports">Revenue reports &gt;</a>
        </div>
      </main>
    </div>
  );
};

export default Statistic; 