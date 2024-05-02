import React, { useState } from 'react'
import { toast } from 'react-toastify';

const PasswordChange = () => {
  const url = import.meta.env.VITE_APIURL
  const [formData, setFormData] = useState({
    currentPassword: '',
    password: '',
    passwordConfirm : ''
  });

  const changeHandler = (e) => {
    // console.log('done')
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const res = await fetch(`${url}api/v1/users/update-password`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (res.ok) {
        setFormData({
          currentPassword: '',
          password: '',
          passwordConfirm : ''
        })
        toast.success(data.message)
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log("Error",error)
    }
  }
  
  return (
    <div>
        <div className="user-view__form-container">
            <h2 className="heading-secondary ma-bt-md">Password change</h2>
            <form className="form form-user-settings" onSubmit={handleSubmit}>
              <div className="form__group">
                <label htmlFor="password-current" className="form__label">Current password</label>
                <input id="password-current" type="password" name='currentPassword' className="form__input" value={formData.currentPassword} placeholder="••••••••" onChange={changeHandler} required minLength="8"  />
              </div>
              <div className="form__group">
                <label htmlFor="password" className="form__label">New password</label>
                <input id="password" type="password" name='password' className="form__input" value={formData.password} placeholder="••••••••" onChange={changeHandler} required minLength="8"  />
              </div>
              <div className="form__group ma-bt-lg">
                <label htmlFor="password-confirm" className="form__label">Confirm password</label>
                <input id="password-confirm" type="password" name='passwordConfirm' value={formData.passwordConfirm} className="form__input" placeholder="••••••••" onChange={changeHandler} required minLength="8" />
              </div>
              <div className="form__group right">
                <button className="btn btn--small btn--green">Save password</button>
              </div>
            </form>
          </div>
    </div>
  )
}

export default PasswordChange
