import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { HiUserCircle } from 'react-icons/hi'
import { FaSave } from 'react-icons/fa'
import Header from '../components/Header'

function EditProfile() {
  const { userProfile } = useSelector((state) => state.user)

  const [image, setImage] = useState(userProfile.profilePhoto || null)
  const [updateInfo, setUpdateInfo] = useState({
    bio: userProfile.bio || '',
    displayName: userProfile.displayName || '',
  })

  const { bio, displayName } = updateInfo

  const onChange = (e) => {
    setUpdateInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div>
      <Header />
      <div className='text-[#ddd] flex flex-col gap-5 justify-center items-center mt-[10vh]'>
        <section className='flex flex-col items-center'>
          <HiUserCircle size={70} color='#ddd' />
          <label className='text-[#5865f2]/70 font-semibold'>
            <input
              type='file'
              name='profilePhoto'
              id='profilePhoto'
              accept='image/*'
              onChange={(e) => setImage(e.target.files[0])}
            />
            Edit Picture
          </label>
        </section>
        <section>
          <form
            onSubmit={onSubmit}
            className='flex flex-col justify-center items-center gap-3'>
            <input
              type='text'
              id='displayName'
              name='displayName'
              value={displayName}
              placeholder='Display Name'
              className='inputs'
              onChange={onChange}
            />
            <textarea
              id='bio'
              name='bio'
              value={bio}
              placeholder='Bio'
              className='bg-[#232428] rounded-2xl w-64 h-32 p-3 resize-none'
              onChange={onChange}
            />
            <button
              type='submit'
              className='flex justify-center items-center gap-1 bg-[#5865f2]/90 hover:bg-[#5865f2] rounded-full py-2 text-white block w-[100%]'>
              <FaSave size={15} />
              Save
            </button>
          </form>
        </section>
      </div>
    </div>
  )
}

export default EditProfile
