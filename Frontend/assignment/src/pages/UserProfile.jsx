import { useEffect, useState } from 'react';
import axios from 'axios';
import './css/UserProfile.css';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('https://projects-5epb.onrender.com/getUser', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data.data);
      } catch (err) {
        setMessage(err.response?.data?.message || 'Failed to load user');
      }
    };

    if (token) fetchUser();
  }, [token]);

  if (message) return <p className="user-message">{message}</p>;
  if (!user) return <p className="user-message">Loading...</p>;

  return (
    <div className="user-profile-container">
      <div className="top-bar">
        <h2>User Profile</h2>
        <Link to="/" className="back-button">Back to Home</Link>
      </div>
      <div className="user-info">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
};

export default UserProfile;