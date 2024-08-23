import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TourForm from './TourForm'

const EditTour = () => {

    const url = import.meta.env.VITE_APIURL
    const {tourSlug} = useParams()
    const [tour, setTour] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
        fetchSingleTour()
    }, [])
    // console.log(tour)
    const fetchSingleTour = async () => {
        try {
            const res = await fetch(`${url}api/v1/tours?slug=${tourSlug}`, {
                method: 'GET',
                credentials: 'include',
            })

            const { data } = await res.json()
            if (data.data.length == 0) {
                navigate('/404')
            }
            else{
                console.log("Not yet")
            }
            setTour(data.data[0])
            // console.log(data.data[0])
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <>
      <div className="card">
            <div className="card-body">
                <h5 className="card-title">Tour Basic Details</h5>
                <TourForm currentTour={tour}/>
            </div>
        </div>
    </>
  )
}

export default EditTour
