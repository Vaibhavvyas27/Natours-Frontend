import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../redux/user/userSlice';
import { toast } from 'react-toastify';

const url = import.meta.env.VITE_APIURL

function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { currentUser } = useSelector(state => state.user)
  const handleLogout = async() => {
    try {
      await fetch(`${url}api/v1/users/logout`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // credentials: 'include',
      })
      toast.success('Log out SucessFully !!')
      dispatch(signOut())
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <header className="header">
      <nav className="nav nav--tours">
        <NavLink  to="/" className="nav__el">All tours</NavLink>
        {currentUser?
          <NavLink  to="/my-bookings" className="nav__el">My Bookings</NavLink>
          :
          ""
        }
        
      </nav>
      <div className="header__logo">
        <img src="/img/logo-white.png" alt="Natours logo" />
      </div>
      <nav className="nav nav--user">
        {currentUser ? (
          <>
            <span onClick={handleLogout} href="/" className="nav__el nav__el--logout">Log out</span>
            <Link to="/profile" className="nav__el">
              <img src={currentUser.photo? currentUser.photo : '/img/users/default.jpg' } alt={`Photo of ${currentUser.name}`} className="nav__user-img" />
              <span>{currentUser.name.split(' ')[0]}</span>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="nav__el">Log in</Link>
            <Link to="/sign-up" className="nav__el nav__el--cta">Sign up</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
