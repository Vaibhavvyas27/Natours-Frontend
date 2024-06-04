import React from 'react'
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const TourSort = ({setTours}) => {
    const sortRef = useRef(null)
    const priceFileterRef = useRef(null)
    const url = import.meta.env.VITE_APIURL
    const sortTour = async(value, gt, lt) => {
        let fetchUrl = `${url}api/v1/tours?sort=${value}&price[gt]=${gt}&price[lt]=${lt}`
        if(lt == ''){
            fetchUrl = `${url}api/v1/tours?sort=${value}&price[gt]=${gt}`
        }
        try {
            const res = await fetch(fetchUrl, {
                method: 'GET',
            })

            const { data } = await res.json()
            setTours(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handelChange = () => {
        const graterLimit = priceFileterRef.current.value.split('-')[0]
        const lowerLimit = priceFileterRef.current.value.split('-')[1]
        console.log(graterLimit, lowerLimit)
        sortTour(sortRef.current.value, graterLimit, lowerLimit)
    }
    return (
        <div className='row'>
            <div className='col-md-2'>
                <div className="form-floating mb-3">
                    <select className="form-select" ref={sortRef} onChange={handelChange} id="floatingSelect" aria-label="State">
                        <option defaultValue='none'>Select</option>
                        <option value="price">Price</option>
                        <option value="-ratingsAverage">Ratings</option>
                    </select>
                    <label htmlFor="floatingSelect">Sort By</label>
                </div>
            </div>
            <div className='col-md-3'>
                <div className="form-floating mb-3">
                    <select className="form-select" ref={priceFileterRef} onChange={handelChange} id="floatingSelect" aria-label="State">
                        <option value='0-'>Select</option>
                        <option value="0-500">0 to 500</option>
                        <option value="500-1000">500 to 1000</option>
                        <option value="1000-1500">1000 to 1500</option>
                        <option value="1500-2000">1500 to 2000</option>
                        <option value="2000-">2000 to above</option>
                    </select>
                    <label htmlFor="floatingSelect">Filter by Price</label>
                </div>
            </div>
            <div className='col-md-5 my-2'>
                
                <div className="d-flex justify-content-end align-items-center">
                    <Link to={'./create'} className="btn btn-success py-2"><i className="bi bi-plus-circle"> </i> Create Tour</Link>
                </div>
            </div>
            
        </div>
    )
}

export default TourSort
