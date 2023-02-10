import React from 'react'
import { RiHome2Fill, RiAddBoxLine } from 'react-icons/ri'
import { HiUserCircle } from 'react-icons/hi'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <header className='bg-[#232428] text-[#ddd] sticky top-0 py-5 px-10 flex justify-evenly items-center xl:items-center'>
      <div>
        <div className='brand'>
          <Link to='/'>FunkyFeed</Link>
        </div>
      </div>

      <div className='flex gap-2'>
        <Link to='/'>
          <RiHome2Fill className='icons' />
        </Link>
        <Link to='/newpost'>
          <RiAddBoxLine className='icons' />
        </Link>
        <Link to='/profile'>
          <HiUserCircle className='icons' />
        </Link>
        <button onClick={onLogout}>Logout</button>
      </div>
    </header>
  )
}

export default Header
