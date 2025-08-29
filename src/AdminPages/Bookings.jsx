import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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
    meeting_link: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchBookings();
    fetchUsers();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
      toast.error("Failed to load bookings");
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, meeting_link: undefined }; // backend will generate Google Meet link
      const res = await axios.post(
        "http://127.0.0.1:8000/api/bookings",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.booking) {
        toast.success(
          `Booking created! Google Meet link: ${
            res.data.meeting_link ?? "Not created"
          }`
        );
        setForm({
          user_id: "",
          date: "",
          start_time: "",
          end_time: "",
          status: "pending",
          notes: "",
          meeting_type: "none",
          meeting_link: "",
        });
        fetchBookings();
      }
    } catch (err) {
      console.error("Booking creation failed:", err.response ?? err);
      toast.error(
        `Failed to create booking: ${
          err.response?.data?.error ?? "Check console"
        }`
      );
    }
  };

  const handleConfirm = async (id) => {
    try {
      const res = await axios.put(
        `http://127.0.0.1:8000/api/bookings/${id}`,
        { status: "confirmed" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Booking confirmed!");
      fetchBookings();

      const updatedBooking = res.data.data;
      if (updatedBooking?.meeting_link) {
        window.location.href = updatedBooking.meeting_link;
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to confirm booking");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this booking?")) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Booking deleted!");
      fetchBookings();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete booking");
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-4xl mb-4 text-center font-semibold text-emerald-700">
        Bookings
      </h1>

      {/* Booking Form */}
      <div className="flex justify-center mb-4">
        <form onSubmit={handleSubmit} className="grid gap-2 w-[400px]">
          {/* <select
            name="meeting_type"
            value={form.meeting_type}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="none">No Meeting Link</option>
            <option value="zoom">Zoom</option>
            <option value="google">google</option>
            <option value="zego">Video Call (Zego)</option>
          </select> */}
          <select
            name="meeting_type"
            value={form.meeting_type}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            {console.log(form.meeting_type)}
            <option value="none">No Meeting Link</option>
            <option value="zoom">Zoom</option>
            <option value="google">Google Meet</option>
            <option value="zego">Video Call (Zego)</option>
          </select>
          <select
            name="user_id"
            value={form.user_id}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          >
            <option value="">Select User</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />

          <input
            type="time"
            name="start_time"
            value={form.start_time}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />

          <input
            type="time"
            name="end_time"
            value={form.end_time}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <button className="bg-green-600 text-white rounded py-2">
            Add Booking
          </button>
        </form>
      </div>

      {/* Booking Table */}
      <table className="w-full border border-gray-300 text-sm">
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
                  <span className="text-gray-500">⏳ Waiting</span>
                ) : (
                  <span className="text-red-500">No Link</span>
                )}
              </td>
              <td className="border p-2">
                {b.status === "pending" ? (
                  <button
                    onClick={() => handleConfirm(b.id)}
                    className="bg-green-500 text-white px-2 py-1 rounded"
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
