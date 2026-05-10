import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container navbar-inner">

        <NavLink to="/" className="navbar-brand">
          Book<span>Shelf</span>
        </NavLink>

        <ul className="navbar-links">
          <li>
            <NavLink to="/" end>Home</NavLink>
          </li>
          <li>
            <NavLink to="/books">All Books</NavLink>
          </li>
          <li>
            <NavLink to="/books/new" className="btn btn-primary btn-sm">
              + Add Book
            </NavLink>
          </li>
        </ul>

      </div>
    </nav>
  );
}