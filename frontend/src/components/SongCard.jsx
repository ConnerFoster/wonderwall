import React from 'react'

function SongCard(props) {
  const handleAddSong = () => {
    const song = {
      songTitle: props.data.name,
      songArtist: props.data.artists[0].name,
      songImgUrl: props.data.album.images[0].url,
    }
    props.updateSong(song)
    console.log(song)
  }

  return (
    <div className='bg-[#232428] min-w-60 w-96 rounded-md flex justify-start gap-2 outline outline-1 outline-[#ddd]/10'>
      <div>
        <img className='w-16 ' src={props.data.album.images[0].url} />
      </div>
      <div className='flex flex-row justify-between items-center grow'>
        <div className='flex flex-col justify-center items-start'>
          <h1 className='font-semibold'>{props.data.name}</h1>
          <h2>{props.data.album.artists[0].name}</h2>
        </div>
        <div>
          <button
            onClick={handleAddSong}
            className='bg-[#5865f2] rounded-full w-7 h-7 mx-3'>
            +
          </button>
        </div>
      </div>
    </div>
  )
}

export default SongCard
