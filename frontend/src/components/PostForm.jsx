import React from 'react'

function PostForm(props) {
  return (
    <div className='flex flex-col justify-between bg-[#232428] mt-5 w-96 min-w-60 rounded-md outline outline-1 outline-[#ddd]/10'>
      <div className='flex justify-between p-3'>
        <div className=''>
          <h1>Chosen song:</h1>
          {props.songImg && (
            <div className='relative inline-block mt-4'>
              <span
                className='absolute top-[-5px] right-[-5px] cursor-pointer bg-[#ff0000] text-white w-5 h-5 text-center items-center font-semibold rounded-sm'
                onClick={() => props.updateSong({})}>
                -
              </span>
              <img className='w-16 h-16 rounded-md' src={props.songImg} />
            </div>
          )}
        </div>

        <h2 className='text-[#5865f2]'>Clear all</h2>
      </div>
      <div className='flex flex-col p-5 space-y-2'>
        <textarea
          value={props.text}
          onChange={(e) => props.updateText(e.target.value)}
          placeholder='Write something for your post caption'
          className='bg-[#303136] rounded-md h-48 p-2 resize-none'></textarea>
        <button
          onClick={props.handleSubmit}
          className='bg-[#5865f2]/80 hover:bg-[#5865f2]/90 rounded-lg p-2 text-white'>
          Post
        </button>
      </div>
    </div>
  )
}

export default PostForm
