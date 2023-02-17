import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { HiUserCircle } from 'react-icons/hi'
import { FaSave } from 'react-icons/fa'
import { IoArrowBackOutline } from 'react-icons/io5'
import Header from '../components/Header'
import axios from 'axios'
import { toast } from 'react-toastify'
import { getUser, updateUser } from '../features/user/userSlice'
import { Link } from 'react-router-dom'

function EditProfile() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { userProfile } = useSelector((state) => state.user)
  console.log(userProfile)

  const [image, setImage] = useState(userProfile.profilePhoto || null)
  const [updateInfo, setUpdateInfo] = useState({
    bio: userProfile.bio || '',
    displayName: userProfile.displayName || '',
  })

  const { bio, displayName } = updateInfo

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  const onChange = (e) => {
    setUpdateInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    let imageUrl = ''

    if (image && image != userProfile.profilePhoto) {
      const instance = axios.create()

      const formData = new FormData()
      formData.append('file', image)
      formData.append('upload_preset', 'ww_preset')
      const res = await instance.post(
        'https://api.cloudinary.com/v1_1/dcwvy5ykr/image/upload',
        formData
      )

      imageUrl = res.data.url
    }
    const data = {
      profilePhoto: imageUrl,
      bio: bio,
      displayName: displayName,
    }

    console.log(data)

    dispatch(updateUser(data))
    navigate('/profile')
  }

  const getIcon = () => {
    if (image) {
      if (typeof image != 'string') {
        return (
          <img
            src={URL.createObjectURL(image)}
            className='w-24 rounded-full mb-2'
          />
        )
      } else {
        return <img src={image} className='w-24 rounded-full mb-2' />
      }
    } else {
      return <HiUserCircle size={120} color='#ddd' />
    }
  }

  return (
    <div>
      <Header page='Edit Profile' />
      <Link to='/profile'>
        <div className='mt-10 mx-10'>
          <IoArrowBackOutline color='#ddd' size={40} />
        </div>
      </Link>

      <div className='text-[#ddd] flex flex-col gap-5 justify-center items-center mt-[10vh]'>
        <section className='flex flex-col items-center'>
          {getIcon()}
          <label className='text-[#5865f2]/70 font-semibold text-lg cursor-pointer'>
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
              className='inputs w-96'
              onChange={onChange}
            />
            <textarea
              id='bio'
              name='bio'
              value={bio}
              placeholder='Bio'
              className='bg-[#232428] rounded-2xl w-96 h-32 p-3 resize-none'
              onChange={onChange}
            />
            <button
              type='submit'
              className='flex justify-center items-center gap-1 bg-[#5865f2]/90 hover:bg-[#5865f2] rounded-full py-2 text-white block w-[95%]'>
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
