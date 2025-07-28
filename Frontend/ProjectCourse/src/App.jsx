import { Routes, Route } from "react-router-dom";
import HomeCourses from "./instructor/HomeInstructor/HomeCourses";
import QnACourses from "./instructor/HomeInstructor/QnACourses";
import Statistic from "./instructor/HomeInstructor/Statistic";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeCourses />} />
      <Route path="/instructor/courses" element={<HomeCourses />} />
      <Route path="/instructor/qna" element={<QnACourses />} />
      <Route path="/instructor/statistic" element={<Statistic />} />
    </Routes>
  )
}

export default App