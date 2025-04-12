import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/UserContext";

const Navbar = () => {
  const { user, setUser, admin, setAdmin } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    setAdmin(null);
    localStorage.removeItem("user");
    localStorage.removeItem("admin");
    navigate("/");
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">Vehicle Rental</Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li>
            <details>
              <summary>Services</summary>
              <ul className="bg-base-100 rounded-t-none p-2">
                <li><Link to="/rental-history">My Rentals</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/review">Reviews</Link></li>
                <li><Link to="/rented">Rented</Link></li>
              </ul>
            </details>
          </li>
          {!user && !admin ? (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/admin/login">Admin Login</Link></li>
            </>
          ) : (
            <>
              {admin && <li><Link to="/admin-panel">Admin Panel</Link></li>}
              <li>
                <button onClick={handleLogout} className="btn bg-red-500 text-white">Logout</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;