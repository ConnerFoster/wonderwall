import React from 'react'

function AlbumCover(props) {
  const handleAudio = (src) => {
    props.updateAudio(src)
  }
  return (
    <div>
      <div className='relative bottom-[9rem] left-[20%]'>
        <img
          src={props.img}
          className='w-72 rounded-md absolute cursor-pointer'
          onClick={() => handleAudio(props.preview)}
        />
        <h1 className='text-[#ddd] font-bold text-[#ddd] absolute top-[15rem] left-[2%] '>
          {props.title}
        </h1>
        <h1 className='absolute text-[#ddd] top-[16rem] left-[2%] '>
          {props.artist}
        </h1>
      </div>
    </div>
  )
}

export default AlbumCover
