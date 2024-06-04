import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signInFailure, signInStart, signInSuccess } from '../../redux/user/userSlice';
import { GrGoogle } from "react-icons/gr";


const url = import.meta.env.VITE_APIURL
const Login = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { currentUser } = useSelector(state => state.user)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const {error, loading} = useSelector(state => state.user)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart())
    try {
      const res = await fetch(`${url}api/v1/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      })

      const data = await res.json()
      
      if (res.ok) {
        dispatch(signInSuccess(data.user))
        toast.success(data.message)
        navigate('/')
      }
      else {
        dispatch(signInFailure(data))
        toast.error(data.message)
      }

      // console.log(data);
    } catch (error) {
      dispatch(signInFailure(error))
      console.log(error.message)
      toast.error(`Something went wrong !! `)
    }
    // Handle form submission, e.g., send data to server

  };

  if (currentUser) {
    return <Navigate to='/'></Navigate>
  }

  return (
    <main className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form__group">
            <label htmlFor="email" className="form__label">Email address</label>
            <input
              id="email"
              type="email"
              name='email'
              className="form__input"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form__group ma-bt-md">
            <label htmlFor="password" className="form__label">Password</label>
            <input
              id="password"
              type="password"
              name='password'
              className="form__input"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="8"
            />
          </div>
          <div className="form__group d-flex gap-3">
            <button disabled={loading} className="btn btn--green">{loading ? 'Loading...' : 'Login'}</button>
          </div>
          <h4 className='text'>Forget Password? <Link to={'/forget-password'}> click here  </Link></h4>
        </form>
      </div>
    </main>
  )
}

export default Login
