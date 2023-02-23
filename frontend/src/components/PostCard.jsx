import { useState } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { HiUserCircle } from 'react-icons/hi'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import AlbumCover from './AlbumCover'
import axios from 'axios'

function PostCard({ post, updateAudioSrc }) {
  const { user } = useSelector((state) => state.auth)

  const [liked, setLiked] = useState(post.likes.includes(user._id))
  const [likeCounter, setLikeCounter] = useState(post.likes.length)

  const handleLike = () => {
    setLiked((prevState) => !prevState)

    liked ? setLikeCounter(likeCounter - 1) : setLikeCounter(likeCounter + 1)

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }

    axios
      .post(`http://localhost:5000/api/posts/${post._id}/likes`, {}, config)
      .then((res) => {
        console.log(res.data)
      })
  }

  const getDate = (timestamp) => {
    return moment(new Date(timestamp)).fromNow()
  }
  return (
    <div className='flex flex-col justify-between px-5 py-3 w-[32rem] h-[30rem] rounded-md max-w-3xl mx-auto gap-3 bg-[#232428]'>
      <div className='flex justify-between mt-2'>
        <div className='flex items-center gap-1'>
          <HiUserCircle className='icons' />
          <p>{post.user.username}</p>
        </div>
        <div>
          <p>{getDate(post.createdAt)}</p>
        </div>
      </div>
      <AlbumCover
        img={post.songImgUrl}
        title={post.songTitle}
        artist={post.songArtist}
        preview={post.songPreviewUrl}
        updateAudio={updateAudioSrc}
      />
      <div>
        <div className='flex gap-2'>
          <h1 className='font-semibold'>{post.user.username}</h1>
          <p className='text-gray-400'>{post.text}</p>
        </div>
        <div className='flex items-start gap-2 mt-1 mb-2'>
          {liked ? (
            <button onClick={handleLike}>
              <AiFillHeart color='red' />
            </button>
          ) : (
            <button onClick={handleLike}>
              <AiOutlineHeart />
            </button>
          )}
          <p className='text-xs'>{`${likeCounter} likes`}</p>
        </div>
      </div>
    </div>
  )
}

export default PostCard
