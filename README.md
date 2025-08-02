# Arvyax Wellness Sessions App

A modern, full-stack wellness platform where users can discover, create, and share yoga, meditation, and mindfulness sessions.

## ✨ Features

### 🔐 Secure Authentication
- User registration with email/password
- Secure login with JWT tokens
- Password hashing with bcrypt
- Protected routes for authenticated users

### 🧘‍♀️ Wellness Sessions
- **View Published Sessions**: Browse all published wellness content
- **Create Custom Sessions**: Draft your own yoga, meditation, or mindfulness sessions
- **Auto-Save Drafts**: Drafts automatically save every 5 seconds as you type
- **Publish Sessions**: Make your sessions public for the community
- **Manage Your Content**: View and edit your drafts and published sessions

### 🎨 Modern UI/UX
- Beautiful gradient backgrounds
- Responsive design
- Smooth animations and transitions
- Professional card-based layouts
- Status indicators for drafts vs published content

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)

### Backend Setup
```bash
cd backend
npm install
```

Copy the environment variables file and configure it:
```bash
cp backend/env.example backend/.env
```

Then edit `backend/.env` with your configuration:
```env
JWT_SECRET=your_super_secret_key_here
MONGODB_URI=mongodb://localhost:27017/arvyax
```

Start the backend:
```bash
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

The app will be available at `http://localhost:3001`

## 📱 Usage

1. **Register** a new account
2. **Login** with your credentials
3. **Browse** published sessions on the Dashboard
4. **Create** your own sessions in My Sessions
5. **Draft** content with auto-save functionality
6. **Publish** your sessions to share with the community

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcrypt** for password hashing

### Frontend
- **React** with hooks
- **Tailwind CSS** for styling
- **Axios** for API calls
- **React Router** for navigation

## 📋 API Documentation

### Authentication Routes

#### POST /auth/register
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "message": "User registered"
}
```

#### POST /auth/login
Login with existing credentials.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "token": "jwt_token_here"
}
```

### Session Routes

#### GET /sessions
Get all published sessions (public endpoint).

**Response:**
```json
[
  {
    "_id": "session_id",
    "title": "Morning Yoga Flow",
    "tags": ["yoga", "morning", "flow"],
    "json_file_url": "https://example.com/session.json",
    "status": "published",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
]
```

#### GET /my-sessions
Get user's sessions (requires authentication).

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Response:**
```json
[
  {
    "_id": "session_id",
    "title": "My Meditation Session",
    "tags": ["meditation", "mindfulness"],
    "json_file_url": "https://example.com/session.json",
    "status": "draft",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
]
```

#### GET /my-sessions/:id
Get a specific session by ID (requires authentication).

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Response:**
```json
{
  "_id": "session_id",
  "title": "Session Title",
  "tags": ["tag1", "tag2"],
  "json_file_url": "https://example.com/session.json",
  "status": "draft",
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": "2024-01-01T00:00:00.000Z"
}
```

#### POST /my-sessions/save-draft
Save or update a draft session (requires authentication).

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Request Body:**
```json
{
  "_id": "session_id", // Optional, for updating existing session
  "title": "Session Title",
  "tags": ["tag1", "tag2"],
  "json_file_url": "https://example.com/session.json"
}
```

**Response:**
```json
{
  "_id": "session_id",
  "title": "Session Title",
  "tags": ["tag1", "tag2"],
  "json_file_url": "https://example.com/session.json",
  "status": "draft",
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": "2024-01-01T00:00:00.000Z"
}
```

#### POST /my-sessions/publish
Publish a session (requires authentication).

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Request Body:**
```json
{
  "_id": "session_id", // Optional, for updating existing session
  "title": "Session Title",
  "tags": ["tag1", "tag2"],
  "json_file_url": "https://example.com/session.json"
}
```

**Response:**
```json
{
  "_id": "session_id",
  "title": "Session Title",
  "tags": ["tag1", "tag2"],
  "json_file_url": "https://example.com/session.json",
  "status": "published",
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": "2024-01-01T00:00:00.000Z"
}
```

## 🎯 Key Features Implemented

✅ **User Registration & Login** - Secure with JWT and bcrypt  
✅ **View Wellness Sessions** - Browse published content  
✅ **Draft & Publish Sessions** - Create and share your content  
✅ **Auto-Save Drafts** - Automatic saving every 5 seconds  
✅ **Modern UI** - Beautiful, responsive design  
✅ **Route Protection** - Secure authenticated routes  
✅ **Error Handling** - Comprehensive error messages  

## 🔧 Development

### Project Structure
```
arvyax/
├── backend/          # Node.js + Express API
│   ├── models/       # MongoDB schemas
│   ├── routes/       # API endpoints
│   └── app.js        # Server setup
└── frontend/         # React application
    ├── src/
    │   ├── pages/    # Main page components
    │   ├── components/ # Reusable components
    │   └── App.js    # Main app component
    └── public/       # Static assets
```

### Database Schema

**User**
```javascript
{
  _id: ObjectId,
  email: String,
  password_hash: String,
  created_at: Date
}
```

**Session**
```javascript
{
  _id: ObjectId,
  user_id: ObjectId,
  title: String,
  tags: [String],
  json_file_url: String,
  status: "draft" | "published",
  created_at: Date,
  updated_at: Date
}
```

## 🎨 Design Features

- **Gradient Backgrounds** - Beautiful blue-to-indigo gradients
- **Card-Based Layout** - Clean, modern session cards
- **Status Badges** - Visual indicators for draft/published status
- **Loading States** - Smooth loading animations
- **Responsive Design** - Works on all device sizes
- **Hover Effects** - Interactive elements with smooth transitions

## 🚀 Ready for Submission

This application is fully functional and ready for submission with:
- Complete authentication system
- Full CRUD operations for sessions
- Auto-save functionality
- Modern, professional UI
- Comprehensive error handling
- Secure backend with proper validation

---

**Built with ❤️ for wellness and mindfulness** 