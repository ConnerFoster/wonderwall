import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { getUser, reset } from '../features/user/userSlice'
import { HiUserCircle } from 'react-icons/hi'
import { TbEdit } from 'react-icons/tb'
import { Link } from 'react-router-dom'

function ProfileCard() {
  const dispatch = useDispatch()
  const { userProfile } = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(getUser())

    return () => {
      dispatch(reset())
    }
  }, [dispatch])

  return (
    <div className='bg-[#232428] rounded-md text-[#ddd] w-[30rem] p-5 mt-4'>
      <div className='flex mt-4 gap-2 items-center'>
        <div>
          {userProfile.profilePhoto ? (
            <img
              className='w-24 rounded-full mx-2'
              src={userProfile.profilePhoto}></img>
          ) : (
            <HiUserCircle size={90} />
          )}
        </div>
        <div>
          <h1 className='font-semibold text-xl'>
            {userProfile.displayName
              ? userProfile.displayName
              : userProfile.username}
          </h1>
          <h3>
            {moment(new Date(userProfile.createdAt)).fromNow().slice(0, -3)} old
          </h3>
          <h3>0 followers</h3>
        </div>
      </div>
      <div className='mt-5 mx-4'>{userProfile.bio}</div>
      <div className='mt-5 mb-5'>
        <Link to='/editprofile'>
          <button className='bg-[#5865f2]/90 hover:bg-[#5865f2] rounded-full flex gap-1 items-center justify-center py-2 text-white block w-[100%]'>
            <TbEdit />
            Edit Profile
          </button>
        </Link>
      </div>
    </div>
  )
}

export default ProfileCard
