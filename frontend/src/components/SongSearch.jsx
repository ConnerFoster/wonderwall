import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getSearchResults, reset } from '../features/search/searchSlice'

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
    //dispatch(getSearchResults(searchInput))
    //dispatch(reset())
  }

  return (
    <div>
      <input
        type='text'
        placeholder='Search'
        onChange={handleChange}
        value={searchInput}
        className='inputs'
      />
      <button onClick={handleSubmit} type='submit'>
        Submit
      </button>
    </div>
  )
}

export default SongSearch
