import React, { useEffect, useState } from "react";
import api from "../api";

export default function Holidays() {
  const [holidays, setHolidays] = useState([]);
  const [form, setForm] = useState({
    user_id: "",
    date: "",
    reason: "",
  });

  const fetchHolidays = () => {
    api.get("/holidays").then((res) => setHolidays(res.data));
  };

  useEffect(() => {
    fetchHolidays();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/holidays", form, { withCredentials: true });

    setForm({ user_id: "", date: "", reason: "" });
    fetchHolidays();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Holidays</h1>

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
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Reason"
          value={form.reason}
          onChange={(e) => setForm({ ...form, reason: e.target.value })}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-3 py-2 rounded"
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
            <th className="border p-2">Date</th>
            <th className="border p-2">Reason</th>
          </tr>
        </thead>
        <tbody>
          {holidays.map((h) => (
            <tr key={h.id}>
              <td className="border p-2">{h.id}</td>
              <td className="border p-2">{h.user_id}</td>
              <td className="border p-2">{h.date}</td>
              <td className="border p-2">{h.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
