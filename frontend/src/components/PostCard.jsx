import React from 'react'
import moment from 'moment'
import { HiUserCircle } from 'react-icons/hi'
import { AiOutlineHeart } from 'react-icons/ai'
import AlbumCover from './AlbumCover'

function PostCard({ post, updateAudioSrc }) {
  const getDate = (timestamp) => {
    return moment(new Date(timestamp)).fromNow()
  }
  return (
    <div className='flex flex-col justify-between px-5 py-3 w-[32rem] h-[28rem] rounded-md max-w-3xl mx-auto gap-3 bg-[#232428]'>
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
          <AiOutlineHeart />
          <p className='text-xs'>{`${post.likes} likes`}</p>
        </div>
      </div>
    </div>
  )
}

export default PostCard
