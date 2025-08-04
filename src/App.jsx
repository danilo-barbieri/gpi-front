import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Courses from "./pages/Courses"
import Hierarchy from "./pages/Hierarquia"
import Exonerated from "./pages/Exonerated"
import Login from "./pages/Login"
import Registro from "./pages/Register"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/hierarchy" element={<Hierarchy />} />
        <Route path="/exonerated" element={<Exonerated />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
