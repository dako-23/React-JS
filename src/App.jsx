import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./helpers/scrollToTop.js";
import Home from "./pages/Home"
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";



function App() {
  return (
    <Router>
      <ScrollToTop/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />  */}
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
