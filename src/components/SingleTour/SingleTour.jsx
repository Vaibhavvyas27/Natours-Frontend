import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Booking from './Booking'
import Map from './Map'
import ReviewCard from './ReviewCard'
import ReviewModel from './ReviewModel'

const SingleTour = () => {
    const url = import.meta.env.VITE_APIURL
    const { slug } = useParams()
    const [tour, setTour] = useState(null)
    const [reviews, setReviews] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
        fetchSingleTour()
    }, [slug])
    const fetchSingleTour = async () => {
        try {
            const res = await fetch(`${url}api/v1/tours?slug=${slug}`, {
                method: 'GET',
                credentials: 'include',
            })

            const { data } = await res.json()
            if (data.data.length == 0) {
                navigate('/tour')
            }
            setTour(data.data[0])
        } catch (error) {
            console.log(error)
        }


        // http://127.0.0.1:8000/api/v1/tours/6617c26bdd7cdcc0e3ccc5f0/reviews
    }

    const fethcReview = async () => {
        try {
            const res = await fetch(`${url}api/v1/tours/${tour?._id}/reviews`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            })

            const { data } = await res.json()

            setReviews(data.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (tour != null) {
            fethcReview()
        }
    }, [tour])

    const dateConverter = (date) => {
        const dateObject = new Date(date);
        if( dateObject == 'Invalid Date'){
            return "Date is not Declared"
        }
        const month = dateObject.toLocaleString('default', { month: 'long' });
        const year = dateObject.getFullYear();
        const formattedDate = `${month} ${year}`;
        return formattedDate
    }

    let earliestDate
    if (tour != null) {
        const dates = tour?.startDates
        const today = new Date();
        const futureDates = dates?.filter(date => date >= today.toISOString());

        //  ascending order date sorting 
        futureDates?.sort((a, b) => new Date(a) - new Date(b));
        earliestDate = futureDates?.length > 0 ? futureDates[0] : 'No future dates';
    }

    return (
        <>
            <section className="section-header">
                <div className="header__hero">
                    <div className="header__hero-overlay">&nbsp;</div>
                    <img className="header__hero-img" src={url + "/img/tours/" + tour?.imageCover} alt="Tour 5" />
                </div>

                <div className="heading-box">
                    <h1 className="heading-primary" style={{ lineHeight: '1.6' }}>
                        <span>{tour?.name} Tour</span>
                    </h1>
                    <div className="heading-box__group">
                        <div className="heading-box__detail">
                            <svg className="heading-box__icon">
                                <use xlinkHref="/img/icons.svg#icon-clock"></use>
                            </svg>
                            <span className="heading-box__text">{tour?.duration} days</span>
                        </div>
                        <div className="heading-box__detail">
                            <svg className="heading-box__icon">
                                <use xlinkHref="/img/icons.svg#icon-map-pin"></use>
                            </svg>
                            <span className="heading-box__text">{tour?.startLocation?.description}</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-description">
                <div className="overview-box">
                    <div>
                        <div className="overview-box__group">
                            <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
                            <div className="overview-box__detail">
                                <svg className="overview-box__icon">
                                    <use xlinkHref="/img/icons.svg#icon-calendar"></use>
                                </svg>
                                <span className="overview-box__label">Next date</span>
                                <span className="overview-box__text">{dateConverter(earliestDate)}</span>
                            </div>
                            <div className="overview-box__detail">
                                <svg className="overview-box__icon">
                                    <use xlinkHref="/img/icons.svg#icon-trending-up"></use>
                                </svg>
                                <span className="overview-box__label">Difficulty</span>
                                <span className="overview-box__text">{tour?.difficulty}</span>
                            </div>
                            <div className="overview-box__detail">
                                <svg className="overview-box__icon">
                                    <use xlinkHref="/img/icons.svg#icon-user"></use>
                                </svg>
                                <span className="overview-box__label">Participants</span>
                                <span className="overview-box__text">{tour?.maxGroupSize} people</span>
                            </div>
                            <div className="overview-box__detail">
                                <svg className="overview-box__icon">
                                    <use xlinkHref="/img/icons.svg#icon-star"></use>
                                </svg>
                                <span className="overview-box__label">Rating</span>
                                <span className="overview-box__text">{tour?.ratingsAverage} / 5</span>
                            </div>
                        </div>

                        <div className="overview-box__group">
                            <h2 className="heading-secondary ma-bt-lg">Your tour guides</h2>
                            {
                                tour?.guides?.map((user) => (
                                    <div key={user._id} className="overview-box__detail">
                                        <img src={user.photo} alt="Lead guide" className="overview-box__img" />
                                        <span className="overview-box__label">{user.role}</span>
                                        <span className="overview-box__text">{user.name}</span>
                                    </div>
                                ))
                            }

                        </div>
                    </div>
                </div>

                <div className="description-box">
                    <h2 className="heading-secondary ma-bt-lg">About {tour?.name} tour</h2>
                    <p className="description__text">
                        {tour?.description}
                    </p>
                </div>
            </section>

            <section className="section-pictures">
                {
                    tour?.images?.map((image, i) => (
                        <div key={i} className="picture-box">
                            <img className={"picture-box__img picture-box__img--" + (i + 1)} src={url + "/img/tours/" + image} alt="The Park Camper Tour 1" />
                        </div>
                    ))
                }

            </section>

            {
                tour?.locations?.length != 0 ? (
                    <section className='section-map'>
                        <Map locations={tour?.locations} />
                    </section>
                ) : (
                    ''
                )
            }

            {
                reviews?.length != 0 ? (
                    <section className="section-reviews">
                        <div className="reviews">
                            {
                                reviews?.map((review) => (
                                    <ReviewCard review={review} key={review._id} />
                                ))
                            }
                        </div>
                    </section>
                ) : (
                    ''
                )
            }

            <Booking tour={tour} />




        </>
    );

}

export default SingleTour
