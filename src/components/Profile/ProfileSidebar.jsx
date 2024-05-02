import React from 'react'

const ProfileSidebar = () => {
  return (
    <nav className="user-view__menu">
          <ul className="side-nav">
            <li className="side-nav--active">
              <a href="#">
                <svg>
                  <use xlinkHref="img/icons.svg#icon-settings"></use>
                </svg>
                Settings
              </a>
            </li>
            <li>
              <a href="#">
                <svg>
                  <use xlinkHref="img/icons.svg#icon-briefcase"></use>
                </svg>
                My bookings
              </a>
            </li>
            <li>
              <a href="#">
                <svg>
                  <use xlinkHref="img/icons.svg#icon-star"></use>
                </svg>
                My reviews
              </a>
            </li>
            <li>
              <a href="#">
                <svg>
                  <use xlinkHref="img/icons.svg#icon-credit-card"></use>
                </svg>
                Billing
              </a>
            </li>
          </ul>
    </nav>
  )
}

export default ProfileSidebar
