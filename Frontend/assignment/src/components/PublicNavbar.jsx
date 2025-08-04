import { Link } from 'react-router-dom';
import './PublicNavbar.css';

const PublicNavbar = () => {
  return (
    <nav className="public-navbar">
      <Link to="/signup">Signup</Link>
      <Link to="/">Login</Link>
    </nav>
  );
};

export default PublicNavbar;