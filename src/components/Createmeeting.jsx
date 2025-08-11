import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Createmeeting = () => {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();
  const handleCreateMeeting = () => {
    if (!roomId.trim()) {
      alert("Please enter a valid Room ID");
      return;
    }

    navigate(`/room?roomId=${encodeURIComponent(roomId)}`);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        margin: "auto",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Video Call - Create Meeting for Everyone
      </Typography>
      <div style={{ display: "flex", gap: "16px" }}>
        <TextField
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Enter Room Id"
          size="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateMeeting}
        >
          Create Meeting
        </Button>
      </div>
    </div>
  );
};

export default Createmeeting;
