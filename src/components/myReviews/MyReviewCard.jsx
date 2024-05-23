import React from 'react'
import EditReviewModal from './EditReviewModal';

const MyReviewCard = ({review, setReviewFlag, reviewFlag}) => {
    const url = import.meta.env.VITE_APIURL
    
    return (
        <div className="reviews__card" style={{ height: '350px' }}>
            {/* <h3 className='' style={editIconStyle}><FaEdit /></h3> */}
            <EditReviewModal review={review} setReviewFlag={setReviewFlag} reviewFlag={reviewFlag} />
            <div className="reviews__avatar">
                <img className="reviews__avatar-img" src={url+"img/tours/"+review.tour.imageCover} alt="Jim Brown" />
                <h6 className="reviews__user">{review.tour.name}</h6>
                
            </div>
            <p className="reviews__text">{review.review}</p>
            <div className="reviews__rating">
                {Array.from({ length: review.rating }).map((_, index) => (
                    <svg key={index} className="reviews__star reviews__star--active">
                        <use xlinkHref="/img/icons.svg#icon-star"></use>
                    </svg>
                ))}
                {Array.from({ length: 5-review.rating }).map((_, index) => (
                    <svg key={index} className="reviews__star reviews__star--inactive">
                        <use xlinkHref="/img/icons.svg#icon-star"></use>
                    </svg>
                ))}
            </div>
        </div>
    )
}

export default MyReviewCard
