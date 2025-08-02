# Arvyax Wellness Sessions App

## Features
- User registration and secure login (JWT, password hashing)
- View published wellness sessions (yoga, meditation, etc.)
- Draft and publish your own custom sessions
- Auto-save drafts as you type (5s debounce)
- View and edit your own sessions (drafts and published)
- Route protection for authenticated pages
- Logout button

## Setup Instructions

### 1. Backend
- `cd backend`
- `npm install`
- Create a `.env` file with `JWT_SECRET=your_secret_key`
- Start backend: `npm start` (default: http://localhost:3000)

### 2. Frontend
- `cd frontend`
- `npm install`
- Start frontend: `npm start` (default: http://localhost:3001)

### 3. Usage
- Register a new account
- Login
- View wellness sessions on Dashboard
- Create/edit your own sessions in My Sessions
- Drafts auto-save as you type
- Publish sessions to make them public
- Logout with the button in the navbar

## Notes
- Ensure both backend and frontend are running for full functionality.
- All main routes are protected; you must be logged in to access them.
