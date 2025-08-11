import React, { useEffect, useState } from "react";
import api from "../api";

export default function ActivityLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    api.get("/activity-logs").then((res) => setLogs(res.data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Activity Logs</h1>
      <table className="w-full border border-gray-300 text-sm">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">User</th>
            <th className="border p-2">Action</th>
            <th className="border p-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td className="border p-2">{log.id}</td>
              <td className="border p-2">{log.causer}</td>
              <td className="border p-2">{log.description}</td>
              <td className="border p-2">{log.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
