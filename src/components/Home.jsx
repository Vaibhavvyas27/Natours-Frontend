import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import TourCard from './TourCard';

const url = import.meta.env.VITE_APIURL
function Home() {
  console.log(url)
  const [tours, setTours] = useState(null)
  const fetchTour = async () => {
    try {
      const res = await fetch(`${url}api/v1/tours`, {
        method: 'GET',
        // credentials: 'include',
      })

      const { data } = await res.json()
      setTours(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTour()
  }, [])

  return (
    <main className="main">
      <div className="card-container">
        {
          tours?.map((tour) => (
            <TourCard tour={tour} key={tour._id} />
          ))

          ||

          Array.from({ length: 3 })?.map((_,index) => (
            <SkeletonTheme  key={index}>
              <p>
                <Skeleton height={230} count={1} />
                <br />
                <Skeleton height={20} count={9} style={{ marginBottom: '10px' }} />
              </p>
            </SkeletonTheme>
          ))
        }
      </div>
    </main>
  );
}

export default Home;
