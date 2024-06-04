import React from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { signInSuccess } from '../../redux/user/userSlice';

const ProfileUpadete = () => {
  const url = import.meta.env.VITE_APIURL
  const { currentUser } = useSelector(state => state.user)
  const fileRef = useRef(null)
  const [img, setImg] = useState(null)  
  const [loading, setLoading] = useState(false)  
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: currentUser.email,
    name: currentUser.name,
  });
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // console.log(formData)
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const NewformData = new FormData();
    NewformData.append('file', img); 
    NewformData.append('name', formData.name); 
    NewformData.append('email', formData.email); 
    console.log(NewformData)
    try {
      const res = await fetch(`${url}api/v1/users/update-me`, {
        method: 'PATCH',
        // headers: {
        //   'Content-Type': 'application/json',
        // },
        credentials: 'include',
        body: NewformData
      })
      const data = await res.json()
      if (res.ok) {
        dispatch(signInSuccess(data.user))
        toast.success(data.message)
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log("Error", error)
    }
    setLoading(false)

  }
  
  return (
    <div className="user-view__form-container">
      <h2 className="heading-secondary ma-bt-md">Your account settings</h2>
      <form className="form form-user-data" onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form__group">
          <label htmlFor="name" className="form__label">Name</label>
          <input id="name" type="text" name='name' className="form__input" value={formData.name} onChange={changeHandler} required />
        </div>
        <div className="form__group ma-bt-md">
          <label htmlFor="email" className="form__label">Email address</label>
          <input id="email" type="email" name='email' className="form__input" value={formData.email} onChange={changeHandler} required />
        </div>
        <div className="form__group form__photo-upload">
          <img src={currentUser.photo? currentUser.photo : '/img/users/default.jpg' } alt={`Photo of ${currentUser.name}`} className="form__user-photo" />
          <input type="file" className='form__upload' accept='image/*' name='photo' onChange={(e)=> setImg(e.target.files[0])} ref={fileRef} hidden/>
          <label type='button' className="btn-text" style={{fontSize:'1.6rem'}} onClick={()=>fileRef.current.click()}>Choose new photo</label>
        </div>
        <div className="form__group right">
          <button type='submit' className="btn btn--small btn--green">{loading ? 'Saveing...' : 'Save settings'}</button>
        </div>
      </form>
    </div>
  )
}

export default ProfileUpadete
