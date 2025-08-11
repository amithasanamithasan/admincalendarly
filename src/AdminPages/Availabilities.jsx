import React, { useEffect, useState } from "react";
import api from "../api";

export default function Availabilities() {
  const [availabilities, setAvailabilities] = useState([]);
  const [form, setForm] = useState({
    user_id: "",
    day_of_week: "monday",
    start_time: "",
    end_time: "",
    repeat_weekly: true,
  });

  const fetchAvailabilities = () => {
    api.get("/availabilities").then((res) => setAvailabilities(res.data));
  };

  useEffect(() => {
    fetchAvailabilities();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/availabilities", form, { withCredentials: true });
    setForm({
      user_id: "",
      day_of_week: "monday",
      start_time: "",
      end_time: "",
      repeat_weekly: true,
    });
    fetchAvailabilities();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Availabilities</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6 flex flex-wrap gap-2">
        <input
          type="number"
          placeholder="User ID"
          value={form.user_id}
          onChange={(e) => setForm({ ...form, user_id: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <select
          value={form.day_of_week}
          onChange={(e) => setForm({ ...form, day_of_week: e.target.value })}
          className="border p-2 rounded"
        >
          {[
            "sunday",
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
          ].map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
        <input
          type="time"
          value={form.start_time}
          onChange={(e) => setForm({ ...form, start_time: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          type="time"
          value={form.end_time}
          onChange={(e) => setForm({ ...form, end_time: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-3 py-2 rounded"
        >
          Add
        </button>
      </form>

      {/* Table */}
      <table className="w-full border border-gray-300 text-sm">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">User ID</th>
            <th className="border p-2">Day</th>
            <th className="border p-2">Start</th>
            <th className="border p-2">End</th>
          </tr>
        </thead>
        <tbody>
          {availabilities.map((a) => (
            <tr key={a.id}>
              <td className="border p-2">{a.id}</td>
              <td className="border p-2">{a.user_id}</td>
              <td className="border p-2">{a.day_of_week}</td>
              <td className="border p-2">{a.start_time}</td>
              <td className="border p-2">{a.end_time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
