import React from 'react'
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const ForgetPass = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate()

    const url = import.meta.env.VITE_APIURL
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${url}api/v1/users/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({email:email})
            })

            const data = await res.json()

            if (res.ok) {
                toast.success(data.message)
                navigate('/')
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error.message)
            toast.error(`Something went wrong !! `)
        }
    }
    return (
        <main className="main">
            <div className="login-form">
                <h2 className="heading-secondary ma-bt-lg">Forget Password !!</h2>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form__group">
                        <label htmlFor="email" className="form__label">Email address</label>
                        <input
                            id="email"
                            type="email"
                            name='email'
                            className="form__input"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                            required
                        />
                    </div>
                    <div className="form__group">
                        <button type='submit' className="btn btn--green">Send</button>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default ForgetPass
