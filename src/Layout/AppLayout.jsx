import React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom'
import Footer from './../components/Footer'
import Header from './../components/Header'
import Home from './../components/Home'
import Login from './../components/Auth/Login'
import SignUp from './../components/Auth/SignUp'
import Profile from './../components/Profile/Profile'
import PrivateRoute from './../components/PrivateRoute'
import AuthCheck from './../components/Auth/AuthCheck'
import SingleTour from './../components/SingleTour/SingleTour'
import ForgetPass from './../components/Auth/ForgetPass'
import Success from './../components/SingleTour/Success'
import MyBookings from './../components/MyBookings'
import Wishlist from './../components/Wishlist'
import Page404 from './../components/404Page'
import MyReviews from './../components/myReviews/MyReviews'
import { useEffect } from 'react'
import { useState } from 'react'
import "./AppLayout.css";
import ToursList from '../adminComponents/Tours/ToursList';



const AppLayout = () => {
    const [cssLoaded, setCssLoaded] = useState(false);

    const LoadCss = async () => {
        await import('./../../public/css/style.css');
        setCssLoaded(true)
    }

    useEffect(() => {
        LoadCss()
    }, []);

    if(!cssLoaded){
        return ""
    }
        return (
            <>
                <Header />
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/sign-up' element={<SignUp />} />
                    <Route path='/forget-password' element={<ForgetPass />} />
                    <Route element={<AuthCheck />}>
                        <Route path='/' element={<Home />} />
                        <Route path='/tour/:slug' element={<SingleTour />} />
                        {/* <Route element={<PrivateRoute />}> */}
                        <Route path='/profile' element={<Profile />} />
                        <Route path='/my-reviews' element={<MyReviews />} />
                        <Route path='/tour/success' element={<Success />} />
                        <Route path='/my-bookings' element={<MyBookings />} />
                        <Route path='/wishlist' element={<Wishlist />} />
                        {/* </Route> */}
                    </Route>
                    <Route path='*' element={<Page404 />} />
                </Routes>
                <Footer />
            </>
        )
}

export default AppLayout
