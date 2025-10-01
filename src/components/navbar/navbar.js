import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import logo from "../../images/JOEKA.png";

const categories = [
  "Shirts",
  "Tees",
  "Hoodies & Sweatshirts",
  "Tank Tops",
  "Hats / Caps",
  "Shortsuits & Plays",
  "Bold Exclusives",
  "Accessories",
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false);
  const catRef = useRef(null);
  const profileRef = useRef(null);
  const drawerRef = useRef(null);
  const menuRef = useRef(null);

  // Helper function to convert category name to URL parameter
  const getCategoryParam = (categoryName) => {
    return categoryName
      .toLowerCase()
      .replace(/ & /g, "-")
      .replace(/ /g, "-");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      // close categories dropdown if clicking outside it
      if (catRef.current && !catRef.current.contains(e.target)) {
        setCatOpen(false);
      }
      // close profile dropdown if clicking outside it
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }

      // For mobile: only close the mobile drawer when clicking outside BOTH the toggle button and the drawer itself.
      if (menuOpen && window.innerWidth < 992) {
        const clickedOutsideToggle =
          menuRef.current && !menuRef.current.contains(e.target);
        const clickedOutsideDrawer =
          drawerRef.current && !drawerRef.current.contains(e.target);
        if (clickedOutsideToggle && clickedOutsideDrawer) {
          setMenuOpen(false);
          // also close categories when drawer closes
          setCatOpen(false);
          // also close any profile dropdowns
          setProfileOpen(false);
          setMobileProfileOpen(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  // close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <NavContainer>
      <div className="nav-inner">
        <div className="left">
          <Link to="/" className="logo-link" aria-label="Home">
            <img src={logo} alt="Joeka logo" />
          </Link>
        </div>

        <div className="center desktop-only">
          <nav className="main-nav">
            <div
              className="nav-item dropdown"
              onMouseEnter={() => setCatOpen(true)}
              onMouseLeave={() => setCatOpen(false)}
              ref={catRef}
            >
              <button
                className="dropdown-toggle"
                onClick={() => setCatOpen((s) => !s)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setCatOpen(false);
                  if (e.key === "Enter" || e.key === " ") setCatOpen((s) => !s);
                }}
                aria-expanded={catOpen}
                aria-haspopup="true"
                aria-controls="categories-menu"
              >
                Shop by Categories <FiChevronDown />
              </button>
              <ul
                id="categories-menu"
                className={`dropdown-menu ${catOpen ? "show" : ""}`}
              >
                {categories.map((cat) => (
                  <li key={cat}>
                    <Link
                      to={`/shop?cat=${getCategoryParam(cat)}`}
                      onClick={() => setCatOpen(false)}
                    >
                      {cat}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className="right">
          <div className="actions desktop-only">
            <div
              className="action-link dropdown"
              ref={profileRef}
              onMouseEnter={() => setProfileOpen(true)}
              onMouseLeave={() => setProfileOpen(false)}
            >
              <button
                className="dropdown-toggle"
                onClick={() => setProfileOpen((s) => !s)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setProfileOpen(false);
                  if (e.key === "Enter" || e.key === " ")
                    setProfileOpen((s) => !s);
                }}
                aria-expanded={profileOpen}
                aria-haspopup="true"
                aria-controls="profile-menu"
              >
                <FiUser /> Profile <FiChevronDown />
              </button>
              <ul
                id="profile-menu"
                className={`dropdown-menu ${profileOpen ? "show" : ""}`}
              >
                <li>
                  <Link to="/signin" onClick={() => setProfileOpen(false)}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/account" onClick={() => setProfileOpen(false)}>
                    My Account
                  </Link>
                </li>
              </ul>
            </div>

            <Link to="/cart" className="cart-link" aria-label="Cart">
              <AiOutlineShoppingCart size={20} />
            </Link>
          </div>

          <button
            className="menu-toggle mobile-only"
            onClick={() => setMenuOpen((s) => !s)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            ref={menuRef}
          >
            {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`mobile-drawer ${menuOpen ? "open" : ""}`}
        ref={drawerRef}
      >
        <nav className="mobile-nav" aria-hidden={!menuOpen}>
          <div className="mobile-section">
            <button
              className="drawer-dropdown-toggle"
              type="button"
              onClick={() => setCatOpen((s) => !s)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setCatOpen(false);
              }}
              aria-expanded={catOpen}
              aria-controls="drawer-cats"
            >
              Shop by Categories <FiChevronDown />
            </button>
            <ul
              id="drawer-cats"
              className={`drawer-cats ${catOpen ? "show" : ""}`}
            >
              {categories.map((c) => (
                <li key={c}>
                  <Link
                    to={`/shop?cat=${getCategoryParam(c)}`}
                    onClick={() => {
                      setMenuOpen(false);
                      setCatOpen(false);
                    }}
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <Link
            to="/new-arrivals"
            className="mobile-link"
            onClick={() => setMenuOpen(false)}
          >
            New Arrivals
          </Link>
          <Link
            to="/story"
            className="mobile-link"
            onClick={() => setMenuOpen(false)}
          >
            Story
          </Link>

          <div className="mobile-actions">
            <div className="mobile-profile">
              <button
                type="button"
                className="drawer-dropdown-toggle"
                onClick={() => setMobileProfileOpen((s) => !s)}
                aria-expanded={mobileProfileOpen}
                aria-controls="mobile-profile-list"
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                  }}
                >
                  <FiUser /> Account
                </span>
                <FiChevronDown />
              </button>
              <ul
                id="mobile-profile-list"
                className={`drawer-cats ${mobileProfileOpen ? "show" : ""}`}
              >
                <li>
                  <Link
                    to="/signin"
                    onClick={() => {
                      setMenuOpen(false);
                      setMobileProfileOpen(false);
                    }}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/account"
                    onClick={() => {
                      setMenuOpen(false);
                      setMobileProfileOpen(false);
                    }}
                  >
                    My Account
                  </Link>
                </li>
              </ul>
            </div>

            <Link
              to="/cart"
              className="mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              <AiOutlineShoppingCart /> Cart
            </Link>
          </div>
        </nav>
      </div>
    </NavContainer>
  );
};

// ...existing styled component...
const NavContainer = styled.header`
  --nav-height: 7.2rem;
  background: #d4af37;
  height: var(--nav-height);
  display: flex;
  align-items: center;
  position: relative;
  z-index: 40;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.05);

  .nav-inner {
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 1.6rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .left img {
    height: 4.6rem;
    object-fit: contain;
  }

  .center {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  .main-nav {
    display: flex;
    gap: 3rem;
    align-items: center;
    font-family: "Montserrat", sans-serif;
    font-size: 1.6rem;
  }

  .nav-item {
    color: #000;
    text-decoration: none;
    padding: 0.4rem 0.2rem;
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
  }

  .nav-item:hover,
  .nav-item:focus {
    outline: none;
    border-bottom: 2px solid rgba(0, 0, 0, 0.2);
  }

  .dropdown {
    position: relative;
  }

  .dropdown-toggle {
    background: transparent;
    border: none;
    font: inherit;
    color: #000;
    display: inline-flex;
    gap: 0.6rem;
    align-items: center;
    cursor: pointer;
    padding: 0;
  }

  /* rotate chevron when dropdown open */
  .dropdown-toggle[aria-expanded="true"] svg,
  .drawer-dropdown-toggle[aria-expanded="true"] svg {
    transform: rotate(180deg);
    transition: transform 180ms ease;
  }

  .dropdown-menu {
    position: absolute;
    top: calc(100% + 0.6rem);
    left: 0;
    background: #fff;
    min-width: 22rem;
    border-radius: 4px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
    padding: 0.8rem 0;
    opacity: 0;
    transform-origin: top center;
    transform: translateY(-6px) scale(0.98);
    transition: opacity 180ms ease, transform 180ms ease;
    pointer-events: none;
    z-index: 9999;
  }

  .dropdown-menu.show {
    opacity: 1;
    transform: translateY(0) scale(1);
    pointer-events: auto;
  }

  .dropdown-menu li {
    list-style: none;
  }
  .dropdown-menu a {
    display: block;
    padding: 0.6rem 1.2rem;
    color: #111;
    text-decoration: none;
    font-size: 1.4rem;
  }
  .dropdown-menu a:hover {
    background: rgba(0, 0, 0, 0.03);
  }

  .right {
    display: flex;
    align-items: center;
    gap: 1.8rem;
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .action-link {
    display: inline-flex;
    gap: 0.6rem;
    align-items: center;
    color: #000;
    text-decoration: none;
    font-size: 1.6rem;
  }

  .cart-link {
    color: #000;
    text-decoration: none;
  }

  /* profile dropdown adjustments */
  .action-link.dropdown {
    position: relative;
  }
  #profile-menu {
    min-width: 16rem;
  }

  .menu-toggle {
    background: transparent;
    border: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.6rem;
    cursor: pointer;
  }

  /* Mobile drawer */
  .mobile-drawer {
    position: fixed;
    top: var(--nav-height);
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.25);
    transform: translateY(-6px);
    opacity: 0;
    pointer-events: none;
    transition: opacity 180ms ease, transform 180ms ease;
  }
  .mobile-drawer.open {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }
  .mobile-nav {
    background: #fff;
    width: 100%;
    max-width: 420px;
    height: 100%;
    padding: 2.4rem 1.6rem;
    overflow-y: auto;
    box-shadow: 2px 0 18px rgba(0, 0, 0, 0.12);
  }
  .mobile-section {
    margin-bottom: 1.2rem;
  }
  .drawer-dropdown-toggle {
    width: 100%;
    text-align: left;
    background: transparent;
    border: none;
    padding: 0.8rem 0;
    font-size: 1.6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }
  .drawer-cats {
    max-height: 0;
    overflow: hidden;
    transition: max-height 220ms ease;
    padding-left: 0.4rem;
  }
  .drawer-cats.show {
    max-height: 500px;
  }
  .drawer-cats li {
    list-style: none;
  }
  .drawer-cats a {
    display: block;
    padding: 0.6rem 0;
    color: #111;
    text-decoration: none;
    font-size: 1.5rem;
  }

  .mobile-profile .drawer-dropdown-toggle {
    padding: 0.6rem 0;
  }

  .mobile-link {
    display: block;
    padding: 1rem 0;
    border-top: 1px solid rgba(0, 0, 0, 0.04);
    color: #111;
    text-decoration: none;
    font-size: 1.6rem;
  }

  .mobile-actions {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  /* responsive rules */
  .desktop-only {
    display: none;
  }
  .mobile-only {
    display: inline-flex;
  }

  @media (min-width: 992px) {
    height: var(--nav-height);
    .mobile-only {
      display: none;
    }
    .desktop-only {
      display: block;
    }
    .mobile-drawer {
      display: none;
    }
    .nav-inner {
      padding: 0 3.2rem;
      align-items: center;
    }
    .left img {
      height: 5.2rem;
    }
    .main-nav {
      gap: 3.6rem;
    }
  }
`;

export default Navbar;