import HomeCourses from "./instructor/HomeInstructor/HomeCourses";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeCourses />} />
    </Routes>
  );
}
export default App;