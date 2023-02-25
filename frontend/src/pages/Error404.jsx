import React from 'react'
import img404 from '../resources/404img.png'
import Header from '../components/Header'
import { Link } from 'react-router-dom'

function Error404() {
  return (
    <>
      <Header page='Not Found' />
      <div className='flex flex-col justify-center items-center mt-5 text-[#ddd]'>
        <img src={img404} />
        <h1 className='text-xl font-semibold mt-5'>Page not found</h1>
        <p className='text-gray-400 mt-2'>
          The page may have been removed or you followed an invalid url.{' '}
          <Link to='/'>
            <span className='text-[#5865f2]/70'>Go back home</span>
          </Link>
        </p>
      </div>
    </>
  )
}

export default Error404
