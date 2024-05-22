import React from 'react'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FaEdit } from "react-icons/fa";
import { toast } from 'react-toastify';


const EditReviewModal = ({ review, setReviewFlag, reviewFlag }) => {
    const url = import.meta.env.VITE_APIURL
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [formData, setFormData] = useState({
        review: review.review,
        rating: review.rating,
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const editIconStyle = {
        position: 'relative',
        top: '0',
        right: '-120px',
        cursor: 'pointer'
    }

    const handleSubmit = async(e) => {
        console.log('submit')
        e.preventDefault();
        try {
            const res = await fetch(`${url}api/v1/reviews/${review._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            })

            const data = await res.json()
            console.log(data)
            if (res.ok) {
                toast.success(data.message)
            }
            else {
                toast.error(data.message)
            }
            reviewFlag==true? setReviewFlag(false) : setReviewFlag(true) 

        } catch (error) {
            console.log(error.message)
            toast.error(`Something went wrong !! `)
        }
        // Handle form submission, e.g., send data to server
    }
    return (
        <>
            <h3 className='' onClick={handleShow} style={editIconStyle}><FaEdit /></h3>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h2 className="heading-secondary mb-0">Edit Review :-</h2>
                    </Modal.Title>
                </Modal.Header>
                <form className="form p-5" onSubmit={handleSubmit} >
                    <Modal.Body>
                        <div className="form__group">
                            <h2 className='fw-bold'>Tour : {review.tour.name}</h2>
                        </div>

                        <div className="form__group">
                            <label htmlFor="review" className="form__label">Review-text : </label>
                            <textarea
                                id="review"
                                className="form__input"
                                name='review'
                                value={formData.review}
                                onChange={handleChange}
                                placeholder="Your Review"
                                rows={5}
                                required
                            />
                        </div>
                        <div className="form__group">
                            <label htmlFor="rating" className="form__label">Ratings (1-5)</label>
                            <input
                                id="rating"
                                type="number"
                                name='rating'
                                max={5}
                                min={1}
                                value={formData.rating}
                                onChange={handleChange}
                                className="form__input"
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <button type='submit' className='btn btn--green span-all-rows' onClick={handleClose}>
                            Save Changes
                        </button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}

export default EditReviewModal
