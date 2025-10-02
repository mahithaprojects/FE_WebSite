import React, { useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE } from "../config"; // or replace with your base URL string

export default function CreateUser() {
  const [form, setForm] = useState({ id: "", name: "", department: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const [type, setType] = useState("info"); // success | error | info

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);

    // simple required checks
    if (!form.id.trim() || !form.name.trim() || !form.department.trim()) {
      setType("error");
      setMsg("Please fill all fields (ID, Name, Department).");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          id: isNaN(Number(form.id)) ? form.id : Number(form.id),
          name: form.name,
          department: form.department,
        }),
      });

      if (!res.ok) {
        let msg = res.statusText;
        try {
          const body = await res.json();
          if (body?.message) msg = body.message;
        } catch {}
        throw new Error(msg || `Request failed with ${res.status}`);
      }

      const data = await res.json().catch(() => ({}));
      setType("success");
      setMsg(
        Object.keys(data || {}).length
          ? `Success:\n${JSON.stringify(data, null, 2)}`
          : "Success: User created."
      );
      setForm({ id: "", name: "", department: "" });
    } catch (err) {
      setType("error");
      setMsg(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container narrow">
      <Link to="/" className="back-link">← Back</Link>
      <h1 className="title">Create User</h1>

      <form onSubmit={onSubmit} className="stack">
        <label className="label" htmlFor="id">ID</label>
        <input
          id="id"
          name="id"
          className="input"
          placeholder="e.g., 2"
          value={form.id}
          onChange={onChange}
        />

        <label className="label" htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          className="input"
          placeholder="e.g., mahi"
          value={form.name}
          onChange={onChange}
        />

        <label className="label" htmlFor="department">Department</label>
        <input
          id="department"
          name="department"
          className="input"
          placeholder="e.g., IT"
          value={form.department}
          onChange={onChange}
        />

        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Posting..." : "Post to /users"}
        </button>
      </form>

      {msg && <pre className={`message ${type}`}>{msg}</pre>}
    </div>
  );
}
