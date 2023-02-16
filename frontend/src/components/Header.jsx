import React from 'react'
import { RiHome2Fill, RiAddBoxLine } from 'react-icons/ri'
import { HiUserCircle } from 'react-icons/hi'
import { MdQueueMusic } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

function Header(props) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  //const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/login')
  }

  return (
    <header className='bg-[#232428] text-[#ddd] sticky top-0 py-5 px-10 flex justify-evenly items-center xl:items-center z-40'>
      <div className='flex gap-3 items-center'>
        <div className='brand'>
          <Link to='/'>
            <div className='flex items-center gap-1'>
              <MdQueueMusic size={30} color='#5865f2' />
              <h1 className='font-bold text-lg text-white'>WonderWall</h1>
            </div>
          </Link>
        </div>
        <p className='text-gray-500 text-lg'>|</p>
        <h1 className='font-semibold'>{props.page}</h1>
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
