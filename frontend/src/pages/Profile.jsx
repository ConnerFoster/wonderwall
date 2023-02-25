import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getUserPosts, reset } from '../features/posts/postSlice'
import PostCard from '../components/PostCard'
import BeatLoader from 'react-spinners/BeatLoader'
import Header from '../components/Header'
import ProfileCard from '../components/ProfileCard'
import LoadingBar from 'react-top-loading-bar'

function Profile() {
  const ref = useRef(null)
  const [audioPlayer, setAudioPlayer] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userPosts, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.post
  )
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    dispatch(getUserPosts(user.username))

    if (isLoading) {
      ref.current.continuousStart()
    }
    if (isSuccess) {
      ref.current.complete()
    }

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

  const getAudioPlayer = () => {
    if (audioPlayer !== '') {
      return <audio src={audioPlayer} controls muted autoPlay />
    }
    return
  }

  return (
    <div>
      <LoadingBar color='#ffffff' ref={ref} />
      <Header page='Profile' />

      <section className='flex justify-evenly lg:justify-center lg:gap-7'>
        <section className='text-[#ddd] flex flex-col mt-4 gap-3 mb-5'>
          {userPosts.map((post, i) => (
            <PostCard updateAudioSrc={updateAudioSrc} post={post} key={i} />
          ))}
        </section>
        <section>
          <ProfileCard />
        </section>
      </section>
      <section className='flex justify-center items-center sticky bottom-10 z-40'>
        {getAudioPlayer()}
      </section>
    </div>
  )
}

export default Profile
