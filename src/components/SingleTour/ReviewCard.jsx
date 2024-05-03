import React from 'react'

const Reviews = ({review}) => {
  return (
    
    <div className="reviews__card">
      <div className="reviews__avatar">
        <img className="reviews__avatar-img" src={review.user.photo} alt="Jim Brown" />
        <h6 className="reviews__user">{review.user.name}</h6>
      </div>
      <p className="reviews__text">{review.review}</p>
      <div className="reviews__rating">
        {Array.from({ length: review.rating }).map((_, index) => (
          <svg key={index} className="reviews__star reviews__star--active">
            <use xlinkHref="/img/icons.svg#icon-star"></use>
          </svg>
        ))}
        {Array.from({ length: (5-review.rating) }).map((_, index) => (
          <svg key={index} className="reviews__star reviews__star--inactive">
            <use xlinkHref="/img/icons.svg#icon-star"></use>
          </svg>
        ))}

      </div>
    </div>

  )
}

export default Reviews
