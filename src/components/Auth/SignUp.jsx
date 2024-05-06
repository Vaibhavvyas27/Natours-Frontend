import React, { useState } from 'react';
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { signInFailure, signInStart, signInSuccess } from '../../redux/user/userSlice';


const url = import.meta.env.VITE_APIURL
function SignUp() {
  const navigate = useNavigate()
  const { currentUser, loading } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    passwordConfirm: ''
  });
  const [error, setError] = useState(null)
  // const [loading, setLoading] = useState(null)

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
        const res = await fetch(`${url}api/v1/users/signup`,{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json', 
            },
            credentials:'include',
            body : JSON.stringify(formData)
        })

        const data = await res.json()
        console.log(data)
        if (res.ok) {
          dispatch(signInSuccess(data.data.user))
          toast.success(data.message)
          navigate('/')
        }
        else{
            dispatch(signInFailure(data))
            toast.error(data.message)
        }
        
        // console.log(data);
    } catch (error) {
        dispatch(signInFailure(error))
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
        <h2 className="heading-secondary ma-bt-lg">Create your account</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form__group">
            <label htmlFor="email" className="form__label">Email address</label>
            <input
              id="email"
              type="email"
              name="email"
              className="form__input"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form__group">
            <label htmlFor="name" className="form__label">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              className="form__input"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form__group">
            <label htmlFor="password" className="form__label">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              className="form__input"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="8"
            />
          </div>
          <div className="form__group">
            <label htmlFor="passwordConfirm" className="form__label">Confirm Password</label>
            <input
              id="passwordConfirm"
              type="password"
              name="passwordConfirm"
              className="form__input"
              placeholder="••••••••"
              value={formData.passwordConfirm}
              onChange={handleChange}
              required
              minLength="8"
            />
          </div>
          <div className="form__group">
            <button disabled={loading} type="submit" className="btn btn--green">{loading ? 'Loading...' : 'SignUp'}</button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default SignUp;
