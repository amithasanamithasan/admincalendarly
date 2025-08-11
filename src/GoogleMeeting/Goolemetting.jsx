import React from "react";

import api from "../api";
const GoogleMeeting = () => {
  const createMeeting = async () => {
    try {
      // optional body can include summary, start, end
      const body = {
        summary: "Client Call",
        start: new Date(Date.now() + 3600 * 1000).toISOString(),
        end: new Date(Date.now() + 5400 * 1000).toISOString(),
      };

      const res = await api.post("/google/meeting", body);
      console.log(res.data);
      // show hangout link if present
      const link =
        res.data.hangoutLink ??
        res.data.conferenceData["entryPoints"]?.[0]?.uri ??
        null;
      if (link) window.open(link, "_blank");
      else alert("Meeting created — check response in console");
    } catch (err) {
      console.error(err.response?.data ?? err.message);
      alert(
        "Failed to create meeting: " +
          (err.response?.data?.message ?? err.message)
      );
    }
  };

  return (
    <div>
      <h2>Google Meeting</h2>
      <button className="mt-6 space-y-2" onClick={createMeeting}>
        Create Google Meet
      </button>
    </div>
  );
};

export default GoogleMeeting;
