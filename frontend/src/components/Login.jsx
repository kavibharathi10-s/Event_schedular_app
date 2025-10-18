import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      login(res.data);
      alert('Login successful!');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
<div className="auth-page">
      <div className="auth-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="auth-fields">
            <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
