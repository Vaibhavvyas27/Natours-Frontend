import React from 'react';
import { NavLink } from 'react-router-dom';

NavLink

const SideNav = () => {
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <NavLink className="nav-link collapsed" to="./dashboard">
            <i className="bi bi-grid"></i>
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link collapsed" to="./tours">
            <i className="bi bi-luggage-fill"></i>
            <span>Tours</span>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default SideNav;
