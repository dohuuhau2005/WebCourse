import React, { useState } from "react";
import './HomeCourses.scss'; // Assuming you have a separate CSS file for styles
const coursesData = [
  { id: 1, name: "Course name 1", desc: "Describe 1", date: "2025-07-20" },
  { id: 2, name: "Course name 2", desc: "Describe 2", date: "2025-07-18" },
  { id: 3, name: "Course name 3", desc: "Describe 3", date: "2025-07-15" },
];

function HomeCourses() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  const filteredCourses = coursesData
    .filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.desc.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sort === "newest"
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    );

  return (
    <div style={{ display: "flex", height: "100vh", background: "#e6e6e6" }}>
      {/* Sidebar */}
      <div
        style={{
          width: 90,
          background: "#d1d1d1",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 20,
        }}
      >
        <div style={{ marginBottom: 30, textAlign: "center" }}>
          <div style={{ fontWeight: "bold", fontSize: 24, color: "#4b2aad" }}>
            <span role="img" aria-label="cap">
              🎓
            </span>
            <div>1A3H</div>
          </div>
        </div>
        <div style={{ marginBottom: 30 }}>
          <div>
            <span role="img" aria-label="tv">
              📺
            </span>
          </div>
          <div style={{ fontSize: 12 }}>Courses</div>
        </div>
        <div style={{ marginBottom: 30 }}>
          <div>
            <span role="img" aria-label="chat">
              💬
            </span>
          </div>
          <div style={{ fontSize: 12 }}>Chat</div>
        </div>
        <div style={{ marginBottom: 30 }}>
          <div>
            <span role="img" aria-label="stat">
              📊
            </span>
          </div>
          <div style={{ fontSize: 12 }}>Statistic</div>
        </div>
        <div>
          <div>
            <span role="img" aria-label="resources">
              📁
            </span>
          </div>
          <div style={{ fontSize: 12 }}>Resources</div>
        </div>
      </div>
      {/* Main Content */}
      <div style={{ flex: 1, padding: "30px 40px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div></div>
          <div style={{ fontSize: 18, color: "#333" }}>lecturer</div>
          <div>
            <span
              role="img"
              aria-label="user"
              style={{
                background: "#e6e6e6",
                borderRadius: "50%",
                padding: 6,
                border: "1px solid #bdbdbd",
              }}
            >
              👤
            </span>
          </div>
        </div>
        {/* Courses Section */}
        <div style={{ marginTop: 30 }}>
          <div style={{ fontSize: 26, fontWeight: "bold", marginBottom: 20 }}>
            Courses
          </div>
          <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
            <input
              type="text"
              placeholder="Search your courses"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                padding: "8px 14px",
                borderRadius: 20,
                border: "1px solid #bdbdbd",
                width: 220,
                marginRight: 10,
                fontSize: 16,
              }}
            />
            <button
              style={{
                background: "#fff",
                border: "1px solid #bdbdbd",
                borderRadius: 20,
                padding: "7px 12px",
                marginRight: 10,
                cursor: "pointer",
              }}
            >
              <span role="img" aria-label="search">
                🔍
              </span>
            </button>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              style={{
                borderRadius: 6,
                border: "1px solid #bdbdbd",
                padding: "7px 12px",
                fontSize: 16,
                background: "#e6e6e6",
              }}
            >
              <option value="newest">Newest ⬇️</option>
              <option value="oldest">Oldest ⬆️</option>
            </select>
            <div style={{ flex: 1 }} />
            <button
              style={{
                background: "#4b2aad",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                padding: "10px 24px",
                marginRight: 10,
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              New Test
            </button>
            <button
              style={{
                background: "#4b2aad",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                padding: "10px 24px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              New Courses
            </button>
          </div>
          {/* Courses List */}
          <div>
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                style={{
                  background: "#c8d4f7",
                  borderRadius: 10,
                  padding: "18px 24px",
                  marginBottom: 18,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ fontWeight: "bold" }}>
                    Course name : <span style={{ fontWeight: "normal" }}>{course.name}</span>
                  </div>
                  <div>
                    Describe : <span style={{ fontWeight: "normal" }}>{course.desc}</span>
                  </div>
                </div>
                <div style={{ minWidth: 180, textAlign: "right" }}>
                  <div>
                    Date update :{" "}
                    <span style={{ fontWeight: "normal" }}>{course.date}</span>
                  </div>
                  <div style={{ marginTop: 10 }}>
                    <button
                      style={{
                        background: "#4b2aad",
                        color: "#fff",
                        border: "none",
                        borderRadius: 4,
                        padding: "7px 18px",
                        marginRight: 10,
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>
                    <button
                      style={{
                        background: "#4b2aad",
                        color: "#fff",
                        border: "none",
                        borderRadius: 4,
                        padding: "7px 18px",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default HomeCourses;