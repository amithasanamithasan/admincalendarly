import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    if (!email || !password) {
      toast.error("⚠️ Please fill in all fields!");
      return;
    }

    try {
      setLoading(true);

      // ১. CSRF cookie নাও
      await axios.get("/sanctum/csrf-cookie");

      // ২. Login API কল করো withCredentials:true
      const { data } = await axios.post(
        "/api/login",
        { email, password },
        { withCredentials: true }
      );

      if (data?.token) {
        console.log(data.token);
        localStorage.setItem("token", data.token);
        toast.success("✅ Login Successful!");
        navigate("/admin");
      } else {
        toast.error("❌ Token not received from server!");
      }
    } catch (error) {
      console.error("Login Error:", error);
      if (error.response) {
        toast.error(error.response.data.message || "❌ Invalid credentials!");
      } else {
        toast.error("❌ Network error! Please try again.");
      }
    } finally {
      setLoading(false);
      form.reset();
    }
  };

  const createMeeting = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/google/meeting",
        { withCredentials: true }
      );
      console.log("Meeting Created:", response.data);

      alert(`Meeting Link: ${response.data.hangoutLink}`);
      window.open(response.data.hangoutLink, "_blank");
    } catch (error) {
      console.error(
        "Meeting creation error:",
        error.response?.data || error.message
      );
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-100 to-purple-100 flex items-center justify-center p-6 ">
      <div className="flex lg:flex-row max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className=" p-10">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div className="mb-4 w-[300px]">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            {/* Password */}
            <div className="mb-4 w-[300px]">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                  className="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full sm:w-[300px] bg-gradient-to-r from-black to-pink-900 text-white py-3 rounded-full text-lg font-semibold transition duration-300 hover:opacity-90 ${
                  loading && "opacity-70 cursor-not-allowed"
                }`}
              >
                Log In
              </button>

              <ToastContainer />
              <button
                onClick={createMeeting}
                className="mt-4 px-6 py-2 bg-red-600 text-white font-semibold rounded"
              >
                Continue with Google
              </button>
            </div>
          </form>

          <div className="text-right mt-2"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
