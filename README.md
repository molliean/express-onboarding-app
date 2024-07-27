# Company Onboarding App

![screenshot of app](public/images/Screenshot%202024-07-26%20at%205.16.53 PM.png)

This Company Onboarding App is a MERN stack web application designed to manage and streamline the onboarding process for new employees. It allows administrators/hiring managers to create multiple onboarding dashboards, assign tasks to those boards, and track the progress of each new hire. 

## Features
- User Authentication: Protected routes using JWT authentication for sign up and sign in.
- Task Dashboards: Create and delete task boards.
- Task Management: Add, update, view, and delete tasks within each board.
- Basic RBAC functionality: Different views and permissions for admins and regular users (more UI components coming soon).
- Responsive Design: mobile-friendly and responsive user interface.

## Technologies used
- Frontend:
  - React + Vite
  - CSS Modules
- Backend:
  - Node.js
  - Express.js
  - Mongoose + MongoDB
  - Middleware:
    - JWT (for auth)
    - CORS (for handling cross-origin requests)
    - Morgan (for logging/debugging)

## Future improvements:
- Implement UI components for RBAC
- More robust navigation and filtering to allow users to see tasks by category, status, etc.
