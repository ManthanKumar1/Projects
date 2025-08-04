import { useEffect, useState } from 'react';
import axios from 'axios';
import './css/UserProfile.css';
import { Link, useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          'https://projects-5epb.onrender.com/getUser',
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUser(res.data.data);
        setUsername(res.data.data.username);
        setEmail(res.data.data.email);
      } catch (err) {
        setMessage(err.response?.data?.message || 'Failed to load user');
      }
    };

    if (token) fetchUser();
  }, [token]);

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        'https://projects-5epb.onrender.com/updateUser',
        { username, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(res.data.data);
      setMessage('User updated successfully.');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to update user');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        'https://projects-5epb.onrender.com/deleteUser',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      sessionStorage.clear();
      navigate('/login'); // Or redirect elsewhere after delete
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to delete user');
    }
  };

  if (message) return <p className="user-message">{message}</p>;
  if (!user) return <p className="user-message">Loading...</p>;

  return (
    <div className="user-profile-container">
      <div className="top-bar">
        <h2>User Profile</h2>
        <Link to="/home" className="back-button">Back to Home</Link>
      </div>

      <div className="user-info">
        <label>
          <strong>Username:</strong>
          <input value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          <strong>Email:</strong>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
      </div>

      <div className="button-group">
        <button className="update-btn" onClick={handleUpdate}>Update</button>
        <button className="delete-btn" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default UserProfile;