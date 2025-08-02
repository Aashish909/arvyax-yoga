import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

export function MySessions() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { getAuthHeader } = useAuth();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/my-sessions`, {
      headers: getAuthHeader()
    })
      .then(res => setSessions(res.data))
      .catch(err => console.error("Error fetching sessions:", err))
      .finally(() => setLoading(false));
  }, [getAuthHeader]);

  const getStatusBadge = (status) => {
    if (status === 'published') {
      return <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">Published</span>;
    }
    return <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Draft</span>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Sessions</h1>
            <p className="text-xl text-gray-600">Manage your wellness content</p>
          </div>
          <button 
            onClick={() => navigate("/editor")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <span className="mr-2">+</span>
            New Session
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {sessions.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-gray-500 text-lg mb-4">You haven't created any sessions yet.</div>
                <button 
                  onClick={() => navigate("/editor")}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Your First Session
                </button>
              </div>
            ) : (
              sessions.map(session => (
                <div key={session._id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="flex">
                    <div className="p-6 flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold text-gray-900">{session.title}</h3>
                            {getStatusBadge(session.status)}
                          </div>
                          
                          {session.description && (
                            <p className="text-gray-600 mb-3 line-clamp-2">{session.description}</p>
                          )}
                          
                          {session.tags && session.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {session.tags.map((tag, index) => (
                                <span 
                                  key={index}
                                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                          
                          <div className="flex flex-wrap gap-4 mb-4">
                            {session.duration && (
                              <div className="flex items-center text-sm text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {session.duration} min
                              </div>
                            )}
                            
                            {session.level && (
                              <div className="flex items-center text-sm text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                <span className="capitalize">{session.level}</span>
                              </div>
                            )}
                            
                            {session.instructor_name && (
                              <div className="flex items-center text-sm text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                {session.instructor_name}
                              </div>
                            )}
                          </div>
                          
                          <div className="text-sm text-gray-500">
                            Created: {new Date(session.created_at).toLocaleDateString()}
                            {session.updated_at !== session.created_at && (
                              <span className="ml-4">
                                Updated: {new Date(session.updated_at).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => navigate(`/editor/${session._id}`)}
                            className="px-4 py-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => navigate(`/session/${session._id}`)}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                          >
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}