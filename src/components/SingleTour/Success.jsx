import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Sucess = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams();
  const tourId = searchParams.get('tour_id');
  const { currentUser } = useSelector(state => state.user)
  const url = import.meta.env.VITE_APIURL
  const createBooking = async() => {
    try {
      const res = await fetch(`${url}api/v1/bookings/create-booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          tour : tourId,
          user : currentUser._id
        })
      })

      const data = await res.json()
      if(res.ok){
        toast.success(' Payment done successfully!! ')
        navigate('/')
      }
      else{
        navigate('/')
      }
    } catch (error) {
      navigate('/')
      console.log(error)
    }
  } 
  useEffect(()=>{
    createBooking()
  },[])
  return (
    <main className="main">
      <h1 className="heading-secondary ma-bt-lg"> Payment Completed Succesfully !! </h1>
    </main>
  )
}

export default Sucess
