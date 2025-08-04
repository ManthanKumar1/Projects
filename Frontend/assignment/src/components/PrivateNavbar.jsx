import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './PrivateNavbar.css';

const PrivateNavbar = ({ onLogout }) => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    onLogout();
    navigate('/');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search.trim())}`);
      setSearch('');
    }
  };

  return (
    <nav className="private-navbar">
      <div className="nav-links">
        <Link to="/home">Home</Link>
        <Link to="/addbook">Add Book</Link>
        <Link to="/manage-requests">Manage Requests</Link>
        <Link to="/sold-bought-books">Sold/Bought Books</Link>
        <Link to="/profile">Profile</Link>
      </div>

      <form onSubmit={handleSearchSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search by title or author"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <button onClick={handleLogout} className="logout-btn">Logout</button>
    </nav>
  );
};

export default PrivateNavbar;