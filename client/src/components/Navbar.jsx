import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../services/auth.js';

const Navbar = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link className="brand" to="/">
        EstateHub
      </Link>
      <div>
        <Link to="/properties">Properties</Link>
        {user && <Link to="/favorites">Favorites</Link>}
        {user && <Link to="/dashboard">Dashboard</Link>}
        {user ? (
          <>
            <Link to="/profile">{user.name}</Link>
            <a onClick={handleLogout} href="#logout">
              Logout
            </a>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
