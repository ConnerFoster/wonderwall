import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import SongSearch from '../components/SongSearch'
import Header from '../components/Header'
import SongResults from '../components/SongResults'
import PostForm from '../components/PostForm'
import { submitPost } from '../features/posts/postSlice'

function NewPost() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [text, setText] = useState('')
  const [song, setSong] = useState({
    songTitle: '',
    songArtist: '',
    songImgUrl: '',
    songPreviewUrl: '',
  })
  const [results, setResults] = useState([])

  const fetchSongs = (query) => {
    const body = {
      query: query,
    }
    axios.post('http://localhost:5000/api/search', body).then((res) => {
      setResults(res.data.items)
    })
  }

  const updateSong = (songObj) => {
    setSong((prevState) => ({
      ...prevState,
      songTitle: songObj.songTitle,
      songArtist: songObj.songArtist,
      songImgUrl: songObj.songImgUrl,
      songPreviewUrl: songObj.songPreviewUrl,
    }))
  }

  const updateText = (s) => {
    setText(s)
  }

  const handleSubmit = () => {
    if (
      song.songTitle === '' ||
      song.songArtist === '' ||
      song.songImgUrl === '' ||
      song.songPreviewUrl === ''
    ) {
      return
    }
    const data = {
      text: text,
      songTitle: song.songTitle,
      songArtist: song.songArtist,
      songImgUrl: song.songImgUrl,
      songPreviewUrl: song.songPreviewUrl,
    }

    dispatch(submitPost(data))

    const reset = {
      songTitle: '',
      songArtist: '',
      songImgUrl: '',
      songPreviewUrl: '',
    }
    updateSong(reset)
    updateText('')

    navigate('/')
  }

  return (
    <div className='h-screen text-gray-500 text-center'>
      <Header page='New Post' />
      <SongSearch fetchSongs={fetchSongs} />
      <div className='flex justify-evenly mt-5 max-w-7xl items-center mx-auto'>
        <SongResults searchRes={results} updateSong={updateSong} />
        <PostForm
          updateText={updateText}
          text={text}
          handleSubmit={handleSubmit}
          songImg={song.songImgUrl}
          updateSong={updateSong}
        />
      </div>
    </div>
  )
}

export default NewPost
