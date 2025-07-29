import RegisterStudent from "./Student/Register/RegisterStudent"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Headers from "./component/Header"
import Footer from "./component/Footer"
import Login from "./Login/Login"
import Home from "./Home/Home"
import ForgotPassword from "./ForgotPassword/ForgotPassword"
import Register from "./Register/Register"
import RegisterInstructor from "./instructor/Register/RegisterInstructor"
import MathPage from "./Student/Pages/BasicCourse/BasicJava"
import VerifyEmail from "./component/VerrifyEmail"
import BuyCourse from "./Student/Pages/BuyCourse/BuyCourse"
import Logout from "./component/Logout"
import SearchResults from "./Student/Pages/SearchResult/SearchResult"
import ProfileStudent from "./Student/Profile/Profile"
function App() {


  return (
    <>



      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/verify" element={<VerifyEmail />} />

        <Route path="/Home" element={<Home />} />

        <Route path="/BuyCourse/:id" element={<BuyCourse />} />
        <Route path="/SearchResults" element={<SearchResults />} />
        <Route path="/Logout" element={<Logout />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/BasicCourseJava" element={<MathPage />} />

        <Route path="/RegisterStudent" element={<RegisterStudent />} />
        <Route path="/RegisterInstructor" element={<RegisterInstructor />} />
        <Route path="/ProfileStudent" element={<ProfileStudent />} />
      </Routes>


    </>
  )
}
//  {/* <Route path="/Login" element={<Login />}></Route> */}
//     <Route path="/Home" element={<Home />} />
//     <Route path="/RegisterStudent" element={<RegisterStudent />} />
export default App
