import React from 'react'
import { RiHome2Fill, RiAddBoxLine } from 'react-icons/ri'
import { HiUserCircle } from 'react-icons/hi'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className='bg-[#232428] text-[#ddd] sticky top-0 py-5 px-10 flex justify-evenly items-center xl:items-center'>
      <div>
        <div className='brand'>
          <Link to='/'>FunkyFeed</Link>
        </div>
      </div>

      <div className='flex'>
        <Link to='/'>
          <RiHome2Fill className='icons' />
        </Link>
        <Link to='/newpost'>
          <RiAddBoxLine className='icons' />
        </Link>
        <Link to='/profile'>
          <HiUserCircle className='icons' />
        </Link>
      </div>
    </header>
  )
}

export default Header
