import { Profiler, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './components/Home'
import Login from './components/Auth/Login'
import SignUp from './components/Auth/SignUp'
import Profile from './components/Profile/Profile'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute'
import AuthCheck from './components/Auth/AuthCheck'
import SingleTour from './components/SingleTour/SingleTour'
import 'leaflet/dist/leaflet.css'
import './App.css'
import ForgetPass from './components/Auth/ForgetPass'
import Success from './components/SingleTour/Success'
import MyBookings from './components/MyBookings'
// require('dotenv').config()
function App() {
  return (
    <>
      <BrowserRouter>
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
              <Route path='/tour/success' element={<Success />} />
              <Route path='/my-bookings' element={<MyBookings />} />
            {/* </Route> */}
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
      <ToastContainer />

    </>
  )
}

export default App
