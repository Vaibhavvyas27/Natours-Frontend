import React from 'react';
import { FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {
  const { currentUser } = useSelector(state => state.user)
  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-between">
        <a href='/' className="logo d-flex align-items-center">
          <img src="/img/logo-green.png" width={170} alt="" />
          <span className="d-none d-lg-block"></span>
        </a>
      </div>
      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          <li className="nav-item d-block d-lg-none">
            <a className="nav-link nav-icon search-bar-toggle " href="#">
              <i className="bi bi-search"></i>
            </a>
          </li>
          <li className="nav-item dropdown pe-3">
            <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
              <img src={currentUser?.photo? currentUser.photo : '/img/users/default.jpg' } alt={`Photo of ${currentUser?.name}`} className="rounded-circle" />
              <span className="d-none d-md-block dropdown-toggle ps-2">{currentUser?.name.split(' ')[0]}</span>
            </a>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              {/* Profile dropdown items */}
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
