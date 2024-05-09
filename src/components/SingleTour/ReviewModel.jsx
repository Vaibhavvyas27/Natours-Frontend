import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

function ReviewModel({tour}) {
    const url = import.meta.env.VITE_APIURL
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [formData, setFormData] = useState({
        review: '',
        rating: 1,
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${url}api/v1/tours/${tour._id}/reviews`, {
                method: 'POST',
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

            // console.log(data);
        } catch (error) {
            console.log(error.message)
            toast.error(`Something went wrong !! `)
        }
        // Handle form submission, e.g., send data to server

    };

    return (
        <>
            <button className="btn btn--green span-all-rows" onClick={handleShow}>
                Write Review !
            </button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h2 className="heading-secondary mb-0">Write Review :-</h2>
                    </Modal.Title>
                </Modal.Header>
                <form className="form p-5" onSubmit={handleSubmit} >
                    <Modal.Body>
                        <div className="form__group">
                            <label htmlFor="review" className="form__label">Review-text : </label>
                            <textarea
                                id="review"
                                className="form__input"
                                name='review'
                                value={formData.review}
                                onChange={handleChange}
                                placeholder="Your Review"
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
    );
}

export default ReviewModel;