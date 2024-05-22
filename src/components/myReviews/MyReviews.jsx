import React from 'react';
import ProfileSidebar from '../Profile/ProfileSidebar';
import MyReviewCard from './MyReviewCard';
import { useSelector } from 'react-redux';
import { useEffect,useState } from 'react';


const MyReviews = () => {
    const url = import.meta.env.VITE_APIURL
    const { currentUser } = useSelector(state => state.user)
    const [reviews, setReviews] = useState(null)
    const [reviewFlag, setReviewFlag] = useState(false)
    const fetchReviews = async () => {
        try {
          const res = await fetch(`${url}api/v1/reviews/user/${currentUser._id}`, {
            method: 'GET',
            credentials: 'include',
          })
    
          const { reviews }  = await res.json()
          console.log(reviews)
          setReviews(reviews)
        } catch (error) {
          console.log(error)
        }
    }
    useEffect(()=>{
        fetchReviews()
    },[reviewFlag])

    return (
        <main className="main">
            <div className="user-view">
                <ProfileSidebar tab='reviews' />
                <div className="user-view__content d-flex flex-wrap gap-5 justify-content-center align-items-center">
                    {
                        reviews?.map((review)=>(
                            <MyReviewCard key={review._id}  review={review} reviewFlag={reviewFlag} setReviewFlag={setReviewFlag} />
                        ))
                    }
                </div>
            </div>
        </main>
    )
}

export default MyReviews
