import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { signOut } from '../../redux/user/userSlice'

const AdminCheck = ({restrictTo}) => {
    const url = import.meta.env.VITE_APIURL
    const { currentUser } = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleAccess = async() => {
        const jsonData = {
            restrictTo : restrictTo
        }
        try {
            console.log("done")
            const res = await fetch(`${url}api/v1/users/access-check`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body:JSON.stringify(jsonData)
            })

            // const data = await res.json()
            // console.log("data : ", data)
            console.log("res : ", res)
            if(!res.ok){
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    useEffect(()=>{
        if (!restrictTo.includes(currentUser.role)) {
            navigate("/")
        }
        handleAccess()
    },[])
  return (
    <Outlet />
  )
}

export default AdminCheck
