import RegisterStudent from "./Student/Register/RegisterStudent"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Headers from "./component/Header"
import Footer from "./component/Footer"
function App() {


  return (
    <>
      <Headers />
      <Router>

        <Routes>
          <Route path="/" element={<RegisterStudent />} />

        </Routes>
      </Router>

    </>
  )
}

export default App
