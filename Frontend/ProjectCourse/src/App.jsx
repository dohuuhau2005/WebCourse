import RegisterStudent from "./Student/Register/RegisterStudent"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Headers from "./component/Header"
import Footer from "./component/Footer"
import Login from "./Login/Login"
import Home from "./Home/Home"
import ForgotPassword from "./ForgotPassword/ForgotPassword"
import Register from "./Register/Register"
import RegisterInstructor from "./instructor/Register/RegisterInstructor"
import MathPage from "./Student/Pages/Math/Math"
import VerifyEmail from "./component/VerrifyEmail"
function App() {


  return (
    <>



      <Routes>
        <Route path="/" element={<RegisterStudent />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/verify" element={<VerifyEmail />} />


      </Routes>


    </>
  )
}
//  {/* <Route path="/Login" element={<Login />}></Route> */}
//     <Route path="/Home" element={<Home />} />
//     <Route path="/RegisterStudent" element={<RegisterStudent />} />
export default App
