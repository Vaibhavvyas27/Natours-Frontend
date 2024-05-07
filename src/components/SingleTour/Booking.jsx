import { loadStripe } from '@stripe/stripe-js'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const Booking = ({tour}) => {
    const url = import.meta.env.VITE_APIURL
    const { currentUser } = useSelector(state => state.user)
    const makePayment = async()=>{
        const stripe = await loadStripe('pk_test_51PAqoXSE2lbzOvfue7M5ZEPojW02I3IpdLtagt1avdmldNOmK9Yh1MPo08eIp0wDU0BxeaXeb0R2jqozOUI8RR3o00pWnYwjpM')
        const responce = await fetch(`${url}api/v1/bookings/checkout-session/${tour?._id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })

        const res = await responce.json()

        console.log(res)
        if(!responce.ok){
            toast.error(res.message)
        }

        const result = stripe.redirectToCheckout({
            sessionId : res.session.id
        })
    }
    return (
        <section className="section-cta">
            <div className="cta">
                <div className="cta__img cta__img--logo">
                    <img src="/img/logo-white.png" alt="Natours logo" />
                </div>
                <img className="cta__img cta__img--1" src={url+"/img/tours/" + tour?.images[1]} alt="" />
                <img className="cta__img cta__img--2" src={url+"/img/tours/" + tour?.images[2]} alt="" />
                <div className="cta__content">
                    <h2 className="heading-secondary">What are you waiting for?</h2>
                    <p className="cta__text">{tour?.duration} days. 1 adventure. Infinite memories. Make it yours today!</p>
                    {
                        currentUser ? (
                            <button className="btn btn--green span-all-rows" onClick={makePayment}>Book tour now!</button>
                        ) : (
                            <Link to={'/login'} className="btn btn--green span-all-rows">Log in to Book Tour !!</Link>
                        )
                    }
                </div>
            </div>
        </section>
    )
}

export default Booking
