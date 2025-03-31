import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import ScrollToTop from "./helpers/scrollToTop.js";
import Loader from "./components/Loader.jsx";
import { UserProvider } from "./contexts/UserContext.jsx";
import ToastConfig from "./components/notifications/ToastConfig.jsx";

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
const NewsFeed = lazy(() => import('./components/news-feed/NewsFeed.jsx'));
const MyGroups = lazy(() => import('./components/my-groups/MyGroups.jsx'))
const ChangePassword = lazy(() => import('./components/auth/ChangePassword.jsx'))
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard.jsx'))
const NotFound = lazy(() => import('./components/not-found/NotFound.jsx'));

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
            <Route path="/users/change-password" element={<ChangePassword />} />
            <Route path="/news-feed" element={<NewsFeed />} />
            <Route path="/groups" element={<GroupsList />} />
            <Route element={<AuthGuard />}>
              <Route path="/groups/:id/chat" element={<GroupChat />} />
            </Route>
            <Route path="/about" element={<AboutPage />} />
            <Route path="/my-profile/edit" element={<MyProfile />} />
            <Route path="/my-profile/:id/groups" element={<MyGroups />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ToastConfig />
          <Footer />
        </Suspense>
      </Router>
    </UserProvider >
  );
}

export default App
