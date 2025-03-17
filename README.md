# Momma's Gang

Momma's Gang
This is a responsive React and Tailwind CSS project that I created as part of my final project for SoftUni.

- Technologies Used

Front-End Stack

React.js 

Vite 

Tailwind CSS 

Framer Motion 

React Icons 

PostCSS 

- State & Real-Time Features

Socket.io – Live chat & active user updates

Local Storage – Persistent user sessions

React Hooks 

1. Getting Started
To get a local copy up and running, follow these steps:

Clone the repository git clone https://github.com/dako-23/React-JS

Install dependencies npm install

Start the development server npm run dev

Open http://localhost:5173 to view it in the browser.

2. Deployment & Performance
The client-side is hosted on Firebase Hosting, ensuring fast and secure global delivery. - https://dako23.web.app/

The backend is hosted on Render.com, managing real-time interactions and database.

Users may need to enable third-party cookies for smooth authentication.

3. Key Features
Group Creation & Management – Users can create and manage groups.
Real-Time Chat – Powered by Socket.io, users can send and receive messages instantly.
User Authentication – Secure JWT-based authentication with session cookies.
Live User Tracking – See active users in group chats in real-time.
Pagination & Search – Navigate through groups easily with a smooth pagination system.
Fully Responsive Design – Optimized for mobile, tablet, and desktop.
Animations & Effects – Smooth UI interactions with Framer Motion and React Typed.

# Back-End Architecture of the Application

The back-end of this application is built using Express.js. It handles all API requests, manages real-time WebSocket connections, and communicates with the database to store and retrieve data.

1. Server Setup & Deployment
The application runs on an Express.js server, extended with an HTTP server to enable real-time communication via Socket.io. The back-end is deployed on Render.com, ensuring a scalable and reliable hosting solution.

Note: Since Render uses dynamic IPs and strict CORS policies, users may need to enable third-party cookies in their browser to avoid authentication issues when setting session cookies.

2. Database & Data Management
For persistent storage, the application uses MongoDB. The database is hosted remotely, ensuring data persistence and availability.

4. API Endpoints
The server exposes multiple RESTful API endpoints, including:
User Authentication (Register/Login/Logout) – Uses JWT-based authentication with secure HTTP-only cookies.
Group Management – Allows users to create, update, delete, and join/leave groups.
Chat System – Fetches chat history, sends messages, and handles real-time updates via WebSockets.

All API requests are secured using authentication and validation middleware.

5. Security & Middleware
The application ensures robust security through:
JWT Authentication – Used for protected routes and session management.
CORS Configuration – Allows cross-origin requests, ensuring seamless interaction between the front-end and back-end.
Middleware Functions – Handle request validation, error management, and cookie parsing for authentication.

Important: Some browsers (e.g. Google Chrome) may block third-party cookies by default. To ensure a smooth authentication experience, users should allow third-party cookies in their browser settings.




