import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import TourCard from './TourCard';

const Wishlist = () => {
  const url = import.meta.env.VITE_APIURL
  const [wishlist, setWishlist] = useState(null)
  const [wishflag, setWishFlag] = useState(false)
  const getWishlist = async () => {
    try {
      const res = await fetch(`${url}api/v1/tours/get-wishlist`, {
        method: 'GET',
        credentials: 'include',
      })

      const { data } = await res.json()
      setWishlist(data.wishlist)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getWishlist()
  }, [wishflag])
  return (

    <div>
      <main className="main" style={{ textAlign: 'center' }}>
        <h1 className='heading-secondary ma-bt-lg center'>Wishlist</h1>
        {wishlist?.length != 0 ?
          <div className="card-container">
            {
              wishlist?.map((tour) => (
                <TourCard tour={tour} wishlist={wishlist} flag={wishflag} setFlag={setWishFlag} key={tour._id} />
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
    </div>
  )
}

export default Wishlist
