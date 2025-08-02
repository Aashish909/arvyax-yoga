import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { useAuth } from "../components/AuthContext";

export function SessionEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [duration, setDuration] = useState("");
  const [instructorName, setInstructorName] = useState("");
  const [level, setLevel] = useState("");
  const [status, setStatus] = useState("draft");
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [error, setError] = useState("");
  const timer = useRef(null);
  const { getAuthHeader } = useAuth();

  // Load session if editing
  useEffect(() => {
    if (id) {
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/my-sessions/${id}`, {
        headers: getAuthHeader()
      }).then(res => {
        setTitle(res.data.title);
        setDescription(res.data.description || "");
        setTags(res.data.tags?.join(", ") || "");
        setDuration(res.data.duration || "");
        setInstructorName(res.data.instructor_name || "");
        setLevel(res.data.level || "");
        setStatus(res.data.status);
      }).catch(err => {
        setError("Failed to load session");
        console.error("Error loading session:", err);
      });
    }
    // eslint-disable-next-line
  }, [id, getAuthHeader]);

  // Auto-save draft after 5s inactivity
  useEffect(() => {
    if (!title && !description && !tags && !duration && !instructorName && !level) return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      handleSaveDraft();
    }, 5000);
    return () => clearTimeout(timer.current);
    // eslint-disable-next-line
  }, [title, description, tags, duration, instructorName, level]);

  const handleSaveDraft = async () => {
    setSaving(true);
    setSaveMsg("");
    setError("");
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/my-sessions/save-draft`, {
        _id: id,
        title,
        description,
        tags: tags.split(",").map(t => t.trim()).filter(Boolean),
        duration: duration ? parseInt(duration, 10) : undefined,
        instructor_name: instructorName,
        level
      }, {
        headers: getAuthHeader()
      });
      setSaveMsg("Draft saved");
      if (!id && res.data._id) navigate(`/editor/${res.data._id}`, { replace: true });
    } catch (err) {
      setError("Failed to save draft");
      console.error("Error saving draft:", err);
    } finally {
      setSaving(false);
      setTimeout(() => setSaveMsg(""), 2000);
    }
  };

  const handlePublish = async () => {
    setSaving(true);
    setSaveMsg("");
    setError("");
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/my-sessions/publish`, {
        _id: id,
        title,
        description,
        tags: tags.split(",").map(t => t.trim()).filter(Boolean),
        duration: duration ? parseInt(duration, 10) : undefined,
        instructor_name: instructorName,
        level
      }, {
        headers: getAuthHeader()
      });
      setSaveMsg("Session published!");
      setTimeout(() => navigate("/my-sessions"), 1200);
    } catch (err) {
      setError("Failed to publish");
      console.error("Error publishing session:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-2xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{id ? "Edit Session" : "Create New Session"}</h1>
              <p className="text-gray-600 mt-2">Share your wellness journey with the community</p>
            </div>
            <div className="flex space-x-3">
              <button 
                onClick={() => navigate("/my-sessions")}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                ← Back
              </button>
            </div>
          </div>

          {/* Status Messages */}
          {saving && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-3"></div>
                <span className="text-blue-800">Saving your draft...</span>
              </div>
            </div>
          )}
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <span className="text-red-800">{error}</span>
            </div>
          )}
          
          {saveMsg && !saving && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <span className="text-green-800">{saveMsg}</span>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Session Title</label>
              <input 
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                value={title} 
                onChange={e => setTitle(e.target.value)} 
                placeholder="Enter a meaningful title for your session"
                required 
              />
              <p className="text-xs text-gray-500 mt-1">E.g., "Morning Energizing Flow" or "Deep Sleep Meditation"</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
              <textarea 
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                value={description} 
                onChange={e => setDescription(e.target.value)} 
                placeholder="Describe what the session is about, benefits, etc."
                rows="3"
              />
              <p className="text-xs text-gray-500 mt-1">E.g., "A gentle flow to awaken your body and mind. Ideal for beginners."</p>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tags</label>
              <input 
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                value={tags} 
                onChange={e => setTags(e.target.value)} 
                placeholder="yoga, meditation, mindfulness (comma-separated)"
              />
              <p className="text-xs text-gray-500 mt-1">Add relevant tags to help others discover your session</p>
            </div>
            


            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Duration (minutes)</label>
              <input 
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                type="number"
                value={duration} 
                onChange={e => setDuration(e.target.value)} 
                placeholder="15, 30, 60"
              />
              <p className="text-xs text-gray-500 mt-1">How long the session takes to complete</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Instructor Name</label>
              <input 
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                value={instructorName} 
                onChange={e => setInstructorName(e.target.value)} 
                placeholder="Enter instructor name"
              />
              <p className="text-xs text-gray-500 mt-1">Name of the instructor leading this session</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Level</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                value={level} 
                onChange={e => setLevel(e.target.value)}
              >
                <option value="">Select a level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">Difficulty level of the session</p>
            </div>



            <div className="pt-6 border-t border-gray-200">
              <div className="flex gap-4">
                <Button 
                  type="button" 
                  onClick={handleSaveDraft} 
                  disabled={saving || !title}
                  className="flex-1 bg-gray-600 hover:bg-gray-700"
                >
                  {saving ? "Saving..." : "Save as Draft"}
                </Button>
                <Button 
                  type="button" 
                  onClick={handlePublish} 
                  disabled={saving || !title}
                  className="flex-1"
                >
                  {saving ? "Publishing..." : "Publish Session"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}