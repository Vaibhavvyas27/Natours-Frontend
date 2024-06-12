import React, { useRef } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { DatePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css'
import AdMap from './AdMap';
import DynamicAccordions from './AdMap';

const TourForm = ({currentTour}) => {
    const url = import.meta.env.VITE_APIURL
    const img1Ref = useRef(null)
    const img2Ref = useRef(null)
    const img3Ref = useRef(null)

    const [locationArr, setLocationArr] = useState([])

    // Start locaation data 
    const [startLocationData, setStartLocationData] = useState({
        latitude: 1,
        longitude: 2,
    });
    // Tours Dates data 
    const [dates, setDates] = useState([]);

    // Tours images 
    const [images, setImages] = useState([]);
    const [imgCover, setImgCover] = useState(null)


    // Tours Basic Datas
    const [formData, setFormData] = useState({
        name: '',
        duration: '',
        maxGroupSize: '',
        difficulty: '',
        price: '',
        summary: '',
        // startLocation : {coordinates : [startLocationData.latitude,startLocationData.longitude]}
    });


    // useEffect(()=>{
    //     if(currentTour != null){
    //         setFormData({
    //             name: currentTour.name? currentTour.name : '' ,
    //             duration: currentTour.duration? currentTour.duration : '' ,
    //             maxGroupSize: currentTour.maxGroupSize? currentTour.maxGroupSize : '' ,
    //             difficulty: currentTour.difficulty? currentTour.difficulty : '' ,
    //             price: currentTour.price? currentTour.price : '' ,
    //             summary: currentTour.summary? currentTour.summary : '' ,
    //         })
    //     }
    // },[currentTour])
    


    const handleImgChange = (e, index) => {
        const newImages = [...images];
        newImages[index] = e.target.files[0];
        setImages(newImages);
    }

    const handleDateChange = (value, index) => {
        const newDates = [...dates];
        newDates[index] = value.toISOString();
        setDates(newDates);
        console.log(dates);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'latitude' || name === 'longitude') {
            console.log('fdsgsgd')
            setStartLocationData({
                ...startLocationData,
                [name]: value,
            });
        }
        else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const locationObject = {
            coordinates: [startLocationData.latitude, startLocationData.longitude]
        }
        const NewformData = new FormData()
        NewformData.append('name', formData.name);
        NewformData.append('duration', formData.duration);
        NewformData.append('maxGroupSize', formData.maxGroupSize);
        NewformData.append('difficulty', formData.difficulty);
        NewformData.append('price', formData.price);
        NewformData.append('summary', formData.summary);
        NewformData.append('coverImg', imgCover);
        NewformData.append('startDates', JSON.stringify(dates));
        NewformData.append('startLocation', JSON.stringify(locationObject));
        NewformData.append('tourLocations', JSON.stringify(locationArr));
        Array.from(images).forEach((file) => {
            NewformData.append('images', file);
        })
        try {
            const res = await fetch(`${url}api/v1/tours/`, {
                method: 'POST',
                //   headers: {
                //     'Content-Type': 'application/json',
                //   },
                credentials: 'include',
                body: NewformData
            })
            const data = await res.json()
            if (res.ok) {
                toast.success(data.message)
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log("Error", error)
        }

    }
    return (
        <>
            {/* Floating Labels Form */}
            <form className="row g-3" onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="col-md-6">
                    <div className="form-floating">
                        <input type="text" className="form-control" id="floatingName" onChange={handleChange} name='name' value={formData.name} placeholder="Your Name" />
                        <label htmlFor="floatingName">Tour Name</label>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="d-flex align-items-center justify-content-center">
                        <label htmlFor="inputNumber" className="">Cover Image : </label>
                        <input className="form-control" accept='image/*' name='imgCover' onChange={(e) => setImgCover(e.target.files[0])} type="file" id="formFile" />
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="form-floating">
                        <input type="number" min={0} className="form-control" onChange={handleChange} name='price' value={formData.price} id="floatingPrice" placeholder="Price" />
                        <label htmlFor="floatingPrice">Price</label>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-floating">
                        <input type="number" className="form-control" id="floatingDuration" onChange={handleChange} name='duration' value={formData.duration} placeholder="Duration" />
                        <label htmlFor="floatingDuration">Duration</label>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-floating">
                        <input type="number" className="form-control" onChange={handleChange} name='maxGroupSize' value={formData.maxGroupSize} id="floatingGroupSize" placeholder="GroupSize" />
                        <label htmlFor="floatingGroupSize">Max-Group-Size</label>
                    </div>
                </div>
                {/* <div className="col-12">
                        <div className="form-floating">
                            <textarea className="form-control" placeholder="Address" id="floatingTextarea" style={{ height: '100px' }}></textarea>
                            <label htmlFor="floatingTextarea">Address</label>
                        </div>
                    </div> */}
                <div className="col-md-9">
                    <div className="form-floating">
                        <input type="text" className="form-control" onChange={handleChange} name='summary' value={formData.summary} id="floatingSummary" placeholder="Summary" />
                        <label htmlFor="floatingSummary">Summary</label>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="form-floating mb-3">
                        <select className="form-select" id="floatingSelect" onChange={handleChange} name='difficulty' value={formData.difficulty} aria-label="Difficulty">
                            <option value=''>Select</option>
                            <option value="hard">Hard</option>
                            <option value="medium">Medium</option>
                            <option value="easy">Easy</option>
                        </select>
                        <label htmlFor="floatingSelect">Difficulty</label>
                    </div>
                </div>
                <div className='mt-5' style={{ backgroundColor: 'lightgray', height: '1px' }}></div>
                <h5 className="card-title">Tour Start Location</h5>

                <div className="col-md-6">
                    <div className="form-floating">
                        <input type="text" className="form-control" id="floatingLatitide" onChange={handleChange} name='latitude' value={startLocationData.latitude} placeholder="Your Name" />
                        <label htmlFor="floatingLatitide">Latitude</label>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-floating">
                        <input type="text" className="form-control" id="floatingLongitude" onChange={handleChange} name='longitude' value={startLocationData.longitude} placeholder="Your Name" />
                        <label htmlFor="floatingLongitude">Longitude</label>
                    </div>
                </div>
                <div className='mt-5' style={{ backgroundColor: 'lightgray', height: '0.5px' }}></div>
                <h5 className="card-title">Tour Start Dates</h5>
                <div className="col-md-4">
                    <h6>First trip : </h6>
                    <DatePicker format="yyyy-MM-dd" onChange={(value) => handleDateChange(value, 0)} showMeridian />
                </div>
                <div className="col-md-4">
                    <h6>Second trip : </h6>
                    <DatePicker format="yyyy-MM-dd" onChange={(value) => handleDateChange(value, 1)} showMeridian />
                </div>
                <div className="col-md-4">
                    <h6>Third trip : </h6>
                    <DatePicker format="yyyy-MM-dd" onChange={(value) => handleDateChange(value, 2)} showMeridian />
                </div>
                <div className='mt-5' style={{ backgroundColor: 'lightgray', height: '0.5px' }}></div>
                <h5 className="card-title">Tour images</h5>
                <div className='row mt-4'>
                    <div className="col-md-4">
                        <input type="file" className='form__upload' accept='image/*' name='photo' onChange={(e) => handleImgChange(e, 0)} ref={img1Ref} hidden />
                        <div className="card">
                            <img src={images[0] ? URL.createObjectURL(images[0]) : "/img/dummy_tour.png"} height={250} width={200} className="card-img-top" alt="..." />
                            <div className="card-img-overlay flex-column gap-3 d-flex align-items-center justify-content-center">
                                <h6>first image</h6>
                                <h1 onClick={() => img1Ref.current.click()} style={{ cursor: 'pointer' }}><i className="bi bi-upload"></i></h1>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <input type="file" className='form__upload' accept='image/*' name='photo' onChange={(e) => handleImgChange(e, 1)} ref={img2Ref} hidden />
                        <div className="card">
                            <img src={images[1] ? URL.createObjectURL(images[1]) : "/img/dummy_tour.png"} height={250} width={200} className="card-img-top" alt="..." />
                            <div className="card-img-overlay flex-column gap-3 d-flex align-items-center justify-content-center">
                                <h6>second image</h6>
                                <h1 onClick={() => img2Ref.current.click()} style={{ cursor: 'pointer' }}><i className="bi bi-upload"></i></h1>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <input type="file" className='form__upload' accept='image/*' name='photo' onChange={(e) => handleImgChange(e, 2)} ref={img3Ref} hidden />
                        <div className="card">
                            <img src={images[2] ? URL.createObjectURL(images[2]) : "/img/dummy_tour.png"} height={250} width={200} className="card-img-top" alt="..." />
                            <div className="card-img-overlay flex-column gap-3 d-flex align-items-center justify-content-center">
                                <h6>third image</h6>
                                <h1 onClick={() => img3Ref.current.click()} style={{ cursor: 'pointer' }}><i className="bi bi-upload"></i></h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-5' style={{ backgroundColor: 'lightgray', height: '0.5px' }}></div>
                <h5 className="card-title">Tour Places</h5>
                <div className='row'>
                    <AdMap setLocationArr={setLocationArr}/>
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <button type="reset" className="btn btn-secondary">Reset</button>
                </div>
            </form>
            {/* End floating Labels Form */}
        </>
    )
}

export default TourForm
