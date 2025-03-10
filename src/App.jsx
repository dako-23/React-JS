import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./helpers/scrollToTop.js";
import Home from "./pages/Home"
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import GroupsList from "./components/GroupsList.jsx";
import GroupChat from "./components/GroupChat.jsx";


function App() {
  return (
    <Router>
      <ScrollToTop/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/login" element={<Login />} />
        <Route path="/users/register" element={<Register />} />
        <Route path="/groups" element={<GroupsList />} />
        <Route path="/groups/:id" element={<GroupChat />} />
        {/* <Route path="*" element={<NotFound />} />  */}
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
