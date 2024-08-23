import React, { useEffect } from 'react'
import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import BreadCrums from '../adminComponents/BreadCrums';
import Header from '../adminComponents/Header';
import SideNav from '../adminComponents/SideNav';
import CreateTour from '../adminComponents/Tours/CreateTour';
import DynamicAccordions from '../adminComponents/Tours/AdMap';
import EditTour from '../adminComponents/Tours/EditTour';
import ToursList from '../adminComponents/Tours/ToursList';
import AdMap from '../adminComponents/Tours/AdMap';
import AuthCheck from '../components/Auth/AuthCheck';
import Dashboard from '../adminComponents/Dashboard';
import Page404 from '../components/404Page';
import AdminCheck from '../adminComponents/Auth/AdminCheck';
import UsersList from '../adminComponents/Users/UsersList';

const AdminLayout = () => {
    const [cssLoaded, setCssLoaded] = useState(false);

    const LoadCss = async () => {
        await import('./../../public/admin_assets/css/admin.css');
        await import('./../../public//admin_assets/vendor/bootstrap-icons/bootstrap-icons.css');
        setCssLoaded(true)
    }

    useEffect(() => {
        LoadCss()
    }, []);

    if (!cssLoaded) {
        return ""
    }

    const RedirectTo404 = () => {
        window.location.href = '/404';
        return null; // This component doesn't render anything
    };
    return (
        <>
            <Header />
            <SideNav />
            <main id="main" className="main">
                <BreadCrums />
                {/* <ToursList/> */}
                <Routes>
                    <Route element={<AuthCheck />}>
                        <Route element={<AdminCheck restrictTo={['admin']} />}>
                            <Route path='/dashboard' element={<Dashboard />} />
                            <Route path='/tours' element={<ToursList />} />
                            <Route path='/users' element={<UsersList />} />
                            <Route path='/tours/create' element={<CreateTour />} />
                            <Route path='/tours/edit/:tourSlug' element={<EditTour />} />
                            <Route path='/admap' element={<AdMap />} />
                            <Route path='/*' element={<RedirectTo404 />} />
                        </Route>
                    </Route>
                </Routes>
            </main>


        </>
    )
}

export default AdminLayout
