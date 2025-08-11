import React, { useEffect, useState } from "react";
import api from "../api";
import { toast } from "react-toastify";
import axios from "axios";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    user_id: "",
    date: "",
    start_time: "",
    end_time: "",
    status: "pending",
    notes: "",
    meeting_type: "none",
    meeting_link: "http://localhost:5173/room?roomId=room1",
  });

  useEffect(() => {
    fetchBookings();
    fetchUsers();
  }, []);
  // const handleConfirm = async (id) => {
  //   try {
  //     const token = localStorage.getItem("token");

  //     await axios.put(
  //       `http://127.0.0.1:8000/api/bookings/${id}`,
  //       { status: "confirmed" },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     toast.success("✅ Booking confirmed!");
  //     fetchBookings();
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("❌ Failed to confirm booking");
  //   }
  // };
  // Confirm & redirect function
  const handleConfirm = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://127.0.0.1:8000/api/bookings/${id}`,
        { status: "confirmed" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Booking confirmed!");

      fetchBookings();

      const updatedBooking = res.data.data;
      if (updatedBooking.meeting_link) {
        window.location.href = updatedBooking.meeting_link;
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to confirm booking");
    }
  };
  // const fetchBookings = async () => {
  //   const res = await api.get("/bookings");
  //   setBookings(res.data);
  // };
  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://127.0.0.1:8000/api/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load bookings");
    }
  };
  const fetchUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Sending form data:", form);

    try {
      await api.post("/bookings", form, { withCredentials: true });
      alert("Booking created!");
      fetchBookings();
      setForm({
        user_id: "",
        date: "",
        start_time: "",
        end_time: "",
        status: "pending",
        notes: "",
        meeting_type: "none",
        meeting_link: "http://localhost:5173/room?roomId=room1",
      });
    } catch (err) {
      console.error(err.response?.data);
      alert("Error: " + JSON.stringify(err.response?.data.errors));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this booking?")) {
      await api.delete(`/bookings/${id}`);
      fetchBookings();
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-4xl mb-4 text-center font-semibold text-emerald-700 ">
        Bookings
      </h1>
      <div className=" text-center justify-center items-center flex ">
        <form
          onSubmit={handleSubmit}
          className="mb-2 grid grid-cols-1 gap-2 text-sm space-y-3 "
        >
          <select
            name="meeting_type"
            value={form.meeting_type}
            onChange={handleChange}
            className="border p-2 rounded w-[400px]"
          >
            <option value="none">No Meeting Link</option>
            <option value="zoom">Zoom</option>
            <option value="google">Google Meet</option>
            <option value="zego">Video Call (Zego)</option>
          </select>

          <select
            name="user_id"
            value={form.user_id}
            onChange={handleChange}
            className="border p-2 w-[400px]"
            required
          >
            <option value="">Select User</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
          <input
            type="url"
            name="meeting_link"
            value={form.meeting_link}
            onChange={handleChange}
            placeholder="Meeting Link"
            className="border p-2 rounded col-span-1 w-[400px]"
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="border p-2 w-[400px]"
            required
          />

          <input
            type="time"
            name="start_time"
            value={form.start_time}
            onChange={handleChange}
            className="border p-2 w-[400px]"
            required
          />

          <input
            type="time"
            name="end_time"
            value={form.end_time}
            onChange={handleChange}
            className="border p-2 w-[400px]"
            required
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="border p-2 w-[400px]"
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <div>
            <button className="bg-green-600 text-white w-[320px] h-[38px] rounded py-1">
              Add
            </button>
          </div>
        </form>
      </div>

      <table className="w-full border border-gray-300 text-sm my-6">
        <thead>
          <tr>
            <th className="border p-1">ID</th>
            <th className="border p-1">User</th>
            <th className="border p-1">Booked By</th>
            <th className="border p-1">Date</th>
            <th className="border p-1">Time</th>
            <th className="border p-1">Meeting Type</th>
            <th className="border p-1">Meeting Link</th>
            <th className="border p-1">Status</th>
            <th className="border p-1">Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td className="border p-2">{b.id}</td>
              <td className="border p-2">{b.user?.name}</td>
              <td className="border p-2">{b.booked_by?.name || "Admin"}</td>
              <td className="border p-2">{b.date}</td>

              <td className="border p-2">
                {b.start_time} - {b.end_time}
              </td>
              <td className="border p-2">{b.meeting_type}</td>
              <td className="border p-2">
                {b.status === "confirmed" && b.meeting_link ? (
                  <a
                    href={b.meeting_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Join Meeting
                  </a>
                ) : b.status === "pending" ? (
                  <span className="text-gray-500">
                    ⏳ Waiting for confirmation
                  </span>
                ) : (
                  <span className="text-red-500">No Meeting Link</span>
                )}
              </td>
              <td className="border p-2">
                {b.status === "pending" ? (
                  <button
                    onClick={() => handleConfirm(b.id)}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Confirm
                  </button>
                ) : (
                  <span
                    className={`px-2 py-1 rounded ${
                      b.status === "confirmed"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {b.status}
                  </span>
                )}
              </td>
              <td className="border p-2">
                <button
                  onClick={() => handleDelete(b.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
