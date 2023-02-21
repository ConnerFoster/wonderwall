import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../components/Header'
import PostCard from '../components/PostCard'
import { getPosts, reset } from '../features/posts/postSlice'
import BeatLoader from 'react-spinners/BeatLoader'

function Feed() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [audioPlayer, setAudioPlayer] = useState('')
  const { user } = useSelector((state) => state.auth)
  const { posts, isLoading, isError, message } = useSelector(
    (state) => state.post
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    dispatch(getPosts())

    if (!user) {
      navigate('/login')
    }

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  const getLoading = () => {
    if (isLoading) {
      return <BeatLoader color='#ddd' size={10} />
    }
    return
  }

  const getAudioPlayer = () => {
    if (audioPlayer !== '') {
      return <audio src={audioPlayer} controls muted autoPlay />
    }
    return
  }

  const updateAudioSrc = (source) => {
    setAudioPlayer(source)
  }

  return (
    <div className='text-[#ddd]'>
      <Header page='Feed' />

      <section className='text-center mt-5'>{getLoading()}</section>

      <section className='flex flex-col gap-3 max-auto items-center mb-5'>
        {posts.map((post, i) => (
          <PostCard updateAudioSrc={updateAudioSrc} key={i} post={post} />
        ))}
      </section>

      <section className='flex justify-center items-center sticky bottom-10 z-40'>
        {getAudioPlayer()}
      </section>
    </div>
  )
}

export default Feed
