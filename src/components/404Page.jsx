import React from 'react'
import { Link } from 'react-router-dom'

const Page404 = () => {
  return (
    <>
      <main className="main pb-5">
        <div className='' style={{textAlign: 'center'}}>
          <img height='200' src="/img/404-new-natours.png" alt="" />
          <h1 className='heading-secondary d-block mt-3'>Page Not Found !!</h1>
          <Link to={'/'} className="btn btn--green btn--small mt-5">Go to Home</Link>
        </div>
      </main>
    </>
  )
}

export default Page404
