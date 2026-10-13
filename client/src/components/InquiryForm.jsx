import { useState } from 'react';
import { createInquiry } from '../services/properties.js';

const InquiryForm = ({ propertyId }) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState(null);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createInquiry({ ...form, property: propertyId });
      setStatus('Inquiry sent successfully.');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setStatus(error.response?.data?.message || 'Failed to send inquiry.');
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>Contact Agent</h3>
      <input placeholder="Your name" value={form.name} onChange={set('name')} required />
      <input type="email" placeholder="Email" value={form.email} onChange={set('email')} required />
      <input placeholder="Phone" value={form.phone} onChange={set('phone')} />
      <textarea placeholder="Message" rows="4" value={form.message} onChange={set('message')} required />
      <button type="submit">Send Inquiry</button>
      {status && <p>{status}</p>}
    </form>
  );
};

export default InquiryForm;
