import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const TourGuides = ({ setGuideArr, resetSignal, currentTour }) => {
    const url = import.meta.env.VITE_APIURL

    const [guides, setGuides] = useState([])
    const [leadGuides, setLeadGuides] = useState([])
    const [selectedGuides, setSelectedGuides] = useState([])

    const fetchGuides = async () => {
        try {
            const res = await fetch(`${url}api/v1/users?role=guide`, {
                method: 'GET',
                credentials: 'include',
            })

            const { data } = await res.json()
            setGuides(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchLeadGuides = async () => {
        try {
            const res = await fetch(`${url}api/v1/users?role=lead-guide`, {
                method: 'GET',
                credentials: 'include',
            })

            const { data } = await res.json()
            setLeadGuides(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleCheckBox = (e, guideId) => {
        if (e.target.checked) {
            const newGuides = [...selectedGuides]
            newGuides.push(guideId)
            setSelectedGuides(newGuides)
        }
        else {
            const updatedGuideArray = [...selectedGuides]
            const index = updatedGuideArray.indexOf(guideId);
            if (index > -1) { 
                updatedGuideArray.splice(index, 1);
            }
            setSelectedGuides(updatedGuideArray)
        }
    }

    useEffect(() => {
        setGuideArr(selectedGuides)
    }, [selectedGuides])

    useEffect(()=>{
        const guideIds = currentTour?.guides?.map(guide => guide._id) || [];
        setSelectedGuides(guideIds)
    },[currentTour])

    useEffect(() => {
        setSelectedGuides([])
    }, [resetSignal])

    useEffect(() => {
        fetchGuides()
        fetchLeadGuides()
    }, [])
    return (
        <>
            {/* <h4>{JSON.stringify(selectedGuides)}</h4> */}
            <div className='d-flex gap-4'>
                <div className="card" style={{ flex: '1' }}>
                    <div className="card-body">
                        <h5 className="card-title">Select Lead Guide</h5>

                        <ul className="list-group">
                            {
                                leadGuides?.map((guide) => (
                                    <li key={guide._id} className="list-group-item d-flex gap-4 align-items-center">
                                        <input className="form-check-input me-1" type="checkbox" value="" aria-label="..." onChange={(e) => handleCheckBox(e, guide._id)} checked={selectedGuides.includes(guide._id)} />
                                        <div className="d-flex gap-3 align-items-center">
                                            <img src={guide?.photo ? guide.photo : url + '/img/users/default.jpg'} alt={`Photo of`} className="rounded-circle" style={{ maxHeight: '36px' }} />
                                            <p>{guide?.name}  |  {guide?.role}</p>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <div className="card" style={{ flex: '1' }}>
                    <div className="card-body">
                        <h5 className="card-title">Select Guides</h5>

                        <ul className="list-group">
                            {
                                guides?.map((guide) => (
                                    <li key={guide._id} className="list-group-item d-flex gap-4 align-items-center">
                                        <input className="form-check-input me-1" type="checkbox" value="" aria-label="..." onChange={(e) => handleCheckBox(e, guide._id)} checked={selectedGuides.includes(guide._id)} />
                                        <div className="d-flex gap-3 align-items-center">
                                            <img src={guide?.photo ? guide.photo : url + '/img/users/default.jpg'} alt={`Photo of`} className="rounded-circle" style={{ maxHeight: '36px' }} />
                                            <p>{guide?.name}  |  {guide?.role}</p>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TourGuides
