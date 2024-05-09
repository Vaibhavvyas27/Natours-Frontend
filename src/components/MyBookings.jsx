import React from 'react'
import { useState, useEffect } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import TourCard from './TourCard';

const url = import.meta.env.VITE_APIURL
const MyBookings = () => {
    const [tours, setTours] = useState(null)
    const fetchTour = async () => {
        try {
            const res = await fetch(`${url}api/v1/bookings/my-bookings`, {
                method: 'GET',
                credentials: 'include',
            })

            const { tours } = await res.json()
            setTours(tours)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchTour()
    }, [])
    console.log(tours)
    return (
        <main className='main' style={{textAlign: 'center'}}>
            
            <h1 className='heading-secondary ma-bt-lg center'>My Bookings</h1>
                {tours?.length != 0 ?
                    <div className="card-container">
                        {
                            tours?.map((tour) => (
                                <TourCard tour={tour} key={tour._id} />
                            ))

                            ||                    

                            Array.from({ length: 3 })?.map((_, index) => (
                                <SkeletonTheme key={index}>
                                    <p>
                                        <Skeleton height={230} count={1} />
                                        <br />
                                        <Skeleton height={20} count={9} style={{ marginBottom: '10px' }} />
                                    </p>
                                </SkeletonTheme>
                            ))
                        }
                    </div>
                    :
                    <h1>No Tours Found !!</h1>

                }
            
        </main>
    )
}

export default MyBookings
