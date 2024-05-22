import React from 'react'
import { Link } from 'react-router-dom'

const ProfileSidebar = ({tab}) => {
  console.log(tab)
  return (
    <nav className="user-view__menu">
          <ul className="side-nav">
            <li className={tab=='setting'? "side-nav--active" : ""}>
              <Link to="/profile">
                <svg>
                  <use xlinkHref="img/icons.svg#icon-settings"></use>
                </svg>
                Settings
              </Link>
            </li>
            <li>
              <Link to="/my-bookings">
                <svg>
                  <use xlinkHref="img/icons.svg#icon-briefcase"></use>
                </svg>
                My bookings
              </Link>
            </li>
            <li className={tab=='reviews' ? "side-nav--active" : "" }>
              <Link to="/my-reviews">
                <svg>
                  <use xlinkHref="img/icons.svg#icon-star"></use>
                </svg>
                My reviews
              </Link>
            </li>
            <li>
              <Link to="/">
                <svg>
                  <use xlinkHref="img/icons.svg#icon-credit-card"></use>
                </svg>
                Billing
              </Link>
            </li>
          </ul>
    </nav>
  )
}

export default ProfileSidebar
