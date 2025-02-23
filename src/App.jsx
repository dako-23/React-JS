import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />  */}
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
