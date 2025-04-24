# Admin Panel CMS

A modern content management system admin panel built with React, Express.js, and MongoDB.

## Features

- Secure authentication system with JWT
- Article management (create, view, delete)
- Responsive design with Tailwind CSS
- Rich text editor for article content
- Protected admin routes
- Modern UI/UX with loading states and feedback

## Tech Stack

- Frontend: React (Vite), Tailwind CSS, Axios
- Backend: Express.js, MongoDB
- Authentication: JWT
- Rich Text Editor: React Quill

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. Start the development servers:
   ```bash
   # Start backend server
   cd backend
   npm run dev

   # Start frontend server
   cd ../frontend
   npm run dev
   ```

5. Access the application at `http://localhost:5173`

## Project Structure

```
admin-panel/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── config/
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   └── utils/
│   └── package.json
└── README.md
```

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected routes
- Input sanitization
- HTTP-only cookies for tokens

## Contributing

Feel free to submit issues and enhancement requests. 