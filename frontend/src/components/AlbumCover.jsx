import React from 'react'

function AlbumCover(props) {
  const handleAudio = (src) => {
    props.updateAudio(src)
  }

  const breakLongText = (text) => {
    return text.slice(0, 34) + '...'
  }
  return (
    <div>
      <div className='relative bottom-[10rem] left-[18%]'>
        <img
          src={props.img}
          className='w-80 rounded-xl absolute cursor-pointer darken'
          onClick={() => handleAudio(props.preview)}
        />
        <h1 className='text-gray-300/90 break-words font-semibold text-[#ddd] absolute top-[16.5rem] left-[2%] '>
          {props.title.length > 34 ? breakLongText(props.title) : props.title}
        </h1>
        <h1 className='absolute text-gray-300/90 top-[17.5rem] left-[2%] '>
          {props.artist.length > 34
            ? breakLongText(props.artist)
            : props.artist}
        </h1>
      </div>
    </div>
  )
}

export default AlbumCover
