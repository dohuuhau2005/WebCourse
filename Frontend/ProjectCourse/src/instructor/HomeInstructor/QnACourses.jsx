import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardTeacher, faComments, faChartBar, faBookOpen, faUser, faHeart, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './QnACourses.scss';

const QnACourses = () => {
  const navigate = useNavigate();
  const [reply, setReply] = useState("");
  const [replies, setReplies] = useState([
    {
      user: "User_HS01",
      question: "Khóa học này ok không bro",
      instructorReply: "Ok nhé bro",
    },
  ]);
  const [showOptions, setShowOptions] = useState(false);

  const handleReplyChange = (e) => {
    setReply(e.target.value);
  };

  const handleSend = () => {
    if (reply.trim() !== "") {
      setReplies([
        {
          ...replies[0],
          instructorReply: reply,
        },
      ]);
      setReply("");
    }
  };

  const handleCoursesClick = () => {
    navigate('/instructor/courses');
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
            <li onClick={handleCoursesClick} style={{ cursor: 'pointer' }}><FontAwesomeIcon icon={faChalkboardTeacher} /> <span>Courses</span></li>
            <li style={{ cursor: 'pointer', background: '#f0f0f0', color: '#3399FF' }}><FontAwesomeIcon icon={faComments} /> <span>Chat</span></li>
            <li onClick={handleStatisticClick} style={{ cursor: 'pointer' }}><FontAwesomeIcon icon={faChartBar} /> <span>Statistic</span></li>
            <li><FontAwesomeIcon icon={faBookOpen} /> <span>Resources</span></li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <header className="main-header">
          <div className="header-left">
            <h2>Q&A</h2>
          </div>
          <div className="header-right">
            <span className="lecturer-label">lecturer</span>
            <span className="user-icon"><FontAwesomeIcon icon={faUser} /></span>
          </div>
        </header>
        <section className="qna-content">
          <div className="qna-card">
            <div className="question-section">
              <div className="user-name">
                <strong>{replies[0].user}</strong>
              </div>
              <div className="question-text">
                {replies[0].question}
              </div>
              <div className="question-actions">
                <span className="heart-icon">
                  <FontAwesomeIcon icon={faHeart} />
                </span>
                <span className="reply-button">
                  Reply <FontAwesomeIcon icon={faChevronDown} size="xs" />
                </span>
              </div>
            </div>

            <div className="answer-section">
              <div className="instructor-label">
                <strong>Instructor</strong>
              </div>
              <div className="answer-text">
                {replies[0].instructorReply}
              </div>
              <div className="answer-actions">
                <span
                  className="more-options"
                  onClick={() => setShowOptions(!showOptions)}
                >
                  More options
                </span>
                <div className="reply-input-group">
                  <input
                    type="text"
                    placeholder="Nhập trả lời..."
                    value={reply}
                    onChange={handleReplyChange}
                    className="reply-input"
                  />
                  <button
                    onClick={handleSend}
                    className="send-button"
                  >
                    Gửi
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default QnACourses;
