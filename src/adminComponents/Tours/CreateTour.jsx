import React, { useRef } from 'react'
import { useState } from 'react';
import { toast } from 'react-toastify';
import { DatePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import TourForm from './TourForm';

const CreateTour = () => {
    
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Tour Basic Details</h5>
                <TourForm />
            </div>
        </div>

    )
}

export default CreateTour
