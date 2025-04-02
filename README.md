# Momma's Gang

**Momma's Gang** is a modern, fully responsive social platform designed specifically for moms. This is my final React project from SoftUni, built with real-world features, intuitive UX, and a beautiful UI.

## ✨ Technologies Used

### 🧩 Front-End Stack
- **React.js**
- **Vite**
- **Tailwind CSS**
- **Framer Motion** – for smooth animations
- **React Icons** – icon support
- **React Router DOM** – routing
- **React Toastify** – notifications
- **Yup** – form validation
- **EmailJS** – client-side email sending
- **Recharts** – admin dashboard charts

### 🧠 State & Real-Time Features
- **Socket.io** – real-time chat and active user updates
- **Local Storage** – persistent user sessions
- **React Hooks** – efficient and clean state logic

## 🚀 Getting Started

1. Clone the repository:  
   `git clone https://github.com/dako-23/React-JS`

2. Install dependencies:  
   `npm install`

3. Start the development server:  
   `npm run dev`

4. Open in browser:  
   `http://localhost:5173`

## 🌍 Deployment
- Front-end is deployed via **Firebase Hosting**: [https://dako23.web.app](https://dako23.web.app)
- Back-end runs on **Render.com** (see [backend repo](https://github.com/dako-23/Server))

> ⚠️ Note: Third-party cookies must be enabled for proper authentication via cookies.

---

## 💡 Features

### 🗂️ Group Management
- Create and manage groups
- Join/Leave group chats
- Group chat locking by admins
- Pagination

### 💬 Real-Time Chat
- Live chat with Socket.io
- Active users displayed in real-time
- Admins can lock groups to restrict chat access

### 👥 User System
- Secure JWT authentication
- Role-based logic (Admins/Users)
- Block/Unblock users from admin panel

### 📰 News Feed
- Posts from all users (with image, name)
- Like, comment, and favorite posts
- See who liked a post
- Delete your own posts
- Search bar & filtering by content

### 🌟 Reviews System
- Add a review with a star rating
- Leave your feedback 😊
- **View All Reviews** button to explore reviews from other users
- Average rating displayed in the admin dashboard
- Pagination


### 👤 Profile Dropdown
- Custom user dropdown via avatar
- Quick links to:
  - My Groups
  - Edit Profile
  - Change Password
  - Logout

### 📍 About Page
- Integrated **Google Maps**
- Contact form with **EmailJS** (sends directly to my email inbox)

### 📊 Admin Dashboard
- Graphs with **Recharts**
- Statistics for:
  - Total users
  - Admins
  - Posts
  - Groups
  - Partners
  - Locked groups
  - Avg. rating reviews
  - Favorites
- Manage users (block/make admin)
- Manage partners (add/delete)

---

## ⚙️ Backend Overview

Built with **Express.js** and **MongoDB**:
- User auth, group and post management, chat functionality
- API secured with JWT, cookie-parser, and custom middleware
- Real-time chat over WebSockets (Socket.io)

> Backend repo: [https://github.com/dako-23/Server](https://github.com/dako-23/Server)

