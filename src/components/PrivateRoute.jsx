import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

const PrivateRoute = () => {
    const { currentUser } = useSelector(state => state.user)
    return currentUser ? <Outlet /> :  <Navigate to='/login'></Navigate>
}

export default PrivateRoute
