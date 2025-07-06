import RegisterStudent from "./Student/Register/RegisterStudent"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

function App() {


  return (
    <>
      <Router>

        <Routes>
          <Route path="/" element={<RegisterStudent />} />

        </Routes>
      </Router>
    </>
  )
}

export default App
