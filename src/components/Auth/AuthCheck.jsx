import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { signOut } from '../../redux/user/userSlice'
import { toast } from 'react-toastify';


const url = import.meta.env.VITE_APIURL
const AuthCheck = () => {
    useEffect(() => {
        handleAuth() 
    },[]) 
    const [responce, setResponce] = useState(null)
    const dispatch = useDispatch()

    
    const handleAuth = async() => {

        try {
            const res = await fetch(`${url}api/v1/users/auth-check`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            })

            const data = await res.json()
            setResponce(data)
            if(!res.ok){
                dispatch(signOut())
            }

        } catch (error) {
            console.log(error)
        }
        
    }
    const { currentUser } = useSelector(state => state.user)
    return currentUser ? <Outlet /> :  <Navigate to='/login'></Navigate>
    
}

export default AuthCheck
