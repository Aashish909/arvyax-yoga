// All main routes are protected with <ProtectedRoute>. Navbar includes a logout button for authenticated users.
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Dashboard } from "./pages/Dashboard";
import { MySessions } from "./pages/MySessions";
import { SessionEditor } from "./pages/SessionEditor";
import { SessionDetails } from "./pages/SessionDetails";
import { AuthProvider, useAuth } from "./components/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  
  const handleLogout = () => {
    logout();
  };
  
  if (!isAuthenticated) return null;
  
  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-gray-900">Arvyax Wellness</div>
          </div>
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => navigate("/dashboard")}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Dashboard
            </button>
            <button 
              onClick={() => navigate("/my-sessions")}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              My Sessions
            </button>
            <button 
              onClick={handleLogout} 
              className="text-red-600 hover:text-red-800 font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function AppRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/my-sessions" element={<ProtectedRoute><MySessions /></ProtectedRoute>} />
        <Route path="/editor/:id?" element={<ProtectedRoute><SessionEditor /></ProtectedRoute>} />
        <Route path="/session/:id" element={<SessionDetails />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
