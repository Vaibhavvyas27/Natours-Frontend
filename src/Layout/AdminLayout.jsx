import React, { useEffect } from 'react'
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import BreadCrums from '../adminComponents/BreadCrums';
import Header from '../adminComponents/Header';
import SideNav from '../adminComponents/SideNav';
import CreateTour from '../adminComponents/Tours/CreateTour';
import DynamicAccordions from '../adminComponents/Tours/AdMap';
import EditTour from '../adminComponents/Tours/EditTour';
import ToursList from '../adminComponents/Tours/ToursList';
import AdMap from '../adminComponents/Tours/AdMap';

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
    return (
        <>
            <Header />
            <SideNav />
            <main id="main" className="main">
                <BreadCrums />
            {/* <ToursList/> */}
                <Routes>
                    <Route path='/tours' element={<ToursList/>} />
                    <Route path='/tours/create' element={<CreateTour/>} />
                    <Route path='/tours/edit/:tourSlug' element={<EditTour />} />
                    <Route path='/admap' element={<AdMap />} />
                </Routes>
            </main>

        </>
    )
}

export default AdminLayout
