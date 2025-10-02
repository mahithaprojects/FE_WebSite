import React, { useState } from "react";
import { API_BASE } from "../config";

export default function GetUser() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

const handleFetch = async () => {
  try {
    const res = await fetch(`${API_BASE}/user/${encodeURIComponent(name)}`);
    if (!res.ok) throw new Error("User not found");
    const data = await res.json();
    setMessage("✅ Success: " + JSON.stringify(data));
  } catch (err) {
    setMessage("❌ Error: " + err.message);
  }
};

  return (
    <div className="container">
      <h1>Get User</h1>
      <input
        type="text"
        placeholder="Enter username"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleFetch}>Get User</button>
      <p>{message}</p>
    </div>
  );
}
