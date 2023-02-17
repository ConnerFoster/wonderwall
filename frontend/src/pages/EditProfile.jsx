import { useEffect, useState, useRef } from 'react'
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
import LoadingBar from 'react-top-loading-bar'

function EditProfile() {
  const ref = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { userProfile, isLoading, isSuccess } = useSelector(
    (state) => state.user
  )

  const [image, setImage] = useState(userProfile.profilePhoto || null)
  const [updateInfo, setUpdateInfo] = useState({
    bio: userProfile.bio || '',
    displayName: userProfile.displayName || '',
  })

  const { bio, displayName } = updateInfo

  useEffect(() => {
    if (isLoading) {
      ref.current.continuousStart()
    }
    if (isSuccess) {
      ref.current.complete()
    }
    dispatch(getUser())
  }, [dispatch])

  const onChange = (e) => {
    setUpdateInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const updateImage = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
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
      profilePhoto: imageUrl ? imageUrl : userProfile.profilePhoto,
      bio: bio,
      displayName: displayName,
    }

    dispatch(updateUser(data))
    navigate('/profile')
  }

  const getIcon = () => {
    if (image) {
      if (typeof image != 'string') {
        return (
          <img
            src={URL.createObjectURL(image)}
            className='w-24 h-24 rounded-full mb-2'
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
      <LoadingBar color='#ffffff' ref={ref} />
      <Header page='Edit Profile' />

      <div className='mt-10 mx-10 w-fit'>
        <Link to='/profile'>
          <IoArrowBackOutline color='#ddd' size={40} />
        </Link>
      </div>

      <div className='text-[#ddd] flex flex-col gap-5 justify-center items-center mt-[10vh]'>
        <section className='flex flex-col items-center'>
          {getIcon()}
          <label className='text-[#5865f2]/70 font-semibold text-lg cursor-pointer'>
            <input
              type='file'
              name='profilePhoto'
              id='profilePhoto'
              accept='image/*'
              onChange={(e) => updateImage(e)}
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
