import React from 'react'
import SongCard from './SongCard'
import searchimg from '../resources/search.png'

function SongResults(props) {
  return (
    <div className='max-w-1/2 mt-5 text-center text-[#dddddd]/70 space-y-3 flex flex-col justify-center items-center'>
      {props.searchRes?.length > 0 ? (
        props.searchRes?.map((s, i) => (
          <SongCard data={s} key={i} updateSong={props.updateSong} />
        ))
      ) : (
        <div className='flex flex-col'>
          <img className='w-60' src={searchimg} />
          <h1 className='text-xl'>Search for a song to add it to your wall!</h1>
        </div>
      )}
    </div>
  )
}

export default SongResults
