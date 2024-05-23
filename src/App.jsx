import { Profiler, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'leaflet/dist/leaflet.css'
import './App.css'
import AppLayout from './Layout/AppLayout'
import AdminLayout from './Layout/AdminLayout';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<AppLayout />}></Route>
          <Route path='/admin' element={<AdminLayout />}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />

    </>
  )
}

export default App
