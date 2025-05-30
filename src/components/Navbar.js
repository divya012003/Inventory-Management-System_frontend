import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <style>{`
        nav {
          background-color: #1e40af; /* deep blue */
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.6rem 1rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          position: sticky;
          top: 0;
          z-index: 1000;
        }
        .nav-brand {
          font-weight: 700;
          font-size: 1.3rem;
          user-select: none;
        }
        .nav-links {
          display: flex;
          gap: 1.2rem;
          align-items: center;
        }
        .nav-links a {
          color: white;
          text-decoration: none;
          font-weight: 600;
          padding: 0.4rem 0.7rem;
          border-radius: 5px;
          transition: background-color 0.3s ease;
        }
        .nav-links a:hover {
          background-color: #2563eb;
        }
        button.logout-btn {
          background-color: #ef4444;
          border: none;
          color: white;
          padding: 0.4rem 0.8rem;
          border-radius: 5px;
          cursor: pointer;
          font-weight: 600;
          transition: background-color 0.3s ease;
        }
        button.logout-btn:hover {
          background-color: #dc2626;
        }
        .hamburger {
          display: none;
          flex-direction: column;
          cursor: pointer;
          gap: 5px;
        }
        .hamburger div {
          width: 25px;
          height: 3px;
          background-color: white;
          border-radius: 3px;
          transition: all 0.3s ease;
        }
        /* Animate hamburger to cross */
        .hamburger.open div:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }
        .hamburger.open div:nth-child(2) {
          opacity: 0;
        }
        .hamburger.open div:nth-child(3) {
          transform: rotate(-45deg) translate(6px, -6px);
        }

        /* Mobile styles */
        @media (max-width: 768px) {
          .nav-links {
            position: fixed;
            top: 56px;
            right: 0;
            background-color: #1e40af;
            height: calc(100% - 56px);
            width: 220px;
            flex-direction: column;
            padding: 1.5rem 1rem;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            box-shadow: -2px 0 8px rgba(0,0,0,0.25);
          }
          .nav-links.open {
            transform: translateX(0);
          }
          nav {
            position: fixed;
            width: 100%;
          }
          .hamburger {
            display: flex;
          }
          .nav-links a, .logout-btn {
            font-size: 1.1rem;
            margin-bottom: 1rem;
            width: 100%;
            text-align: left;
          }
          button.logout-btn {
            width: 100%;
          }
        }
      `}</style>

      <nav>
        <div className="nav-brand">Inventory Management System</div>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          {user ? (
            <>
              
              <Link to="/wishlist" onClick={closeMenu}>
                Wishlist
              </Link>
              <Link to="/add" onClick={closeMenu}>
                Add Product
              </Link>
              <button
                className="logout-btn"
                onClick={() => {
                  logout();
                  closeMenu();
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/register" onClick={closeMenu}>
                Register
              </Link>
              <Link to="/login" onClick={closeMenu}>
                Login
              </Link>
              <Link to="/" onClick={closeMenu}>
                Add Product
              </Link>
              <Link to="/" onClick={closeMenu}>
                Products
              </Link>
            </>
          )}
        </div>

        <div
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") toggleMenu();
          }}
        >
          <div />
          <div />
          <div />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
