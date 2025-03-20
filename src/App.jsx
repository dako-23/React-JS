import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import ScrollToTop from "./helpers/scrollToTop.js";
import Home from "./components/home/Home.jsx"
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/auth/Login.jsx";
import MyProfile from "./components/my-profile/MyProfile.jsx";
import Register from "./components/auth/Register.jsx";
import Loader from "./components/Loader.jsx";
import { UserProvider } from "./contexts/UserContext.jsx";
import Reviews from "./components/reviews/Reviews.jsx";

const GroupChat = lazy(() => import('./components/group-chat/GroupChat.jsx'));
const GroupsList = lazy(() => import('./components/groups/GroupsList.jsx'));
const AboutPage = lazy(() => import('./components/about/About.jsx'));

function App() {

  return (
    <UserProvider>
      <Router>
        <Suspense fallback={<Loader />}>
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users/login" element={<Login />} />
            <Route path="/users/register" element={<Register />} />
            <Route path="/groups" element={<GroupsList />} />
            <Route path="/groups/:id/chat" element={<GroupChat />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/reviews" element={<Reviews />} />
            {/* <Route path="*" element={<NotFound />} />  */}
          </Routes>
          <Footer />
        </Suspense>
      </Router>
    </UserProvider>
  );
}

export default App
