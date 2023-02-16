import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AiOutlineSearch } from 'react-icons/ai'

function SongSearch(props) {
  const [searchInput, setSearchInput] = useState('')

  const dispatch = useDispatch()

  const handleChange = (e) => {
    e.preventDefault()
    setSearchInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    props.fetchSongs(searchInput)
  }

  return (
    <div className='bg-[#232428] text-white'>
      <input
        type='text'
        placeholder='Search'
        onChange={handleChange}
        value={searchInput}
        className='inputs bg-[#303136] my-5 w-1/2 focus:outline-none'
      />
      <button
        className='outline outline-1 outline-gray-700 rounded-full p-3'
        onClick={handleSubmit}
        type='submit'>
        <AiOutlineSearch />
      </button>
    </div>
  )
}

export default SongSearch
