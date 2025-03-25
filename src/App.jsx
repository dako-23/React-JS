import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "./helpers/scrollToTop.js";
import Loader from "./components/Loader.jsx";
import { UserProvider } from "./contexts/UserContext.jsx";

const Home = lazy(() => import('./components/home/Home.jsx'));
const Navbar = lazy(() => import('./components/Navbar.jsx'));
const Login = lazy(() => import('./components/auth/Login.jsx'));
const Register = lazy(() => import('./components/auth/Register.jsx'));
const GroupsList = lazy(() => import('./components/groups/GroupsList.jsx'));
const GroupChat = lazy(() => import('./components/group-chat/GroupChat.jsx'));
const AboutPage = lazy(() => import('./components/about/About.jsx'));
const Reviews = lazy(() => import('./components/reviews/Reviews.jsx'));
const MyProfile = lazy(() => import('./components/my-profile/MyProfile.jsx'));
const AuthGuard = lazy(() => import('./components/guards/AuthGuard.jsx'));
const Footer = lazy(() => import('./components/Footer.jsx'));


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
            <Route element={<AuthGuard />}>
              <Route path="/groups/:id/chat" element={<GroupChat />} />
            </Route>
            <Route path="/about" element={<AboutPage />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/reviews" element={<Reviews />} />
            {/* <Route path="*" element={<NotFound />} />  */}
          </Routes>
          <ToastContainer
            position="top-center"
            autoClose={1500}
            hideProgressBar
            newestOnTop={true}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            className='mt-16'
            toastClassName="flex justify-center items-center text-center font-semibold"
          />
          <Footer />
        </Suspense>
      </Router>
    </UserProvider >
  );
}

export default App
