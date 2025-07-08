import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Bag, Search } from "react-bootstrap-icons";
import "./Navbar.css";

export default function Navbar({ onCartClick, cartItemsCount }) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <nav className="navbar navbar-expand-lg navbar-elegance px-4 py-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <span className="logo-main">ELEGANCE</span>
          <span className="logo-sub">by fashion house</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <span className="nav-link-inner">Inicio</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                <span className="nav-link-inner">Catálogo</span>
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
              >
                <span className="nav-link-inner">Colecciones</span>
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <Link className="dropdown-item" to="/products?category=women">
                    <span className="d-flex align-items-center">
                      <span className="collection-badge women"></span>
                      Mujer
                    </span>
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/products?category=men">
                    <span className="d-flex align-items-center">
                      <span className="collection-badge men"></span>
                      Hombre
                    </span>
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/products?category=kids">
                    <span className="d-flex align-items-center">
                      <span className="collection-badge kids"></span>
                      Niños
                    </span>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>

          <div className="d-flex align-items-center navbar-actions">
            <div className="search-container me-3">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Buscar..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <button
              className="cart-button position-relative"
              onClick={onCartClick}
            >
              <Bag size={20} className="cart-icon" />
              {cartItemsCount > 0 && (
                <span className="cart-badge position-absolute top-0 start-100 translate-middle">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
