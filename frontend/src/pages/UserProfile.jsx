import { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getUserPosts, reset } from '../features/posts/postSlice'
import PostCard from '../components/PostCard'
import BeatLoader from 'react-spinners/BeatLoader'
import Header from '../components/Header'
import ProfileCard from '../components/ProfileCard'
import LoadingBar from 'react-top-loading-bar'
import { getUserByName } from '../features/user/userSlice'
import Error404 from './Error404'

function UserProfile() {
  const { userPosts } = useSelector((state) => state.post)
  const { userLookup, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.user
  )

  const { user } = useSelector((state) => state.auth)

  const { username } = useParams()
  const ref = useRef(null)
  const [audioPlayer, setAudioPlayer] = useState('')
  const [isUser, setIsUser] = useState(user.username === username)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      navigate('/404')
    }
    dispatch(getUserByName(username))

    dispatch(getUserPosts(username))

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
      <Header page={username} />

      <section className='flex justify-evenly lg:justify-center lg:gap-7'>
        <section className='text-[#ddd] flex flex-col mt-4 gap-3 mb-5'>
          {userLookup &&
            userPosts.map((post, i) => (
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

export default UserProfile
