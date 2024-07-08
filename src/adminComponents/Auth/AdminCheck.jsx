import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { signOut } from '../../redux/user/userSlice'

const AdminCheck = ({restrictTo}) => {
    const url = import.meta.env.VITE_APIURL
    console.log('Admin Check : ', restrictTo)
    const dispatch = useDispatch()
    const handleAccess = async() => {
        const jsonData = {
            restrictTo : restrictTo
        }
        try {
            const res = await fetch(`${url}api/v1/users/access-check`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body:JSON.stringify(jsonData)
            })

            const data = await res.json()
            if(!res.ok){
                dispatch(signOut())
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    useEffect(()=>{
        handleAccess()
    },[])
  return (
    <Outlet />
  )
}

export default AdminCheck
