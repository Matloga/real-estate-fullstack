import React, { useState } from "react";

export default function InquiryForm({ onSubmit }) {
  const [form, setForm] = useState({ message: "" });

  const handleChange = (e) => setForm({ message: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(form);
    setForm({ message: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
      <textarea value={form.message} onChange={handleChange} placeholder="Message" rows={3} style={{ width: "100%" }} />
      <button type="submit" style={{ marginTop: 8 }}>Contact Agent</button>
    </form>
  );
}
