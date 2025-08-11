import { useEffect } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Users from "../AdminPages/Users";
import Bookings from "../AdminPages/Bookings";
import Availabilities from "../AdminPages/Availabilities";
import Holidays from "../AdminPages/Holidays";
import api from "../api";
import GoogleMeeting from "../GoogleMeeting/Goolemetting";
import Createmeeting from "../components/Createmeeting";
import Videocall from "../components/Videocall";
export default function AdminDashBoard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);
  function handleLogout() {
    api
      .post("/logout")
      .then(() => {
        localStorage.removeItem("token");
        window.location.href = "/";
      })
      .catch((err) => {
        console.error("Logout failed:", err);

        localStorage.removeItem("token");
        window.location.href = "/";
      });
  }
  const handleGoogleConnect = () => {
    // user must be logged in (session cookie present)
    window.location.href = "http://127.0.0.1:8000/oauth/google";
  };
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4 space-y-4">
        <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
        <nav className="space-y-2">
          <Link to="users" className="block hover:bg-gray-700 p-2 rounded">
            Users
          </Link>
          <Link to="bookings" className="block hover:bg-gray-700 p-2 rounded">
            Bookings
          </Link>
          <Link
            to="availabilities"
            className="block hover:bg-gray-700 p-2 rounded"
          >
            Availabilities
          </Link>
          <Link to="holidays" className="block hover:bg-gray-700 p-2 rounded">
            Holidays
          </Link>
          <Link
            to="activity-logs"
            className="block hover:bg-gray-700 p-2 rounded"
          >
            Activity Logs
          </Link>
          <Link
            to="google-meeting"
            className="block hover:bg-gray-700 p-2 rounded"
          >
            Google Meeting
          </Link>
          <Link to="/room" className="block hover:bg-gray-700 p-2 rounded">
            Video Call
          </Link>
        </nav>
        <div className="mt-6 space-y-2">
          <button
            onClick={handleGoogleConnect}
            className="w-full bg-green-600 p-2 rounded hover:bg-green-700"
          >
            Connect Google
          </button>
          <GoogleMeeting />
        </div>
        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-500 p-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <Routes>
          <Route path="users" element={<Users />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="availabilities" element={<Availabilities />} />
          <Route path="holidays" element={<Holidays />} />
          <Route path="google-meeting" element={<Createmeeting />} />
          <Route path="/room" element={<Videocall />} />
        </Routes>
      </div>
    </div>
  );
}
