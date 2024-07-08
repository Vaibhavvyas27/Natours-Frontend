import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import TourSort from './TourSort'

const url = import.meta.env.VITE_APIURL
const ToursList = () => {
    const [tours, setTours] = useState(null)
    const [renderFlag, setRenderFlag] = useState(false)
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

    const deleteTour = async (tourId) => {
        try {
            const res = await fetch(`${url}api/v1/tours/${tourId}`, {
                method: 'DELETE',
                credentials: 'include',
            })

            const data = await res.json()
            toast.success(data.message)
            setRenderFlag(!renderFlag)
        } catch (error) {
            console.log(error)
        }
    }

    const formattedDate = (date) => {
        const dateObject = new Date(date);
        const month = dateObject.toLocaleString('default', { month: 'long' });
        const year = dateObject.getFullYear();
        const formattedDate = `${month} ${year}`;
        return formattedDate;
    }

    const handleDelete = (tour) => {
        const userConfirmed = window.confirm(`Are you sure you want to delete this tour  ${tour.name}?`);

        if (userConfirmed) {
            deleteTour(tour._id)
        }
    }


    useEffect(() => {
        fetchTour()
    }, [renderFlag])

    console.log(tours)
    return (
        <section className="section dashboard">
            <TourSort setTours={setTours} />
            <div className="row">
                <div className="col-lg-10">
                    <div className="row">
                        <div className="col-12">
                            <div className="card top-selling overflow-auto">
                                <div className="card-body pb-0">
                                    <h5 className="card-title">All Tours<span> | tours</span></h5>
                                    <table className="table table-borderless">
                                        <thead>
                                            <tr>
                                                <th scope="col">Preview</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Ratings / 5</th>
                                                <th scope="col">Start Date</th>
                                                <th scope="col">Actions</th>
                                                {/* <th scope="col">Sold</th>
                                                <th scope="col">Revenue</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                tours?.map((tour) => (
                                                
                                                    // <TourCard tour={tour} wishlist={wishlist} flag={wishflag} setFlag={setWishFlag} key={tour._id} />
                                                    <tr key={tour._id}>
                                                        <th scope="row">
                                                            <a href={'http://localhost:5173/tour/'+tour.slug}><img src={url+"img/tours/"+tour.imageCover} width={100} alt={tour.name} /></a>
                                                        </th>
                                                        <td><a href={'http://localhost:5173/tour/'+tour.slug} className="text-primary fw-bold">{tour.name}</a></td>
                                                        <td>$ {tour.price}</td>
                                                        <td>{tour.ratingsAverage}</td>
                                                        <td>{formattedDate(tour.startDates[0])}</td>
                                                        <td><Link to={'./edit/'+tour.slug}>Edit</Link></td>
                                                        <td><Link onClick={()=> handleDelete(tour)}>Deletet</Link></td>
                                                        {/* <td className="fw-bold">124</td> */}
                                                        {/* <td>$5,828</td> */}
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ToursList
