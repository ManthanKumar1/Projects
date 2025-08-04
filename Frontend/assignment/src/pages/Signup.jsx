import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/Signup.css'; // Create this CSS file

const Signup = ({ onLogin }) => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('https://projects-5epb.onrender.com/signup', formData);
      setMessage(res.data.message);
      sessionStorage.setItem('token', res.data.data.token);
      onLogin();
      navigate('/');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Signup</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Signup;