import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { logOut } from "../firebase/authService";

export default function Navbar() {
  const { currentUser, userData } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logOut();
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <div className="container navbar-inner">

        <NavLink to="/" className="navbar-brand">
          Book<span>Shelf</span>
        </NavLink>

        <ul className="navbar-links">
          {currentUser ? (
            <>
              <li><NavLink to="/books">All Books</NavLink></li>
              {userData?.role === "admin" && (
                <li><NavLink to="/admin">Admin</NavLink></li>
              )}
              <li><NavLink to="/dashboard">Dashboard</NavLink></li>
              <li><NavLink to="/chat">Chat</NavLink></li>
              <li><NavLink to="/books/new" className="btn btn-primary btn-sm">+ Add Book</NavLink></li>
              <li>
                <button className="btn btn-outline btn-sm" onClick={handleLogout}>
                  Sign Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li><NavLink to="/login">Login</NavLink></li>
              <li><NavLink to="/signup" className="btn btn-primary btn-sm">Sign Up</NavLink></li>
            </>
          )}
        </ul>

      </div>
    </nav>
  );
}
