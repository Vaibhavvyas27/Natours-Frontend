import React, { useRef } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { DatePicker } from 'rsuite';
import moment from 'moment';
// import 'rsuite/dist/rsuite.min.css'
import AdMap from './AdMap';
import DynamicAccordions from './AdMap';
import TourGuides from './TourGuides';

const TourForm = ({ currentTour }) => {
    const url = import.meta.env.VITE_APIURL
    const img1Ref = useRef(null)
    const img2Ref = useRef(null)
    const img3Ref = useRef(null)

    const [locationArr, setLocationArr] = useState([])
    const [guideArr, setGuideArr] = useState([])
    


    // Start locaation data 
    const [startLocationData, setStartLocationData] = useState({
        latitude: 0,
        longitude: 0,
        placeDescription: '',
        address: '',
    });


    // Tours Dates data 
    const [dates, setDates] = useState([]);
    const [previousDates, setPreviousDates] = useState([]);


    // reset singal for map & guides component section
    const [resetSignal, setResetSignal] = useState(false);


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
        description: '',
        // startLocation : {coordinates : [startLocationData.latitude,startLocationData.longitude]}
    });


    // .....Change Handlers.....

    const handleImgChange = (e, index) => {
        const newImages = [...images];
        newImages[index] = e.target.files[0];
        setImages(newImages);
        console.log(images)
        Array.from(images).forEach((file) => {
            console.log(file)
        })
    }

    const handleDateChange = (value, index) => {
        const newDates = [...dates];
        newDates[index] = value.toISOString();
        setDates(newDates);
        console.log(dates)
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'latitude' || name === 'longitude' || name === 'placeDescription' || name === 'address') {
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


    // .....Submit Handle Function..... 

    const handleReset = (e) => {
        e.preventDefault()
        setDates([])
        setLocationArr([]);
        setGuideArr([]);
        setImages([])
        setImgCover(null)
        setStartLocationData({
            latitude: 0,
            longitude: 0,
            placeDescription: '',
            address: '',
        })
        setFormData({
            name: '',
            duration: '',
            maxGroupSize: '',
            difficulty: '',
            price: '',
            summary: '',
            description: '',
        })
        setResetSignal(!resetSignal);
    };


    // .....Reset Handle Function..... 
    const handleSubmit = async (e) => {
        e.preventDefault()

        const locationObject = {
            type: "Point",
            coordinates: [startLocationData.longitude, startLocationData.latitude],
            description: startLocationData.placeDescription,
            address: startLocationData.address,
        }
        const NewformData = new FormData()
        NewformData.append('name', formData.name);
        NewformData.append('duration', formData.duration);
        NewformData.append('maxGroupSize', formData.maxGroupSize);
        NewformData.append('difficulty', formData.difficulty);
        NewformData.append('price', formData.price);
        NewformData.append('description', formData.description);
        NewformData.append('summary', formData.summary);
        NewformData.append('coverImg', imgCover);
        NewformData.append('startDates', JSON.stringify(dates));
        NewformData.append('startLocation', JSON.stringify(locationObject));
        NewformData.append('tourLocations', JSON.stringify(locationArr));
        NewformData.append('tourGuides', JSON.stringify(guideArr));
        Array.from(images).forEach((file) => {
            NewformData.append('images', file);
        })
        try {
            let method 
            let SubmitUrl 
            console.log(NewformData)
            if (currentTour != null) {
                method = 'PATCH'
                SubmitUrl = `${url}api/v1/tours/${currentTour?._id}`
            }else{
                method = 'POST'
                SubmitUrl = `${url}api/v1/tours/`
            }
            const res = await fetch(SubmitUrl, {
                method: method,
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



    useEffect(()=>{
        if(currentTour != null){
            setFormData({
                name: currentTour.name? currentTour.name : '' ,
                duration: currentTour.duration? currentTour.duration : '' ,
                maxGroupSize: currentTour.maxGroupSize? currentTour.maxGroupSize : '' ,
                difficulty: currentTour.difficulty? currentTour.difficulty : '' ,
                price: currentTour.price? currentTour.price : '' ,
                summary: currentTour.summary? currentTour.summary : '' ,
                description: currentTour.description? currentTour.description : '' ,
            })
            setStartLocationData({
                latitude: currentTour.startLocation?.coordinates? currentTour.startLocation.coordinates[1] : '' ,
                longitude: currentTour.startLocation?.coordinates? currentTour.startLocation.coordinates[0] : '' ,
                placeDescription: currentTour.startLocation?.description? currentTour.startLocation.description : '' ,
                address: currentTour.startLocation?.address? currentTour.startLocation.address : '' ,
            })
            setDates(currentTour.startDates? currentTour.startDates : '' )
            const formattedDates = currentTour?.startDates?.map(date => moment(date).format('YYYY-MM-DD'));
            setPreviousDates(formattedDates)
        }
    },[currentTour])



    return (
        <>
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
                <div className="col-md-12">
                    <div className="form-floating">
                        <textarea type="text" className="form-control" style={{ height: '100px' }} onChange={handleChange} name='description' value={formData.description} id="floatingTextarea" placeholder="description"></textarea>
                        <label htmlFor="floatingSummary">description</label>
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
                <div className="col-md-6">
                    <div className="form-floating">
                        <input type="text" className="form-control" id="floatingName" onChange={handleChange} name='placeDescription' value={startLocationData.placeDescription} placeholder="Place name" />
                        <label htmlFor="floatingName">Place Name</label>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-floating">
                        <input type="text" className="form-control" id="floatingAddress" onChange={handleChange} name='address' value={startLocationData.address} placeholder="Place Address" />
                        <label htmlFor="floatingAddress">Place Address</label>
                    </div>
                </div>
                <div className='mt-5' style={{ backgroundColor: 'lightgray', height: '0.5px' }}></div>
                <h5 className="card-title">Tour Start Dates</h5>
                <div className="col-md-4">
                    <h6>First trip : </h6>
                    {previousDates[0]? <><p className='mt-2'><u>Current date : {previousDates[0]}</u></p><br /> </>: ''}
                    <DatePicker format="yyyy-MM-dd" onChange={(value) => handleDateChange(value, 0)} showMeridian />
                </div>
                <div className="col-md-4">
                    <h6>Second trip : </h6>
                    {previousDates[1]? <><p className='mt-2'><u>Current date : {previousDates[1]}</u></p><br /> </>: ''}
                    <DatePicker format="yyyy-MM-dd" onChange={(value) => handleDateChange(value, 1)} showMeridian />
                </div>
                <div className="col-md-4">
                    <h6>Third trip : </h6>
                    {previousDates[2]? <><p className='mt-2'><u>Current date : {previousDates[2]}</u></p><br /> </>: ''}
                    <DatePicker format="yyyy-MM-dd" onChange={(value) => handleDateChange(value, 2)} showMeridian />
                </div>
                <div className='mt-5' style={{ backgroundColor: 'lightgray', height: '0.5px' }}></div>
                <h5 className="card-title">Tour images</h5>
                <div className='row mt-4'>
                    <div className="col-md-4">
                        <input type="file" className='form__upload' accept='image/*' name='photo' onChange={(e) => handleImgChange(e, 0)} ref={img1Ref} hidden />
                        <div className="card">
                            <img src={images[0] ? URL.createObjectURL(images[0]) : currentTour?.images[0]? url+"/img/tours/"+currentTour.images[0] : "/img/dummy_tour.png" } height={250} width={200} className="card-img-top" alt="..." />
                            <div className="card-img-overlay flex-column gap-3 d-flex align-items-center justify-content-center">
                                <h6>first image</h6>
                                <h1 onClick={() => img1Ref.current.click()} style={{ cursor: 'pointer' }}><i className="bi bi-upload"></i></h1>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <input type="file" className='form__upload' accept='image/*' name='photo' onChange={(e) => handleImgChange(e, 1)} ref={img2Ref} hidden />
                        <div className="card">
                            <img src={images[1] ? URL.createObjectURL(images[1]) : currentTour?.images[1]? url+"/img/tours/"+currentTour.images[1] : "/img/dummy_tour.png"} height={250} width={200} className="card-img-top" alt="..." />
                            <div className="card-img-overlay flex-column gap-3 d-flex align-items-center justify-content-center">
                                <h6>second image</h6>
                                <h1 onClick={() => img2Ref.current.click()} style={{ cursor: 'pointer' }}><i className="bi bi-upload"></i></h1>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <input type="file" className='form__upload' accept='image/*' name='photo' onChange={(e) => handleImgChange(e, 2)} ref={img3Ref} hidden />
                        <div className="card">
                            <img src={images[2] ? URL.createObjectURL(images[2]) : currentTour?.images[2]? url+"/img/tours/"+currentTour.images[2] : "/img/dummy_tour.png"} height={250} width={200} className="card-img-top" alt="..." />
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
                    <AdMap setLocationArr={setLocationArr} currentTour={currentTour} resetSignal={resetSignal} />
                </div>
                <div className='mt-5' style={{ backgroundColor: 'lightgray', height: '0.5px' }}></div>
                <h5 className="card-title">Tour Guidess</h5>
                <div className='row'>
                    <TourGuides setGuideArr={setGuideArr} currentTour={currentTour} resetSignal={resetSignal} />
                </div>
                <div className="text-center gap-3 d-flex align-items-center justify-content-center">
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <button type="reset" className="btn btn-secondary" onClick={handleReset}>Reset</button>
                </div>
            </form>
        </>
    )
}

export default TourForm
