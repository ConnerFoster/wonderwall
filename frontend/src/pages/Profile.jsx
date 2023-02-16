import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getUserPosts, reset } from '../features/posts/postSlice'
import PostCard from '../components/PostCard'
import BeatLoader from 'react-spinners/BeatLoader'
import Header from '../components/Header'
import ProfileCard from '../components/ProfileCard'

function Profile() {
  const [audioPlayer, setAudioPlayer] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userPosts, isLoading, isError, message } = useSelector(
    (state) => state.post
  )
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    dispatch(getUserPosts())

    if (!user) {
      navigate('/login')
    }

    return () => {
      dispatch(reset())
    }
  }, [user, isError, message, dispatch, navigate])

  const updateAudioSrc = (source) => {
    setAudioPlayer(source)
  }

  const getLoading = () => {
    if (isLoading) {
      return <BeatLoader color='#ddd' size={10} />
    }
    return
  }

  return (
    <div className=''>
      <Header page='Profile' />
      <section className='text-center mt-5'>{getLoading()}</section>
      <section className='flex justify-evenly lg:justify-center lg:gap-7'>
        <section className='text-[#ddd] flex flex-col mt-4 gap-3'>
          {userPosts.map((post, i) => (
            <PostCard post={post} key={i} />
          ))}
        </section>
        <section>
          <ProfileCard />
        </section>
      </section>
    </div>
  )
}

export default Profile
